import { createTheme, keyframes } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: [
      "Lato",
      "novel-sans-pro",
      "Ubuntu",
      "Roboto",
      "-apple-system",
      "sans-serif",
    ].join(","),
  },
  palette: {
    primary: {
      main: "#104da9",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#3FC5D6",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#E03E37",
    },
    warning: {
      main: "#FF914B",
    },
    success: {
      main: "#40DE79",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#3A96ED",
    },
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translate(0, 100%)",
          width: "100%",
          fontSize: "0.65rem",
          animation: `${keyframes`
            0 %  {
              transform: translate(0, 100%);
            },
            100% {
              transform: translate(-52%, 100%);
            }
            `} .2s`,
          animationFillMode: "forwards",
        },
      },
    },
  },
});
