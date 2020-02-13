export function wpDataReducer(state, action) {
         switch (action.type) {
           case "SET_ARTICLES":
             return { ...state, articles: action.payload }
           case "SET_TAGS":
             return { ...state, tags: action.payload };
           case "SET_USERS":
             return { ...state, users: action.payload };
           default:
               console.log("エラーだよ,wpDataReducer");
               
             return { ...state }
         }
       }
