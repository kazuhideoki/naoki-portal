import React from "react";
import { connect } from "react-redux";
import { openArticle, setWitchArticle } from "./reducers/appStateReducer";
import { sortDataPosts } from "./modules/wpAPIFetch";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ThemeContext } from "./ThemeContext";

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


const PMain = ({ openArticle, setWitchArticle, articles }) => {
  const classes = useStyles();
  const { elevation } = React.useContext(ThemeContext);

  //  記事画面を表示させるための関数
  const onClick = key => {
    openArticle();
    setWitchArticle(Number(key));
  };

  let displayArticles;
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
  } else {
    displayArticles = <Paper>No articles</Paper>;
  }

  return (
    <Grid container wrap="nowrap" className={classes.root}>
      {displayArticles}
    </Grid>
  );
};

const mapStateToProps = state => {
    return {
      articles: sortDataPosts(state.wpSetDataReducer.articles)
    };
}
const mapDispatchToProps = dispatch => {
    return {
      openArticle,
      setWitchArticle
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(PMain);
