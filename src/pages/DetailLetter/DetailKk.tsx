import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Suspense, lazy } from 'react';
import { Text, View } from 'react-native';
import { AuthStackParamList } from '../Routes/IsAuth';

type Props = NativeStackScreenProps<AuthStackParamList, 'DetailKk'>;

const DetailKk = ({ navigation, route }: Props) => {

    console.log(route.params.id);

    return (
        <View>
            <Suspense fallback={<Text>Loading...</Text>}>
                <Text>DetailKk</Text>
            </Suspense>
        </View>
    );
};

export default DetailKk;
