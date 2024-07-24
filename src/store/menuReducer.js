const DEFAULT_STATE = {
    menu: "Minuman"
    
};



export const menuReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SET_MAKANAN":
            return { ...state, menu: "Makanan" };
        case "SET_MINUMAN":
            return { ...state, menu: "Minuman" };
        case "SET_CEMILAN":
            return { ...state, menu: "Cemilan" };
        default:
            return state;
    }
};
