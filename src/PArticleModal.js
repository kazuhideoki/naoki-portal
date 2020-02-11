import React from 'react'
import { connect } from "react-redux";
import {
  openArticle,
  closeArticle,
  setWitchArticle
} from "./reducers/appStateReducer";
import {
  Paper,
  Dialog,
  DialogContent,
  DialogContentText,
  Slide,
  withStyles
} from "@material-ui/core";
import { HighlightOff } from "@material-ui/icons";

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



export const PArticleModal = ({
    showWhichArticle,
    isArticleOpen,
    articles,
    closeArticle,
    }) => {

        let article;
        let content;
        if (articles.length) {
        article = articles[showWhichArticle];

        content = "<h1>" + article.title + "</h1>" + article.content;

        article = (
            <Paper>
            <div
                className="content"
                dangerouslySetInnerHTML={{ __html: content }}
            />
            </Paper>
        );
        }

        return (
        <StyledDialog
            open={isArticleOpen}
            TransitionComponent={Transition}
            onClose={closeArticle} //要チェック
        >
            <StyledHighlightOff onClick={closeArticle} />
            <DialogContent>
            <DialogContentText>{article}</DialogContentText>
            </DialogContent>
        </StyledDialog>
    );
};

const mapStateToProps = state => {
  return {
    articles: state.articles,
    showWhichArticle: state.appState.showWhichArticle,
    isArticleOpen: state.appState.isArticleOpen
  };
};
const mapDispatchToProps = dispatch => {
  return {
    openArticle,
    closeArticle,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PArticleModal);
