import React from 'react'
import { Grid } from '@mui/material'
import { AllTables } from '../generator/types'
import { getAlphabetChar } from '../helpers'
import { Well } from './Well'
import isEqual from 'lodash.isequal'

type Props = {
  tables: AllTables
}

const rerenderer = (prev: Props, next: Props) => {
  return isEqual(prev, next)
}

export const Tables = React.memo(({ tables }: Props) => {
  return (
    <Grid item container pt={3} pb={3} justifyContent="center" spacing={3}>
      {tables.map((tableRows, i) => {
        return (
          <Grid key={i} item xs={12} sx={{ overflow: 'auto' }}>
            <table style={{ margin: 'auto', padding: 50 }}>
              <thead>
                <tr>
                  <td />
                  {Array.from(Array(tableRows[0].length).keys()).map((td) => {
                    return (
                      <td key={td}>
                        <strong>{td + 1}</strong>
                      </td>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((wells, ii) => {
                  return (
                    <tr key={ii}>
                      <td>
                        <strong>
                          {ii + 1} : {getAlphabetChar(ii)}
                        </strong>
                      </td>
                      {wells.map((well, iii) => {
                        const key = well
                          ? well.place + well.reagent + well.sample + well.color
                          : iii
                        return (
                          <td key={key}>
                            <Well well={well} />
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Grid>
        )
      })}
    </Grid>
  )
}, rerenderer)
