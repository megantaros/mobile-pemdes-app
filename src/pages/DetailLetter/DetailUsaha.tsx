import React from 'react';
import { RootStackParamList } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import Section from '../../components/Section';
import Loading from '../../components/Loading';
import { File, IModalError, IModalSuccess } from '../../models/model';
import { useForm } from 'react-hook-form';
import { launchImageLibrary } from 'react-native-image-picker';
import TextArea from '../../components/Form/TextArea';
import InputFile from '../../components/Form/InputFile';
import Location from '../../assets/icons/geo-alt-fill.svg';
import { PRIMARY_COLOR, WARNING_COLOR } from '../../components/style';
import https, { BASE_IMG } from '../../utils/api/http';
import ButtonVariant from '../../components/Form/Button';
import TextAreaDisabled from '../../components/DisabledForm/TextAreaDisabled';
import { useAppSelector } from '../../hooks/hooks';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import ModalError from '../../components/Modal/ModalError';
import CommentIcon from '../../assets/icons/comment-alt-dots.svg';
import DiskIcon from '../../assets/icons/disk.svg';
import useGetUsaha from '../../hooks/Letters/useGetUsaha';
import Select from '../../components/Form/Select';
import Input from '../../components/Form/Input';
import MarketIcon from '../../assets/icons/shop.svg';
import CalendarIcon from '../../assets/icons/calendar-event.svg';

type Props = NativeStackScreenProps<RootStackParamList, 'DetailUsaha'>;

const initialValue: File = {
    uri: '',
    name: '',
    type: '',
    fileSize: 0,
    message: '',
};

const status = [
    { value: 'Kawin', lable: 'Kawin' },
    { value: 'Belum Kawin', lable: 'Belum Kawin' },
];

const DetailUsaha = ({ route, navigation }: Props) => {

    const { id } = route.params;

    const [firstFile, setFirstFile] = React.useState<File>(initialValue);
    const [secondFile, setSecondFile] = React.useState<File>(initialValue);
    const [thirdFile, setThirdFile] = React.useState<File>(initialValue);
    const [fourthFile, setFourthFile] = React.useState<File>(initialValue);

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
            }
        };

        switch (name) {
            case 'pengantar_rt':
                setImageState(setFirstFile, 'File tidak boleh lebih dari 2MB');
                break;
            case 'fc_ktp':
                setImageState(setSecondFile, 'File tidak boleh lebih dari 2MB');
                break;
            case 'fc_kk':
                setImageState(setThirdFile, 'File tidak boleh lebih dari 2MB');
                break;
            case 'foto_usaha':
                setImageState(setFourthFile, 'File tidak boleh lebih dari 2MB');
                break;
            default:
                break;
        }
    };

    const { data } = useGetUsaha(id);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        setValue('status_pernikahan', data?.status_pernikahan);
        setValue('jenis_usaha', data?.jenis_usaha);
        setValue('lama_usaha', data?.lama_usaha);
        setValue('tempat_usaha', data?.tempat_usaha);
        setValue('keterangan_warga', data?.keterangan_warga);
        setFirstFile({
            uri: BASE_IMG + data?.pengantar_rt,
            name: data?.pengantar_rt,
            type: 'image/jpeg',
        });
        setSecondFile({
            uri: BASE_IMG + data?.fc_ktp,
            name: data?.fc_ktp,
            type: 'image/jpeg',
        });
        setThirdFile({
            uri: BASE_IMG + data?.fc_kk,
            name: data?.fc_kk,
            type: 'image/jpeg',
        });
        setFourthFile({
            uri: BASE_IMG + data?.foto_usaha,
            name: data?.foto_usaha,
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
        formData.append('status_pernikahan', form.status_pernikahan);
        formData.append('jenis_usaha', form.jenis_usaha);
        formData.append('lama_usaha', form.lama_usaha);
        formData.append('tempat_usaha', form.tempat_usaha);
        form?.keterangan_warga && formData.append('keterangan_warga', form?.keterangan_warga);
        formData.append('pengantar_rt', {
            uri: firstFile.uri,
            name: firstFile.name,
            type: firstFile.type,
        });
        formData.append('fc_ktp', {
            uri: secondFile.uri,
            name: secondFile.name,
            type: secondFile.type,
        });
        formData.append('fc_kk', {
            uri: thirdFile.uri,
            name: thirdFile.name,
            type: thirdFile.type,
        });
        formData.append('foto_usaha', {
            uri: fourthFile.uri,
            name: fourthFile.name,
            type: fourthFile.type,
        });

        if (firstFile.uri === '' || secondFile.uri === '' || thirdFile.uri === '' || fourthFile.uri === '') {
            setModalError({
                isVisible: true,
                description: 'Harap isi semua form!',
            });
            setIsLoading(false);
            return;
        } else {
            await apiClient.post(`surat/permohonan-usaha/${data?.id_surat_ket_usaha}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((res) => {
                console.log(res.data.data);
                setModalSuccess({
                    isVisible: true,
                    description: res.data.message,
                });
                setIsLoading(false);
            }).catch((err) => {
                console.log(err.message);
                setModalError({
                    isVisible: true,
                    description: 'Gagal mengupdate data!',
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
                    title="Detail Surat Permohonan Usaha"
                    text="Pastikan data yang anda masukkan sudah benar"
                >
                    {isLoading && <Loading />}
                    <Select
                        name="status_pernikahan"
                        placeholder="Pilih Status Pernikahan"
                        control={control}
                        data={status}
                        rules={{ required: 'Status Pernikahan tidak boleh kosong!' }}
                        errors={errors.status_pernikahan}
                    />
                    <Input
                        name="jenis_usaha"
                        placeholder="Masukkan jenis usaha"
                        control={control}
                        rules={{ required: 'Jenis usaha tidak boleh kosong!' }}
                        errors={errors.jenis_usaha}
                    >
                        <MarketIcon
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </Input>
                    <Input
                        name="lama_usaha"
                        placeholder="Masukkan lama usaha"
                        control={control}
                        rules={{ required: 'Jenis usaha tidak boleh kosong!' }}
                        errors={errors.lama_usaha}
                    >
                        <CalendarIcon
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </Input>
                    <TextArea
                        name="tempat_usaha"
                        placeholder="Masukkan tempat usaha"
                        control={control}
                        rules={{ required: 'Tempat usaha tidak boleh kosong!' }}
                        errors={errors.alamat_domisili}
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
                        placeholder="Upload Fotokopi KTP Asli"
                        onPress={
                            data?.status === '1'
                                ? () => handleImagePicker('fc_ktp')
                                : () => ToastAndroid.show('Surat telah diproses...', ToastAndroid.SHORT)
                        }
                        disabled={data?.status === '1' ? false : true}
                    />
                    <InputFile
                        uri={thirdFile.uri}
                        fileName={thirdFile.name}
                        message={thirdFile.message}
                        placeholder="Upload Fotokopi KK Asli"
                        onPress={
                            data?.status === '1'
                                ? () => handleImagePicker('fc_kk')
                                : () => ToastAndroid.show('Surat telah diproses...', ToastAndroid.SHORT)
                        }
                        disabled={data?.status === '1' ? false : true}
                    />
                    <InputFile
                        uri={fourthFile.uri}
                        fileName={fourthFile.name}
                        message={fourthFile.message}
                        placeholder="Upload Foto Lokasi"
                        onPress={
                            data?.status === '1'
                                ? () => handleImagePicker('foto_lokasi')
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

export default DetailUsaha;
