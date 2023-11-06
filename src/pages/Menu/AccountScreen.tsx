import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Layout from '../../components/Layout/Layout';
import Section from '../../components/Section';
import Card from '../../components/Card';

import PersonGear from '../../assets/icons/person-fill-gear.svg';
import PaperPlane from '../../assets/icons/paper-plane.svg';
import { DANGER_COLOR, PRIMARY_COLOR, SUCCESS_COLOR_LIGHT } from '../../components/style';
import SignOut from '../../assets/icons/sign-out-alt.svg';
import ModalConfirm from '../../components/Modal/ModalConfirm';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { ICard } from '../../models/model';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import https from '../../utils/api/http';
import { setUser } from '../../stores/user';

type Props = NativeStackScreenProps<RootStackParamList, 'SettingScreen'>;

const SettingScreen = ({ navigation }: Props) => {

    const [isModalVisible, setModalVisible] = React.useState<boolean>(false);

    const cardItems: ICard[] = [
        {
            title: 'Info Akun',
            text: 'Lihat dan ubah info akun',
            onPress: () => { navigation.navigate('InfoAccount'); },
            styles: styles.cardIcon,
            icon: <PersonGear width={26} height={26} fill={PRIMARY_COLOR} />,
        },
        {
            title: 'Status Surat',
            text: 'Lihat permohonan surat',
            onPress: () => { navigation.navigate('Letters'); },
            styles: styles.cardIconSuccess,
            icon: <PaperPlane width={26} height={26} fill={PRIMARY_COLOR} />,
        },
        {
            title: 'Logout',
            text: 'Keluar dari aplikasi',
            onPress: () => { setModalVisible(true); },
            styles: styles.cardIconDanger,
            icon: <SignOut width={26} height={26} fill="#fff" />,
        },
    ];

    const [isLoading, setLoading] = React.useState<boolean>(false);

    const token = useAppSelector(state => state.user.token);
    const dispatch = useAppDispatch();
    const apiClient = https(token ? token : '');

    const onLogout = async () => {
        setLoading(true);
        apiClient.post('logout')
            .then((res) => {
                console.log(res);
                setLoading(false);
                dispatch(setUser({
                    id_warga: '',
                    token: '',
                    isLoggedIn: false,
                }));
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    return (
        <Layout>
            <ModalConfirm
                description="Apakah anda yakin ingin logout ?"
                isVisible={isModalVisible}
                onCancle={() => setModalVisible(false)}
                onConfirm={onLogout}
                isLoading={isLoading}
            />
            <View style={styles.container}>
                <Section title="Pengaturan Akun" text="Fitur pengaturan akun">
                    {cardItems.map((item, index) => (
                        <Card key={index} style={styles.cardStyle}>
                            <Pressable onPress={item.onPress} style={styles.cardContainer}>
                                <View style={item.styles}>{item.icon}</View>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.cardTitle}>{item.title}</Text>
                                    <Text style={styles.cardText}>{item.text}</Text>
                                </View>
                            </Pressable>
                        </Card>
                    ))}
                </Section>
            </View>
        </Layout>
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
    cardStyle: {
        width: '100%',
        marginVertical: 5,
        borderLeftColor: DANGER_COLOR,
        borderLeftWidth: 3,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    cardIcon: {
        padding: 10,
        backgroundColor: '#d4eaf7',
        borderRadius: 10,
    },
    cardIconSuccess: {
        padding: 10,
        backgroundColor: SUCCESS_COLOR_LIGHT,
        borderRadius: 10,
    },
    cardIconDanger: {
        padding: 10,
        backgroundColor: DANGER_COLOR,
        borderRadius: 10,
    },
    cardTitle: { fontFamily: 'Viga-Regular', color: PRIMARY_COLOR, fontSize: 14 },
    cardText: { fontFamily: 'Poppins-Regular', color: PRIMARY_COLOR, fontSize: 12 },
});

export default SettingScreen;
