import { useState } from 'react';
import { IModalError, IModalSuccess, IUpdatePassword, IUpdateProfile } from '../../models/model';
import https from '../../utils/api/http';
import { useAppSelector } from '../hooks';

type Props = {
    data?: IUpdateProfile,
    dataPass?: IUpdatePassword,
    id_warga: string,
}

export const sex = [
    {
        value: 'Pria',
        lable: 'Pria',
    },
    {
        value: 'Wanita',
        lable: 'Wanita',
    },
];

export const religion = [
    {
        value: 'Islam',
        lable: 'Islam',
    },
    {
        value: 'Kristen',
        lable: 'Kristen',
    },
    {
        value: 'Katholik',
        lable: 'Katholik',
    },
    {
        value: 'Hindhu',
        lable: 'Hindhu',
    },
    {
        value: 'Budha',
        lable: 'Budha',
    },
    {
        value: 'Konghucu',
        lable: 'Konghucu',
    },
];

export const initialStateUpdateProfile: IUpdateProfile = {
    nama_warga: '',
    email: '',
    notelpon: '',
    nik: '',
    ttl: '',
    jenis_kelamin: '',
    pekerjaan: '',
    agama: '',
    alamat: '',
};

export default function useUpdate() {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isModalError, setModalError] = useState<IModalError>({
        isVisible: false,
        description: '',
    });

    const [isModalSuccess, setModalSuccess] = useState<IModalSuccess>({
        isVisible: false,
        description: '',
    });

    const token = useAppSelector(state => state.user.token);
    const apiClient = https(token ? token : '');

    const update = async ({id_warga, data}: Props) => {
        setIsLoading(true);
        try {
            await apiClient.put(`user/${id_warga}`, data);
            setModalSuccess({
                isVisible: true,
                description: 'Anda berhasil merubah data!',
            });
        } catch (err) {
            setModalError({
                isVisible: true,
                description: 'Koneksi bermasalah!',
            });
        }
        setIsLoading(false);
    };

    const updatePass = async ({id_warga, dataPass}: Props) => {
        setIsLoading(true);
        try {
            if (dataPass?.password !== dataPass?.confirm_password) {
                setModalError({
                    isVisible: true,
                    description: 'Password tidak sama!',
                });
            } else {
                await apiClient.put(`user/${id_warga}`, {
                    password: dataPass?.password,
                });
                setModalSuccess({
                    isVisible: true,
                    description: 'Anda berhasil merubah password!',
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
        update,
        updatePass,
        closeModalError,
        closeModalSuccess,
    };
}
