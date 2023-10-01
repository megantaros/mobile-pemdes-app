import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { Dropdown } from 'react-native-element-dropdown';
import { DANGER_COLOR, PRIMARY_COLOR, PRIMARY_FONT } from '../style';

import PersonStanding from '../../assets/icons/person-standing.svg';
import PersonDress from '../../assets/icons/person-standing-dress.svg';
import List from '../../assets/icons/list-ul.svg';
import Islam from '../../assets/icons/islam.svg';
import Kristen from '../../assets/icons/kristen.svg';
import Katholik from '../../assets/icons/kristen.svg';
import Hindu from '../../assets/icons/hindhu.svg';
import Buddha from '../../assets/icons/hindhu.svg';
import Konghucu from '../../assets/icons/konghucu.svg';

interface Props {
    placeholder?: string;
    name: string;
    control: Control<any>;
    rules?: any;
    errors?: any;
    data: any;
    initialValue?: string;
}

const Select: FC<Props> = ({ placeholder, control, name, rules, errors, data, initialValue }) => {

    const [selectedItem, setSelectedItem] = React.useState<string>('');

    const renderItem = (item: any) => {
        return (
            <View style={styles.renderItem}>
                {item.value === 'Pria' && (
                    <PersonStanding style={styles.imageStyle} />
                )}
                {item.value === 'Wanita' && (
                    <PersonDress style={styles.imageStyle} />
                )}
                {item.value === 'Islam' && (
                    <Islam style={styles.imageStyle} fill="#022E57" width={16} height={16} />
                )}
                {item.value === 'Kristen' && (
                    <Kristen style={styles.imageStyle} fill="#022E57" width={16} height={16} />
                )}
                {item.value === 'Katholik' && (
                    <Katholik style={styles.imageStyle} fill="#022E57" width={16} height={16} />
                )}
                {item.value === 'Hindhu' && (
                    <Hindu style={styles.imageStyle} fill="#022E57" width={16} height={16} />
                )}
                {item.value === 'Budha' && (
                    <Buddha style={styles.imageStyle} fill="#022E57" width={16} height={16} />
                )}
                {item.value === 'Konghucu' && (
                    <Konghucu style={styles.imageStyle} fill="#022E57" width={16} height={16} />
                )}

                <Text style={styles.renderItemText}>{item.lable}</Text>
            </View>
        );
    };

    return (
        <View
            style={styles.container}
        >
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { onChange } }) => (
                    <Dropdown
                        style={styles.dropdown}
                        selectedTextStyle={styles.selectedTextStyle}
                        placeholderStyle={styles.placeholderStyle}
                        maxHeight={200}
                        value={initialValue ? initialValue : selectedItem}
                        data={data}
                        valueField="value"
                        labelField="lable"
                        placeholder={placeholder}
                        searchPlaceholder="Search..."
                        onChange={(e: any) => {
                            setSelectedItem(e.value);
                            onChange(e.value);
                        }}
                        renderLeftIcon={() => {
                            return <List style={styles.imageStyle} />;
                        }}
                        renderItem={renderItem}
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
    dropdown: {
        height: 50,
        marginVertical: 4,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 25,
        borderColor: '#fff',
        paddingHorizontal: 16,
        borderWidth: 1,
        fontFamily: PRIMARY_FONT,
    },
    imageStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        paddingHorizontal: 13,
    },
    placeholderStyle: {
        fontSize: 12,
        fontFamily: 'Viga-Regular',
        marginLeft: 7,
    },
    selectedTextStyle: {
        fontSize: 12,
        fontFamily: 'Viga-Regular',
        marginLeft: 10,
        color: PRIMARY_COLOR,
    },
    renderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    renderItemText: {
        fontSize: 12,
        fontFamily: 'Viga-Regular',
        marginLeft: 12,
        color: PRIMARY_COLOR,
    },
    onError: {
        fontFamily: PRIMARY_FONT,
        fontSize: 12,
        color: DANGER_COLOR,
        marginHorizontal: 10,
        marginVertical: 4,
    },
});

export default Select;
