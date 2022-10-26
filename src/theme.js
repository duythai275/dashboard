import { createTheme } from "@mui/material/styles";
import { red, lightBlue, grey, orange, green } from "@mui/material/colors";

let isMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  isMobile = true;
}
const font = import.meta.env.VITE_FONT;

let theme = createTheme({
  typography: {
    fontFamily: font + " !important",
    fontSize: 14,
    button: { textTransform: "none", fontWeight: "bold", fontSize: 15 },
    ERROR: { fontFamily: font, color: red[600], fontSize: 13, fontWeight: "bold" },
    mandatoryStar: { fontFamily: font, color: red[600], fontSize: "20px !important", fontWeight: "bold" },
    widgetTitle: {
      fontFamily: font,
      fontSize: 15,
      fontWeight: 600
    },
    HELPER: {
      fontFamily: font,
      color: lightBlue[800],
      fontSize: 13,
      fontWeight: "bold"
    },
    WARNING: {
      fontFamily: font,
      color: orange[500],
      fontSize: 13,
      fontWeight: "bold"
    },
    inputFieldLabel: { fontFamily: font, fontSize: 15 }
  },
  palette: {
    text: {
      primary: "#424242"
    },
    chipSelected: {
      main: "#2b675c",
      dark: "#3d9182",
      contrastText: "#fff"
    },
    grey: {
      main: grey[700],
      contrastText: "#fff"
    },
    primary: {
      main: lightBlue[800]
    },
    secondary: {
      main: red[600],
      contrastText: "#fff"
    },
    orange: {
      main: orange[500],
      contrastText: "#fff"
    },
    green: {
      main: green[500],
      dark: green[700],
      contrastText: "#fff"
    }
  },
  components: {
    MuiInputBase: {
      defaultProps: {
        size: "small"
      },
      styleOverrides: {
        root: {
          background: "#ffffff"
        }
      }
    },
    MuiButtonGroup: {
      defaultProps: {
        // disableElevation: true
      }
    },
    MuiButton: {
      defaultProps: {
        // disableElevation: true
      },
      styleOverrides: {
        root: {
          height: 40
        }
      }
    }
  }
});

export default theme;
