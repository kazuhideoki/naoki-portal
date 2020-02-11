import React from 'react'
import { connect } from "react-redux";
import { store } from "./index";
import { setArticles } from "./reducers/wpSetDataReducer";
import * as setParams from "./reducers/wpParamsReducer";
import { setWhichModal, openModal } from "./reducers/appStateReducer";
import {
    Home,
  FirstPage,
  NavigateBefore,
  NavigateNext,
  LastPage,
  Label,
  Person
} from "@material-ui/icons";

const PPagination = ({
  wpParams,
  totalPage,
  articles,
}) => {
  const page = wpParams.currentPage;
//   const home = <Home onClick={} />;
//   const tag = <Label onClick={() => handleClickOpen("tag")} />;

//   const author = <Person onClick={() => handleClickOpen("author")} />;

  const pageNumber = (
    <>
      【 {page}/{totalPage} 】
    </>
  );

//   let [latest, prev, next, oldest] = "";
    let oldest

//   //  ページ数が3より大きい場合latestとoldestを表示
//   if (page > 3 && totalPages > 3) {
//     latest = <FirstPage onClick={() => dispatch({ type: "latest" })} />;
//   }
//   if (!(page === 1)) {
//     prev = (
//       <NavigateBefore onClick={() => articleData.dispatch({ type: "prev" })} />
//     );
//   }
//   if (!(page === articleData.totalPages)) {
//     next = (
//       <NavigateNext onClick={() => articleData.dispatch({ type: "next" })} />
//     );
//   }
  if (page < totalPage - 2 && totalPage > 3) {
      const onClick = () => {
          store.dispatch(setParams.setParamsOldest())
          store.dispatch(setArticles(articles));
      }
    oldest = <LastPage onClick={onClick} />;
  }

//   const number1 = page - 2;
//   const number2 = page - 1;
//   const number3 = page;
//   const number4 = page + 1;
//   const number5 = page + 2;

//   const numbers = [number1, number2, number3, number4, number5];

//   const displayNumbers = numbers.map(num => {
//     if (num <= 0) {
//       return "";
//     } else if (num > totalPages) {
//       return "";
//     } else if (num === page) {
//       return <button key={num}>{num}</button>;
//     }
//     return (
//       <button key={num} onClick={() => dispatch({ type: "num", page: num })}>
//         {num}
//       </button>
//     );
//   });

  return (
    <div id='p_pagination'>
      {/* {home} */}
      {/* {tag} */}
      {/* {author} */}
      {pageNumber}
      {/* {latest}
      {prev}
      {displayNumbers}
      {next} */}
      {oldest}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    wpParams: state.wpParamsReducer,
    totalPage: state.appStateReducer.totalPage,
    articles: state.wpSetDataReducer.articles
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setParams,
    setWhichModal,
    openModal
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PPagination);
