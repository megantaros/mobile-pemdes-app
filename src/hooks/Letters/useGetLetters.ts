import { useState, useEffect } from 'react';
import { ILetters } from '../../models/model';
import https from '../../utils/api/http';
import { useAppSelector } from '../hooks';

export default function useGetLetters() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<ILetters[]>([]);
    const token = useAppSelector(state => state.user.token);
    const apiClient = https(token ? token : '');

    const fetchLetters = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.get('surat/permohonan-surat');
            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLetters();
    }, []);

  return {
    data, isLoading,
  };
}
