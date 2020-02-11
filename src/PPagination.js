import React from 'react'
import { connect } from "react-redux";
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
  totalPages,
  
  setParams,
  setWhichModal,
  openModal
}) => {
  const page = wpParams.currentPage;
  const home = <Home onClick={() => dispatch({ type: "home" })} />;
  const tag = <Label onClick={() => handleClickOpen("tag")} />;

  const author = <Person onClick={() => handleClickOpen("author")} />;

  const pageNumber = (
    <>
      【 {page}/{totalPages} 】
    </>
  );

  let [latest, prev, next, oldest] = "";

  //  ページ数が3より大きい場合latestとoldestを表示
  if (page > 3 && totalPages > 3) {
    latest = <FirstPage onClick={() => dispatch({ type: "latest" })} />;
  }
  if (!(page === 1)) {
    prev = (
      <NavigateBefore onClick={() => articleData.dispatch({ type: "prev" })} />
    );
  }
  if (!(page === articleData.totalPages)) {
    next = (
      <NavigateNext onClick={() => articleData.dispatch({ type: "next" })} />
    );
  }
  if (page < totalPages - 2 && totalPages > 3) {
    oldest = (
      <LastPage
        onClick={() =>
          dispatch({
            type: "oldest",
            page: totalPages
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
    } else if (num > totalPages) {
      return "";
    } else if (num === page) {
      return <button key={num}>{num}</button>;
    }
    return (
      <button key={num} onClick={() => dispatch({ type: "num", page: num })}>
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

const mapStateToProps = state => {
  return {
    wpParams: state.wpParams,
    totalPage: state.appState.totalPage,
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
