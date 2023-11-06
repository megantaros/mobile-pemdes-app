import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import ButtonVariant from '../Form/Button';
import { DANGER_COLOR, GRAY_COLOR, PRIMARY_COLOR, PRIMARY_COLOR_LIGHT, SUCCESS_COLOR } from '../style';
import { useAppSelector } from '../../hooks/hooks';
import https from '../../utils/api/http';
import CommentIcon from '../../assets/icons/comment-alt-dots.svg';
import TextArea from '../Form/TextArea';
import { useForm } from 'react-hook-form';

interface Props {
    id: string;
    isVisible: boolean;
    onPress: () => void;
}

const ModalAddNote: FC<Props> = ({ id, isVisible, onPress }) => {

    const [isLoading, setLoading] = React.useState<boolean>(false);

    const token = useAppSelector(state => state.user.token);
    const apiClient = https(token ? token : '');

    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const getKetWarga = async () => {
        await apiClient.get(`surat/permohonan-surat/${id}/edit`).then((res) => {
            setValue('keterangan_warga', res.data.data.keterangan_warga);
        }).catch((err) => {
            console.log(err.message);
        });
    };

    React.useEffect(() => {
        getKetWarga();
    }, []);

    const onSubmit = async (data: any) => {
        setLoading(true);

        const response = await apiClient.put(`surat/permohonan-surat/${id}`, data);
        if (response.status === 200) {
            setLoading(false);
            onPress();
        }
    };

    return (
        <Modal
            isVisible={isVisible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={500}
            animationOutTiming={500}
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
        >
            <View style={styles.contentModal}>
                <View style={{ padding: 20, backgroundColor: PRIMARY_COLOR_LIGHT, borderRadius: 20, width: '100%', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <CommentIcon height={50} width={50} fill={PRIMARY_COLOR} />
                    <Text style={styles.titleModal}>Tambah Keterangan</Text>
                </View>
                <TextArea
                    name="keterangan_warga"
                    placeholder="Masukkan Keterangan"
                    control={control}
                    rules={{ required: 'Keterangan tidak boleh kosong' }}
                    errors={errors.keterangan_warga}
                >
                    <CommentIcon height={20} width={20} fill={PRIMARY_COLOR} />
                </TextArea>
                <View style={styles.modalAction}>
                    <ButtonVariant title="Batal" onPress={onPress} variant={{ backgroundColor: DANGER_COLOR, color: '#fff' }} />
                    <ButtonVariant title="Tambah" onPress={handleSubmit(onSubmit)} variant={{ backgroundColor: SUCCESS_COLOR, color: '#fff' }} isLoading={isLoading} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    contentModal: {
        flex: 1,
        maxHeight: '60%',
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 10,
    },
    titleModal: {
        fontFamily: 'Viga-Regular',
        fontSize: 14,
        color: PRIMARY_COLOR,
    },
    descModal: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: PRIMARY_COLOR,
        textAlign: 'center',
    },
    modalAction: {
        marginTop: 10,
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});

export default ModalAddNote;
