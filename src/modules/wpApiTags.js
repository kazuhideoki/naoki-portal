export function fetchDataTags(setTags) {
         const per_page = "50";


         const params = "?per_page=" + per_page;

         fetch(`https://naokihair.com/wp-json/wp/v2/tags${params}`)
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
                console.log(tagsEn);
                
                setTags({ tagsJa: tagsJa, tagsEn: tagsEn });
               })
               .catch(error => {
                 console.log("catch errorだよ " + error);
               });
           });
       }
