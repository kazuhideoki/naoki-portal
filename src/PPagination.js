import React from 'react'
import { ArticleContext } from "./modules/Store";
import {
    Home,
  FirstPage,
  NavigateBefore,
  NavigateNext,
  LastPage,
  Label,
  Person
} from "@material-ui/icons";

export const PPagination = ({handleClickOpen}) => {
         const articleData = React.useContext(ArticleContext);
         const page = articleData.params.currentPage;

         const home = (
           <Home
             onClick={() => articleData.dispatch({ type: "home" })}
           />
         );
        const tag = <Label onClick={() =>handleClickOpen("tag")} />;

        const author = <Person onClick={() => handleClickOpen("author")} />;
        

         const pageNumber = (
           <>
             【 {page}/{articleData.totalPages} 】
           </>
         );

         let [latest, prev, next, oldest] = "";

        //  ページ数が3より大きい場合latestとoldestを表示
         if (page > 3 && articleData.totalPages > 3) {
           latest = (
             <FirstPage
               onClick={() => articleData.dispatch({ type: "latest" })}
             />
           );
         }
         if (!(page === 1)) {
           prev = (
             <NavigateBefore
               onClick={() => articleData.dispatch({ type: "prev" })}
             />
           );
         }
         if (!(page === articleData.totalPages)) {
           next = (
             <NavigateNext
               onClick={() => articleData.dispatch({ type: "next" })}
             />
           );
         }
         if ( page < articleData.totalPages - 2 && articleData.totalPages > 3) {
           oldest = (
             <LastPage
               onClick={() =>
                 articleData.dispatch({
                   type: "oldest",
                   page: articleData.totalPages
                 })
               }
             />
           );
         }

         const number1 = page - 2;
         const number2 = page - 1;
         const number3 = page;
         const number4 = page + 1;
         const number5 = page + 2;

         const numbers = [number1, number2, number3, number4, number5];

         const displayNumbers = numbers.map(num => {
           if (num <= 0) {
             return "";
           } else if (num > articleData.totalPages) {
             return "";
           } else if (num === page) {
             return <button key={num}>{num}</button>;
           }
           return (
             <button
               key={num}
               onClick={() => articleData.dispatch({ type: "num", page: num })}
             >
               {num}
             </button>
           );
         });

         return (
           <div>
             {home}
             {tag}
             {author}
             {pageNumber}
             {latest}
             {prev}
             {displayNumbers}
             {next}
             {oldest}
           </div>
         );
       };