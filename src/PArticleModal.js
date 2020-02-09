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
import { ArticleContext } from './modules/Store';
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



export const PArticle = ({ isArticleOpen, onClick, whichArticle, ...props }) => {
    const { articles, setArticles } = React.useContext(
      ArticleContext
    );
    // let ref = React.useRef()
    // ref.current.
    
    let param
    let content
    if (articles.length){
        const article = articles[whichArticle];
        
        param = '<h1>' + article.title + '</h1>' + article.content


        content = (
        <Paper >
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: param }}
          />
          </Paper>
        );
    }

    // React.useEffect(() => {
    //     modifyAtags(fetchSinglePost(articles, setArticles));
    // }, [whichArticle])
    // React.useEffect(() => {
    //     fetchSinglePost(articles, setArticles);
    // }, [whichArticle])

    return (
      <StyledDialog
        open={isArticleOpen}
        TransitionComponent={Transition}
        onClose={onClick}
        {...props}
      >
        <StyledHighlightOff onClick={onClick} />
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
      </StyledDialog>
    );
};
