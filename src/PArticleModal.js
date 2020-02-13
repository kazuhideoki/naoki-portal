import React from 'react'
import {
  Paper,
  Dialog,
  DialogContent,
  DialogContentText,
  Slide,
  withStyles
} from "@material-ui/core";
import { HighlightOff } from "@material-ui/icons";
import { Store } from './modules/Store';
import { sortDataPosts } from "./modules/wpApiFetch";
import { modifyAtags } from "./modules/modifyAtags";
import { fetchSinglePost } from './modules/wpApiSinglePost';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialog = withStyles({
  paper: {
    maxWidth: '100%',
    width: '90vw',
    height: '90vh',
    // padding: 30
  }
})(Dialog);
const StyledHighlightOff = withStyles({
  root: {
    fontSize: '100px',
    position: 'fixed',
    right: '50px',
    opacity: '0.7'
  }
})(HighlightOff);


const PArticleModalContainer = ({presenter}) => {
    const { wpData, appState, dispatchAppState } = React.useContext(Store);

    const articles = sortDataPosts(wpData.articles) || [
      {
        title: "",
        excerpt: "",
        content: "",
        link: "",
        featuredImg: ""
      }
    ];
    const isArticleModalOpen = appState.isArticleModalOpen
    const setArticleModal = appState.setArticleModal;
    const closeArticleModal = () => dispatchAppState({ type: "CLOSE_ARTICLE_MODAL" });

    const props = {
      articles,
      isArticleModalOpen,
      setArticleModal,
      closeArticleModal,
    };
     
    return presenter(props);
}
const PArticleModalPresenter = ({
  articles,
  isArticleModalOpen,
  setArticleModal,
  closeArticleModal
}) => {
  let singleArticle;
  let content;
  if (articles.length) {
   
    const article = articles[setArticleModal];    
    // if (typeof article.title !== "undefined") {
      singleArticle =
      "<h1>" + article.title + "</h1>" + article.content 
    // }
    // "<h1>" + article.title || "" + "</h1>" + article.content || "";

    content = (
      <Paper>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: singleArticle }}
        />
      </Paper>
    );
  }

  return (
    <StyledDialog
      open={isArticleModalOpen}
      TransitionComponent={Transition}
      onClose={closeArticleModal}
    >
      <StyledHighlightOff onClick={closeArticleModal} />
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
    </StyledDialog>
  );
};

export const PArticleModal = () => (
  <PArticleModalContainer
    presenter={props => <PArticleModalPresenter {...props} />}
  />
);
