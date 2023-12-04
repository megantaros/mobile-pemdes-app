import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import ButtonVariant from '../Form/Button';
import { PRIMARY_COLOR } from '../style';
import Info from '../../assets/icons/comment-info.svg';
import Memo from '../../assets/icons/memo-circle-check.svg';

interface Props {
    id?: number;
    title?: string;
    isVisible: boolean;
    onPress?: () => void;
}

const data_kk = [
    'Surat Pengantar RT/RW',
    'Scan KK Asli',
    'Scan KTP Asli',
    'Fotokopi Buku Nikah',
];

const data_ktp = [
    'Surat Pengantar RT/RW',
    'Scan KK Asli',
    'Scan KTP Asli',
];

const data_skck = [
    'Surat Pengantar RT/RW',
    'Fotokopi KTP',
];

const data_domisili = [
    'Surat Pengantar RT/RW',
    'Fotokopi KTP',
    'Fotokopi KK',
    'Foto Rumah',
];

const data_usaha = [
    'Surat Pengantar RT/RW',
    'Fotokopi KTP',
    'Fotokopi KK',
    'Foto Usaha',
];

const data_pindah = [
    'Surat Pengantar RT/RW',
    'Scan KTP Asli',
    'Scan KK Asli',
];

const data_datang = [
    'Scan Surat Pindah Asli',
];

const pengambilanSurat = [
    'Menunjukkan Kode Surat',
    'Dokumen Persyaratan Surat',
    'Dokumen dapat diambil pada hari Senin - Jumat pukul 08.00 - 14.00 WIB',
];

const ModalRules: FC<Props> = ({ id, isVisible, onPress }) => {

    return (
        <Modal
            isVisible={isVisible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={500}
            animationOutTiming={500}
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
        >
            <View style={styles.contentModal}>
                <Info height={40} width={40} fill={PRIMARY_COLOR} />
                <Text style={styles.titleModal}>Dokumen yang harus disiapkan</Text>

                {id === 1 && data_kk.map((item, index) => (
                    <View key={index} style={styles.rowModal}>
                        <Memo height={18} width={18} fill={PRIMARY_COLOR} />
                        <Text style={styles.descModal}>{item}</Text>
                    </View>
                ))}

                {id === 2 && data_ktp.map((item, index) => (
                    <View key={index} style={styles.rowModal}>
                        <Memo height={18} width={18} fill={PRIMARY_COLOR} />
                        <Text style={styles.descModal}>{item}</Text>
                    </View>
                ))}

                {id === 3 && data_skck.map((item, index) => (
                    <View key={index} style={styles.rowModal}>
                        <Memo height={18} width={18} fill={PRIMARY_COLOR} />
                        <Text style={styles.descModal}>{item}</Text>
                    </View>
                ))}

                {id === 4 && data_domisili.map((item, index) => (
                    <View key={index} style={styles.rowModal}>
                        <Memo height={18} width={18} fill={PRIMARY_COLOR} />
                        <Text style={styles.descModal}>{item}</Text>
                    </View>
                ))}

                {id === 5 && data_usaha.map((item, index) => (
                    <View key={index} style={styles.rowModal}>
                        <Memo height={18} width={18} fill={PRIMARY_COLOR} />
                        <Text style={styles.descModal}>{item}</Text>
                    </View>
                ))}

                {id === 6 && data_pindah.map((item, index) => (
                    <View key={index} style={styles.rowModal}>
                        <Memo height={18} width={18} fill={PRIMARY_COLOR} />
                        <Text style={styles.descModal}>{item}</Text>
                    </View>
                ))}

                {id === 7 && data_datang.map((item, index) => (
                    <View key={index} style={styles.rowModal}>
                        <Memo height={18} width={18} fill={PRIMARY_COLOR} />
                        <Text style={styles.descModal}>{item}</Text>
                    </View>
                ))}

                {id === 8 && pengambilanSurat.map((item, index) => (
                    <View key={index} style={styles.rowModal}>
                        <Memo height={18} width={18} fill={PRIMARY_COLOR} />
                        <Text style={styles.descModal}>{item}</Text>
                    </View>
                ))}

                <View style={styles.modalAction}>
                    <ButtonVariant
                        title="Ok"
                        onPress={onPress}
                        variant={{ backgroundColor: PRIMARY_COLOR, color: '#fff' }}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    contentModal: {
        flex: 1,
        maxHeight: '70%',
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 10,
    },
    titleModal: {
        fontFamily: 'Viga-Regular',
        fontSize: 14,
        color: PRIMARY_COLOR,
        marginBottom: 10,
    },
    textModal: {
        fontFamily: 'Viga-Regular',
        fontSize: 12,
        color: PRIMARY_COLOR,
    },
    rowModal: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        gap: 6,
        borderRadius: 10,
        backgroundColor: '#d4eaf7',
        padding: 15,
        // flex: 1,
    },
    descModal: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
    },
    modalAction: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%',
    },
});

export default ModalRules;
