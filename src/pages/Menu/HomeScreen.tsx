import React, { Suspense, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DANGER_COLOR, PRIMARY_BACKGROUND_COLOR, PRIMARY_COLOR } from '../../components/style';
import Layout from '../../components/Layout/Layout';

import FamilyCard from '../../assets/icons/game.svg';
import IdentityCard from '../../assets/icons/id-card.svg';
import Police from '../../assets/icons/user-police.svg';
import Domisili from '../../assets/icons/domisili.svg';
import Store from '../../assets/icons/store-alt.svg';
import HouseLeave from '../../assets/icons/house-leave.svg';
import HouseReturn from '../../assets/icons/house-return.svg';
import HorizontalItem from '../../components/HorizontalItem';
import ModalRules from '../../components/Modal/ModalRules';
import Section from '../../components/Section';
import ModalDanger from '../../components/Modal/ModalDanger';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import useGetUser from '../../hooks/Auth/useGetUser';
import Loading from '../../components/Loading';

const items = [
    {
        id: 1,
        title: 'Permohonan Pengantar KK',
        img: <FamilyCard width={30} height={30} fill={PRIMARY_COLOR} />,
    },
    {
        id: 2,
        title: 'Permohonan Pengantar KTP',
        img: <IdentityCard width={30} height={30} fill={PRIMARY_COLOR} />,
    },
    {
        id: 3,
        title: 'Permohonan Pengantar SKCK',
        img: <Police width={30} height={30} fill={PRIMARY_COLOR} />,
    },
    {
        id: 4,
        title: 'Permohonan Keterangan Domisili',
        img: <Domisili width={30} height={30} fill={PRIMARY_COLOR} />,
    },
    {
        id: 5,
        title: 'Permohonan Keterangan Usaha',
        img: <Store width={30} height={30} fill={PRIMARY_COLOR} />,
    },
    {
        id: 6,
        title: 'Permohonan Keterangan Pindah',
        img: <HouseLeave width={30} height={30} fill={PRIMARY_COLOR} />,
    },
    {
        id: 7,
        title: 'Permohonan Keterangan Datang',
        img: <HouseReturn width={30} height={30} fill={PRIMARY_COLOR} />,
    },
];

const mision = [
    '1. Meningkatkan sarana pertanian dan perekonomian yang ada di desa.',
    '2. Menyelenggarakan sistem pelayanan dasar dalam bidang pemerintahan, pembangunan, kemasyarakatan secara adil dan transparan.',
    '3. Mendorong terciptanya Lembaga Perekonomian Desa yang profesional dan meningkatkan derajat kehidupan masyarakat.',
    '4. Mendorong kegiatan dunia usaha guna menciptakan lapangan kerja.',
];

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const HomeScreen = ({ navigation }: Props) => {

    const [isVisible, setIsVisible] = React.useState(false);
    const [id, setId] = React.useState(0);
    const [modalUpdate, setModalUpdate] = React.useState(false);

    const { data } = useGetUser();

    useEffect(() => {
        data?.nik === null && setModalUpdate(true);
    }, [data?.nik]);

    const handlePress = (index: number) => {
        switch (index) {
            case 1:
                setId(index);
                setIsVisible(true);
                break;
            case 2:
                setId(index);
                setIsVisible(true);
                break;
            case 3:
                setId(index);
                setIsVisible(true);
                break;
            case 4:
                setId(index);
                setIsVisible(true);
                break;
            case 5:
                setId(index);
                setIsVisible(true);
                break;
            case 6:
                setId(index);
                setIsVisible(true);
                break;
            case 7:
                setId(index);
                setIsVisible(true);
                break;
            default:
                break;
        }
    };

    return (
        <Layout>
            <View style={styles.container}>
                <ModalDanger
                    isVisible={modalUpdate}
                    onPress={() => {
                        setModalUpdate(false);
                        navigation.navigate('InfoAccount');
                    }}
                    description="Anda belum melakukan update profil, silahkan update profil terlebih dahulu"
                />
                <ModalRules
                    id={id}
                    isVisible={isVisible}
                    onPress={() => setIsVisible(false)}
                />
                <View style={styles.sectionHeader}>
                    <Suspense fallback={<Loading />}>
                        <Text style={styles.sectionTitle}>Hi, {data?.nama_warga}</Text>
                    </Suspense>
                    <Text style={styles.sectionText}>Apakah ada yang bisa kami bantu?</Text>
                </View>
                <ScrollView
                    horizontal={true}
                    style={styles.wrapperScroll}
                    showsHorizontalScrollIndicator={false}
                >
                    {items.map((item, index) => (
                        <HorizontalItem
                            key={index}
                            {...item}
                            onPress={() => handlePress(item.id)}
                        />
                    ))}
                </ScrollView>
                <Section title="Visi">
                    <View style={styles.cardContainer}>
                        <Text style={[styles.text, { fontSize: 12, textAlign: 'center' }]}>
                            Menuju Desa Maju Mandiri
                        </Text>
                    </View>
                </Section>
                <Section title="Misi">
                    <View style={styles.cardContainer}>
                        {mision.map((item, index) => (
                            <Text key={index} style={styles.text}>
                                {item}
                            </Text>
                        ))}
                    </View>
                </Section>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    wrapperScroll: {
        height: 140,
        backgroundColor: 'fff',
        paddingVertical: 10,
    },
    sectionHeader: {
        width: '100%',
        height: 50,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Viga-Regular',
        color: PRIMARY_COLOR,
    },
    sectionText: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: PRIMARY_COLOR,
    },
    vision: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    cardContainer: {
        borderLeftColor: DANGER_COLOR,
        borderLeftWidth: 3,
        backgroundColor: '#fff',
        padding: 15,
        width: '100%',
        borderRadius: 5,
    },
    text: {
        fontFamily: 'Viga-Regular',
        fontSize: 10,
        fontWeight: '400',
        color: PRIMARY_COLOR,
    },
});

export default HomeScreen;
