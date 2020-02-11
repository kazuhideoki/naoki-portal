const appState = {
    totalPage: 1,
    showWhichArticle: 0,
    isArticleOpen: false,
    showWhichModal: 'magazines',
    isModalOpen: false,
}

export function appStateReducer(state = appState, action) {
    switch (action.type) {
      case "SET_TOTAL_PAGE":
        return { ...state, totalPage: action.payload };
      case "SET_WHICH_ARTICLE":
        return { ...state, showWhichArticle: action.payload };
      case "OPEN_ARTICLE":
        return { ...state, isArticleOpen: true };
      case "CLOSE_ARTICLE":
        return { ...state, isArticleOpen: false };
      case "SET_WHICH_MODAL":
        return { ...state, showWhichModal: action.payload };
      case "OPEN_MODAL":
        return { ...state, isModalOpen: true };
      case "CLOSE_MODAL":
        return { ...state, isModalOpen: false };

      default:
        return { ...state };
    }
}

export const setTotalPage = num => ({
    type: "SET_TOTAL_PAGE",
    payload: num
})
export const setWitchArticle = num => ({
    type: "SET_WHICH_ARTICLE",
    payload: num
})
export const openArticle = () => ({
    type: "OPEN_ARTICLE"
})
export const closeArticle = () => ({
    type: "CLOSE_ARTICLE"
})
export const setWhichModal = num => ({
    type: "SET_WHICH_MODAL",
    payload: num
})
export const openModal = () => ({
    type: "OPEN_MODAL"
})
export const closeModal = () => ({
    type: "CLOSE_MODAL"
})