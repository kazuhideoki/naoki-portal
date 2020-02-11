import { store } from "../index";
import { setTotalPage } from "../reducers/appStateReducer";

export function makeApiParamsPosts(state, perPage) {
  const per_page = perPage;
  let categories;
  let page;
  let author;
  let tag;

  //  カテゴリーで、35は「ニュース」20は「news」
  if (state.isJa) {
    categories = 35;
  } else {
    categories = 20;
  }

  page = state.currentPage || 1;
  author = state.author || "";
  tag = state.tag || "";

  const params =
    "?per_page=" +
    per_page +
    "&categories=" +
    categories +
    "&page=" +
    page +
    "&author=" +
    author +
    "&tags=" + 
    tag;

  console.log(params);
  return "posts" + params;
}
export function makeApiParamsTags(perPage) {
  const per_page = perPage;
  const params = "?per_page=" + per_page;
  return "tags" + params;
}
export function makeApiParamsUsers(perPage) {
  const per_page = perPage;
  const params = "?per_page=" + per_page;
  return "users" + params;
}

export function fetchData(params) {
    return fetch(`https://naokihair.com/wp-json/wp/v2/${params}`);
}

export function getTotalPages(response) {
    return Number(response.headers.get("x-wp-totalpages"));
}
export function wpApiToData({
         response,
         setTags,
         setAuthors,
         ...actionCreators
       }) {
         const { setArticles, setTotalPage } = actionCreators; //アクションクリエーターを入れる→totalPageとarticleのセット
         let totalPage;
         response.then(response => {
           if (setTotalPage) {
             const num = getTotalPages(response);
             store.dispatch(setTotalPage(num));
           }
           response
             .json()
             .then(data => {
               const actionCreator = setArticles || setTags || setAuthors;
               store.dispatch(actionCreator(data));
             })
             .catch(error => {
               console.log("catch errorだよ " + error);
             });
         });
       }
export function sortDataPosts(data) {
  let articles = [];
  data.forEach(index => {
    articles.push({
      title: index.title.rendered,
      excerpt: index.excerpt.rendered,
      content: index.content.rendered,
      link: index.link,
      featuredImg: index.jetpack_featured_media_url
    });
  });
  console.log(articles);
  return articles;
}
export function sortDataTags(data) {
  let tagsEn = [];
  let tagsJa = [];
  data.forEach(index => {
    if (index.link.indexOf(/ja/) !== -1) {
      tagsJa.push({
        name: index.name,
        id: index.id
      });
    } else {
      tagsEn.push({
        name: index.name,
        id: index.id
      });
    }
  });
  console.log({ tagsJa, tagsEn });
  return { tagsJa, tagsEn };
}
export function sortDataUsers(data) {
    let authors = [];
    data.forEach(index => {
      authors.push({
        name: index.name,
        id: index.id,
        img: index.avatar_urls["96"]
      });
    });
    console.log(authors);
    return authors
}



// メインのpostの記事取得
export function getWpPosts({wpParams, ...actionCreators}) {
         const params = makeApiParamsPosts(wpParams, 6);
         const response = fetchData(params);
         console.log(response);

         return wpApiToData({
           response,
           ...actionCreators
         });
       }
// tag取得日英に分けてsetTagsに格納
export function getWpTags({setTags}) {
         const params = makeApiParamsTags(50);
         const response = fetchData(params);
         return wpApiToData({
           response,
           setTags
         });
       }
// userを取得
export function getWpUsers({setAuthors}) {
         const params = makeApiParamsUsers(50);
         const response = fetchData(params);
         return wpApiToData({
           response,
           setAuthors
         });
       }