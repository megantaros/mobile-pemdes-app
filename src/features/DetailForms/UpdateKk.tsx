import React from 'react';
import { useForm } from 'react-hook-form';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAppSelector } from '../../hooks/hooks';
import https from '../../utils/api/http';
import Input from '../../components/Form/Input';

import PersonCard from '../../assets/icons/person-vcard-fill.svg';
import Family from '../../assets/icons/users-alt.svg';
import { PRIMARY_COLOR } from '../../components/style';
import Select from '../../components/Form/Select';
import InputFile from '../../components/Form/InputFile';
import ButtonVariant from '../../components/Form/Button';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import ModalError from '../../components/Modal/ModalError';

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
    { lable: 'Membentuk Rumah Tangga Baru', value: '1' },
    { lable: 'KK Hilang/Rusak', value: '2' },
    { lable: 'Lainnnya', value: '3' },
];

interface Props {
    id: string;
}

const UpdateKk: React.FC<Props> = ({ id }) => {

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

        if (name === 'fc_buku_nikah') {
            setFourthFile({
                uri: images.assets?.[0].uri,
                name: images.assets?.[0].fileName,
                type: images.assets?.[0].type,
            });
        }

    };

    const token = useAppSelector((state) => state.user.token);
    const apiClient = https(token ? token : '');
    const BASE_IMG = 'http://192.168.1.18:8000/berkaspemohon/';

    const getDetailLetters = async () => {
        await apiClient.get(`surat/permohonan-kk/${id}/edit`).then((res) => {
            console.log(res.data.data);
            setValue('kk_lama', res.data.data.kk_lama);
            setValue('shdk', res.data.data.shdk);
            setValue('alasan_permohonan', res.data.data.alasan_permohonan);
            setValue('jml_angg_keluarga', (res.data.data.jml_angg_keluarga).toString());
            setFirstFile({
                uri: BASE_IMG + res.data.data.pengantar_rt,
                name: res.data.data.pengantar_rt,
                type: '',
            });
            setSecondFile({
                uri: BASE_IMG + res.data.data.foto_ktp,
                name: res.data.data.foto_ktp,
                type: '',
            });
            setThirdFile({
                uri: BASE_IMG + res.data.data.foto_kk,
                name: res.data.data.foto_kk,
                type: '',
            });
            setFourthFile({
                uri: BASE_IMG + res.data.data.fc_buku_nikah,
                name: res.data.data.fc_buku_nikah,
                type: '',
            });
        }).catch((err) => {
            console.log(err.response);
        });
    };

    React.useEffect(() => {
        getDetailLetters();
    }, []);

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

        formData.append('kk_lama', data.kk_lama);
        formData.append('shdk', data.shdk);
        formData.append('alasan_permohonan', data.alasan_permohonan);
        formData.append('jml_angg_keluarga', data.jml_angg_keluarga);
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

        await apiClient.post('surat/permohonan-kk', formData, {
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
        <>
            <ModalSuccess
                isVisible={isModalSuccess.isVisible}
                description={isModalSuccess.description}
                onPress={() => {
                    setModalSuccess({
                        isVisible: false,
                        description: '',
                    });
                }}
            />
            <ModalError
                isVisible={isModalError.isVisible}
                description={isModalError.description}
                onPress={() => setModalError({ isVisible: false, description: '' })}
            />
            <Input
                name="kk_lama"
                placeholder="Masukkan No. KK Lama"
                control={control}
                rules={{ required: 'No. KK Lama tidak boleh kosong' }}
                errors={errors.kk_lama}
            >
                <PersonCard
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
            <Input
                name="jml_angg_keluarga"
                placeholder="Masukkan Jumlah Anggota Keluarga"
                control={control}
                rules={{ required: 'Jumlah Anggota Keluarga tidak boleh kosong' }}
                errors={errors.jml_angg_keluarga}
            >
                <Family
                    width={16}
                    height={16}
                    fill={PRIMARY_COLOR}
                />
            </Input>
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
        </>
    );
};

export default UpdateKk;
