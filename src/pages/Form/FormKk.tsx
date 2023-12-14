import React from 'react';
import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAppSelector } from '../../hooks/hooks';
import https from '../../utils/api/http';
import Section from '../../components/Section';
// import Input from '../../components/Form/Input';

// import PersonCard from '../../assets/icons/person-vcard-fill.svg';
// import Family from '../../assets/icons/users-alt.svg';
// import { PRIMARY_COLOR } from '../../components/style';
import Select from '../../components/Form/Select';
import InputFile from '../../components/Form/InputFile';
import ButtonVariant from '../../components/Form/Button';
import { RootStackParamList } from '../../../App';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import ModalError from '../../components/Modal/ModalError';
import { File, IModalError, IModalSuccess } from '../../models/model';


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

const alasan_permohonan = [
    { lable: 'Membentuk Rumah Tangga Baru', value: 1 },
    { lable: 'KK Hilang/Rusak', value: 2 },
    { lable: 'Lainnnya', value: 3 },
];

type Props = NativeStackScreenProps<RootStackParamList, 'FormKk'>;

const FormKk = ({ navigation }: Props) => {

    const [firstFile, setFirstFile] = React.useState<File>(initialValue);
    const [secondFile, setSecondFile] = React.useState<File>(initialValue);
    const [thirdFile, setThirdFile] = React.useState<File>(initialValue);
    const [fourthFile, setFourthFile] = React.useState<File>(initialValue);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

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
                console.log(images.assets?.[0].fileSize);
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
            case 'fc_buku_nikah':
                setImageState(setFourthFile, 'File tidak boleh lebih dari 2MB');
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
        // formData.append('kk_lama', data.kk_lama);
        formData.append('shdk', data?.shdk);
        formData.append('alasan_permohonan', data?.alasan_permohonan);
        // formData.append('jml_angg_keluarga', data.jml_angg_keluarga);
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
        formData.append('fc_buku_nikah', {
            uri: fourthFile.uri,
            name: fourthFile.name,
            type: fourthFile.type,
        });

        if (firstFile.uri === '' || secondFile.uri === '' || thirdFile.uri === '' || fourthFile.uri === '' || data?.shdk === '') {
            setModalError({
                isVisible: true,
                description: 'Harap isi semua form!',
            });
            setIsLoading(false);
            return;
        } else {
            await apiClient.post('surat/permohonan-kk', formData, {
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
                    title="Form Permohonan KK"
                    text="Isi form dibawah ini untuk membuat permohonan surat">
                    <Select
                        name="shdk"
                        placeholder="Pilih SHDK"
                        control={control}
                        data={shdk}
                        rules={{ required: 'SHDK tidak boleh kosong' }}
                        errors={errors.shdk}
                    />
                    <Select
                        name="alasan_permohonan"
                        placeholder="Pilih Alasan Permohonan"
                        control={control}
                        data={alasan_permohonan}
                        rules={{ required: 'Alasan Permohonan tidak boleh kosong' }}
                        errors={errors.alasan_permohonan}
                    />
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
                    <InputFile
                        uri={fourthFile.uri}
                        fileName={fourthFile.name}
                        placeholder="Upload Fotokopi Buku Nikah"
                        onPress={() => handleImagePicker('fc_buku_nikah')}
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
});

export default FormKk;
