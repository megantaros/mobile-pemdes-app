import React, { FC } from 'react';
import { TextInput, StyleSheet, View, Text, Image } from 'react-native';
import { DANGER_COLOR, PRIMARY_COLOR, PRIMARY_COLOR_LIGHT, PRIMARY_FONT } from '../style';

import ImageFile from '../../assets/icons/file-image.svg';
import PaperClip from '../../assets/icons/paperclip.svg';

interface Props {
    uri?: string;
    fileName: any;
    placeholder: string;
    onPress?: () => void;
}

const File = ({ uri }: any) => {
    return (
        <View style={styles.containerFile}>
            <Image
                source={{ uri: uri }}
                style={{ width: '100%', height: '100%' }}
            />
        </View>
    );
};

const InputFile: FC<Props> = ({ uri, fileName, placeholder, onPress }) => {

    const [border, setBorder] = React.useState<boolean>(true);

    const onFocus = () => {
        setBorder(!border);
    };

    return (
        <View
            style={styles.container}
        >
            {uri ? <File uri={uri} /> :
                <View style={styles.containerFile}>
                    <ImageFile
                        width={50}
                        height={50}
                        fill={PRIMARY_COLOR}
                    />
                    <Text style={styles.lableFile}>Tidak ada gambar yang diupload</Text>
                </View>
            }
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
                    onPressIn={onPress}
                    style={styles.input}
                    placeholder={placeholder}
                    onFocus={onFocus}
                    onBlur={!border ? onFocus : undefined}
                    value={fileName}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginVertical: 4,
    },
    icon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputSection: {
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
    containerFile: {
        width: '100%',
        height: 200,
        backgroundColor: PRIMARY_COLOR_LIGHT,
        borderRadius: 10,
        marginBottom: 4,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lableFile: {
        marginTop: 10,
        fontFamily: PRIMARY_FONT,
        fontSize: 12,
        color: PRIMARY_COLOR,
    },
    // textFile: {
    //     fontFamily: PRIMARY_FONT,
    //     fontSize: 10,
    //     color: PRIMARY_COLOR,
    // },
});

export default InputFile;
