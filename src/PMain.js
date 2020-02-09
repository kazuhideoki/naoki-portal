import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ArticleContext } from "./modules/Store";

const useStyles = makeStyles({
    root: {
        overflow: "scroll"
    },
    item: {
        margin: '5px',
    },
    article: {
        height: "60vh",
        width: 400
    },
    img: {
        width: '100%'
    }
});


export const PMain = ({ setIsArticleOpen, setWhichArticle, elevation }) => {
         const classes = useStyles();
         const { articles } = React.useContext(
           ArticleContext
         );
        //  記事画面を表示させるための関数
         const onClick = (key) => {
            setIsArticleOpen(true)
            setWhichArticle(Number(key))
         }

         let displayArticles
         if (articles) {
             displayArticles = articles.map((value, key) => (
               <Grid item key={key} className={classes.item}>
                 <Paper
                   className={classes.article}
                   onClick={() => onClick(key)}
                   elevation={elevation}
                 >
                   <h2>{value.title}</h2>
                   <div dangerouslySetInnerHTML={{ __html: value.excerpt }} />
                   <img
                     className={classes.img}
                      src={value.featuredImg}
                     alt={value.title}
                   />
                 </Paper>
               </Grid>
             ));
           
         }else{
            displayArticles = <Paper>No articles</Paper>
         }

         return (
           <Grid container wrap="nowrap" className={classes.root}>
             {displayArticles}
           </Grid>
         );
       };
