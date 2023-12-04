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

const initialValue: File = {
    uri: '',
    name: '',
    type: '',
    fileSize: 0,
    message: '',
};

type Props = NativeStackScreenProps<RootStackParamList, 'FormDatang'>;

const FormDatang = ({ navigation }: Props) => {

    const [firstFile, setFirstFile] = React.useState<File>(initialValue);
    const { handleSubmit } = useForm();

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

    const onSubmit = async () => {

        setIsLoading(true);

        const formData = new FormData();
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
            await apiClient.post('surat/permohonan-datang', formData, {
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
                    title="Form Permohonan Pindah Datang"
                    text="Isi form dibawah ini untuk membuat permohonan surat">
                    <InputFile
                        uri={firstFile.uri}
                        fileName={firstFile.name}
                        message={firstFile.message}
                        placeholder="Foto Surat Keterangan Pindah dari Capil"
                        onPress={() => handleImagePicker('foto_surat_ket_pindah_capil')}
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

export default FormDatang;
