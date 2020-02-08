export function reducer(state, action) {
switch (action.type) {
    case "home":
        return {...state, currentPage: 1, author: "", tag: "" };
    case "latest":
        return { ...state, currentPage: 1 };
    case "prev":
        return { ...state, currentPage: state.currentPage - 1 };
    case "next":
        return { ...state, currentPage: state.currentPage + 1 };
    case "oldest":
        return { ...state, currentPage: action.page };
    case "num":
        return { ...state, currentPage: action.page };
    case "tag":
        return { ...state, tag: action.payload, author: '', currentPage: 1 };
    case "author":
        return { ...state, author: action.payload, tag: '', currentPage: 1 };
    case "lang":
        return {
          ...state,
          isJa: !state.isJa,
          currentPage: 1,
          author: "",
          tag: ""
        };

    default:
    throw new Error();
}
}

