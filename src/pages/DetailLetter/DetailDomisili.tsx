import React from 'react';
import { RootStackParamList } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import Section from '../../components/Section';
import Loading from '../../components/Loading';
import { File, IModalError, IModalSuccess } from '../../models/model';
import { useForm } from 'react-hook-form';
import { launchImageLibrary } from 'react-native-image-picker';
import useGetDomisili from '../../hooks/Letters/useGetDomisili';
import Input from '../../components/Form/Input';
import TextArea from '../../components/Form/TextArea';
import InputFile from '../../components/Form/InputFile';
import PersonCard from '../../assets/icons/person-vcard-fill.svg';
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

type Props = NativeStackScreenProps<RootStackParamList, 'DetailDomisili'>;

const initialValue = {
    uri: '',
    name: '',
    type: '',
};

const DetailDomisili = ({ route }: Props) => {

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
            maxHeight: 200,
            maxWidth: 200,
            selectionLimit: 1,
        });

        if (name === 'pengantar_rt') {
            setFirstFile({
                uri: images.assets?.[0].uri,
                name: images.assets?.[0].fileName,
                type: images.assets?.[0].type,
            });
        }

        if (name === 'fc_ktp') {
            setSecondFile({
                uri: images.assets?.[0].uri,
                name: images.assets?.[0].fileName,
                type: images.assets?.[0].type,
            });
        }

        if (name === 'fc_kk') {
            setThirdFile({
                uri: images.assets?.[0].uri,
                name: images.assets?.[0].fileName,
                type: images.assets?.[0].type,
            });
        }

        if (name === 'foto_lokasi') {
            setFourthFile({
                uri: images.assets?.[0].uri,
                name: images.assets?.[0].fileName,
                type: images.assets?.[0].type,
            });
        }
    };

    const { data } = useGetDomisili(id);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        setValue('kk', data?.kk);
        setValue('alamat_domisili', data?.alamat_domisili);
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
            uri: BASE_IMG + data?.foto_lokasi,
            name: data?.foto_lokasi,
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
        formData.append('kk', form.kk);
        formData.append('alamat_domisili', form.alamat_domisili);
        formData.append('keterangan_warga', form.keterangan_warga);
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
        formData.append('foto_lokasi', {
            uri: fourthFile.uri,
            name: fourthFile.name,
            type: fourthFile.type,
        });

        await apiClient.post(`surat/permohonan-domisili/${data?.id_surat_ket_domisili}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((res) => {
            console.log(res.data.data);
            setModalSuccess({
                isVisible: true,
                description: 'Surat berhasil diubah',
            });
            setIsLoading(false);
        }).catch((err) => {
            console.log(err.message);
            setModalError({
                isVisible: true,
                description: 'Masalah koneksi',
            });
            setIsLoading(false);
        });
    };

    return (
        <LayoutWithoutHeader>
            <ModalSuccess
                isVisible={isModalSuccess.isVisible}
                description={isModalSuccess.description}
                onPress={() => setModalSuccess({ isVisible: false, description: '' })}
            />
            <ModalError
                isVisible={isModalError.isVisible}
                description={isModalError.description}
                onPress={() => setModalError({ isVisible: false, description: '' })}
            />
            <View style={styles.container}>
                <Section
                    title="Detail Surat Domisili"
                    text="Silahkan lengkapi form dibawah ini"
                >
                    {isLoading && <Loading />}
                    <Input
                        name="kk"
                        placeholder="Masukkan No. KK"
                        keyType="numeric"
                        control={control}
                        rules={{ required: 'No. KK tidak boleh kosong' }}
                        errors={errors.kk}
                    >
                        <PersonCard
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </Input>
                    <TextArea
                        name="alamat_domisili"
                        placeholder="Masukkan alamat domisili"
                        control={control}
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
                        placeholder="Upload Pengantar RT"
                        onPress={() => handleImagePicker('pengantar_rt')}
                    />
                    <InputFile
                        uri={secondFile.uri}
                        fileName={secondFile.name}
                        placeholder="Upload Fotokopi KTP Asli"
                        onPress={() => handleImagePicker('fc_ktp')}
                    />
                    <InputFile
                        uri={thirdFile.uri}
                        fileName={thirdFile.name}
                        placeholder="Upload Fotokopi KK Asli"
                        onPress={() => handleImagePicker('fc_kk')}
                    />
                    <InputFile
                        uri={fourthFile.uri}
                        fileName={fourthFile.name}
                        placeholder="Upload Foto Lokasi"
                        onPress={() => handleImagePicker('foto_lokasi')}
                    />
                    <TextAreaDisabled
                        placeholder="Keterangan Admin"
                        value={data?.keterangan_admin ? data?.keterangan_admin : 'Belum ada keterangan admin'}
                    >
                        <CommentIcon
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </TextAreaDisabled>
                    <TextArea
                        name="keterangan_warga"
                        placeholder="Masukkan keterangan warga (opsional)"
                        control={control}
                    >
                        <CommentIcon
                            width={16}
                            height={16}
                            fill={PRIMARY_COLOR}
                        />
                    </TextArea>
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

export default DetailDomisili;
