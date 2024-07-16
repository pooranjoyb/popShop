import { createSlice, createAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user?: User;
}

interface User {
  username: string;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  isAdmin: false,
  user: undefined,
};

export const login = createAction<User>("auth/login");
export const logout = createAction("auth/logout");


const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action: ReturnType<typeof login>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = undefined;
      localStorage.clear();
      sessionStorage.clear();
    },
    adminLoggedIn(state, action: ReturnType<typeof login>) {
      state.isAuthenticated = false;
      state.isAdmin = true;
      state.user = action.payload
    }
  },
});


export const { login: userLogin, logout: userLogout, adminLoggedIn: adminLoggedIn } = authSlice.actions;

export default authSlice.reducer;
