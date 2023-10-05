import React from 'react';
import { View, StyleSheet } from 'react-native';
import Section from '../../components/Section';
import Input from '../../components/Form/Input';

import PersonSolid from '../../assets/icons/person-fill.svg';
import PersonCard from '../../assets/icons/person-vcard-fill.svg';
import Mobile from '../../assets/icons/phone-fill.svg';
import { PRIMARY_COLOR, WARNING_COLOR } from '../../components/style';
import Select from '../../components/Form/Select';
import ButtonVariant from '../../components/Form/Button';
import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import TextArea from '../../components/Form/TextArea';
import Location from '../../assets/icons/geo-alt-fill.svg';
import Calendar from '../../assets/icons/calendar-event.svg';
import Work from '../../assets/icons/briefcase-fill.svg';
import https from '../../utils/api/http';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../hooks/hooks';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import ModalError from '../../components/Modal/ModalError';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../Routes/RouteAuth';
import EmailIcon from '../../assets/icons/envelope-at-fill.svg';
import ModalEditPass from '../../components/Modal/ModalEditPass';

const sex = [
    {
        value: 'Pria',
        lable: 'Pria',
    },
    {
        value: 'Wanita',
        lable: 'Wanita',
    },
];

const religion = [
    {
        value: 'Islam',
        lable: 'Islam',
    },
    {
        value: 'Kristen',
        lable: 'Kristen',
    },
    {
        value: 'Katholik',
        lable: 'Katholik',
    },
    {
        value: 'Hindhu',
        lable: 'Hindhu',
    },
    {
        value: 'Budha',
        lable: 'Budha',
    },
    {
        value: 'Konghucu',
        lable: 'Konghucu',
    },
];

interface FormData {
    nama_warga: string;
    email: string;
    notelpon: string;
    nik: string;
    ttl: string;
    jenis_kelamin: string;
    pekerjaan: string;
    agama: string;
    alamat: string;
}

interface IModalError {
    isVisible: boolean;
    description: string;
}

interface IModalSuccess {
    isVisible: boolean;
    description: string;
}

type Props = NativeStackScreenProps<AuthStackParamList, 'InfoAccount'>;

const InfoAccount = ({ navigation }: Props) => {

    const initialState: FormData = {
        nama_warga: '',
        email: '',
        notelpon: '',
        nik: '',
        ttl: '',
        jenis_kelamin: '',
        pekerjaan: '',
        agama: '',
        alamat: '',
    };

    const [isModalError, setModalError] = React.useState<IModalError>({
        isVisible: false,
        description: '',
    });

    const [isModalSuccess, setModalSuccess] = React.useState<IModalSuccess>({
        isVisible: false,
        description: '',
    });

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isModalEditPass, setModalEditPass] = React.useState<boolean>(false);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: initialState,
    });

    const user = useAppSelector(state => state.user);

    const apiClient = https(user.token ? user.token : '');
    const getUser = async () => {
        await apiClient.get('/user').then((res) => {

            setValue('nama_warga', res.data.data.nama_warga);
            setValue('email', res.data.data.email);
            setValue('nik', res.data.data.nik);
            setValue('notelpon', res.data.data.notelpon);
            setValue('ttl', res.data.data.ttl);
            setValue('pekerjaan', res.data.data.pekerjaan);
            setValue('jenis_kelamin', res.data.data.jenis_kelamin);
            setValue('agama', res.data.data.agama);
            setValue('alamat', res.data.data.alamat);

        }).catch((err) => {
            console.log(err.response);
        });
    };

    React.useEffect(() => {
        getUser();
    }, []);

    const onSubmit = async (data: any) => {

        setIsLoading(true);

        await apiClient.put(`/user/${user.id_warga}`, data).then((res) => {
            console.log(res.data);
            setModalSuccess({
                isVisible: true,
                description: 'Data berhasil diubah!',
            });
            setIsLoading(false);
        }).catch((err) => {
            console.log(err.response);
            setModalError({
                isVisible: true,
                description: 'Data gagal diubah!',
            });
            setIsLoading(false);
        });

    };


    return (
        <LayoutWithoutHeader>
            <ModalSuccess
                isVisible={isModalSuccess.isVisible}
                onPress={() => {
                    navigation.push('HomeTabs');
                    setModalSuccess({ isVisible: false, description: '' });
                }}
                description={isModalSuccess.description}
            />
            <ModalError
                isVisible={isModalError.isVisible}
                onPress={() => setModalError({ isVisible: false, description: '' })}
                description={isModalError.description}
            />
            <ModalEditPass
                isVisible={isModalEditPass}
                onPress={() => setModalEditPass(false)}
            />
            <View style={styles.container}>
                <Section
                    title="Info Akun"
                    text="Silahkan isi data diri anda dengan benar"
                >
                    <Input
                        name="nama_warga"
                        placeholder="Masukkan nama lengkap"
                        control={control}
                        rules={{ required: 'Nama lengkap tidak boleh kosong' }}
                        errors={errors.nama_warga}
                    >
                        <PersonSolid
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </Input>
                    <Input
                        name="email"
                        placeholder="Masukkan email"
                        control={control}
                        rules={{ required: 'Email tidak boleh kosong' }}
                        errors={errors.email}
                    >
                        <EmailIcon
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </Input>
                    <Input
                        name="nik"
                        placeholder="Masukkan NIK"
                        control={control}
                        rules={{ required: 'NIK tidak boleh kosong' }}
                        errors={errors.nik}
                    >
                        <PersonCard
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </Input>
                    <Input
                        name="notelpon"
                        placeholder="Masukkan Nomor Telephone"
                        control={control}
                        rules={{ required: 'Nomor Telephone tidak boleh kosong' }}
                        errors={errors.notelpon}
                    >
                        <Mobile
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </Input>
                    <Input
                        name="ttl"
                        placeholder="Masukkan Tempat, Tgl Lahir"
                        control={control}
                        rules={{ required: 'Tempat, Tgl Lahir tidak boleh kosong' }}
                        errors={errors.ttl}
                    >
                        <Calendar
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </Input>
                    <Input
                        name="pekerjaan"
                        placeholder="Masukkan pekerjaan"
                        control={control}
                        rules={{ required: 'Pekerjaan tidak boleh kosong' }}
                        errors={errors.pekerjaan}
                    >
                        <Work
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </Input>
                    <Select
                        name="jenis_kelamin"
                        placeholder="Pilih Jenis Kelamin"
                        control={control}
                        data={sex}
                        rules={{ required: 'Jenis Kelamin tidak boleh kosong' }}
                        errors={errors.jenis_kelamin}
                    />
                    <Select
                        name="agama"
                        placeholder="Pilih Agama"
                        control={control}
                        data={religion}
                        rules={{ required: 'Agama tidak boleh kosong' }}
                    />
                    <TextArea
                        name="alamat"
                        placeholder="Masukkan alamat"
                        control={control}
                        rules={{ required: 'Alamat tidak boleh kosong' }}
                        errors={errors.alamat}
                    >
                        <Location
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </TextArea>
                    <ButtonVariant
                        isLoading={isLoading}
                        title="Ubah Password"
                        variant={{ color: '#fff', backgroundColor: WARNING_COLOR }}
                        margin={30}
                        onPress={() => setModalEditPass(true)}
                    />
                    <ButtonVariant
                        isLoading={isLoading}
                        title="Ubah Data"
                        margin={10}
                        onPress={handleSubmit(onSubmit)}
                    />
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

export default InfoAccount;
