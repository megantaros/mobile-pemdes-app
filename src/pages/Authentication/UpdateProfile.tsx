import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_COLOR, PRIMARY_FONT, SECONDARY_COLOR, SECONDARY_FONT } from '../../components/style';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../../components/Card';
import Input from '../../components/Form/Input';
import { useForm } from 'react-hook-form';
import ModalSuccess from '../../components/Modal/ModalSuccess';
import TextArea from '../../components/Form/TextArea';
import PersonCard from '../../assets/icons/person-vcard-fill.svg';
import Mobile from '../../assets/icons/phone-fill.svg';
import Location from '../../assets/icons/geo-alt-fill.svg';
import Calendar from '../../assets/icons/calendar-event.svg';
import Work from '../../assets/icons/briefcase-fill.svg';
import Select from '../../components/Form/Select';
import ButtonVariant from '../../components/Form/Button';
import { AuthStackParamList } from '../Routes/IsAuth';

const sex = [
    {
        value: 'Pria',
        lable: 'Pria',
    },
    {
        value: 'Wanita',
        lable: 'Wanita',
    },
];

const religion = [
    {
        value: 'Islam',
        lable: 'Islam',
    },
    {
        value: 'Kristen',
        lable: 'Kristen',
    },
    {
        value: 'Katholik',
        lable: 'Katholik',
    },
    {
        value: 'Hindhu',
        lable: 'Hindhu',
    },
    {
        value: 'Budha',
        lable: 'Budha',
    },
    {
        value: 'Konghucu',
        lable: 'Konghucu',
    },
];

type Props = NativeStackScreenProps<AuthStackParamList, 'UpdateProfile'>;

const UpdateProfile = ({ navigation }: Props) => {

    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            notelpon: '',
            nik: '',
            ttl: '',
            jenis_kelamin: '',
            pekerjaan: '',
            agama: '',
            alamat: '',
        },
    });

    const onSubmit = (data: Object) => {
        console.log(data);
        navigation.push('AuthRoutes');
    };

    return (
        <SafeAreaView
            style={styles.container}
        >
            {/* <ModalSuccess
                isVisible={isModalVisible}
                onPress={() => setModalVisible(!isModalVisible)}
                description="Anda telah berhasil login, silahkan lengkapi profil Anda"
            /> */}
            <ScrollView
                style={styles.scroll_view}
            >
                <View
                    style={styles.container_header}
                >
                    <Text style={styles.title_header}>Lengkapi Profil</Text>
                    <Text style={styles.text_header}>Pastikan data yang Anda masukkan sesuai agar proses administrasi berjalan dengan baik</Text>
                </View>
                <View
                    style={styles.container_form}
                >
                    <Card color={PRIMARY_BACKGROUND_COLOR}>
                        <Input
                            name="nik"
                            placeholder="Masukkan NIK"
                            control={control}
                        >
                            <PersonCard
                                width={16}
                                height={16}
                                fill={PRIMARY_COLOR}
                            />
                        </Input>
                        <Input
                            name="notelpon"
                            placeholder="Masukkan No. Telepon"
                            control={control}
                            keyType="phone-pad"
                        >
                            <Mobile
                                width={16}
                                height={16}
                                fill={PRIMARY_COLOR}
                            />
                        </Input>
                        <Input
                            name="ttl"
                            placeholder="Masukkan Tempat, Tgl Lahir"
                            control={control}
                        >
                            <Calendar
                                width={16}
                                height={16}
                                fill={PRIMARY_COLOR}
                            />
                        </Input>
                        <Input
                            name="pekerjaan"
                            placeholder="Masukkan pekerjaan"
                            control={control}
                        >
                            <Work
                                width={16}
                                height={16}
                                fill={PRIMARY_COLOR}
                            />
                        </Input>
                        <Select
                            name="jenis_kelamin"
                            placeholder="Pilih Jenis Kelamin"
                            control={control}
                            data={sex}
                        />
                        <Select
                            name="agama"
                            placeholder="Pilih Agama"
                            control={control}
                            data={religion}
                        />
                        <TextArea
                            name="alamat"
                            placeholder="Masukkan alamat"
                            control={control}
                        >
                            <Location
                                width={16}
                                height={16}
                                fill={PRIMARY_COLOR}
                            />
                        </TextArea>
                        <ButtonVariant
                            title="Update Profile"
                            variant={{ color: '#fff', backgroundColor: PRIMARY_COLOR }}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </Card>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    scroll_view: {
        flex: 1,
        width: '100%',
    },
    container_header: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
        minHeight: 230,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    title_header: {
        color: SECONDARY_COLOR,
        fontSize: 18,
        fontWeight: '500',
        fontFamily: PRIMARY_FONT,
    },
    text_header: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '400',
        fontFamily: SECONDARY_FONT,
        textAlign: 'center',
        marginTop: 10,
    },
    container_form: {
        flex: 1,
        backgroundColor: 'transparent',
        width: '100%',
        padding: 20,
        marginTop: -120,
    },
});

export default UpdateProfile;
