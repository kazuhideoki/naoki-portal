import React from "react";
import { connect } from "react-redux";
import { setArticles, setTags, setAuthors } from "./reducers/wpSetDataReducer";
import { setTotalPage } from "./reducers/appStateReducer";
import { Grid, } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
// import PFooterModal from "./PFooterModal";
import PHeader from "./PHeader"; 
import PMain from "./PMain";
// import PFooter from "./PFooter";
import PPagination from "./PPagination";
import PArticleModal from "./PArticleModal";
import { getWpPosts, getWpTags, getWpUsers } from "./modules/wpAPIFetch";
 
// 3段のコンテナの整形に関してのみ記述, 
const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: "1vh",
    paddingBottom: "1vh",
    maxHeight: "100%",
    overflow: "hidden"
  },
  header: {
    maxWidth: "100vw",
    height: "10vh",
    padding: 5,
    textAlign: "center",
    marginBottom: "1vh"
  },
  main: {
    height: "66vh",
    maxWidth: "100vw"
  },
  footer: {
    height: "20vh",
    padding: "5px",
    maxWidth: "100vw",
    marginTop: "1vh"
  }
}));



const App = ({wpParams}) => {
    const classes = useStyles();

    React.useEffect(() => {
        const prm = { wpParams, setArticles, setTotalPage };
        getWpPosts(prm);
    // },[wpParams])
    },[])
    React.useEffect(() => {
        const prm = { setTags };
        getWpTags(prm);
    },[])
    React.useEffect(() => {
        const prm = { setAuthors };
        getWpUsers(prm);
    },[])


   console.log('Appだよ');
   
    return (
    
        <Grid
        spacing={0}
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        >
            <Grid item className={classes.header}>
                <PHeader />
            </Grid>
            <Grid>
                <PMain />
                {/* <PArticleModal /> */}
            </Grid>
            <Grid item className={classes.footer}>
            <PPagination />
                {/* <PFooter /> */}
            {/* <PFooterModal /> */}
            </Grid>
        </Grid>
        
    );
}



const mapStateToProps = state => {
  return {
    wpParams: state.wpParamsReducer,
  };
};
const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);