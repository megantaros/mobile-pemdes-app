import React from 'react';
import { View, StyleSheet } from 'react-native';
import Section from '../../components/Section';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../Routes/RouteAuth';

import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import ListLetters from '../../features/ListLetters/ListLetters';

const letters = [
    {
        id: Math.random(),
        title: 'Surat Pengantar KK',
        status: 'Terkirim',
        date: '28-10-2023',
    },
    {
        id: Math.random(),
        title: 'Surat Pengantar KTP',
        status: 'Terkirim',
        date: '28-10-2023',
    },
    {
        id: Math.random(),
        title: 'Surat Pengantar SKCK',
        status: 'Terkirim',
        date: '28-10-2023',
    },
    {
        id: Math.random(),
        title: 'Surat Keterangan Domisili',
        status: 'Terkirim',
        date: '28-10-2023',
    },
    {
        id: Math.random(),
        title: 'Surat Keterangan Usaha',
        status: 'Diterima',
        date: '28-10-2023',
    },
    {
        id: Math.random(),
        title: 'Surat Keterangan Pindah',
        status: 'Ditolak',
        date: '28-10-2023',
    },
    {
        id: Math.random(),
        title: 'Surat Keterangan Pindah Datang',
        status: 'Ditolak',
        date: '28-10-2023',
    },
];

type Props = NativeStackScreenProps<AuthStackParamList, 'StatusLetters'>;

const StatusLetters = ({ navigation }: Props) => {

    const handlePress = (id: number, title: string) => {
        switch (title) {
            case 'Surat Pengantar KK':
                navigation.navigate('DetailKk', { id });
                break;
            case 'Surat Pengantar KTP':
                navigation.navigate('DetailKtp', { id });
                break;
            default:
                break;
        }
    };

    return (
        <LayoutWithoutHeader>
            <View style={styles.container}>
                <Section
                    title="Permohonan Surat"
                    text="Status permohonan surat yang diajukan"
                >
                    {letters.map((letter, index) => (
                        <ListLetters key={index} {...letter} onPress={() => handlePress(letter.id, letter.title)} />
                    ))}
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
});

export default StatusLetters;
