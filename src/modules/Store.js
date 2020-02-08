import React, { useReducer, useState } from "react";
import { reducer } from "./reducer";

const themes = {
  icon: {
    fontSize: 100
  }
};

const initParams = {
    currentPage: 1,
    author: "",
    tag: "",
    isJa: false,
};

const initArticles = [
  {
    title: "<h1>title</h1>",
    excerpt: "<p>excerpt</p>",
    content: "<p>content</p>",
    link: "",
    featuredImg: ""
  }
];

const ThemeContext = React.createContext();
const ArticleContext = React.createContext();

const ThemeProvider = ({ children }) =>  (
    <ThemeContext.Provider value={themes}>
        {children}
    </ThemeContext.Provider>
)

const ArticleContextProvider = ({children}) => {
    const [params, dispatch] = useReducer(reducer, initParams);
    // 取得された記事を格納する変数
    const [articles, setArticles] = useState(initArticles);
    // トータルページ数を取得、paginationに利用
    const [totalPages, setTotalPages] = useState(1)
    const [tags, setTags] = useState({
        tagsEn: [],
        tagsJa: []
    });
    const [authors, setAuthors] = useState([]);

    const values = {
      params: params,
      dispatch: dispatch,
      totalPages: totalPages,
      setTotalPages: setTotalPages,
      tags: tags,
      setTags: setTags,
      authors: authors,
      setAuthors: setAuthors,
      articles: articles,
      setArticles: setArticles,
    };

    return (
      <ArticleContext.Provider value={ values }>
        {children}
      </ArticleContext.Provider>
    );

}


export { ThemeContext, ArticleContext, ThemeProvider, ArticleContextProvider };
