const wpParams = {
    currentPage: 1,
    author: "",
    tag: "",
    isJa: false
}

export function wpParamsReducer(state = wpParams, action) {
         switch (action.type) {
           case "HOME":
             return { ...state, currentPage: 1, author: "", tag: "" };
           case "LATEST":
             return { ...state, currentPage: 1 };
           case "PREV":
             return { ...state, currentPage: state.currentPage - 1 };
           case "NEXT":
             return { ...state, currentPage: state.currentPage + 1 };
           case "OLDEST":
             return { ...state, currentPage: action.payload };
           case "NUM":
             return { ...state, currentPage: action.payload };
           case "TAG":
             return {
               ...state,
               tag: action.payload,
               author: "",
               currentPage: 1
             };
           case "AUTHOR":
             return {
               ...state,
               author: action.payload,
               tag: "",
               currentPage: 1
             };
           case "LANG":
             return {
               ...state,
               isJa: !state.isJa,
               currentPage: 1,
               author: "",
               tag: ""
             };

           default:
             return { ...state };
         }
       }

export const setParamsHome = () => ({
         type: "HOME",
       });
export const setParamsLatest = () => ({
         type: "LATEST"
       });
export const setParamsRrev = () => ({
         type: "PREV"
       });
export const setParamsNext = () => ({
         type: "NEXT"
       });
export const setParamsOldest = () => ({
         type: "OLDEST"
       });
export const setParamsNum = num => ({
         type: "NUM",
         payload: num
       });
export const setParamsTag = tag => ({
         type: "OLDEST",
         payload: tag
       });
export const setParamsAuthor = author => ({
         type: "OLDEST",
         payload: author
       });
export const setParamsLang = () => ({
         type: "LANG"
       });

