/* eslint-disable no-loop-func */

import { generateRandomColor } from '../helpers'
import { Pointer } from './Pointer'
import {
  AllTables,
  Experiment,
  ExperimentGroup,
  GroupBy,
  GroupingLogic,
  TableType,
} from './types'

type Props = {
  experimentGroups: ExperimentGroup[]
  tableSize: 96 | 384
  groupingLogic: GroupingLogic
  groupBy: GroupBy
  fixedColor?: boolean
}

/**
 * Main function that takes in different experiment groups and combines
 * them into a nested array which is then rendered on the screen.
 *
 * @param experimentGroups
 *
 * Different experiment groups containing samples, reagents and replicates
 * used in the calculation.
 *
 * @param tableSize
 *
 * Currently either 96 or 384 wells are supported.
 *
 * @param groupingLogic
 *
 * Decides which logic is used. Currently there are 3 options:
 *   Complex - Try to group reagents together and form rectangles
 *   Simplistic - Sort and then render each experiment in a row
 *
 * @param groupBy
 *
 * Should we group by reagent or sample. Comes in handy if a
 * client has lots of reagents and small amount of samples
 * or vice versa.
 *
 * @param fixedColor
 *
 * This is for tests only.
 */
export const experimentGenerator = ({
  experimentGroups,
  tableSize,
  groupingLogic,
  groupBy,
  fixedColor = false,
}: Props) => {
  const CONSTRAINTS =
    tableSize === 96 ? { col: 12, row: 8 } : { col: 24, row: 16 }

  const tables: AllTables = [generateEmptyTable(tableSize)]

  let currentTable = tables[0]

  /**
   * The pointer is used everywhere to determine the current
   * point on the table where the experiment is being drawn.
   */
  let pointer = new Pointer()

  /** Creates a new table and pushes the pointer at the start */
  const createNewTable = () => {
    tables.push(generateEmptyTable(tableSize))
    currentTable = tables[tables.length - 1]
    pointer.set(0, 0)
  }

  /** Calculate empty columns of a given row on the table */
  const getEmptyCols = (row: TableType[]) => {
    return row.filter((row) => !row || !row).length
  }

  /**
   * Push an item to the correct spot on the table and move
   * the pointer accordingly after that.
   */
  const pushItem = (experiment: Experiment) => {
    const [row, col] = pointer.get()
    currentTable[row][col] = experiment
    pointer.addY()
  }

  /** Go to a new line */
  const newLine = (opts?: { col?: number }) => {
    pointer.addX()
    let row = currentTable[pointer.x]
    pointer.setY((opts && opts.col) ?? CONSTRAINTS.col - getEmptyCols(row))
  }

  /** Find the first empty spot on the table */
  const getFirstEmptyCoord = () => {
    let coordinates: Pointer | null = null
    currentTable.forEach((row, i) => {
      if (coordinates) return true
      row.find((col, ii) => {
        if (!col) {
          coordinates = new Pointer(i, ii)
          return true
        }
        return false
      })
    })
    return coordinates as unknown as Pointer
  }

  /**
   * Main algorithm to find rectangles on the table.
   *
   * Currently, only samples length and replications
   * are being considered.
   *
   * First, it calculates how many different possibilies
   * for a rectangle there are on the table and then it
   * tries to find the first possible rectangle that is
   * the size of x = samples.length and y = replications.
   *
   * If it finds one, it returns its origin as the Pointer
   * coordinates, otherwise it doesn't return anything
   * which forces the app to simply fill in the empty spaces
   * using the simplistic approach.
   *
   * It will first try to find a rectangle moving horizontally
   * and if it fails, it will start at zero and move vertically.
   */
  const findRectangleAlgorithm = (
    row: number,
    col: number,
    startAtZero?: boolean,
  ): null | Pointer => {
    const retryHeight = CONSTRAINTS.row - row + 1
    const retryWidth = CONSTRAINTS.col - col + 1
    const firstEmptyCoord = startAtZero ? new Pointer() : getFirstEmptyCoord()

    let startingPointer: Pointer | null = null

    for (let i = firstEmptyCoord.x; i < retryHeight; i++) {
      if (startingPointer) return startingPointer

      for (
        let colIndex = firstEmptyCoord.y;
        colIndex < retryWidth;
        colIndex++
      ) {
        if (startingPointer) return startingPointer

        const rows = currentTable
          .slice(i, i + row)
          .map((row) => row.slice(colIndex, colIndex + col))
        let inARow = 0

        rows.forEach((innerRow) => {
          if (startingPointer) return

          if (getEmptyCols(innerRow) >= col) {
            inARow++
          } else {
            inARow = 0
          }

          if (inARow >= row) {
            /**
             * We encountered more then enough columns
             * in enough rows to draw a rectangle!
             */
            startingPointer = new Pointer(i, colIndex)
          }
        })
      }
    }

    if (!startingPointer && !startAtZero) {
      return findRectangleAlgorithm(row, col, true)
    }

    return startingPointer
  }

  let counter = 0

  /** Main grouping logic is executed here */

  /**
   * The simplistic approach will render experiments one
   * by one, in a row, and they will be grouped.
   */
  if (groupingLogic === GroupingLogic.SIMPLISTIC) {
    experimentGroups.forEach(({ samples, reagents, replicates }) => {
      if (replicates === 0) {
        throw new Error('Can not have 0 replications of the experiment')
      }

      reagents.forEach((reagent) => {
        /** Generate a random color for a cluster of reagents */
        const color = fixedColor ? '' : generateRandomColor()
        samples.forEach((sample) => {
          Array.from(Array(replicates).keys()).forEach((place) => {
            /** We make sure a new table is created if the current one is full */
            if (
              currentTable.flat().filter((col) => !!col).length >= tableSize
            ) {
              createNewTable()
            }

            /** Go to a new row if the current one is full */
            if (getEmptyCols(currentTable[pointer.x]) <= 0) {
              newLine()
            }

            pushItem({ sample, reagent, place, color })
          })
        })
      })
    })
  } else {
    /**
     * The basic and complex approach will try to render experiments
     * as a rectangle, grouping up reagent/sample combinations
     * according to their replications.
     */
    experimentGroups.forEach(({ samples, reagents, replicates }) => {
      if (replicates === 0) {
        throw new Error('Can not have 0 replications of the experiment')
      }

      let arrayA = [...reagents]
      let arrayB = [...samples]

      /**
       * Switch logic around if we group by sample.
       */
      const switcheroo = groupBy === GroupBy.SAMPLE

      if (switcheroo) {
        ;[arrayA, arrayB] = [arrayB, arrayA]
      }

      arrayA.forEach((reagent) => {
        const color = fixedColor ? '' : generateRandomColor()

        /**
         * Find a possible rectangle for this amount of samples
         * and replicates.
         */
        const startingPointer = findRectangleAlgorithm(
          arrayB.length,
          replicates,
        )

        if (startingPointer) {
          /**
           * If a rectangle was found, we got its origin here
           * point and can start drawing.
           */
          pointer = startingPointer
          arrayB.forEach((sample) => {
            Array.from(Array(replicates).keys()).forEach((place) => {
              counter++
              if (switcheroo) {
                pushItem({ sample: reagent, reagent: sample, place, color })
              } else {
                pushItem({ sample, reagent, place, color })
              }
            })
            /**
             * If on last line, don't do anything, we trust that
             * the rectangle will be drawn correctly. Since there
             * is no space, the next time we try to find a rectangle
             * nothing will be found and a new table is created.
             * */
            if (CONSTRAINTS.row - 1 !== pointer.x) {
              newLine({ col: pointer.y - replicates })
            }

            /** Make sure to create a new table if this one is full */
            if (counter % tableSize === 0) {
              createNewTable()
            }
          })
        } else {
          /**
           * If no rectangle was found, we simply find the first
           * empty spot and fill in the blanks as best as we can.
           */
          arrayB.forEach((sample) => {
            Array.from(Array(replicates).keys()).forEach((place) => {
              counter++

              const emptyCoords = getFirstEmptyCoord()
              pointer.set(emptyCoords.x, emptyCoords.y)

              /** Make sure to go to a new row if this one is full */
              if (getEmptyCols(currentTable[pointer.x]) <= 0) {
                newLine()
              }

              if (switcheroo) {
                pushItem({ sample: reagent, reagent: sample, place, color })
              } else {
                pushItem({ sample, reagent, place, color })
              }

              /** Make sure to create a new table if this one is full */
              if (counter % tableSize === 0) {
                createNewTable()
              }
            })
          })
        }
      })
    })
  }

  return tables
}

/** This function creates an empty table of a given size */
const generateEmptyTable = (size: 96 | 384): TableType[][] => {
  const { row, col } = size === 96 ? { col: 12, row: 8 } : { col: 24, row: 16 }
  return Array.from(Array(row).keys()).map((_) => [
    ...Array.from(Array(col).keys()).map((_) => null),
  ])
}
