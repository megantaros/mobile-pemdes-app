import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../../App';
import { PRIMARY_COLOR, WARNING_COLOR } from '../../components/style';
import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import Key from '../../assets/icons/key-fill.svg';
import Input from '../../components/Form/Input';
import { useForm } from 'react-hook-form';
import ButtonVariant from '../../components/Form/Button';
import useUpdate from '../../hooks/Auth/useUpdate';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import ModalError from '../../components/Modal/ModalError';
import { IUpdatePassword } from '../../models/model';
import IconSave from '../../assets/icons/disk.svg';
import ScreenHeader from '../../components/Header/ScreenHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'ModalUpdatePassword'>;

const UpdatePass = ({ navigation, route }: Props) => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IUpdatePassword>({
        defaultValues: {
            password: '',
            confirm_password: '',
        },
    });

    const {
        isLoading,
        isModalError,
        isModalSuccess,
        updatePass,
        closeModalError,
        closeModalSuccess,
    } = useUpdate();

    const onSubmit = async (value: IUpdatePassword) => {
        await updatePass({ id_warga: route.params.id_warga, dataPass: value });
    };

    return (
        <LayoutWithoutHeader>
            <ModalSuccess
                isVisible={isModalSuccess.isVisible}
                onPress={() => {
                    navigation.goBack();
                    closeModalSuccess();
                }}
                description={isModalSuccess.description}
            />
            <ModalError
                isVisible={isModalError.isVisible}
                onPress={() => closeModalError()}
                description={isModalError.description}
            />
            <ScreenHeader
                title="Update Password"
                text="Silahkan masukkan password baru anda!"
                body={
                    <View style={styles.form}>
                        <Input
                            name="password"
                            placeholder="Masukkan Password Baru"
                            control={control}
                            rules={{ required: 'Password tidak boleh kosong!' }}
                            errors={errors.password}
                        >
                            <Key width={16} height={16} fill={PRIMARY_COLOR} />
                        </Input>
                        <Input
                            name="confirm_password"
                            placeholder="Masukkan Konfirmasi Password"
                            control={control}
                            rules={{ required: 'Konfirmasi Password tidak boleh kosong!' }}
                            errors={errors.confirm_password}
                        >
                            <Key width={16} height={16} fill={PRIMARY_COLOR} />
                        </Input>
                    </View>
                }
                action={
                    <ButtonVariant
                        title="Simpan"
                        onPress={handleSubmit(onSubmit)}
                        isLoading={isLoading}
                        icon={<IconSave width={16} height={16} fill={'#fff'} />}
                        variant={{ color: '#fff', backgroundColor: WARNING_COLOR }}
                    />
                }
            />
        </LayoutWithoutHeader>
    );
};

const styles = StyleSheet.create({
    form: {
        paddingVertical: 20,
    },
});

export default UpdatePass;
