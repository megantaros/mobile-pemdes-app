import React, { FC } from 'react';
import Card from '../../components/Card';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { DANGER_COLOR, INFO_COLOR, PRIMARY_COLOR, SUCCESS_COLOR } from '../../components/style';

import TrashIcon from '../../assets/icons/trash-fill.svg';
import InfoAccount from '../../assets/icons/info.svg';
import SentIcon from '../../assets/icons/send-fill.svg';
import AcceptIcon from '../../assets/icons/send-check-fill.svg';
import RejectIcon from '../../assets/icons/send-x-fill.svg';

interface Props {
    title: string;
    status: string;
    date: string;
    onPress?: () => void;
}

const ListLetters: FC<Props> = ({ title, status, date, onPress }) => {


    const statusColor = (statusLetter: string) => {
        switch (statusLetter) {
            case 'Terkirim':
                return PRIMARY_COLOR;
            case 'Diterima':
                return SUCCESS_COLOR;
            case 'Ditolak':
                return DANGER_COLOR;
            default:
                return PRIMARY_COLOR;
        }
    };

    const statusIcon = (statusLetter: string) => {
        switch (statusLetter) {
            case 'Terkirim':
                return <SentIcon width={13} height={13} fill={PRIMARY_COLOR} />;
            case 'Diterima':
                return <AcceptIcon width={13} height={13} fill={SUCCESS_COLOR} />;
            case 'Ditolak':
                return <RejectIcon width={13} height={13} fill={DANGER_COLOR} />;
            default:
                return <SentIcon width={13} height={13} fill={PRIMARY_COLOR} />;
        }
    };

    const styles = StyleSheet.create({
        cardStyle: {
            width: '100%',
            borderLeftColor: statusColor(status),
            borderLeftWidth: 3,
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
            fontSize: 12,
            fontFamily: 'Poppins-Regular',
            color: statusColor(status),
            fontWeight: 'bold',
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
                <Text style={styles.titleLetter}>{title}</Text>
                <View style={styles.textStatus}>
                    {statusIcon(status)}
                    <Text style={styles.textLetter}>
                        {status}
                    </Text>
                </View>
                <Text style={styles.dateLetter}>Tanggal: {date}</Text>
            </View>
            <View style={styles.cardAction}>

                {status === 'Terkirim' && (
                    <>
                        <Pressable onPress={onPress} style={styles.btnInfo}>
                            <InfoAccount width={20} height={20} fill="#fff" />
                        </Pressable>
                        <Pressable onPress={() => console.log('Destroy')} style={styles.btnDestroy}>
                            <TrashIcon width={20} height={20} fill="#fff" />
                        </Pressable>
                    </>
                )}

                {status === 'Ditolak' && (
                    <>
                        <Pressable onPress={onPress} style={styles.btnInfo}>
                            <InfoAccount width={20} height={20} fill="#fff" />
                        </Pressable>
                        <Pressable onPress={() => console.log('Destroy')} style={styles.btnDestroy}>
                            <TrashIcon width={20} height={20} fill="#fff" />
                        </Pressable>
                    </>
                )}

                {status === 'Diterima' && (
                    <Pressable onPress={onPress} style={styles.btnInfo}>
                        <InfoAccount width={20} height={20} fill="#fff" />
                    </Pressable>
                )}
            </View>
        </Card>
    );
};


export default ListLetters;
