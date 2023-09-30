import React from 'react';
import { View, StyleSheet } from 'react-native';
import Layout from '../../components/Layout/Layout';
import Section from '../../components/Section';
import Input from '../../components/Form/Input';
import { useForm } from 'react-hook-form';

import PersonSolid from '../../assets/icons/person-fill.svg';
import PersonCard from '../../assets/icons/person-vcard-fill.svg';
import Mobile from '../../assets/icons/phone-fill.svg';
import { PRIMARY_COLOR } from '../../components/style';
import Select from '../../components/Form/Select';
import ButtonVariant from '../../components/Form/Button';

const letters = [
    { value: 'Surat Pengantar KK', lable: 'Surat Pengantar KK' },
    { value: 'Surat Pengantar KTP', lable: 'Surat Pengantar KTP' },
    { value: 'Surat Pengantar SKCK', lable: 'Surat Pengantar SKCK' },
    { value: 'Surat Keterangan Domisili', lable: 'Surat Keterangan Domisili' },
    { value: 'Surat Keterangan Usaha', lable: 'Surat Keterangan Usaha' },
    { value: 'Surat Keterangan Pindah', lable: 'Surat Keterangan Pindah' },
    { value: 'Surat Keterangan Datang', lable: 'Surat Keterangan Datang' },
];

const ServiceScreen = () => {

    const {
        control,
        handleSubmit,
        // formState: { errors },
    } = useForm({
        defaultValues: {
            nama_warga: '',
            nik: '',
            notelpon: '',
            jenis_surat: '',
        },
    });

    const onSubmit = (data: Object) => {
        console.log(data);
    };

    return (
        <Layout>
            <View style={styles.container}>
                <Section
                    title="Permohonan Surat"
                    text="Isi form dibawah ini untuk membuat permohonan surat"
                >
                    <Input
                        name="nama_warga"
                        placeholder="Masukkan nama lengkap"
                        control={control}
                    >
                        <PersonSolid
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </Input>
                    <Input
                        name="nik"
                        placeholder="Masukkan NIK"
                        control={control}
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
                    />
                    <ButtonVariant
                        title="Buat Permohonan"
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
