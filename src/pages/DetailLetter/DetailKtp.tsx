import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AuthStackParamList } from '../Routes/RouteAuth';
import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import Section from '../../components/Section';
import Select from '../../components/Form/Select';
import { useForm } from 'react-hook-form';
import Input from '../../components/Form/Input';
import TextAreaDisabled from '../../components/DisabledForm/TextAreaDisabled';

import PersonFill from '../../assets/icons/person-fill.svg';
import PersonCard from '../../assets/icons/person-vcard-fill.svg';
import Location from '../../assets/icons/geo-alt-fill.svg';
import ButtonVariant from '../../components/Form/Button';
import { PRIMARY_COLOR } from '../../components/style';
import InputDisabled from '../../components/DisabledForm/InputDisabled';
import InputFile from '../../components/Form/InputFile';

const jenis_permohonan = [
    { value: 'Baru', lable: 'Baru' },
    { value: 'Perpanjangan', lable: 'Perpanjangan' },
    { value: 'Pergantian', lable: 'Pergantian' },
];

type Props = NativeStackScreenProps<AuthStackParamList, 'DetailKtp'>;

const DetailKtp = ({ navigation, route }: Props) => {

    // console.log(route.params.id);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        const formData = new FormData();
        formData.append('kk', data.kk);
        formData.append('jenis_permohonan', data.jenis_permohonan);
        formData.append('pengantar_rt', data.pengantar_rt);
        formData.append('foto_ktp', data.foto_ktp);
        formData.append('foto_kk', data.foto_kk);
        console.log(formData);
    };

    return (
        <LayoutWithoutHeader>
            <View style={styles.container}>
                <Section title="Detail Permohonan KTP" text="Pastikan data terisi dengan benar">
                    <InputDisabled
                        placeholder="Masukkan Nama Lengkap"
                        value="Megan"
                    >
                        <PersonFill
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </InputDisabled>
                    <InputDisabled
                        placeholder="Masukkan NIK"
                        value="1234567890"
                    >
                        <PersonCard
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </InputDisabled>
                    <TextAreaDisabled
                        placeholder="Masukkan alamat"
                        value="Desa Kembaran"
                    >
                        <Location
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </TextAreaDisabled>
                    <Input
                        name="kk"
                        placeholder="Masukkan No. KK"
                        control={control}
                    >
                        <PersonCard
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </Input>
                    <Select
                        name="jenis_permohonan"
                        placeholder="Pilih Jenis Permohonan"
                        control={control}
                        data={jenis_permohonan}
                    />
                    {/* <InputFile
                        name="pengantar_rt"
                        placeholder="Upload Pengantar RT"
                        control={control}
                    /> */}
                    <ButtonVariant
                        title="Update Profile"
                        variant={{ color: '#fff', backgroundColor: PRIMARY_COLOR }}
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
    container_form: {
        flex: 1,
        backgroundColor: 'transparent',
        width: '100%',
        padding: 20,
        marginTop: -120,
    },
});

export default DetailKtp;
