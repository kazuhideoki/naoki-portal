import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        height: '100%',
        padding: 10
    },
    h1: {
        margin: 0
    }
});

const PHeader = props => {
  const classes = useStyles();

  return (
    <Paper className={`${classes.root}`} elevation={props.elevation}>
      <h1 className={classes.h1}>Reactで作ったportal</h1>
    </Paper>
  );
};

export default PHeader