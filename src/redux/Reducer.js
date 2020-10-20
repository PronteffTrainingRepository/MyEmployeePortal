const initialState = {
  Token: false,
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("ajfdajl", action.payload);
      return {
        ...state,
        Token: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        Token: false,
      };

    default:
      return state;
  }
};
