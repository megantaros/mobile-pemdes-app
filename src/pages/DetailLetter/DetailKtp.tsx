import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import Section from '../../components/Section';
import Select from '../../components/Form/Select';
import { useForm } from 'react-hook-form';
// import Input from '../../components/Form/Input';
// import TextAreaDisabled from '../../components/DisabledForm/TextAreaDisabled';

import DiskIcon from '../../assets/icons/disk.svg';
import CommentIcon from '../../assets/icons/comment-alt-dots.svg';
// import PersonFill from '../../assets/icons/person-fill.svg';
// import PersonCard from '../../assets/icons/person-vcard-fill.svg';
// import Location from '../../assets/icons/geo-alt-fill.svg';
import ButtonVariant from '../../components/Form/Button';
import { PRIMARY_COLOR, WARNING_COLOR } from '../../components/style';
// import InputDisabled from '../../components/DisabledForm/InputDisabled';
// import InputFile from '../../components/Form/InputFile';
import { RootStackParamList } from '../../../App';
import { File, IModalError, IModalSuccess } from '../../models/model';
import { launchImageLibrary } from 'react-native-image-picker';
import useGetKtp from '../../hooks/Letters/useGetKtp';
import https, { BASE_IMG } from '../../utils/api/http';
import { useAppSelector } from '../../hooks/hooks';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import ModalError from '../../components/Modal/ModalError';
import Loading from '../../components/Loading';
import InputFile from '../../components/Form/InputFile';
import TextAreaDisabled from '../../components/DisabledForm/TextAreaDisabled';
import TextArea from '../../components/Form/TextArea';

const jenis_permohonan = [
    { value: 'Baru', lable: 'Baru' },
    { value: 'Perpanjangan', lable: 'Perpanjangan' },
    { value: 'Penggantian', lable: 'Penggantian' },
];

const initialValue: File = {
    uri: '',
    name: '',
    type: '',
    fileSize: 0,
    message: '',
};

type Props = NativeStackScreenProps<RootStackParamList, 'DetailKtp'>;

const DetailKtp = ({ navigation, route }: Props) => {

    const { id } = route.params;

    const [firstFile, setFirstFile] = React.useState<File>(initialValue);
    const [secondFile, setSecondFile] = React.useState<File>(initialValue);
    const [thirdFile, setThirdFile] = React.useState<File>(initialValue);

    const {
        control,
        handleSubmit,
        setValue,
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

    const { data } = useGetKtp(id);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        setValue('jenis_permohonan', data?.jenis_permohonan);
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
        formData.append('jenis_permohonan', form?.jenis_permohonan);
        form?.keterangan_warga && formData.append('keterangan_warga', form?.keterangan_warga);
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

        if (firstFile.uri === '' || secondFile.uri === '' || thirdFile.uri === '' || form.jenis_permohonan === '') {
            setModalError({
                isVisible: true,
                description: 'Harap isi semua form',
            });
            setIsLoading(false);
            return;
        } else {
            await apiClient.post(`surat/permohonan-ktp/${data?.id_surat_peng_ktp}`, formData, {
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
                console.log(err.message);
                setModalError({
                    isVisible: true,
                    description: 'Gagal mengupdate surat!',
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
                    title="Detail Surat Permohonan KTP"
                    text="Pastikan data yang anda masukkan sudah benar"
                >
                    {isLoading && <Loading />}
                    {/* <InputDisabled
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
                    </Input> */}
                    <Select
                        name="jenis_permohonan"
                        placeholder="Pilih Jenis Permohonan"
                        control={control}
                        data={jenis_permohonan}
                        rules={{ required: true, message: 'Jenis permohonan tidak boleh kosong!' }}
                        errors={errors.jenis_permohonan}
                    />
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
});

export default DetailKtp;
