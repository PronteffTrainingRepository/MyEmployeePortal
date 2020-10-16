import React, { useState } from "react";
import { View, Button, Platform, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export const DatePickerComponent = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <View style={{ marginTop: 60 }}>
      <View>
        <Button onPress={() => setShow(true)} title="Show date picker!" />
      </View>
      <View>
        <Text>
          {date.getFullYear() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getDate()}
        </Text>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={date}
          is24Hour={true}
          display="calendar"
          onChange={onChange}
          //   dateFormat={"yyyy"}
          maximumDate={
            new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
          }
        />
      )}
    </View>
  );
};

export default DatePickerComponent;
