import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Layout from '../../components/Layout/Layout';
import Section from '../../components/Section';
import Card from '../../components/Card';

import PersonGear from '../../assets/icons/person-fill-gear.svg';
import PaperPlane from '../../assets/icons/paper-plane.svg';
import { DANGER_COLOR, DANGER_COLOR_LIGHT, PRIMARY_COLOR } from '../../components/style';
import SignOut from '../../assets/icons/sign-out-alt.svg';
import ModalConfirm from '../../components/Modal/ModalConfirm';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../Routes/RouteAuth';
// import { RootStackParamList } from '../../../App';

type Props = NativeStackScreenProps<AuthStackParamList, 'HomeTabs'>;

const AccountScreen = ({ navigation }: Props) => {

    const [isModalVisible, setModalVisible] = React.useState<boolean>(false);

    const handleModal = () => {
        setModalVisible(true);
    };

    return (
        <Layout>
            <ModalConfirm
                navigation={navigation}
                description="Apakah anda yakin ingin keluar dari aplikasi ?"
                isVisible={isModalVisible}
                onPress={() => setModalVisible(false)}
            />
            <View style={styles.container}>
                <Section
                    title="Pengaturan Akun"
                    text="Fitur pengaturan akun"
                >
                    <Card style={styles.cardStyle}>
                        <Pressable onPress={() => navigation.push('InfoAccount')} style={styles.cardContainer}>
                            <View style={styles.cardIcon}>
                                <PersonGear width={26} height={26} fill={PRIMARY_COLOR} />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.cardTitle}>Info Akun</Text>
                                <Text style={styles.cardText}>Lihat dan ubah info akun</Text>
                            </View>
                        </Pressable>
                    </Card>
                    <Card style={styles.cardStyle}>
                        <Pressable onPress={() => navigation.push('StatusLetters')} style={styles.cardContainer}>
                            <View style={styles.cardIcon}>
                                <PaperPlane width={26} height={26} fill={PRIMARY_COLOR} />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.cardTitle}>Status Surat</Text>
                                <Text style={styles.cardText}>Lihat permohonan surat</Text>
                            </View>
                        </Pressable>
                    </Card>
                    <Card style={styles.cardStyle}>
                        <Pressable onPress={handleModal} style={styles.cardContainer}>
                            <View style={styles.cardIconDanger}>
                                <SignOut width={26} height={26} fill={'#fff'} />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.cardTitle}>Logout</Text>
                                <Text style={styles.cardText}>Keluar dari aplikasi</Text>
                            </View>
                        </Pressable>
                    </Card>
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
    cardIconDanger: {
        padding: 10,
        backgroundColor: DANGER_COLOR_LIGHT,
        borderRadius: 10,
    },
    cardTitle: { fontFamily: 'Viga-Regular', color: PRIMARY_COLOR, fontSize: 14 },
    cardText: { fontFamily: 'Poppins-Regular', color: PRIMARY_COLOR, fontSize: 12 },
});

export default AccountScreen;
