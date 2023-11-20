import { useState } from 'react';
import { ILogin, IModalError, IModalSuccess } from '../../models/model';
import https from '../../utils/api/http';
import { useAppDispatch } from '../hooks';
import { setUser } from '../../stores/user';

export default function useLogin() {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isModalError, setModalError] = useState<IModalError>({
        isVisible: false,
        description: '',
    });

    const [isModalSuccess, setModalSuccess] = useState<IModalSuccess>({
        isVisible: false,
        description: '',
    });

    const apiClient = https('');
    const dispatch = useAppDispatch();

    const login = async (form: ILogin) => {
        setIsLoading(true);
        try {
            const res = await apiClient.post('login', form);
            setModalSuccess({
                isVisible: true,
                description: 'Anda berhasil login!',
            });
            dispatch(setUser({
                id_warga: res.data.data.id_warga,
                token: res.data.access_token,
                isLoggedIn: true,
            }));
        } catch (err) {
            setModalError({
                isVisible: true,
                description: 'Koneksi bermasalah!',
            });
        }
        setIsLoading(false);
    };

    const closeModalError = () => {
        setModalError({
            isVisible: false,
            description: '',
        });
    };

    const closeModalSuccess = () => {
        setModalSuccess({
            isVisible: false,
            description: '',
        });
    };

    return {
        isLoading,
        isModalError,
        isModalSuccess,
        login,
        closeModalError,
        closeModalSuccess,
    };
}
