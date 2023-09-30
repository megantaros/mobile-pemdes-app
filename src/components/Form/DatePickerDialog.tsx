import React, { FC, useState } from 'react';
import { StyleSheet, View, Text, KeyboardType, Button } from 'react-native';
import { DANGER_COLOR, PRIMARY_COLOR, PRIMARY_FONT } from '../style';
import { Control, Controller } from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import Calendar from '../../assets/icons/calendar-event.svg';

interface Props {
    name: string;
    control: Control<any>;
    rules?: any;
    errors?: any;
}

const DatePickerDialog: FC<Props> = ({ control, name, rules, errors }) => {

    const [border, setBorder] = React.useState<boolean>(true);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false);

    const formatDate = (inputDate: Date) => {
        const day = String(inputDate.getDate()).padStart(2, '0');
        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
        const year = String(inputDate.getFullYear());
        return `${day}-${month}-${year}`;
    };

    console.log(formatDate(date));


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
                            <Calendar
                                width={16}
                                height={16}
                                fill={PRIMARY_COLOR}
                            />
                        </View>
                        <Button
                            // keyboardType={keyType ? keyType : 'default'}
                            // style={styles.input}
                            // placeholder={placeholder}
                            // onFocus={onFocus}
                            // onBlur={!border ? onFocus : onBlur}
                            // onChangeText={onChange}
                            // value={value}
                            onPress={() => setOpen(true)}
                            title="Pilih Tanggal"
                        />
                        <DatePicker
                            modal
                            open={open}
                            date={date}
                            mode="date"
                            androidVariant="nativeAndroid"
                            onConfirm={(date) => {
                                setOpen(false);
                                setDate(date);
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
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

export default DatePickerDialog;
