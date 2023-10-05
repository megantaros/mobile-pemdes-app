import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import WarningIcon from '../../assets/icons/warning.svg';
import ButtonVariant from '../Form/Button';
import { PRIMARY_COLOR, WARNING_COLOR } from '../style';

interface Props {
    description: string;
    isVisible: boolean;
    onPress: () => void;
}

const ModalDanger: FC<Props> = ({ isVisible, onPress, description }) => {

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
                <WarningIcon height={70} width={70} fill={WARNING_COLOR} />
                <Text
                    style={styles.titleModal}
                >
                    Warning !
                </Text>
                <Text
                    style={styles.descModal}
                >
                    {description}
                </Text>
                <View style={styles.modalAction}>
                    <ButtonVariant title="Ok" onPress={onPress} variant={{ backgroundColor: WARNING_COLOR, color: '#fff' }} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    contentModal: {
        flex: 1,
        borderRadius: 20,
        maxHeight: '50%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 10,
    },
    titleModal: {
        fontFamily: 'Viga-Regular',
        fontSize: 18,
        color: WARNING_COLOR,
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

export default ModalDanger;
