import React from 'react';
import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, Text } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAppSelector } from '../../hooks/hooks';
import https from '../../utils/api/http';
import Section from '../../components/Section';
import Input from '../../components/Form/Input';

import OtherIcon from '../../assets/icons/briefcase-fill.svg';
import List from '../../assets/icons/list-ul.svg';
import UserIcon from '../../assets/icons/person-fill.svg';
import { PRIMARY_COLOR, PRIMARY_FONT } from '../../components/style';
import Select from '../../components/Form/Select';
import InputFile from '../../components/Form/InputFile';
import ButtonVariant from '../../components/Form/Button';
import { RootStackParamList } from '../../../App';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import ModalError from '../../components/Modal/ModalError';
import { File, IModalError, IModalSuccess } from '../../models/model';
import TextArea from '../../components/Form/TextArea';
import Location from '../../assets/icons/geo-alt-fill.svg';
import { Dropdown } from 'react-native-element-dropdown';


const initialValue: File = {
    uri: '',
    name: '',
    type: '',
    fileSize: 0,
    message: '',
};

const shdk = [
    { lable: 'Kepala Keluarga', value: 'Kepala Keluarga' },
    { lable: 'Suami', value: 'Suami' },
    { lable: 'Istri', value: 'Istri' },
    { lable: 'Anak', value: 'Anak' },
    { lable: 'Menantu', value: 'Menantu' },
    { lable: 'Cucu', value: 'Cucu' },
    { lable: 'Orang Tua', value: 'Orang Tua' },
    { lable: 'Mertua', value: 'Mertua' },
    { lable: 'Famili Lainnya', value: 'Famili Lainnya' },
    { lable: 'Pembantu', value: 'Pembantu' },
];

const alasan_pindah = [
    { lable: 'Pekerjaan', value: 'Pekerjaan' },
    { lable: 'Pendidikan', value: 'Pendidikan' },
    { lable: 'Keamanan', value: 'Keamanan' },
    { lable: 'Kesehatan', value: 'Kesehatan' },
    { lable: 'Perumahan', value: 'Perumahan' },
    { lable: 'Keluarga', value: 'Keluarga' },
    { lable: 'Lainnya', value: 'Lainnya' },
];

type Props = NativeStackScreenProps<RootStackParamList, 'FormPindah'>;

const FormPindah = ({ navigation }: Props) => {

    const [firstFile, setFirstFile] = React.useState<File>(initialValue);
    const [secondFile, setSecondFile] = React.useState<File>(initialValue);
    const [thirdFile, setThirdFile] = React.useState<File>(initialValue);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [showFormLainnya, setShowFormLainnya] = React.useState<boolean>(false);

    const handleImagePicker = async (name: string) => {
        const images = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
            selectionLimit: 1,
        });

        const setImageState = (stateSetter: any, errorMessage: any) => {
            if (Number(images.assets?.[0].fileSize) > 2000000) {
                stateSetter({
                    uri: '',
                    name: '',
                    type: '',
                    fileSize: 0,
                    message: errorMessage,
                });
            } else {
                stateSetter({
                    uri: images.assets?.[0].uri,
                    name: images.assets?.[0].fileName,
                    type: images.assets?.[0].type,
                    fileSize: images.assets?.[0].fileSize,
                    message: '',
                });
            }
        };

        switch (name) {
            case 'pengantar_rt':
                setImageState(setFirstFile, 'File tidak boleh lebih dari 2MB');
                break;
            case 'foto_ktp':
                setImageState(setSecondFile, 'File tidak boleh lebih dari 2MB');
                break;
            case 'foto_kk':
                setImageState(setThirdFile, 'File tidak boleh lebih dari 2MB');
                break;
            default:
                break;
        }

    };

    const token = useAppSelector((state) => state.user.token);
    const apiClient = https(token ? token : '');

    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const [isModalError, setModalError] = React.useState<IModalError>({
        isVisible: false,
        description: '',
    });

    const [isModalSuccess, setModalSuccess] = React.useState<IModalSuccess>({
        isVisible: false,
        description: '',
    });

    const onSubmit = async (data: any) => {

        setIsLoading(true);

        const formData = new FormData();
        formData.append('nama_kepala_keluarga', data?.nama_kepala_keluarga);
        formData.append('shdk', data?.shdk);
        formData.append('alasan_pindah', data?.alasan_pindah);
        data?.lainnya && formData.append('lainnya', data?.lainnya);
        formData.append('alamat_tujuan', data?.alamat_tujuan);
        formData.append('pengantar_rt', {
            uri: firstFile.uri,
            name: firstFile.name,
            type: firstFile.type,
        });
        formData.append('foto_ktp', {
            uri: secondFile.uri,
            name: secondFile.name,
            type: secondFile.type,
        });
        formData.append('foto_kk', {
            uri: thirdFile.uri,
            name: thirdFile.name,
            type: thirdFile.type,
        });

        console.log(formData);

        if (firstFile.uri === '' || secondFile.uri === '' || thirdFile.uri === '' || data?.shdk === '' || data?.alasan_pindah === '' || data?.alamat_tujuan === '' || data?.nama_kepala_keluarga === '') {
            setModalError({
                isVisible: true,
                description: 'Harap isi semua form!',
            });
            setIsLoading(false);
            return;
        } else {
            await apiClient.post('surat/permohonan-pindah', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((res) => {
                setModalSuccess({
                    isVisible: true,
                    description: res.data.message,
                });
                setIsLoading(false);
            }).catch((err) => {
                console.log(err);
                setModalError({
                    isVisible: true,
                    description: 'Permohonan surat gagal dibuat!',
                });
                setIsLoading(false);
            });
        }
    };


    return (
        <LayoutWithoutHeader>
            <ModalSuccess
                isVisible={isModalSuccess.isVisible}
                description={isModalSuccess.description}
                onPress={
                    () => {
                        setModalSuccess({ isVisible: false, description: '' });
                        navigation.push('Letters');
                    }
                }
            />
            <ModalError
                isVisible={isModalError.isVisible}
                description={isModalError.description}
                onPress={() => setModalError({
                    isVisible: false,
                    description: '',
                })}
            />
            <View style={styles.container}>
                <Section
                    title="Form Permohonan Pindah"
                    text="Isi form dibawah ini untuk membuat permohonan surat">
                    <Input
                        name="nama_kepala_keluarga"
                        placeholder="Masukkan Nama Kepala Keluarga"
                        control={control}
                        rules={{ required: 'Nama Kepala Keluarga tidak boleh kosong!' }}
                        errors={errors.nama_kepala_keluarga}
                    >
                        <UserIcon
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </Input>
                    <Select
                        name="shdk"
                        placeholder="Pilih SHDK"
                        control={control}
                        data={shdk}
                        rules={{ required: 'SHDK tidak boleh kosong!' }}
                        errors={errors.shdk}
                    />
                    <Controller
                        name="alasan_pindah"
                        control={control}
                        rules={{ required: 'Alasan Pindah tidak boleh kosong!' }}
                        render={({ field: { onChange, value } }) => (
                            <Dropdown
                                style={styles.dropdown}
                                selectedTextStyle={styles.selectedTextStyle}
                                placeholderStyle={styles.placeholderStyle}
                                maxHeight={200}
                                value={value}
                                data={alasan_pindah}
                                valueField="value"
                                labelField="lable"
                                placeholder="Pilih Alasan Pindah Lainnya"
                                renderItem={(item: any) => (
                                    <View style={styles.renderItem}>
                                        <Text style={styles.renderItemText}>{item.lable}</Text>
                                    </View>
                                )}
                                onChange={(e: any) => {
                                    onChange(e.value);
                                    if (e.value === 'Lainnya') {
                                        setShowFormLainnya(true);
                                    } else {
                                        setShowFormLainnya(false);
                                    }
                                }}
                                renderLeftIcon={() => {
                                    return <List
                                        width={16}
                                        height={16}
                                        fill={PRIMARY_COLOR}
                                        style={styles.imageStyle}
                                    />;
                                }}
                            />
                        )}
                    />
                    {showFormLainnya && (
                        <Input
                            name="lainnya"
                            placeholder="Masukkan Alasan Lain"
                            control={control}
                            rules={{ required: 'Alasan Pindah tidak boleh kosong!' }}
                            errors={errors.lainnya}
                        >
                            <OtherIcon
                                width={16}
                                height={16}
                                fill={PRIMARY_COLOR}
                            />
                        </Input>
                    )}
                    <TextArea
                        name="alamat_tujuan"
                        placeholder="Masukkan alamat tujuan"
                        control={control}
                        rules={{ required: 'Alamat Tujuan Harus Diisi!' }}
                        errors={errors.alamat_tujuan}
                    >
                        <Location
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </TextArea>
                    {/* <Input
                        name="jml_angg_keluarga"
                        placeholder="Masukkan Jumlah Anggota Keluarga"
                        control={control}
                        rules={{ required: 'Jumlah Anggota Keluarga tidak boleh kosong' }}
                        errors={errors.jml_angg_keluarga}
                    >
                        <Family
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </Input> */}
                    <InputFile
                        uri={firstFile.uri}
                        fileName={firstFile.name}
                        placeholder="Upload Pengantar RT"
                        onPress={() => handleImagePicker('pengantar_rt')}
                    />
                    <InputFile
                        uri={secondFile.uri}
                        fileName={secondFile.name}
                        placeholder="Upload Scan KTP Asli"
                        onPress={() => handleImagePicker('foto_ktp')}
                    />
                    <InputFile
                        uri={thirdFile.uri}
                        fileName={thirdFile.name}
                        placeholder="Upload Scan KK Asli"
                        onPress={() => handleImagePicker('foto_kk')}
                    />
                    <ButtonVariant
                        title="Kirim"
                        onPress={handleSubmit(onSubmit)}
                        isLoading={isLoading}
                        margin={30}
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
    dropdown: {
        height: 50,
        marginVertical: 4,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 25,
        borderColor: '#fff',
        paddingHorizontal: 16,
        borderWidth: 1,
        fontFamily: PRIMARY_FONT,
        fontSize: 12,
    },
    placeholderStyle: {
        fontSize: 12,
        fontFamily: 'Viga-Regular',
        marginLeft: 7,
    },
    selectedTextStyle: {
        fontSize: 12,
        fontFamily: 'Viga-Regular',
        marginLeft: 10,
        color: PRIMARY_COLOR,
    },
    renderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    renderItemText: {
        fontSize: 12,
        fontFamily: 'Viga-Regular',
        marginLeft: 12,
        color: PRIMARY_COLOR,
    },
    imageStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        paddingHorizontal: 15,
    },
});

export default FormPindah;
