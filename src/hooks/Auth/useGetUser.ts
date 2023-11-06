import { useEffect, useState} from 'react';
import { IUser } from '../../models/model';
import https from '../../utils/api/http';
import { useAppSelector } from '../hooks';

const initialState: IUser = {
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
    access_token: '',
};

export default function useGetUser() {

    const [user, setUser] = useState<IUser>(initialState);
    const [loading, setLoading] = useState<boolean>(false);

    const token: any = useAppSelector(state => state.user.token);

    const getUser = async () => {
        setLoading(true);

        const apiClient = https(token ? token : '');
        try {
            const res = await apiClient.get('user');
            if (res.data.message === 'success') {
                setUser({
                    id_warga: res.data.data.id_warga,
                    nama_warga: res.data.data.nama_warga,
                    email: res.data.data.email,
                    notelpon: res.data.data.notelpon,
                    nik: res.data.data.nik,
                    ttl: res.data.data.ttl,
                    jenis_kelamin: res.data.data.jenis_kelamin,
                    pekerjaan: res.data.data.pekerjaan,
                    agama: res.data.data.agama,
                    alamat: res.data.data.alamat,
                    access_token: token,
                });
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return {
        data: user,
        loading,
    };
}
