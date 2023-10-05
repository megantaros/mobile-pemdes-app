import React from 'react';
import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import { StyleSheet, View } from 'react-native';
import Section from '../../components/Section';

import PersonCard from '../../assets/icons/person-vcard-fill.svg';
import { PRIMARY_COLOR } from '../../components/style';
import Input from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import ButtonVariant from '../../components/Form/Button';
import { useForm } from 'react-hook-form';
import InputFile from '../../components/Form/InputFile';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAppSelector } from '../../hooks/hooks';
import https from '../../utils/api/http';
import { AuthStackParamList } from '../Routes/RouteAuth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import ModalError from '../../components/Modal/ModalError';

const jenis_permohonan = [
    { value: 'Baru', lable: 'Baru' },
    { value: 'Perpanjangan', lable: 'Perpanjangan' },
    { value: 'Pergantian', lable: 'Pergantian' },
];

interface File {
    uri?: string;
    name?: string;
    type?: string;
}

const initialValue = {
    uri: '',
    name: '',
    type: '',
};

interface IModalError {
    isVisible: boolean;
    description: string;
}

interface IModalSuccess {
    isVisible: boolean;
    description: string;
}

type Props = NativeStackScreenProps<AuthStackParamList, 'FormKtp'>;

const FormKtp = ({ navigation }: Props) => {

    const [firstFile, setFirstFile] = React.useState<File>(initialValue);
    const [secondFile, setSecondFile] = React.useState<File>(initialValue);
    const [thirdFile, setThirdFile] = React.useState<File>(initialValue);

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

        if (name === 'foto_ktp') {
            setSecondFile({
                uri: images.assets?.[0].uri,
                name: images.assets?.[0].fileName,
                type: images.assets?.[0].type,
            });
        }

        if (name === 'foto_kk') {
            setThirdFile({
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
        formData.append('jenis_permohonan', data.jenis_permohonan);
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

        await apiClient.post('surat/permohonan-ktp', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((res) => {
            console.log(res.data.data);
            setModalSuccess({
                isVisible: true,
                description: 'Surat berhasil dikirim',
            });
            setIsLoading(false);
        }).catch((err) => {
            console.log(err.data);
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
                    navigation.navigate('StatusLetters');
                }}
            />
            <ModalError
                isVisible={isModalError.isVisible}
                description={isModalError.description}
                onPress={() => setModalError({ isVisible: false, description: '' })}
            />
            <View style={styles.container}>
                <Section
                    title="Form Permohonan KTP"
                    text="Isi form dibawah ini untuk membuat permohonan surat">
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
                    </Input>
                    <Select
                        name="jenis_permohonan"
                        placeholder="Pilih Jenis Permohonan"
                        control={control}
                        data={jenis_permohonan}
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
                    <ButtonVariant
                        title="Kirim Surat"
                        variant={{ color: '#fff', backgroundColor: PRIMARY_COLOR }}
                        margin={30}
                        onPress={handleSubmit(onSubmit)}
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

export default FormKtp;
