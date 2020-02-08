export function fetchDataUsers(setAuthors) {
  const per_page = "100";
//   let categories;
//   let page;
//   let author;
//   let tag;
//   let totalPages;

//   //  カテゴリーで、35は「ニュース」20は「news」
//   if (state.isJa) {
//     categories = 35;
//   } else {
//     categories = 20;
//   }

//   page = state.currentPage || 1;
//   author = state.author || "";
//   tag = state.tag || "";

  const params =
    "?per_page=" +
    per_page
    //  +
    // "&categories=" +
    // categories +
    // "&page=" +
    // page +
    // "&author=" +
    // author +
    // "&tags=" +
    // tag;

  console.log(params);
  fetch(`https://naokihair.com/wp-json/wp/v2/users${params}`)
    // fetch(`https://azukizawa-salon.com/wp-json/wp/v2/posts${params}`)
    .then(function(response) {
    //   totalPages = Number(response.headers.get("x-wp-totalpages"));
    //   setTotalPages(totalPages);

      //    ↓すべての記事数取得
      //  console.log(response.headers.get("x-wp-total"));

      response
        .json()
        .then(data => {
          console.log(data);
          let authors = [];
          data.forEach(index => {
            authors.push({
              name: index.name,
              id: index.id,
              img: index.avatar_urls['96'],
            });
          });
          console.log(authors);
          setAuthors(authors);
        })
        .catch(error => {
          console.log("catch errorだよ " + error);
        });
    });
}
