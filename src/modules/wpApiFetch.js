function makeApiParamsPosts(state, perPage) {
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
    return 'posts' + params
}
function makeApiParamsTags(perPage) {
    const per_page = perPage;
    const params = "?per_page=" + per_page;
    return 'tags' + params
}
function makeApiParamsUsers(perPage) {
    const per_page = perPage;
    const params = "?per_page=" + per_page;
    return "users" + params;
}

function fetchData(params) {
    return fetch(`https://naokihair.com/wp-json/wp/v2/${params}`);
}

function getTotalPages(response, setTotalPages) {
    const totalPages = Number(response.headers.get("x-wp-totalpages"));
    setTotalPages(totalPages);
}
function wpApiToData(
         response,
         sortData,
         setData,
         getTotalPages,
         setTotalPages
       ) {
         response.then(response => {
           if (getTotalPages) {
             getTotalPages(response, setTotalPages);
           }
           response
             .json()
             .then(data => {
               setData(sortData(data));
             })
             .catch(error => {
               console.log("catch errorだよ " + error);
             });
         });
       }
function sortDataPosts(data) {
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
    return articles
}
function sortDataTags(data) {
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
function sortDataUsers(data) {
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
export function getWpPosts(state, setTotalPages, setArticles) {
    return wpApiToData(
      fetchData(makeApiParamsPosts(state, 6)),
      sortDataPosts,
      setArticles,
      getTotalPages,
      setTotalPages,
    )
}
// tag取得日英に分けてsetTagsに格納
export function getWpTags(setTags) {
        return wpApiToData(
          fetchData(makeApiParamsTags(50)),
          sortDataTags,
          setTags
        );
       }
// userを取得
export function getWpUsers(setAuthors) {
         return wpApiToData(
           fetchData(makeApiParamsUsers(50)),
           sortDataUsers,
           setAuthors
         );
       }