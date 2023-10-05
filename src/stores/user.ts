import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id_warga?: string;
    token?: string;
    isLoggedIn?: boolean;
}

const initialState: UserState = {
    id_warga: '',
    token: '',
    isLoggedIn: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.id_warga = action.payload.id_warga;
            state.token = action.payload.token;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
