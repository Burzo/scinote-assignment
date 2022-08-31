import { Container } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { Formik, Field, Form } from "formik";
import { AppInput } from "../../../components/formRelated/AppInput";
import { AppRadio } from "../../../components/formRelated/AppRadio";

const PLATE_SIZES = [
  { label: "96", value: 96 },
  { label: "384", value: 384 },
];

const INITIAL_VALUES = {
  plateSize: 96,
  samples: "",
  reagents: "",
  replicates: "",
};

export const validator = (values: typeof INITIAL_VALUES) => {
  const errors: Partial<typeof INITIAL_VALUES> = {};
  const { plateSize, samples, reagents, replicates } = values;

  if (!samples.length) {
    errors.samples = "Required";
  }

  if (!reagents.length) {
    errors.reagents = "Required";
  }
  if (!replicates.length) {
    errors.replicates = "Required";
  }

  if (![96, 384].includes(plateSize)) {
    errors.plateSize = "Must be either 96 or 384" as unknown as number;
  }

  return errors;
};

const HomePage = () => {
  const formSubmit = async (
    values: typeof INITIAL_VALUES,
    { resetForm }: any
  ) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={formSubmit}
      validate={validator}
    >
      <Form>
        <Container maxWidth="sm">
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Field
                name="plateSize"
                label="Plate size"
                variant="outlined"
                size="small"
                radioButtons={PLATE_SIZES}
                component={AppRadio}
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                name="samples"
                label="Samples"
                variant="outlined"
                size="small"
                component={AppInput}
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                name="reagents"
                label="Reagents"
                variant="outlined"
                size="small"
                component={AppInput}
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                name="replicates"
                label="Replicates"
                variant="outlined"
                size="small"
                component={AppInput}
              />
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Button variant="contained" type="submit">
                Calculate
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Form>
    </Formik>
  );
};

export default HomePage;
