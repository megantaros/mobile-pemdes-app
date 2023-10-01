import React, { FC } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { DANGER_COLOR, PRIMARY_COLOR, PRIMARY_FONT } from '../style';

interface Props {
    placeholder?: string;
    children?: React.ReactNode;
    value?: string;
}

const TextAreaDisabled: FC<Props> = ({ placeholder, children, value }) => {

    const [border] = React.useState<boolean>(false);

    return (
        <View
            style={styles.container}
        >
            <View style={
                border ? styles.inputSection : { ...styles.inputSection, ...styles.inputSection.onfocus }
            }>
                <View style={styles.icon}>
                    {children}
                </View>
                <TextInput
                    disableFullscreenUI={true}
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    multiline={true}
                    numberOfLines={4}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    icon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    inputSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        minHeight: 100,
        borderRadius: 25,
        padding: 10,
        marginVertical: 4,
        borderColor: '#fff',
        borderWidth: 1,
        onfocus: {
            borderColor: PRIMARY_COLOR,
            borderWidth: 1,
            borderStyle: 'solid',
            backgroundColor: '#f5f4f1',
        },
    },
    input: {
        fontFamily: PRIMARY_FONT,
        fontSize: 12,
        color: PRIMARY_COLOR,
        flex: 6,
        textAlignVertical: 'top',
        paddingTop: 6,
    },
    onError: {
        fontFamily: PRIMARY_FONT,
        fontSize: 12,
        color: DANGER_COLOR,
        marginHorizontal: 10,
        marginVertical: 4,
    },
});

export default TextAreaDisabled;
