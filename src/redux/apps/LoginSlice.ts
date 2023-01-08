import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store'

export interface LoginState {
  dataLogin:{
    isLogin: boolean;
    token: string;
    username: string;
    name: string;
    profilePicture: string;
    email: string;
    value:number;
    darkMode:string;
  },
  darkMode:string;
}

const initialState: LoginState = {
  dataLogin: {
    isLogin: true,
    token:'',
    username: '',
    name: '',
    profilePicture: '',
    email: '',
    value: 0,
    darkMode: 'light'
  },
  darkMode: 'light',
};

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setDataLogin: (state, action: PayloadAction<any>): void => {
      // state.isLogin = action.payload;
      // state.username = action.payload;
      // state.profilePicture = action.payload;
      state.dataLogin=action.payload
    },
    logout: (state) => {
      state.dataLogin.isLogin = false;
      state.dataLogin.username = '';
      state.dataLogin.profilePicture = '';
    },
    changeDarkMode: (state,action: PayloadAction<any>): void =>{
      state.darkMode = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setDataLogin,changeDarkMode, logout } = LoginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.login


export default LoginSlice.reducer;