import React from 'react';
import { View, StyleSheet } from 'react-native';
import Layout from '../../components/Layout/Layout';
import Section from '../../components/Section';
import { useForm } from 'react-hook-form';

import PersonSolid from '../../assets/icons/person-fill.svg';
import PersonCard from '../../assets/icons/person-vcard-fill.svg';
import Mobile from '../../assets/icons/phone-fill.svg';
import { PRIMARY_COLOR } from '../../components/style';
import Select from '../../components/Form/Select';
import ButtonVariant from '../../components/Form/Button';
import { useAppSelector } from '../../hooks/hooks';
import Input from '../../components/Form/Input';
import https from '../../utils/api/http';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../Routes/RouteAuth';

const letters = [
    { value: 'Surat Pengantar KK', lable: 'Surat Pengantar KK' },
    { value: 'Surat Pengantar KTP', lable: 'Surat Pengantar KTP' },
    { value: 'Surat Pengantar SKCK', lable: 'Surat Pengantar SKCK' },
    { value: 'Surat Keterangan Domisili', lable: 'Surat Keterangan Domisili' },
    { value: 'Surat Keterangan Usaha', lable: 'Surat Keterangan Usaha' },
    { value: 'Surat Keterangan Pindah', lable: 'Surat Keterangan Pindah' },
    { value: 'Surat Keterangan Datang', lable: 'Surat Keterangan Datang' },
];

type Props = NativeStackScreenProps<AuthStackParamList, 'HomeTabs'>;

const ServiceScreen = ({ navigation }: Props) => {

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nama_warga: '',
            nik: '',
            notelpon: '',
            jenis_surat: '',
        },
    });

    const token = useAppSelector((state) => state.user.token);
    const apiClient = https(token ? token : '');

    const getUser = async () => {
        const response = await apiClient.get('/user');
        const { data } = response.data;
        setValue('nama_warga', data.nama_warga);
        setValue('nik', data.nik);
        setValue('notelpon', data.notelpon);
    };

    React.useEffect(() => {
        getUser();
    }, []);

    const onSubmit = async (data: any) => {
        console.log(data);

        switch (data.jenis_surat) {
            case 'Surat Pengantar KK':
                navigation.navigate('FormKk');
                break;
            case 'Surat Pengantar KTP':
                navigation.navigate('FormKtp');
                break;
            default:
                break;
        }
    };

    return (
        <Layout>
            <View style={styles.container}>
                <Section
                    title="Permohonan Surat"
                    text="Isi form dibawah ini untuk membuat permohonan surat"
                >
                    <Input
                        disabled={true}
                        name="nama_warga"
                        placeholder="Masukkan nama lengkap"
                        control={control}
                        rules={{ required: 'Nama tidak boleh kosong!' }}
                        errors={errors.nama_warga}
                    >
                        <PersonSolid
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </Input>
                    <Input
                        disabled={true}
                        name="nik"
                        placeholder="Masukkan NIK"
                        control={control}
                        rules={{ required: 'NIK tidak boleh kosong!' }}
                        errors={errors.nik}
                    >
                        <PersonCard
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </Input>
                    <Input
                        disabled={true}
                        name="notelpon"
                        placeholder="Masukkan Nomor Telephone"
                        control={control}
                        rules={{ required: 'Nomor Telephone tidak boleh kosong!' }}
                        errors={errors.notelpon}
                    >
                        <Mobile
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </Input>
                    <Select
                        name="jenis_surat"
                        placeholder="Pilih Jenis Surat"
                        control={control}
                        data={letters}
                        rules={{ required: 'Jenis Surat tidak boleh kosong!' }}
                        errors={errors.jenis_surat}
                    />
                    <ButtonVariant
                        title="Buat Permohonan"
                        margin={20}
                        onPress={handleSubmit(onSubmit)}
                    />
                </Section>
            </View>
        </Layout>
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

export default ServiceScreen;
