const actionTypes = {
    UPDATE_TIME_SINCE_LOGIN: 'UPDATE_TIME_SINCE_LOGIN'
  };
  
  const initialState = {
    timeSinceLogin: 0
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.UPDATE_TIME_SINCE_LOGIN:
        return {
          ...state,
          timeSinceLogin: state.timeSinceLogin + 1,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  