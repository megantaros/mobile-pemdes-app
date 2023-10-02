import {configureStore} from '@reduxjs/toolkit';
import userSlice from './user';

export const stores = configureStore({
    reducer: {
        user: userSlice,
    },
});

export type RootState = ReturnType<typeof stores.getState>;

export type AppDispatch = typeof stores.dispatch;
