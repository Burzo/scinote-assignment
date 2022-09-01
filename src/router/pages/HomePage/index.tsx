/* eslint-disable react-hooks/exhaustive-deps */

import { Box } from '@mui/material'
import { Container, Grid, Divider, Button, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'
import { ExperimentTable } from '../../../components/ExperimentTable'
import { AppRadio } from '../../../components/formRelated/AppRadio'
import { Tables } from '../../../components/Tables'
import { experimentGenerator } from '../../../generator'
import {
  AllTables,
  ExperimentGroup,
  GroupBy,
  GroupingLogic,
  TableSize,
} from '../../../generator/types'

const PLATE_SIZES = [
  { label: '96', value: 96 },
  { label: '384', value: 384 },
]

const GROUPING_LOGIC = [
  { label: 'Complex', value: GroupingLogic.COMPLEX },
  { label: 'Simplistic', value: GroupingLogic.SIMPLISTIC },
]

const GROUP_BY = [
  { label: 'Reagent', value: GroupBy.REAGENT },
  { label: 'Sample', value: GroupBy.SAMPLE },
]

const HomePage = () => {
  const [tableSize, setTableSize] = useState<TableSize>(96)
  const [groupingLogic, setGroupingLogic] = useState<GroupingLogic>(
    GroupingLogic.COMPLEX,
  )
  const [groupByItem, setGroupItem] = useState<GroupBy>(GroupBy.REAGENT)
  const [experimentGroups, setExperimentGroups] = useState<ExperimentGroup[]>(
    [],
  )
  const [changesDetected, setChangesDetected] = useState(false)

  const [tables, setTables] = useState<AllTables>([])

  const makeTable = async () => {
    const calculatedTables = await experimentGenerator({
      experimentGroups,
      tableSize,
      groupingLogic,
      groupBy: groupByItem,
    })
    setTables(calculatedTables)
    setChangesDetected(false)
  }

  /**
   * Initialize app
   */
  useEffect(() => {
    makeTable()
  }, [])

  useEffect(() => {
    if (experimentGroups.length > 0) {
      setChangesDetected(true)
    }
  }, [experimentGroups, groupingLogic, tableSize, groupByItem])

  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h5" gutterBottom>
          Introduction
        </Typography>
        <Typography variant="body1" gutterBottom>
          This application was created to help you combine different samples
          with different reagents N times and also account for two different
          plate sizes.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please use the bellow <strong>Add experiment group</strong> button to
          first add different experiment groups. You can add as many
          combinations as you want. Once you're satisfied with the selection,
          choose the plate size and the grouping/group by logic and hit{' '}
          <strong>Generate</strong>.
        </Typography>
        <Typography variant="body1">
          <strong>Grouping logic:</strong>
        </Typography>
        <Typography component="ul" gutterBottom>
          <Typography component="li">
            <i>Complex</i> - Try to group reagents/samples together and form
            rectangles
          </Typography>
          <Typography component="li">
            <i>Simplistic</i> - Sort and then render each experiment in a row
          </Typography>
        </Typography>
        <Typography variant="body1">
          <strong>Group By</strong> (only possible when{' '}
          <i>Complex Grouping Logic</i>&nbsp;is selected)<strong>:</strong>
        </Typography>
        <Typography component="ul" gutterBottom>
          <Typography component="li">
            <i>Reagent</i> - Create groups made of reagents
          </Typography>
          <Typography component="li">
            <i>Sample</i> - Create groups made of samples
          </Typography>
        </Typography>
        <Divider sx={{ mt: 3, mb: 3 }} />
        <ExperimentTable
          data={experimentGroups}
          onChange={(data) => setExperimentGroups(data)}
        />
        <Box sx={{ mt: 3, mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item>
            <AppRadio
              disabled={experimentGroups.length === 0}
              label="Which plate size to use?"
              radioButtons={PLATE_SIZES}
              value={tableSize}
              onChange={(value) => setTableSize(value as TableSize)}
            />
          </Grid>
          <Grid item>
            <AppRadio
              disabled={experimentGroups.length === 0}
              label="Grouping logic"
              radioButtons={GROUPING_LOGIC}
              value={groupingLogic}
              onChange={(value) => setGroupingLogic(value as GroupingLogic)}
            />
          </Grid>
          {groupingLogic === GroupingLogic.COMPLEX && (
            <Grid item>
              <AppRadio
                disabled={experimentGroups.length === 0}
                label="Group By"
                radioButtons={GROUP_BY}
                value={groupByItem}
                onChange={(value) => setGroupItem(value as GroupBy)}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={makeTable}
              disabled={experimentGroups.length === 0 ? true : !changesDetected}
            >
              {experimentGroups.length === 0
                ? 'Generate'
                : changesDetected
                ? 'Generate'
                : 'Generated'}
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 3, mb: 3 }} />
      </Container>
      <Tables tables={tables} />
    </>
  )
}

export default HomePage
