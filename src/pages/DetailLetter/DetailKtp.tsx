import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AuthStackParamList } from '../Routes/IsAuth';
import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import Section from '../../components/Section';
import Select from '../../components/Form/Select';
import { useForm } from 'react-hook-form';
import Input from '../../components/Form/Input';
import TextAreaDisabled from '../../components/DisabledForm/TextAreaDisabled';

import { launchImageLibrary } from 'react-native-image-picker';

import PersonFill from '../../assets/icons/person-fill.svg';
import PersonCard from '../../assets/icons/person-vcard-fill.svg';
import Location from '../../assets/icons/geo-alt-fill.svg';
import ButtonVariant from '../../components/Form/Button';
import { PRIMARY_COLOR } from '../../components/style';
import PaperClip from '../../assets/icons/paperclip.svg';
import InputDisabled from '../../components/DisabledForm/InputDisabled';

const jenis_permohonan = [
    { value: 'Baru', lable: 'Baru' },
    { value: 'Perpanjangan', lable: 'Perpanjangan' },
    { value: 'Pergantian', lable: 'Pergantian' },
];

type Props = NativeStackScreenProps<AuthStackParamList, 'DetailKtp'>;

const DetailKtp = ({ navigation, route }: Props) => {

    // console.log(route.params.id);

    const [selectedImage, setSelectedImage] = React.useState<any>(null);

    const handleImagePicker = async () => {
        const images = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
        });
        console.log(images.assets?.[0].fileName);
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            pengantar_rt: '',
            jenis_permohonan: '',
            kk: '',
            foto_ktp: '',
            foto_kk: '',
        },
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <LayoutWithoutHeader>
            <View style={styles.container}>
                <Section title="Detail Permohonan KTP" text="Pastikan data terisi dengan benar">
                    <InputDisabled
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
                    </Input>
                    <Select
                        name="jenis_permohonan"
                        placeholder="Pilih Jenis Permohonan"
                        control={control}
                        data={jenis_permohonan}
                    />
                    <Input
                        name="pengantar_rt"
                        placeholder="Upload Pengantar RT"
                        control={control}
                    >
                        <PaperClip
                            width={20}
                            height={20}
                            fill={PRIMARY_COLOR}
                        />
                    </Input>
                    <Input
                        name="foto_ktp"
                        placeholder="Upload Foto KTP"
                        control={control}
                    >
                        <PaperClip
                            width={20}
                            height={20}
                            fill={PRIMARY_COLOR}
                        />
                    </Input>
                    <Input
                        name="foto_kk"
                        placeholder="Upload Foto KK"
                        control={control}
                    >
                        <PaperClip
                            width={20}
                            height={20}
                            fill={PRIMARY_COLOR}
                        />
                    </Input>
                    <Button onPress={handleImagePicker} title="Upload Foto" />
                    <ButtonVariant
                        title="Update Profile"
                        variant={{ color: '#fff', backgroundColor: PRIMARY_COLOR }}
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

export default DetailKtp;
