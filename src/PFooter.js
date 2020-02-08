import React, {useContext}from 'react'
import { ThemeContext } from "./modules/Store";
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
import { ArticleContext } from "./modules/Store";

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
         className,
         elevation,
         handleClickOpen,
         ...props
       }) => {
         const classes = useStyle();

         const theme = useContext(ThemeContext);
         const articleData = useContext(
           ArticleContext
         );

         return (
           <Paper elevation={elevation} className={classes.root}>
             <Grid container justify="center">
               <Grid item>
                 <Translate
                   onClick={() => articleData.dispatch({ type: "lang" })}
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
