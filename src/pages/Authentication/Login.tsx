import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Image, ScrollView, StyleSheet, Text } from 'react-native';
import { RootStackParamList } from '../../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderLogo from '../../components/Header/HeaderLogo';
import Input from '../../components/Form/Input';
import { useForm } from 'react-hook-form';
import EmailIcon from '../../assets/icons/envelope-at-fill.svg';
import KeyIcon from '../../assets/icons/shield-lock-fill.svg';
import ButtonVariant from '../../components/Form/Button';
import { PRIMARY_COLOR } from '../../components/style';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import ModalError from '../../components/Modal/ModalError';
import https from '../../utils/api/http';
import { useAppDispatch } from '../../hooks/hooks';
import { setUser } from '../../stores/user';

const imgHeaderLogin = require('../../assets/img/header-register.png');
const imgPerangkat_2 = require('../../assets/img/perangkat-desa-2.png');

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

interface IModalError {
    isVisible: boolean;
    description: string;
}

interface IModalSuccess {
    isVisible: boolean;
    description: string;
}

const LoginScreen = ({ navigation }: Props) => {

    const [isModalError, setModalError] = React.useState<IModalError>({
        isVisible: false,
        description: '',
    });

    const [isModalSuccess, setModalSuccess] = React.useState<IModalSuccess>({
        isVisible: false,
        description: '',
    });

    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const apiClient = https('');

    const onSubmit = async (data: any) => {

        navigation.push('AuthRoutes');
        // setIsLoading(true);

        // await apiClient.post('/login', {
        //     email: data.email,
        //     password: data.password,
        // }).then((res) => {
        //     // console.log(res.data.data);
        //     // console.log(res.data.access_token);
        //     dispatch(setUser({
        //         id_warga: res.data.data.id_warga,
        //         isLoggedIn: true,
        //         token: res.data.access_token,
        //     },
        //     ));
        //     setModalSuccess({
        //         isVisible: true,
        //         description: 'Anda berhasil login!',
        //     });
        //     setIsLoading(false);
        // }).catch((err) => {
        //     console.log(err.response.data);
        //     setModalError({
        //         isVisible: true,
        //         description: 'Email atau Password Salah!',
        //     });
        //     setIsLoading(false);
        // });

    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={
                    styles.scroll_view
                }>
                <ModalSuccess
                    isVisible={isModalSuccess.isVisible}
                    onPress={() => {
                        setModalSuccess({ isVisible: false, description: '' });
                        navigation.push('AuthRoutes');
                    }}
                    description={isModalSuccess.description}
                />
                <ModalError
                    isVisible={isModalError.isVisible}
                    onPress={() => setModalError({ isVisible: false, description: '' })}
                    description={isModalError.description}
                />
                <View style={styles.container_header}>
                    <Image source={imgHeaderLogin} style={styles.bg_header} />
                    <View style={styles.container_header_logo}>
                        <View style={
                            styles.row
                        }>
                            <HeaderLogo title="Selamat Datang Kembali" description="di Portal Pelayanan Administrasi Pemdes Kembaran" />
                        </View>
                        <View style={styles.img_asn}>
                            <Image source={imgPerangkat_2} style={styles.img_header} />
                        </View>
                    </View>
                </View>
                <View style={styles.container_body}>
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
                    <ButtonVariant
                        margin={30}
                        variant={{ color: '#fff', backgroundColor: PRIMARY_COLOR }}
                        title="Login"
                        isLoading={isLoading}
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
                <View
                    style={styles.footer}
                >
                    <Text
                        style={styles.footer_text}
                    >
                        Belum punya akun?
                    </Text>
                    <Text
                        style={styles.footer_link}
                        onPress={() => navigation.push('Register')}
                    >
                        Daftar
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
        right: 50,
        bottom: -1,
        flexDirection: 'column',
        padding: 19,
        overflow: 'hidden',
    },
    img_header: {
        height: 160,
        resizeMode: 'cover',
        maxWidth: 200,
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


export default LoginScreen;
