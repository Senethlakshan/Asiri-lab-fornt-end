import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UserState {
  userID: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  userID: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set the user ID
    setUserID: (state, action: PayloadAction<string>) => {
      state.userID = action.payload;
    },
    // Action to clear the user ID (for logout)
    clearUserID: (state) => {
      state.userID = null;
    },
  },
});

export const { setUserID, clearUserID } = userSlice.actions;

export default userSlice.reducer;


