import React, { FC } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PRIMARY_BACKGROUND_COLOR } from '../../components/style';
import Header from '../Header/Header';

interface Props {
    children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <SafeAreaView
            style={styles.container}
        >
            <ScrollView>
                <Header />
                {children}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
        justifyContent: 'center',
    },
});

export default Layout;
