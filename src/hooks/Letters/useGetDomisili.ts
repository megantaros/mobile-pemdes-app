import React from 'react';
import { useAppSelector } from '../hooks';
import https from '../../utils/api/http';

const useGetDomisili = (id_permohonan_surat: string) => {

    const [data, setData] = React.useState<any>(null);
    const token = useAppSelector(state => state.user.token);
    const apiClient = https(token ? token : '');

    const fetchDomisili = async (id: string) => {
        try {
            const response = await apiClient.get(`surat/permohonan-domisili/${id}/edit`);
            setData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        fetchDomisili(id_permohonan_surat);
    }, [id_permohonan_surat]);

  return {
    data,
  };
};

export default useGetDomisili;
