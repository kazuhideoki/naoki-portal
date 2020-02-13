import React from "react";
import { ThemeContext } from "./modules/ThemeContext";
import { Store } from "./modules/Store";
import { sortDataPosts } from "./modules/wpApiFetch";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

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

const PMainContainer = ({presenter}) => {
    const classes = useStyles();
    const { elevation } = React.useContext(ThemeContext);

    const { wpData, dispatchAppState } = React.useContext(Store);
    const articles = sortDataPosts(wpData.articles);
    const openArticleModal = key =>
      dispatchAppState({ type: "OPEN_ARTICLE_MODAL", payload: key });
    
    const props = {
        classes,
        elevation,
        articles,
        openArticleModal
    }

    return presenter(props)

}

const PMainPresenter = ({ classes, elevation, articles, openArticleModal }) => {
    
  let displayArticles;
  if (articles) {
    displayArticles = articles.map((value, key) => (
      <Grid item key={key} className={classes.item}>
        <Paper
          className={classes.article}
          onClick={() => openArticleModal(key)}
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
  } else {
    displayArticles = <Paper>No articles</Paper>;
  }

  return (
    <Grid container wrap="nowrap" className={classes.root}>
      {displayArticles}
    </Grid>
  );
};
export const PMain = () => (
    <PMainContainer presenter={ props => <PMainPresenter {...props} />}/>
)

