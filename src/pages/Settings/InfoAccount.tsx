import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Input from '../../components/Form/Input';

import PersonSolid from '../../assets/icons/person-fill.svg';
import PersonCard from '../../assets/icons/person-vcard-fill.svg';
import Mobile from '../../assets/icons/phone-fill.svg';
import { INFO_COLOR, PRIMARY_COLOR, WARNING_COLOR } from '../../components/style';
import Select from '../../components/Form/Select';
import ButtonVariant from '../../components/Form/Button';
import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import TextArea from '../../components/Form/TextArea';
import Location from '../../assets/icons/geo-alt-fill.svg';
import Calendar from '../../assets/icons/calendar-event.svg';
import Work from '../../assets/icons/briefcase-fill.svg';
import { useForm } from 'react-hook-form';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import ModalError from '../../components/Modal/ModalError';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import EmailIcon from '../../assets/icons/envelope-at-fill.svg';
import { RootStackParamList } from '../../../App';
import Loading from '../../components/Loading';
import useUpdate, { initialStateUpdateProfile, religion, sex } from '../../hooks/Auth/useUpdate';
import { IUpdateProfile } from '../../models/model';
import useGetUser from '../../hooks/Auth/useGetUser';
import ScreenHeader from '../../components/Header/ScreenHeader';
import DiskIcon from '../../assets/icons/disk.svg';
import KeyIcon from '../../assets/icons/key-fill.svg';
import FamilyIcon from '../../assets/icons/users-alt.svg';

type Props = NativeStackScreenProps<RootStackParamList, 'InfoAccount'>;

export default function InfoAccount({ navigation }: Props) {

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IUpdateProfile>({
        defaultValues: initialStateUpdateProfile,
    });

    const { data, loading } = useGetUser();

    useEffect(() => {
        setValue('nama_warga', data?.nama_warga);
        setValue('email', data?.email);
        setValue('nik', data?.nik);
        setValue('kk', data?.kk);
        setValue('notelpon', data?.notelpon);
        setValue('ttl', data?.ttl);
        setValue('pekerjaan', data?.pekerjaan);
        setValue('jenis_kelamin', data?.jenis_kelamin);
        setValue('agama', data?.agama);
        setValue('alamat', data?.alamat);
    }, [data, setValue]);

    const {
        isLoading,
        isModalError,
        isModalSuccess,
        update,
        closeModalError,
        closeModalSuccess,
    } = useUpdate();

    const onSubmit = async (value: any) => {
        update({ id_warga: data.id_warga, data: value });
    };

    return (
        <LayoutWithoutHeader>
            {loading && <Loading />}
            <ScreenHeader
                title="Info Akun"
                text="Silahkan ubah data diri anda"
                body={
                    <View style={styles.form}>
                        <Input
                            name="nama_warga"
                            placeholder="Masukkan nama lengkap"
                            control={control}
                            rules={{ required: 'Nama lengkap tidak boleh kosong!' }}
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
                            rules={{ required: 'Email tidak boleh kosong!', pattern: { value: /\S+@\S+\.\S+/, message: 'Email tidak valid' } }}
                            errors={errors.email}
                        >
                            <EmailIcon
                                width={16}
                                height={16}
                                fill={PRIMARY_COLOR}
                            />
                        </Input>
                        <Input
                            keyType="numeric"
                            name="nik"
                            placeholder="Masukkan NIK"
                            control={control}
                            rules={{ required: 'NIK tidak boleh kosong!', minLength: { value: 16, message: 'NIK harus 16 digit' } }}
                            errors={errors.nik}
                        >
                            <PersonCard
                                width={16}
                                height={16}
                                fill={PRIMARY_COLOR}
                            />
                        </Input>
                        <Input
                            keyType="numeric"
                            name="kk"
                            placeholder="Masukkan No. KK"
                            control={control}
                            rules={{ required: 'No. KK tidak boleh kosong!', minLength: { value: 16, message: 'No. KK harus 16 digit' } }}
                            errors={errors.kk}
                        >
                            <FamilyIcon
                                width={16}
                                height={16}
                                fill={PRIMARY_COLOR}
                            />
                        </Input>
                        <Input
                            keyType="numeric"
                            name="notelpon"
                            placeholder="Masukkan Nomor Telephone"
                            control={control}
                            rules={{ required: 'Nomor Telephone tidak boleh kosong!', number: { value: true, message: 'Nomor Telephone harus angka!' } }}
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
                            rules={{ required: 'Tempat, Tgl Lahir tidak boleh kosong!' }}
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
                            rules={{ required: 'Pekerjaan tidak boleh kosong!' }}
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
                            rules={{ required: 'Jenis Kelamin tidak boleh kosong!' }}
                            errors={errors.jenis_kelamin}
                        />
                        <Select
                            name="agama"
                            placeholder="Pilih Agama"
                            control={control}
                            data={religion}
                            rules={{ required: 'Agama tidak boleh kosong!' }}
                        />
                        <TextArea
                            name="alamat"
                            placeholder="Masukkan alamat"
                            control={control}
                            rules={{ required: 'Alamat tidak boleh kosong!' }}
                            errors={errors.alamat}
                        >
                            <Location
                                width={16}
                                height={16}
                                fill={PRIMARY_COLOR}
                            />
                        </TextArea>
                    </View>
                }
                action={
                    <>
                        <ButtonVariant
                            title="Ubah Password"
                            variant={{ color: '#fff', backgroundColor: INFO_COLOR }}
                            margin={30}
                            onPress={() => navigation.navigate('ModalUpdatePassword', { id_warga: data.id_warga })}
                            icon={
                                <KeyIcon
                                    width={16}
                                    height={16}
                                    fill="#fff"
                                />
                            }
                        />
                        <ButtonVariant
                            isLoading={isLoading}
                            title="Simpan"
                            variant={{ color: '#fff', backgroundColor: WARNING_COLOR }}
                            margin={10}
                            onPress={handleSubmit(onSubmit)}
                            icon={
                                <DiskIcon
                                    width={16}
                                    height={16}
                                    fill="#fff"
                                />
                            }
                        />
                    </>
                }
            />
            <ModalSuccess
                isVisible={isModalSuccess.isVisible}
                onPress={() => {
                    navigation.navigate('HomeTabs');
                    closeModalSuccess();
                }}
                description={isModalSuccess.description}
            />
            <ModalError
                isVisible={isModalError.isVisible}
                onPress={() => closeModalError()}
                description={isModalError.description}
            />
        </LayoutWithoutHeader>
    );
}

const styles = StyleSheet.create({
    form: {
        paddingVertical: 20,
    },
});
