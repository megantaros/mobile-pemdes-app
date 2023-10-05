import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import WarningIcon from '../../assets/icons/warning.svg';
import ButtonVariant from '../Form/Button';
import { DANGER_COLOR, PRIMARY_COLOR, SUCCESS_COLOR, WARNING_COLOR } from '../style';
import { useAppSelector } from '../../hooks/hooks';
import https from '../../utils/api/http';

interface Props {
    description: string;
    isVisible: boolean;
    onPress: () => void;
    navigation?: any;
}

const ModalConfirm: FC<Props> = ({ isVisible, onPress, description, navigation }) => {

    const [isLoading, setLoading] = React.useState<boolean>(false);

    const token = useAppSelector(state => state.user.token);
    const apiClient = https(token ? token : '');

    const onSubmit = async () => {
        setLoading(true);
        apiClient.post('/logout')
            .then((res) => {
                console.log(res.data.message);
                setLoading(false);
                navigation.replace('Login');
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

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
                    <ButtonVariant title="Tidak" onPress={onPress} variant={{ backgroundColor: SUCCESS_COLOR, color: '#fff' }} />
                    <ButtonVariant title="Ya" onPress={onSubmit} variant={{ backgroundColor: DANGER_COLOR, color: '#fff' }} isLoading={isLoading} />
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
        marginTop: 10,
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});

export default ModalConfirm;
