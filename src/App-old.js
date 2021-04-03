import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  ThemeProvider,
  createMuiTheme,
  Container,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B, #FF8E53)",
    border: 0,
    borderRadius: 15,
    color: "white",
    padding: "0 30px",
  },
});

const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: 36,
    },
  },
});

function CheckboxExample() {
  const [checked, setChecked] = React.useState(true);
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          inputProps={{
            "aria-label": "primary checkbox",
          }}
        />
      }
      label="Testing Checkbox"
    />
  );
}

function ButtonStyled() {
  const classes = useStyles();
  return <Button className={classes.root}> Test Styled Button </Button>;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div className="App">
          <header className="App-header">
            <AppBar color="secondary">
              <Toolbar>
                <IconButton>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6">My App Bar</Typography>
                <Button>Login</Button>
              </Toolbar>
            </AppBar>
            <ButtonStyled />

            <Grid container spacing={2} justify="center">
              <Grid item xs={3} sm={6}>
                <Paper style={{ height: 75, width: "100%" }} />
              </Grid>
              <Grid item xs={3} sm={6}>
                <Paper style={{ height: 75, width: "100%" }} />
              </Grid>
              <Grid item xs={3} sm={6}>
                <Paper style={{ height: 75, width: "100%" }} />
              </Grid>
            </Grid>

            <CheckboxExample />
            <Button
              startIcon={<AllInclusiveIcon />}
              endIcon={<AllInclusiveIcon />}
              size="small"
              variant="contained"
              color="primary"
            >
              This is a Button!
            </Button>
            <img src={logo} className="App-logo" alt="logo" />
          </header>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
