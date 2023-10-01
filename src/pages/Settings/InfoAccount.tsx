import React from 'react';
import { View, StyleSheet } from 'react-native';
import Section from '../../components/Section';
import Input from '../../components/Form/Input';
import { useForm } from 'react-hook-form';

import PersonSolid from '../../assets/icons/person-fill.svg';
import PersonCard from '../../assets/icons/person-vcard-fill.svg';
import Mobile from '../../assets/icons/phone-fill.svg';
import { PRIMARY_COLOR } from '../../components/style';
import Select from '../../components/Form/Select';
import ButtonVariant from '../../components/Form/Button';
import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import TextArea from '../../components/Form/TextArea';
import Location from '../../assets/icons/geo-alt-fill.svg';
import Calendar from '../../assets/icons/calendar-event.svg';
import Work from '../../assets/icons/briefcase-fill.svg';

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

const InfoAccount = () => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            notelpon: '',
            nik: '',
            ttl: '',
            jenis_kelamin: '',
            pekerjaan: '',
            agama: '',
            alamat: '',
        },
    });

    const onSubmit = (data: Object) => {
        console.log(data);
    };

    return (
        <LayoutWithoutHeader>
            <View style={styles.container}>
                <Section
                    title="Info Akun"
                    text="Silahkan isi data diri anda dengan benar"
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
                    <Input
                        name="ttl"
                        placeholder="Masukkan Tempat, Tgl Lahir"
                        control={control}
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
                    />
                    <Select
                        name="agama"
                        placeholder="Pilih Agama"
                        control={control}
                        data={religion}
                    />
                    <TextArea
                        name="alamat"
                        placeholder="Masukkan alamat"
                        control={control}
                    >
                        <Location
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </TextArea>
                    <ButtonVariant
                        title="Ubah Data"
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
