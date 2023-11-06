import React, { FC } from 'react';
import { TextInput, StyleSheet, View, Text, KeyboardType } from 'react-native';
import { DANGER_COLOR, PRIMARY_COLOR, PRIMARY_FONT } from '../style';
import { Control, Controller } from 'react-hook-form';

interface Props {
    placeholder?: string;
    name: string;
    control?: Control<any>;
    rules?: any;
    children?: React.ReactNode;
    errors?: any;
    keyType?: KeyboardType;
    disabled?: boolean;
}

const Input: FC<Props> = ({ placeholder, control, name, children, rules, errors, keyType, disabled }) => {

    const [border, setBorder] = React.useState<boolean>(true);

    const onFocus = () => {
        setBorder(!border);
    };

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={
                        border ? styles.inputSection : { ...styles.inputSection, ...styles.inputSection.onfocus }
                    }>
                        <View style={styles.icon}>
                            {children}
                        </View>
                        <TextInput
                            disableFullscreenUI={disabled ? disabled : false}
                            // aria-disabled={disabled ? disabled : false}
                            secureTextEntry={name === 'password' || name === 'confirm_password' ? true : false}
                            keyboardType={keyType ? keyType : 'default'}
                            style={styles.input}
                            placeholder={placeholder}
                            onFocus={onFocus}
                            onBlur={!border ? onFocus : onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    </View>
                )}
                name={name}
            />
            {errors && <Text
                style={styles.onError}
            >
                {errors?.message}
            </Text>}
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
    },
    inputSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        maxHeight: 50,
        borderRadius: 25,
        paddingHorizontal: 10,
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
    },
    onError: {
        fontFamily: PRIMARY_FONT,
        fontSize: 12,
        color: DANGER_COLOR,
        marginHorizontal: 10,
        marginVertical: 4,
    },
});

export default Input;
