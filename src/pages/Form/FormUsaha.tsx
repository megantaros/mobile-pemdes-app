import React from 'react';
import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import { StyleSheet, View } from 'react-native';
import Section from '../../components/Section';

import PaperPlane from '../../assets/icons/paper-plane.svg';
import { PRIMARY_COLOR } from '../../components/style';
import ButtonVariant from '../../components/Form/Button';
import InputFile from '../../components/Form/InputFile';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAppSelector } from '../../hooks/hooks';
import https from '../../utils/api/http';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import ModalError from '../../components/Modal/ModalError';
import { RootStackParamList } from '../../../App';
import { File, IModalError, IModalSuccess } from '../../models/model';
import { useForm } from 'react-hook-form';
import TextArea from '../../components/Form/TextArea';
import Location from '../../assets/icons/geo-alt-fill.svg';
import Select from '../../components/Form/Select';
import Input from '../../components/Form/Input';
import MarketIcon from '../../assets/icons/shop.svg';
import CalendarIcon from '../../assets/icons/calendar-event.svg';

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

type Props = NativeStackScreenProps<RootStackParamList, 'FormUsaha'>;

const FormUsaha = ({ navigation }: Props) => {

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
            // maxHeight: 200,
            // maxWidth: 200,
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
        formData.append('status_pernikahan', data.status_pernikahan);
        formData.append('jenis_usaha', data.jenis_usaha);
        formData.append('lama_usaha', data.lama_usaha);
        formData.append('tempat_usaha', data.tempat_usaha);
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

        if (firstFile.uri === '' || secondFile.uri === '' || thirdFile.uri === '' || fourthFile.uri === '' || data.status_pernikahan === '' || data.jenis_usaha === '' || data.lama_usaha === '' || data.tempat_usaha === '') {
            setModalError({
                isVisible: true,
                description: 'Harap isi semua form!',
            });
            setIsLoading(false);
            return;
        } else {
            await apiClient.post('surat/permohonan-usaha', formData, {
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
                onPress={() => {
                    setModalSuccess({
                        isVisible: false,
                        description: '',
                    });
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
                    title="Form Permohonan Usaha"
                    text="Isi form dibawah ini untuk membuat permohonan surat"
                >
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
                        onPress={() => handleImagePicker('pengantar_rt')}
                    />
                    <InputFile
                        uri={secondFile.uri}
                        fileName={secondFile.name}
                        message={secondFile.message}
                        placeholder="Upload Fotokopi KTP Asli"
                        onPress={() => handleImagePicker('fc_ktp')}
                    />
                    <InputFile
                        uri={thirdFile.uri}
                        fileName={thirdFile.name}
                        message={thirdFile.message}
                        placeholder="Upload Fotokopi KK Asli"
                        onPress={() => handleImagePicker('fc_kk')}
                    />
                    <InputFile
                        uri={fourthFile.uri}
                        fileName={fourthFile.name}
                        message={fourthFile.message}
                        placeholder="Upload Foto Usaha"
                        onPress={() => handleImagePicker('foto_usaha')}
                    />
                    <ButtonVariant
                        title="Kirim Surat"
                        variant={{ color: '#fff', backgroundColor: PRIMARY_COLOR }}
                        margin={30}
                        isLoading={isLoading}
                        onPress={handleSubmit(onSubmit)}
                        icon={
                            <PaperPlane
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

export default FormUsaha;
