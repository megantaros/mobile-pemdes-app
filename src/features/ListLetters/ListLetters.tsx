import React from 'react';
import Card from '../../components/Card';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { DANGER_COLOR, INFO_COLOR, PRIMARY_COLOR, SUCCESS_COLOR, WARNING_COLOR } from '../../components/style';

import TrashIcon from '../../assets/icons/trash-fill.svg';
import InfoAccount from '../../assets/icons/info.svg';
// import SentIcon from '../../assets/icons/send-fill.svg';
// import AcceptIcon from '../../assets/icons/send-check-fill.svg';
// import RejectIcon from '../../assets/icons/send-x-fill.svg';
// import WaitingIcon from '../../assets/icons/waiting.svg';
// import VerifyIcon from '../../assets/icons/verifying.svg';
import { ILetters } from '../../models/model';

const ListLetters = ({ jenis_surat, status, tanggal, onPress, onDestroy }: ILetters) => {

    const statusColor = (statusLetter: string) => {
        switch (statusLetter) {
            case '1':
                return WARNING_COLOR;
            case '2':
                return WARNING_COLOR;
            case '3':
                return WARNING_COLOR;
            case '4':
                return SUCCESS_COLOR;
            case '5':
                return SUCCESS_COLOR;
            case '6':
                return DANGER_COLOR;
            default:
                return PRIMARY_COLOR;
        }
    };

    const statusSurat = (statusLetter: string) => {
        switch (statusLetter) {
            case '1':
                return (
                    <View style={styles.textStatus}>
                        {/* <SentIcon width={13} height={13} fill={PRIMARY_COLOR} /> */}
                        <Text style={[styles.textLetter, { backgroundColor: WARNING_COLOR }]}>Permohonan Surat Pending</Text>
                    </View>
                );
            case '2':
                return (
                    <View style={styles.textStatus}>
                        {/* <VerifyIcon width={13} height={13} fill={WARNING_COLOR} /> */}
                        <Text style={[styles.textLetter, { backgroundColor: WARNING_COLOR }]}>Surat Sedang Diverifikasi</Text>
                    </View>
                );
            case '3':
                return (
                    <View style={styles.textStatus}>
                        {/* <WaitingIcon width={13} height={13} fill={WARNING_COLOR} /> */}
                        <Text style={[styles.textLetter, { backgroundColor: WARNING_COLOR }]}>Surat Sedang Diproses</Text>
                    </View>
                );
            case '4':
                return (
                    <View style={styles.textStatus}>
                        {/* <AcceptIcon width={13} height={13} fill={SUCCESS_COLOR} /> */}
                        <Text style={[styles.textLetter, { backgroundColor: SUCCESS_COLOR }]}>Surat Telah Ditandatangani oleh Kades</Text>
                    </View>
                );
            case '5':
                return (
                    <View style={styles.textStatus}>
                        {/* <AcceptIcon width={13} height={13} fill={SUCCESS_COLOR} /> */}
                        <Text style={[styles.textLetter, { backgroundColor: SUCCESS_COLOR }]}>Surat Dapat Diambil di Kantor Kepala Desa</Text>
                    </View>
                );
            case '6':
                return (
                    <View style={styles.textStatus}>
                        {/* <RejectIcon width={13} height={13} fill={DANGER_COLOR} /> */}
                        <Text style={[styles.textLetter, { backgroundColor: DANGER_COLOR }]}>Surat Ditolak</Text>
                    </View>
                );
            default:
                return (
                    <View style={styles.textStatus}>
                        {/* <SentIcon width={13} height={13} fill={PRIMARY_COLOR} /> */}
                        <Text style={styles.textLetter}>Permohonan Surat Pending</Text>
                    </View>
                );
        }
    };

    const formattedDate = (dateString: string) => {

        const monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
        ];

        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }

        const day = String(date.getDate()).padStart(2, '0');
        const month = monthNames[date.getMonth()];
        const year = String(date.getFullYear());

        return `${day} ${month} ${year}`;
    };

    const styles = StyleSheet.create({
        cardStyle: {
            width: '100%',
            borderLeftColor: statusColor(status ? status : ''),
            borderLeftWidth: 5,
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: 10,
        },
        cardContainer: {
            justifyContent: 'space-between',
            flex: 1,
        },
        cardAction: {
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            flexDirection: 'row',
            gap: 5,
        },
        textStatus: { flexDirection: 'row', gap: 5, alignItems: 'center' },
        btnDestroy: {
            backgroundColor: DANGER_COLOR,
            padding: 5,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
        },
        btnInfo: {
            backgroundColor: INFO_COLOR,
            padding: 5,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
        },
        titleLetter: {
            fontSize: 14,
            fontFamily: 'Viga-Regular',
            color: PRIMARY_COLOR,
        },
        textLetter: {
            fontSize: 8,
            fontFamily: 'Poppins-Regular',
            paddingVertical: 3,
            paddingHorizontal: 8,
            fontWeight: '500',
            borderRadius: 15,
            color: '#fff',
            marginTop: 2,
        },
        dateLetter: {
            fontSize: 10,
            fontFamily: 'Poppins-Regular',
            marginTop: 15,
        },
    });


    return (
        <Card style={styles.cardStyle}>
            <View style={styles.cardContainer}>
                <Text style={styles.titleLetter}>{jenis_surat}</Text>
                <View style={styles.textStatus}>
                    {statusSurat(status ? status : '')}
                </View>
                <Text style={styles.dateLetter}>Tanggal: {formattedDate(tanggal)}</Text>
            </View>
            <View style={styles.cardAction}>

                {status === '1' ? (
                    <>
                        <Pressable onPress={onPress} style={styles.btnInfo}>
                            <InfoAccount width={20} height={20} fill="#fff" />
                        </Pressable>
                        <Pressable onPress={onDestroy} style={styles.btnDestroy}>
                            <TrashIcon width={20} height={20} fill="#fff" />
                        </Pressable>
                    </>
                ) : (
                    <Pressable onPress={onPress} style={styles.btnInfo}>
                        <InfoAccount width={20} height={20} fill="#fff" />
                    </Pressable>
                )}

            </View>
        </Card>
    );
};


export default ListLetters;
