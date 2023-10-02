import React, { FC } from 'react';
import { TextInput, StyleSheet, View, Text, KeyboardType } from 'react-native';
import { DANGER_COLOR, PRIMARY_COLOR, PRIMARY_FONT } from '../style';
import { Control, Controller } from 'react-hook-form';


import PaperClip from '../../assets/icons/paperclip.svg';
import { launchImageLibrary } from 'react-native-image-picker';

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

const InputFile: FC<Props> = ({ placeholder, control, name, rules, errors, keyType, disabled }) => {

    const [border, setBorder] = React.useState<boolean>(true);

    const [uriImg, setUriImg] = React.useState<any>(null);
    const [fileNameValue, setFileNameValue] = React.useState<any>(null);

    const handleImagePicker = async () => {
        const images = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
        });
        setUriImg(images.assets?.[0].uri);
        setFileNameValue(images.assets?.[0].fileName);
    };


    const onFocus = () => {
        setBorder(!border);
    };

    return (
        <View
            style={styles.container}
        >
            <View style={
                border ? styles.inputSection : { ...styles.inputSection, ...styles.inputSection.onfocus }
            }>
                <View style={styles.icon}>
                    <PaperClip
                        width={20}
                        height={20}
                        fill={PRIMARY_COLOR}
                    />
                </View>

                <TextInput
                    onPressIn={handleImagePicker}
                    disableFullscreenUI={disabled ? disabled : false}
                    secureTextEntry={name === 'password' || name === 'confirm_password' ? true : false}
                    keyboardType={keyType ? keyType : 'default'}
                    style={styles.input}
                    placeholder={placeholder}
                    onFocus={onFocus}
                    onBlur={!border ? onFocus : undefined}
                    value={fileNameValue ? fileNameValue : ''}
                />

            </View>
            <Controller
                control={control}
                rules={rules}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{ display: 'none' }}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value ? value : uriImg}
                    />
                )}

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
        minHeight: 42,
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

export default InputFile;
