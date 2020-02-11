import React from 'react'
import { connect } from "react-redux";
// import { switchLang } from "./reducers/wpParamsReducer";
import { setWhichModal, openModal } from "./reducers/appStateReducer";
import { ThemeContext } from "./ThemeContext";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  Translate,
  ImportContactsTwoTone,
  SignalWifi3BarTwoTone,
  ThumbUpTwoTone,
  PersonAddTwoTone,
  ListAltTwoTone
} from "@material-ui/icons";

const useStyle = makeStyles({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  icon: {
    fontSize: "100px"
  }
});

export const PFooter = ({
         articles,
         setWhichModal,
         openModal,
         switchLang
       }) => {
         const classes = useStyle();
         const { theme, elevation } = React.useContext(ThemeContext);

         return (
           <Paper elevation={elevation} className={classes.root}>
             <Grid container justify="center">
               <Grid item>
                 <Translate
                   onClick={() => dispatch({ type: "lang" })}
                   color="primary"
                   style={theme.icon}
                 />
               </Grid>
               <Grid item>
                 <ImportContactsTwoTone
                   onClick={() => handleClickOpen("magazines")}
                   fontSize="large"
                   style={theme.icon}
                 />
               </Grid>
               <Grid item>
                 <SignalWifi3BarTwoTone
                   onClick={() => handleClickOpen("wifi")}
                   style={theme.icon}
                 />
               </Grid>
               <Grid item>
                 <ThumbUpTwoTone
                   onClick={() => handleClickOpen("review")}
                   style={theme.icon}
                 />
               </Grid>
               <Grid item>
                 <ListAltTwoTone
                   onClick={() => handleClickOpen("menus")}
                   style={theme.icon}
                 />
               </Grid>
               <Grid item>
                 <a href="https://karte.smart-recept.jp/staff/login/">
                   <PersonAddTwoTone style={theme.icon} />
                 </a>
               </Grid>
             </Grid>
           </Paper>
         );
       };

const mapStateToProps = state => {
  return {
    articles: state.articles,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // switchLang,
    setWhichModal,
    openModal
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PFooter);
