import React from 'react';
import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import { StyleSheet, View } from 'react-native';
import Section from '../../components/Section';

import PersonCard from '../../assets/icons/person-vcard-fill.svg';
import PaperPlane from '../../assets/icons/paper-plane.svg';
import Location from '../../assets/icons/geo-alt-fill.svg';
import { PRIMARY_COLOR } from '../../components/style';
import Input from '../../components/Form/Input';
import ButtonVariant from '../../components/Form/Button';
import { useForm } from 'react-hook-form';
import InputFile from '../../components/Form/InputFile';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAppSelector } from '../../hooks/hooks';
import https from '../../utils/api/http';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import ModalError from '../../components/Modal/ModalError';
import { RootStackParamList } from '../../../App';
import { File, IModalError, IModalSuccess } from '../../models/model';
import TextArea from '../../components/Form/TextArea';

const initialValue = {
    uri: '',
    name: '',
    type: '',
};

type Props = NativeStackScreenProps<RootStackParamList, 'FormDomisili'>;

const FormDomisili = ({ navigation }: Props) => {

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

        formData.append('kk', data.kk);
        formData.append('alamat_domisili', data.alamat_domisili);
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

        await apiClient.post('surat/permohonan-domisili', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((res) => {
            console.log(res);
            setModalSuccess({
                isVisible: true,
                description: 'Surat berhasil dikirim',
            });
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setModalError({
                isVisible: true,
                description: 'Surat gagal dikirim',
            });
            setIsLoading(false);
        });
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
                    navigation.navigate('Letters');
                }}
            />
            <ModalError
                isVisible={isModalError.isVisible}
                description={isModalError.description}
                onPress={() => setModalError({ isVisible: false, description: '' })}
            />
            <View style={styles.container}>
                <Section
                    title="Form Permohonan Domisili"
                    text="Isi form dibawah ini untuk membuat permohonan surat">
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

export default FormDomisili;
