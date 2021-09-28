//reducer function
export const reducer = (state, action) => {
  // console.log(state, action);
  if (action.type === "GENDER_FILTER") {
    //gender selection - all
    if (action.value === 0) {
      return {
        ...state,
        actors: [...state.filteredData],
      };
    }
    //gender selection - male
    else if (action.value === 1) {
      const newList = state.filteredData.filter(
        (actor) => actor.gender === "male"
      );
      return {
        ...state,
        actors: newList,
      };
    }
    //gener selection - female
    else if (action.value === 2) {
      const newList = state.filteredData.filter(
        (actor) => actor.gender === "female"
      );
      return {
        ...state,
        actors: newList,
      };
    }
  }
  //no dispatch match
  throw new Error("no matching type found");
};
