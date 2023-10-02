import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id_warga: string;
    nama_warga: string;
    email: string;
    notelpon?: string;
    nik?: string;
    ttl?: string;
    jenis_kelamin?: string;
    pekerjaan?: string;
    agama?: string;
    alamat?: string;
    token?: string;
    isLoggedIn?: boolean;
}

const initialState: UserState = {
    id_warga: '',
    nama_warga: '',
    email: '',
    notelpon: '',
    nik: '',
    ttl: '',
    jenis_kelamin: '',
    pekerjaan: '',
    agama: '',
    alamat: '',
    token: '',
    isLoggedIn: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.id_warga = action.payload.id_warga;
            state.nama_warga = action.payload.nama_warga;
            state.email = action.payload.email;
            state.notelpon = action.payload.notelpon;
            state.nik = action.payload.nik;
            state.ttl = action.payload.ttl;
            state.jenis_kelamin = action.payload.jenis_kelamin;
            state.pekerjaan = action.payload.pekerjaan;
            state.agama = action.payload.agama;
            state.alamat = action.payload.alamat;
            state.token = action.payload.token;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
