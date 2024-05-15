import { createSlice, createAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user?: User;
}

interface User {
  username: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
};

export const login = createAction<User>("auth/login");
export const logout = createAction("auth/logout");

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: ReturnType<typeof login>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = undefined;
      localStorage.clear();
      sessionStorage.clear();//incase in future if we store data in session.
    },
  },
});

export default authSlice.reducer;
