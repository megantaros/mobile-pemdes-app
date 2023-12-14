import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import Section from '../../components/Section';
import { useForm } from 'react-hook-form';

import DiskIcon from '../../assets/icons/disk.svg';
import CommentIcon from '../../assets/icons/comment-alt-dots.svg';
import ButtonVariant from '../../components/Form/Button';
import { PRIMARY_COLOR, WARNING_COLOR } from '../../components/style';
import { RootStackParamList } from '../../../App';
import { File, IModalError, IModalSuccess } from '../../models/model';
import { launchImageLibrary } from 'react-native-image-picker';
import https, { BASE_IMG } from '../../utils/api/http';
import { useAppSelector } from '../../hooks/hooks';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import ModalError from '../../components/Modal/ModalError';
import Loading from '../../components/Loading';
import InputFile from '../../components/Form/InputFile';
import TextAreaDisabled from '../../components/DisabledForm/TextAreaDisabled';
import TextArea from '../../components/Form/TextArea';
import useGetDatang from '../../hooks/Letters/useGetDatang';

const initialValue: File = {
    uri: '',
    name: '',
    type: '',
    fileSize: 0,
    message: '',
};

type Props = NativeStackScreenProps<RootStackParamList, 'DetailDatang'>;

const DetailDatang = ({ navigation, route }: Props) => {

    const { id } = route.params;
    const [firstFile, setFirstFile] = React.useState<File>(initialValue);

    const {
        control,
        handleSubmit,
        setValue,
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
            case 'foto_surat_ket_pindah_capil':
                setImageState(setFirstFile, 'File tidak boleh lebih dari 2MB');
                break;
            default:
                break;
        }
    };

    const { data } = useGetDatang(id);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        setValue('keterangan_warga', data?.keterangan_warga);
        setFirstFile({
            uri: BASE_IMG + data?.foto_surat_ket_pindah_capil,
            name: data?.foto_surat_ket_pindah_capil,
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
        form?.keterangan_warga && formData.append('keterangan_warga', form?.keterangan_warga);
        formData.append('foto_surat_ket_pindah_capil', {
            uri: firstFile.uri,
            name: firstFile.name,
            type: firstFile.type,
        });

        if (firstFile.uri === '') {
            setModalError({
                isVisible: true,
                description: 'Harap isi semua form!',
            });
            setIsLoading(false);
            return;
        } else {
            await apiClient.post(`surat/permohonan-datang/${data?.id_surat_ket_pindah_datang}`, formData, {
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
                    title="Detail Surat Keterangan Pindah Datang"
                    text="Pastikan data yang anda masukkan sudah benar"
                >
                    {isLoading && <Loading />}
                    <InputFile
                        uri={firstFile.uri}
                        fileName={firstFile.name}
                        message={firstFile.message}
                        placeholder="Foto Surat Keterangan Pindah dari Capil"
                        onPress={
                            data?.status === '1'
                                ? () => handleImagePicker('foto_surat_ket_pindah_capil')
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

export default DetailDatang;
