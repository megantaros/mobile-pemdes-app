import { useState } from 'react';
import { IModalError, IModalSuccess, IRegister } from '../../models/model';
import https from '../../utils/api/http';

export default function useRegister() {

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

    const register = async (data: IRegister) => {
        setIsLoading(true);

        try {
            if (data.password !== data.confirm_password) {
                setModalError({ isVisible: true, description: 'Password tidak sama!' });
            } else {
                const res = await apiClient.post('register', {
                    nama_warga: data.nama_warga,
                    email: data.email,
                    password: data.password,
                });
                setModalSuccess({
                    isVisible: true,
                    description: res.data.message,
                });
            }
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
        register,
        closeModalError,
        closeModalSuccess,
    };
}
