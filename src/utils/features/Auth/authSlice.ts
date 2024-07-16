import { createSlice, createAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user?: User;
}

interface AdminAuthState {
  isAdminAuthenticated: boolean;
  admin?: Admin;
}

interface User {
  username: string;
}

interface Admin {
  username: string;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: undefined,
};

const initialAdminAuthState: AdminAuthState = {
  isAdminAuthenticated: false,
  admin: undefined,
};

export const login = createAction<User>("auth/login");
export const logout = createAction("auth/logout");

export const adminLogin = createAction<Admin>("admin/login");
export const adminLogout = createAction("admin/logout");

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
  },
});

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: initialAdminAuthState,
  reducers: {
    adminLogin(state, action: ReturnType<typeof adminLogin>) {
      state.isAdminAuthenticated = true;
      state.admin = action.payload;
    },
    adminLogout(state) {
      state.isAdminAuthenticated = false;
      state.admin = undefined;
      localStorage.clear();
      sessionStorage.clear();
    },
  },
});

export const { login: userLogin, logout: userLogout } = authSlice.actions;
export const { adminLogin: adminUserLogin, adminLogout: adminUserLogout } = adminAuthSlice.actions;

export const authReducer = authSlice.reducer;
export const adminAuthReducer = adminAuthSlice.reducer;
