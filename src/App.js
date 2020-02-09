import React, { useState, useEffect } from "react";
import { Grid, } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PModal from "./PModal";
import PHeader from "./PHeader"; 
import { PMain } from "./PMain";
import { PFooter } from "./PFooter";
// import { fetchData } from "./modules/wpApi"; 
import { PPagination } from "./PPagination";
import { ArticleContext } from "./modules/Store";
import { PArticle } from "./PArticleModal";
import { getWpPosts, getWpTags, getWpUsers } from "./modules/wpAPIFetch";
import { scrollBackToInitial } from "./modules/scrollBackToInitial";
// import { modifyAtags } from "./modules/modifyAtags";

 
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



const App = (props) => {
    const classes = useStyles();
    // Paperのかげの程度を設定
    const elevation = 3;
    // // モーダルウィンドウの開閉状態管理
    const [isOpen, setIsOpen] = useState(false);
    // どのモーダルウィンドウを開いたか
    const [whichModal, setWhichModal] = useState('magazines');
    // 記事ページのmodal windowの開閉状態
    const [isArticleOpen, setIsArticleOpen] = useState(false)
    // どの記事がarticke modalにセットされるか
    const [whichArticle, setWhichArticle] = useState(0)
    // PMainの横方向のスクロール位置
    // const [scrollX, setScrollX] = useState(0)
    
    const handleCloseArticleModal = () => {
        setIsArticleOpen(false)
    }
    const handleClose = () => {
        setIsOpen(false);
    }

    const handleClickOpen = value => {
      setIsOpen(true);
      setWhichModal(value);
    };

    
    // ↓ArticleContextの使い方はこれで統一
    const {params, setArticles, setTotalPages, setTags, setAuthors} = React.useContext(ArticleContext);

    console.log(params);
    
    useEffect(() => {
      getWpPosts(params, setTotalPages, setArticles);
        console.log('getWpPosts');
        
    }, [params]);

    useEffect(() => {
        getWpTags(setTags)
        getWpUsers(setAuthors);
        console.log("getWpTags,setAuthors");
    }, []);
    
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
          <PHeader elevation={elevation} />
        </Grid>
        <Grid item className={classes.main}>
          <PMain
            className={classes.articles}
            setIsArticleOpen={setIsArticleOpen}
            setWhichArticle={setWhichArticle}
            elevation={elevation}
          />
          <PPagination handleClickOpen={handleClickOpen} />
        </Grid>
        <Grid item className={classes.footer}>
          <PFooter elevation={elevation} handleClickOpen={handleClickOpen} />
        </Grid>

        <PArticle
          isArticleOpen={isArticleOpen}
          onClick={handleCloseArticleModal}
          whichArticle={whichArticle}
        />

        <PModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClick={handleClose}
          elevation={elevation}
          whichModal={whichModal}
          setWhichModal={setWhichModal}
          handleClickOpen={handleClickOpen}
        />
      </Grid>
    );
}



export default App;