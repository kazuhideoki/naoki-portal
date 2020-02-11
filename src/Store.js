import { createStore } from "redux";

import { reducer } from "./modules/reducer";

// const articles = [
    //     {
        //         title: "<h1>title</h1>",
        //         excerpt: "<p>excerpt</p>",
        //         content: "<p>content</p>",
        //         link: "",
        //         featuredImg: ""
        //     }
        // ];

// const tags = {
//     tagsEn: {},
//     tagsJa: {}
// }
// const authors = {}

// const otherData = {
//     totalPage: 1,
//     showWhichArticle: 0,
//     isArticleOpen: false,
//     showWhichModal: 'magazines',
//     isModalOpen: false,
// }

// const initParams = {
//     currentPage: 1,
//     author: "",
//     tag: "",
//     isJa: false,
// };
const state = {
    wpParams: {
        currentPage: 1,
        author: "",
        tag: "",
        isJa: false,
    },
    articles: [
        {
            title: "<h1>title</h1>",
            excerpt: "<p>excerpt</p>",
            content: "<p>content</p>",
            link: "",
            featuredImg: ""
        }
    ],
    tags: {
        tagsEn: {},
        tagsJa: {}
    },
    authors: {},
    appState: {
        totalPage: 1,
        showWhichArticle: 0,
        isArticleOpen: false,
        showWhichModal: 'magazines',
        isModalOpen: false,
    }
}

function reducerWpParams(state = state, action) {
  switch (action.type) {
    case "home":
      return { ...state, currentPage: 1, author: "", tag: "" };
    case "latest":
      return { ...state, currentPage: 1 };
    case "prev":
      return { ...state, currentPage: state.currentPage - 1 };
    case "next":
      return { ...state, currentPage: state.currentPage + 1 };
    case "oldest":
      return { ...state, currentPage: action.page };
    case "num":
      return { ...state, currentPage: action.page };
    case "tag":
      return { ...state, tag: action.payload, author: "", currentPage: 1 };
    case "author":
      return { ...state, author: action.payload, tag: "", currentPage: 1 };
    case "lang":
      return {
        ...state,
        isJa: !state.isJa,
        currentPage: 1,
        author: "",
        tag: ""
      };

    default:
      throw new Error();
  }
}





export const store = createStore(reducer);





