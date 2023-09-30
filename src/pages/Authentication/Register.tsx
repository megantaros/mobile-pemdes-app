import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Image, ScrollView, StyleSheet, Text } from 'react-native';
import { RootStackParamList } from '../../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderLogo from '../../components/Header/HeaderLogo';
import Input from '../../components/Form/Input';
import { useForm } from 'react-hook-form';
import UserSolid from '../../assets/icons/person-fill.svg';
import EmailIcon from '../../assets/icons/envelope-at-fill.svg';
import KeyIcon from '../../assets/icons/shield-lock-fill.svg';
import ButtonVariant from '../../components/Form/Button';
import { PRIMARY_COLOR } from '../../components/style';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import ModalError from '../../components/Modal/ModalError';

const imgHeaderLogin = require('../../assets/img/header-login.png');
const imgPerangkat_1 = require('../../assets/img/perangkat-desa-1.png');

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen = ({ navigation }: Props) => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nama_warga: '',
            email: '',
            password: '',
            confirm_password: '',
        },
    });

    const onSubmit = (data: Object) => {
        console.log(data);
        setModalVisible(!isModalVisible);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={
                    styles.scroll_view
                }>
                {/* <ModalSuccess
                    isVisible={isModalVisible}
                    onPress={() => setModalVisible(!isModalVisible)}
                    description="Anda telah terdaftar sebagai warga desa Kembaran"
                /> */}
                <ModalError
                    isVisible={isModalVisible}
                    onPress={() => setModalVisible(!isModalVisible)}
                    description="Email sudah terdaftar!"
                />
                <View style={styles.container_header}>
                    <Image source={imgHeaderLogin} style={styles.bg_header} />
                    <View style={styles.container_header_logo}>
                        <View style={
                            styles.row
                        }>
                            <HeaderLogo title="Selamat Datang" description="di Portal Pelayanan Administrasi Pemdes Kembaran" />
                        </View>
                        <View style={styles.img_asn}>
                            <Image source={imgPerangkat_1} style={styles.img_header} />
                        </View>
                    </View>
                </View>
                <View style={styles.container_body}>
                    <Input
                        placeholder="Nama Lengkap"
                        control={control}
                        name="nama_warga"
                        rules={{ required: 'Nama Lengkap tidak boleh kosong!' }}
                        errors={errors.nama_warga}
                    >
                        <UserSolid width={16} height={16} />
                    </Input>
                    <Input
                        placeholder="Email"
                        control={control}
                        name="email"
                        rules={{ required: 'Email tidak boleh kosong!' }}
                        errors={errors.email}
                    >
                        <EmailIcon width={16} height={16} />
                    </Input>
                    <Input
                        placeholder="Password"
                        control={control}
                        name="password"
                        errors={errors.password}
                        rules={{ required: 'Password tidak boleh kosong!' }}
                    >
                        <KeyIcon width={16} height={16} />
                    </Input>
                    <Input
                        placeholder="Konfirmasi Password"
                        control={control}
                        name="confirm_password"
                        errors={errors.confirm_password}
                        rules={{ required: 'Konfirmasi Password tidak boleh kosong!' }}
                    >
                        <KeyIcon width={16} height={16} />
                    </Input>
                    <ButtonVariant
                        variant={{ color: '#fff', backgroundColor: PRIMARY_COLOR }}
                        title="Daftar Akun"
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
                <View
                    style={styles.footer}
                >
                    <Text
                        style={styles.footer_text}
                    >
                        Sudah punya akun?
                    </Text>
                    <Text
                        style={styles.footer_link}
                        onPress={() => navigation.push('Login')}
                    >
                        Login
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    container_header: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        maxHeight: 270,
        width: '100%',
    },
    scroll_view: {
        flex: 1,
        width: '100%',
    },
    img_asn: {
        flex: 3,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    row: {
        flex: 1,
    },
    bg_header: {
        maxHeight: 260,
        resizeMode: 'contain',
        width: '100%',
    },
    container_header_logo: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'column',
        padding: 19,
    },
    img_header: {
        height: 160,
        resizeMode: 'cover',
        maxWidth: 240,
    },
    container_body: {
        flex: 1,
        width: '100%',
        padding: 19,
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        padding: 19,
    },
    footer_text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
        color: '#3b3c3d',
    },
    footer_link: {
        fontFamily: 'Viga-Regular',
        fontSize: 10,
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
    },
});


export default RegisterScreen;
