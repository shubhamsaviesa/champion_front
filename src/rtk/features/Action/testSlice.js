import { createSlice } from "@reduxjs/toolkit";

export const initialStateValue = {
  singleId: "",
  multipleId: "",
};
console.log("test ids", initialStateValue.singleId);
console.log("multiple", initialStateValue.multipleId);

export const theStore = createSlice({
  name: "theStore",
  initialState: { value: initialStateValue },
  reducers: {
    getData: (state, action) => {
      state.value.singleId = action.payload;
    },
    getMultipleId: (state, action) => {
      state.value.multipleId.push(action.payload);
    },
  },
});

// console.log("singleId",singleId)

export const { getData, getMultipleId } = theStore.actions;
export default theStore.reducer;
