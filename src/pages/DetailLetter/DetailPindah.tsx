import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import Section from '../../components/Section';
import Loading from '../../components/Loading';
import { RootStackParamList } from '../../../App';
import { useAppSelector } from '../../hooks/hooks';
import https, { BASE_IMG } from '../../utils/api/http';
import { File, IModalError, IModalSuccess } from '../../models/model';
import { useForm } from 'react-hook-form';
import { launchImageLibrary } from 'react-native-image-picker';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import ModalError from '../../components/Modal/ModalError';
import Select from '../../components/Form/Select';
import TextAreaDisabled from '../../components/DisabledForm/TextAreaDisabled';
import TextArea from '../../components/Form/TextArea';
import { PRIMARY_COLOR, PRIMARY_FONT, WARNING_COLOR } from '../../components/style';
import ButtonVariant from '../../components/Form/Button';
import CommentIcon from '../../assets/icons/comment-alt-dots.svg';
import DiskIcon from '../../assets/icons/disk.svg';
import InputFile from '../../components/Form/InputFile';
import useGetPindah from '../../hooks/Letters/useGetPindah';
import Input from '../../components/Form/Input';
import OtherIcon from '../../assets/icons/briefcase-fill.svg';
import UserIcon from '../../assets/icons/person-fill.svg';
import Location from '../../assets/icons/geo-alt-fill.svg';

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

type Props = NativeStackScreenProps<RootStackParamList, 'DetailPindah'>;

const DetailPindah = ({ route, navigation }: Props) => {

    const { id } = route.params;

    const [firstFile, setFirstFile] = React.useState<File>(initialValue);
    const [secondFile, setSecondFile] = React.useState<File>(initialValue);
    const [thirdFile, setThirdFile] = React.useState<File>(initialValue);

    const {
        control,
        setValue,
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
            default:
                break;
        }
    };

    const { data } = useGetPindah(id);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        setValue('nama_kepala_keluarga', data?.nama_kepala_keluarga);
        setValue('alasan_pindah', data?.alasan_pindah);
        setValue('alamat_tujuan', data?.alamat_tujuan);
        setValue('shdk', data?.shdk);
        data?.lainnya && setValue('lainnya', data?.lainnya);
        setValue('keterangan_warga', data?.keterangan_warga);
        setFirstFile({
            uri: BASE_IMG + data?.pengantar_rt,
            name: data?.pengantar_rt,
            type: 'image/jpeg',
        });
        setSecondFile({
            uri: BASE_IMG + data?.foto_ktp,
            name: data?.foto_ktp,
            type: 'image/jpeg',
        });
        setThirdFile({
            uri: BASE_IMG + data?.foto_kk,
            name: data?.foto_kk,
            type: 'image/jpeg',
        });
    }, [id, data, setValue]);

    const [isModalError, setModalError] = React.useState<IModalError>({
        isVisible: false,
        description: '',
    });
    const [isModalSuccess, setModalSuccess] = React.useState<IModalSuccess>({
        isVisible: false,
        description: '',
    });

    const token = useAppSelector((state) => state.user.token);
    const apiClient = https(token ? token : '');
    const onSubmit = async (form: any) => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('nama_kepala_keluarga', form?.nama_kepala_keluarga);
        formData.append('shdk', form?.shdk);
        formData.append('alasan_pindah', form?.alasan_pindah);
        form?.lainnya && formData.append('lainnya', form?.lainnya);
        formData.append('alamat_tujuan', form?.alamat_tujuan);
        form?.keterangan_warga && formData.append('keterangan_warga', form?.keterangan_warga);
        if (form?.alasan_pindah !== 'Lainnya') {
            formData.append('lainnya', '');
        }
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

        if (firstFile.uri === '' || secondFile.uri === '' || thirdFile.uri === '' || data?.shdk === '' || data?.alasan_pindah === '' || data?.alamat_tujuan === '' || data?.nama_kepala_keluarga === '') {
            setModalError({
                isVisible: true,
                description: 'Harap isi semua form',
            });
            setIsLoading(false);
            return;
        } else {
            await apiClient.post(`surat/permohonan-pindah/${data?.id_surat_ket_pindah}`, formData, {
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
                    description: 'Masalah koneksi',
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
                onPress={() => {
                    setModalSuccess({ isVisible: false, description: '' });
                    navigation.push('Letters');
                }}
            />
            <ModalError
                isVisible={isModalError.isVisible}
                description={isModalError.description}
                onPress={() => setModalError({ isVisible: false, description: '' })}
            />
            <View style={styles.container}>
                <Section
                    title="Detail Surat Keterangan Pindah"
                    text="Silahkan lengkapi form dibawah ini"
                >
                    {isLoading && <Loading />}
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
                    <Select
                        name="alasan_pindah"
                        placeholder="Pilih Alasan Pindah"
                        control={control}
                        data={alasan_pindah}
                        rules={{ required: 'Alasan Pindah tidak boleh kosong!' }}
                        errors={errors.alasan_pindah}
                    />
                    {data?.alasan_pindah === 'Lainnya' && (
                        <Input
                            name="lainnya"
                            placeholder="Masukkan Alasan Lain"
                            control={control}
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
                    <InputFile
                        uri={firstFile.uri}
                        fileName={firstFile.name}
                        message={firstFile.message}
                        placeholder="Upload Pengantar RT"
                        onPress={
                            data?.status === '1'
                                ? () => handleImagePicker('pengantar_rt')
                                : () => ToastAndroid.show('Surat telah diproses...', ToastAndroid.SHORT)
                        }
                        disabled={data?.status === '1' ? false : true}
                    />
                    <InputFile
                        uri={secondFile.uri}
                        fileName={secondFile.name}
                        message={secondFile.message}
                        placeholder="Upload Foto KTP Asli"
                        onPress={
                            data?.status === '1'
                                ? () => handleImagePicker('foto_ktp')
                                : () => ToastAndroid.show('Surat telah diproses...', ToastAndroid.SHORT)
                        }
                        disabled={data?.status === '1' ? false : true}
                    />
                    <InputFile
                        uri={thirdFile.uri}
                        fileName={thirdFile.name}
                        message={thirdFile.message}
                        placeholder="Upload Foto KK Asli"
                        onPress={
                            data?.status === '1'
                                ? () => handleImagePicker('foto_kk')
                                : () => ToastAndroid.show('Surat telah diproses...', ToastAndroid.SHORT)
                        }
                        disabled={data?.status === '1' ? false : true}
                    />
                    <TextAreaDisabled
                        placeholder="Keterangan Admin"
                        value={data?.keterangan_admin ? data?.keterangan_admin : 'Tidak ada keterangan admin'}
                    >
                        <CommentIcon
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </TextAreaDisabled>
                    {data?.status === '1'
                        ? <TextArea
                            name="keterangan_warga"
                            placeholder="Masukkan keterangan anda (opsional)"
                            control={control}
                        >
                            <CommentIcon
                                width={16}
                                height={16}
                                fill={PRIMARY_COLOR}
                            />
                        </TextArea>
                        :
                        <TextAreaDisabled
                            placeholder="Keterangan Warga"
                            value={data?.keterangan_warga ? data?.keterangan_warga : 'Anda tidak memberikan keterangan'}
                        >
                            <CommentIcon
                                width={16}
                                height={16}
                                fill={PRIMARY_COLOR}
                            />
                        </TextAreaDisabled>
                    }
                    {data?.status === '1' && (
                        <ButtonVariant
                            title="Update"
                            variant={{ color: '#fff', backgroundColor: WARNING_COLOR }}
                            margin={30}
                            isLoading={isLoading}
                            onPress={handleSubmit(onSubmit)}
                            icon={
                                <DiskIcon
                                    width={16}
                                    height={16}
                                    fill="#fff"
                                />
                            }
                        />
                    )}
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

export default DetailPindah;
