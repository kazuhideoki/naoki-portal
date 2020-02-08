// import { modifyAtags } from "./modifyAtags";

export function fetchData(state, setArticles, setTotalPages) {
    const per_page = "6"   
    let categories;
    let page  
    let author
    let tag
    let totalPages;

    //  カテゴリーで、35は「ニュース」20は「news」
    if (state.isJa) {
    categories = 35;
    } else {
    categories = 20;
    }

    page = state.currentPage || 1
    author = state.author || ''
    tag = state.tag || ''

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
    fetch(`https://naokihair.com/wp-json/wp/v2/posts${params}`)
    // fetch(`https://azukizawa-salon.com/wp-json/wp/v2/posts${params}`)
    .then(
      function(response) {
        totalPages = Number(response.headers.get("x-wp-totalpages"));
        setTotalPages(totalPages);
        console.log(response.headers);
        

        //    ↓すべての記事数取得
        //  console.log(response.headers.get("x-wp-total"));

        response
          .json()
          .then(data => {
            console.log(data);
            let articles = [];
            data.forEach(index => {

            //    const contentWithouHref = modifyAtags(index.content.rendered);
              articles.push({
                title: index.title.rendered,
                excerpt: index.excerpt.rendered,
                content: index.content.rendered,
                // content: contentWithouHref,
                link: index.link,
                featuredImg: index.jetpack_featured_media_url
              });
            });
            console.log(articles);
            setArticles(articles);
            // return articles
          })
          .catch(error => {
            console.log("catch errorだよ " + error);
            // return error
          });
      }
    );
}