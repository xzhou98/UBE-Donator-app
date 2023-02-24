import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {COLORS} from '../../constants/theme';

const FormInput = ({
  labelText = '',
  placeholderText = '',
  onChangeText = null,
  value = null,
  ...more
}) => {
  return (
    <View style={{width: '100%', marginBottom: 10}}>
      <Text>{labelText}</Text>
      <TextInput
        style={{
          padding: 9,
          paddingLeft:20,
          borderColor: COLORS.black + '50',
          borderWidth: 1,
          width: '100%',
          borderRadius: 8,
          // marginTop: 10,
        }}
        placeholder={placeholderText}
        onChangeText={onChangeText}
        value={value}
        {...more}
      />
    </View>
  );
};

export default FormInput;
