import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import XCircelIcon from '../../assets/icons/x-circle.svg';
import ButtonVariant from '../Form/Button';
import { DANGER_COLOR, PRIMARY_COLOR } from '../style';

interface Props {
    description: string;
    isVisible: boolean;
    onPress: () => void;
}

const ModalError: FC<Props> = ({ isVisible, onPress, description }) => {

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
                <XCircelIcon height={70} width={70} />
                <Text
                    style={styles.titleModal}
                >
                    Error !
                </Text>
                <Text
                    style={styles.descModal}
                >
                    {description}
                </Text>
                <View style={styles.modalAction}>
                    <ButtonVariant title="Ok" onPress={onPress} variant={{ backgroundColor: DANGER_COLOR, color: '#fff' }} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    contentModal: {
        flex: 1,
        borderRadius: 20,
        maxHeight: 250,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 10,
    },
    titleModal: {
        fontFamily: 'Viga-Regular',
        fontSize: 14,
        color: DANGER_COLOR,
    },
    descModal: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: PRIMARY_COLOR,
        textAlign: 'center',
    },
    modalAction: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});

export default ModalError;
