import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import SecureIcon from '../../assets/icons/shield-lock-fill.svg';
import KeyIcon from '../../assets/icons/key-fill.svg';
import ButtonVariant from '../Form/Button';
import { DANGER_COLOR, PRIMARY_COLOR, SUCCESS_COLOR, WARNING_COLOR, WARNING_COLOR_LIGHT } from '../style';
import Input from '../Form/Input';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../hooks/hooks';
import https from '../../utils/api/http';
import ModalSuccess from './ModalSuccess';

interface Props {
    isVisible: boolean;
    onPress: () => void;
}

const ModalEditPass: FC<Props> = ({ isVisible, onPress }) => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            password: '',
            confirm_password: '',
        },
    });

    const user = useAppSelector(state => state.user);
    const apiClient = https(user.token ? user.token : '');

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

    const onSubmit = async (data: any) => {
        setIsLoading(true);

        await apiClient.put(`user/${user.id_warga}`, {
            password: data.password,
        }).then(res => {
            console.log(res);
            setIsSuccess(true);
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        });
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
            <ModalSuccess
                isVisible={isSuccess}
                onPress={() => setIsSuccess(false)}
                description="Password anda berhasil diubah!"
            />
            <View style={styles.contentModal}>
                <View style={styles.headerModal}>
                    <SecureIcon height={50} width={50} fill={WARNING_COLOR} />
                    <Text style={styles.titleModal}>Ubah Password</Text>
                </View>
                <Input
                    name="password"
                    placeholder="Password"
                    control={control}
                    errors={errors.password}
                    rules={{ required: 'Password tidak boleh kosong!' }}
                >
                    <KeyIcon width={16} height={16} />
                </Input>
                <Input
                    name="confirm_password"
                    placeholder="Konfirmasi Password"
                    control={control}
                    errors={errors.password}
                    rules={{ required: 'Konfirmasi Password tidak boleh kosong!' }}
                >
                    <KeyIcon width={16} height={16} />
                </Input>
                <View style={styles.modalAction}>
                    <ButtonVariant
                        title="Batal"
                        onPress={onPress}
                        variant={{ backgroundColor: DANGER_COLOR, color: '#fff' }}
                    />
                    <ButtonVariant
                        title="Simpan"
                        isLoading={isLoading}
                        onPress={handleSubmit(onSubmit)}
                        variant={{ backgroundColor: SUCCESS_COLOR, color: '#fff' }}
                    />
                </View>
            </View >
        </Modal >
    );
};

const styles = StyleSheet.create({
    contentModal: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        height: '60%',
        gap: 20,
    },
    headerModal: {
        backgroundColor: WARNING_COLOR_LIGHT,
        padding: 15,
        borderRadius: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    titleModal: {
        textAlign: 'center',
        fontFamily: 'Viga-Regular',
        fontSize: 18,
        color: WARNING_COLOR,
    },
    descModal: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: PRIMARY_COLOR,
        textAlign: 'center',
    },
    modalAction: {
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});

export default ModalEditPass;
