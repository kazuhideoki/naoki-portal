import { getWpPosts, getWpTags, getWpUsers } from "../modules/wpAPIFetch";

const wpData = {
    articles: [], 
    tags: [],
    authors: [],
}

export function wpSetDataReducer(state = wpData, action) {
         switch (action.type) {
           case "SET_ARTICLES":
             return { ...state, articles: action.payload };
           case "SET_TAGS":
             return { ...state, tags: action.payload };
           case "SET_AUTHORS":
             return { ...state, authors: action.payload };

           default:
             return { ...state };
         }
       }

export const setArticles = data => {
    return {
      type: "SET_ARTICLES",
      payload: data
    };
}
export const setTags = data => {
    return {
      type: "SET_TAGS",
      payload: data
    };
}
export const setAuthors = data => {
    return {
      type: "SET_AUTHORS",
      payload: data
    };
}
