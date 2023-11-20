import React, { lazy, Suspense } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Section from '../../components/Section';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import Loading from '../../components/Loading';
import { RootStackParamList } from '../../../App';
import useGetLetters from '../../hooks/Letters/useGetLetters';
import ModalConfirm from '../../components/Modal/ModalConfirm';
import { useAppSelector } from '../../hooks/hooks';
import https from '../../utils/api/http';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import { IModalConfirm, IModalError, IModalSuccess } from '../../models/model';
import ModalError from '../../components/Modal/ModalError';
import { DANGER_COLOR } from '../../components/style';

const ListLetters = lazy(() => import('../../features/ListLetters/ListLetters'));

type Props = NativeStackScreenProps<RootStackParamList, 'Letters'>;

const Letters = ({ navigation }: Props) => {

    const { data, isLoading } = useGetLetters();

    const handlePress = (id: string, title: string) => {
        switch (title) {
            case 'Surat Pengantar KK':
                navigation.push('DetailKk', { id });
                break;
            case 'Surat Pengantar KTP':
                navigation.push('DetailKtp', { id });
                break;
            case 'Surat Keterangan Domisili':
                navigation.push('DetailDomisili', { id });
                break;
            case 'Surat Pengantar SKCK':
                navigation.push('DetailSkck', { id });
                break;
            case 'Surat Keterangan Usaha':
                navigation.push('DetailUsaha', { id });
                break;
            default:
                break;
        }
    };

    const [modalSuccess, setModalSuccess] = React.useState<IModalSuccess>({
        isVisible: false,
        description: '',
    });
    const [modalError, setModalError] = React.useState<IModalError>({
        isVisible: false,
        description: '',
    });
    const [modalConfirm, setModalConfirm] = React.useState<IModalConfirm>({
        isVisible: false,
        isLoading: false,
    });
    const [idPermohonanSurat, setIdPermohonanSurat] = React.useState<string>('');
    const handleDestroy = (id: string) => {
        setModalConfirm({
            isVisible: true,
            isLoading: false,
        });
        setIdPermohonanSurat(id);
    };

    const token = useAppSelector(state => state.user.token);
    const apiClient = https(token ? token : '');

    const onDestroy = async () => {
        setModalConfirm({
            isVisible: true,
            isLoading: true,
        });
        try {
            const res = await apiClient.delete(`surat/permohonan-surat/${idPermohonanSurat}`);
            if (res.data.status === 'success') {
                setModalConfirm({
                    isVisible: false,
                    isLoading: false,
                });
                setModalSuccess({
                    isVisible: true,
                    description: res.data.message,
                });
                navigation.push('Letters');
                return;
            } else {
                setModalConfirm({
                    isVisible: false,
                    isLoading: false,
                });
                setModalError({
                    isVisible: true,
                    description: res.data.message,
                });
                return;
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <LayoutWithoutHeader>
            <ModalSuccess
                isVisible={modalSuccess.isVisible}
                description={modalSuccess.description}
                onPress={() => {
                    setModalSuccess({ isVisible: false, description: '' });
                }}
            />
            <ModalError
                isVisible={modalError.isVisible}
                description={modalError.description}
                onPress={() => setModalError({ isVisible: false, description: '' })}
            />
            <ModalConfirm
                isVisible={modalConfirm.isVisible}
                description="Apakah anda yakin ingin menghapus surat?"
                onCancle={() => setModalConfirm({ isVisible: false, isLoading: false })}
                onConfirm={onDestroy}
                isLoading={modalConfirm.isLoading}
            />
            {isLoading && <Loading />}
            <View style={styles.container}>
                <Section
                    title="Permohonan Surat"
                    text="Status permohonan surat yang diajukan"
                >
                    <Suspense fallback={<Loading />}>
                        {data.length === 0 && <Text style={styles.textEmpty}>Tidak ada data surat...</Text>}
                        {data.map((letter, index) => (
                            <ListLetters
                                key={index}
                                {...letter}
                                onPress={() => handlePress(letter.id_permohonan_surat, letter.jenis_surat)}
                                onDestroy={() => handleDestroy(letter.id_permohonan_surat)}
                            />
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
    textEmpty: {
        fontFamily: 'Viga-Regular',
        fontSize: 16,
        color: DANGER_COLOR,
        marginTop: 100,
    },
});

export default Letters;
