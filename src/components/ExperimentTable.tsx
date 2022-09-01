import { ExperimentGroup } from '../generator/types'
import {
  Button,
  Chip,
  ChipProps,
  Paper,
  Popover,
  styled,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material'
import { AppPaper } from './AppPaper'
import { useState } from 'react'
import { Form, Formik, Field } from 'formik'
import { Grid } from '@mui/material'
import { AppAutocomplete } from './formRelated/AppAutocomplete'
import { AppNumberInput } from './formRelated/AppNumberInput'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

type FormTypesErrors = {
  samples?: string
  reagents?: string
  replicates?: string
}

type FormikExperimentGroup = Omit<ExperimentGroup, 'id'>

const INITIAL_VALUES: FormikExperimentGroup = {
  samples: [],
  reagents: [],
  replicates: 1,
}

const CustomTableCell = styled(TableCell)<TableCellProps>(() => ({
  whiteSpace: 'normal',
  wordWrap: 'break-word',
}))

const CustomChip = styled(Chip)<ChipProps>(({ theme }) => ({
  margin: 2,
}))

export const validator = (values: FormikExperimentGroup) => {
  const errors: FormTypesErrors = {}
  const { samples, reagents, replicates } = values

  if (!samples.length) {
    errors.samples = 'At least 1 sample required (press Enter to add)'
  }

  if (!reagents.length) {
    errors.reagents = 'At least 1 reagent required (press Enter to add)'
  }

  if (!replicates) {
    errors.replicates = 'Required'
  }

  if (replicates < 1) {
    errors.replicates = 'Must be greater then 0'
  }

  return errors
}

type Props = {
  data: ExperimentGroup[]
  onChange: (value: ExperimentGroup[]) => void
}

export const ExperimentTable = ({ data, onChange }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const formSubmit = async (
    values: FormikExperimentGroup,
    { resetForm }: any,
  ) => {
    onChange([...data, { ...values, id: Math.random() }])
    handleClose()
    resetForm()
  }

  const removeRow = (groupId: number) => {
    onChange(data.filter((group) => group.id !== groupId))
  }

  const deleteItem = (
    groupId: number,
    variant: 'samples' | 'reagents',
    item: string,
  ) => {
    onChange(
      data.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            [variant]: group[variant].filter((x) => x !== item),
          }
        }

        return group
      }),
    )
  }

  return (
    <Paper>
      <Toolbar>
        <Typography sx={{ mr: 3 }} variant="h5">
          Experiment Groups
        </Typography>
        <Button
          id="add-experiment"
          variant="outlined"
          size="small"
          onClick={handleClick}
        >
          Add Experiment Group
        </Button>
      </Toolbar>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Samples</TableCell>
              <TableCell>Reagents</TableCell>
              <TableCell>Replicates</TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((group: ExperimentGroup) => (
              <TableRow key={group.id}>
                <CustomTableCell>
                  {group.samples.map((sample, ii) => (
                    <CustomChip
                      key={ii + sample}
                      color="primary"
                      label={sample}
                      variant="outlined"
                      onDelete={() => deleteItem(group.id, 'samples', sample)}
                    />
                  ))}
                </CustomTableCell>
                <CustomTableCell>
                  {group.reagents.map((reagent, ii) => (
                    <CustomChip
                      key={ii + reagent}
                      color="primary"
                      label={reagent}
                      variant="outlined"
                      onDelete={() => deleteItem(group.id, 'reagents', reagent)}
                    />
                  ))}
                </CustomTableCell>
                <CustomTableCell>{group.replicates}</CustomTableCell>
                <TableCell>
                  <IconButton onClick={() => removeRow(group.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {!data.length && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography variant="caption">
                    No experiment groups added. Please use the{' '}
                    <strong>Add Experiment Group</strong> button above.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Popover
          id="add-experiment"
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          sx={{
            maxHeight: 500,
            '& .MuiPopover-paper': {
              width: 700,
              maxHeight: 500,
            },
          }}
        >
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={formSubmit}
            validate={validator}
          >
            <Form>
              <AppPaper elevation={2}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12}>
                    <Field
                      name="samples"
                      label="Samples"
                      variant="outlined"
                      component={AppAutocomplete}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="reagents"
                      label="Reagents"
                      variant="outlined"
                      component={AppAutocomplete}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="replicates"
                      label="Replicates"
                      variant="outlined"
                      component={AppNumberInput}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="outlined" type="submit">
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </AppPaper>
            </Form>
          </Formik>
        </Popover>
      </TableContainer>
    </Paper>
  )
}
