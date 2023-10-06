import React, { lazy, Suspense } from 'react';
import { View, StyleSheet } from 'react-native';
import Section from '../../components/Section';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import { RootStackParamList } from '../../../App';
import { useAppSelector } from '../../hooks/hooks';
import https from '../../utils/api/http';
import Loading from '../../components/Loading';

type Letter = {
    id_surat_pengajuan?: string;
    id_surat?: string;
    id_warga?: string;
    jenis_surat: string;
    status: string;
    tanggal_pengajuan: string;
};

const ListLetters = lazy(() => import('../../features/ListLetters/ListLetters'));

type Props = NativeStackScreenProps<RootStackParamList, 'StatusLetters'>;

const StatusLetters = ({ navigation }: Props) => {

    const [letters, setLetters] = React.useState<Letter[]>([]);

    const token = useAppSelector(state => state.user.token);
    const apiClient = https(token ? token : '');

    const getLetters = async () => {
        await apiClient.get('surat/permohonan-surat').then((res) => {
            console.log(res.data.data);
            setLetters(res.data.data);
        }).catch((err) => {
            console.log(err.response);
        });
    };

    const handlePress = (id: any, title: string) => {
        switch (title) {
            case 'Surat Pengantar KK':
                navigation.navigate('DetailKk', { id });
                break;
            case 'Surat Pengantar KTP':
                navigation.navigate('DetailKtp', { id });
                break;
            default:
                break;
        }
    };

    React.useEffect(() => {
        getLetters();
    }, []);

    return (
        <LayoutWithoutHeader>
            <View style={styles.container}>
                <Section
                    title="Permohonan Surat"
                    text="Status permohonan surat yang diajukan"
                >
                    <Suspense fallback={<Loading />}>
                        {letters.map((letter, index) => (
                            <ListLetters key={index} {...letter} onPress={() => handlePress(letter.id_surat, letter.jenis_surat)} />
                        ))}
                    </Suspense>
                </Section>
            </View>
        </LayoutWithoutHeader>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: '100%',
    },
});

export default StatusLetters;
