import React, { FC } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { DANGER_COLOR, PRIMARY_COLOR, PRIMARY_FONT } from '../style';
import { Control, Controller } from 'react-hook-form';

interface Props {
    placeholder?: string;
    name: string;
    control?: Control<any>;
    rules?: any;
    children?: React.ReactNode;
    errors?: any;
    disabled?: boolean;
}

const TextArea: FC<Props> = ({ placeholder, control, name, children, rules, errors, disabled }) => {

    const [border, setBorder] = React.useState<boolean>(true);

    const onFocus = () => {
        setBorder(!border);
    };

    return (
        <View
            style={styles.container}
        >
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
                            style={styles.input}
                            placeholder={placeholder}
                            onFocus={onFocus}
                            onBlur={!border ? onFocus : onBlur}
                            onChangeText={onChange}
                            value={value}
                            multiline={true}
                            numberOfLines={4}
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

export default TextArea;
