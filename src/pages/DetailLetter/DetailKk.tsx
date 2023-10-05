import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Suspense, lazy } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { AuthStackParamList } from '../Routes/RouteAuth';
import LayoutWithoutHeader from '../../components/Layout/LayoutWithoutHeader';
import Section from '../../components/Section';
import Loading from '../../components/Loading';

const FormKk = lazy(() => delayForDemo(import('../../features/DetailForms/UpdateKk')));

function delayForDemo<T>(promise: Promise<T>, ms: number = 5000) {
    return new Promise<T>((resolve) => {
        setTimeout(() => {
            resolve(promise);
        }, ms);
    });
}

type Props = NativeStackScreenProps<AuthStackParamList, 'DetailKk'>;

const DetailKk = ({ route }: Props) => {

    return (
        <LayoutWithoutHeader>
            <View style={styles.container}>
                <Section
                    title="Detail Surat"
                    text="Silahkan lengkapi form dibawah ini"
                >
                    <Suspense fallback={<Loading />}>
                        <FormKk id={route.params.id} />
                    </Suspense>
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

export default DetailKk;
