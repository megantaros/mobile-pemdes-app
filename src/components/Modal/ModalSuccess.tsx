import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import CheckCircelIcon from '../../assets/icons/check-circle.svg';
import ButtonVariant from '../Form/Button';
import { GRAY_COLOR, SUCCESS_COLOR, SUCCESS_COLOR_LIGHT } from '../style';

interface Props {
    description: string;
    isVisible: boolean;
    onPress: () => void;
}

const ModalSuccess: FC<Props> = ({ description, isVisible, onPress }) => {

    return (
        <Modal
            isVisible={isVisible}
            backdropOpacity={0.3}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={500}
            animationOutTiming={500}
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
        >
            <View style={styles.contentModal}>
                <View style={styles.headerModal}>
                    <CheckCircelIcon height={50} width={50} />
                    <Text style={styles.titleModal}>Selamat!</Text>
                </View>
                <Text style={styles.descModal}>{description}</Text>
                <View style={styles.modalAction}>
                    <ButtonVariant title="Ok" onPress={onPress} variant={{ backgroundColor: SUCCESS_COLOR, color: '#fff' }} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    contentModal: {
        borderRadius: 20,
        maxHeight: '50%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 10,
    },
    headerModal: {
        backgroundColor: SUCCESS_COLOR_LIGHT,
        padding: 15,
        borderRadius: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    titleModal: {
        fontFamily: 'Viga-Regular',
        fontSize: 16,
        color: SUCCESS_COLOR,
    },
    descModal: {
        fontFamily: 'Viga-Regular',
        fontSize: 12,
        color: GRAY_COLOR,
        textAlign: 'center',
    },
    modalAction: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});

export default ModalSuccess;
