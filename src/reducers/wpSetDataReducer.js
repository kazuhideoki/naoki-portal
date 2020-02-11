import { getWpPosts, getWpTags, getWpUsers } from "../modules/wpAPIFetch";

const wpData = {
    // articles: [
    //     {
    //         title: "<h1>title</h1>",
    //         excerpt: "<p>excerpt</p>",
    //         content: "<p>content</p>",
    //         link: "",
    //         featuredImg: ""
    //     }
    // ], 
    articles: [], 
    // tags: {
    //     tagsEn: {},
    //     tagsJa: {}
    // },
    tags: [],
    authors: [],
}

export function wpSetDataReducer(state = wpData, action) {
         switch (action.type) {
           case "SET_ARTICLES":
             return { ...state, articles: action.payload };

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
