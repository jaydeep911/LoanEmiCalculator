import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

type CommonTextInputProps = {
  // placeholder: string;
  onChangeText?: any;
  value?: any;
  keyboardType?: any;
  text: string;
  editable: boolean;
  multiline: boolean;
  maxLength: number;
};

const CommonTextInput = ({
  // placeholder,
  onChangeText,
  value,
  keyboardType,
  text,
  multiline,
  maxLength,
}: CommonTextInputProps) => {
  return (
    <View>
      <Text
        style={{
          // marginBottom: 10,
          marginTop: 15,
          fontSize: 14,
          color: '#5F7C9D',
        }}>
        {text}
      </Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          // placeholder={placeholder}
          placeholderTextColor="#B9B9B9"
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          multiline={multiline}
          maxLength={maxLength}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    height: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    justifyContent: 'center',
    shadowColor: '#000',
    // borderBottomWidth: 0.3,
    borderWidth: 0.3,
    borderRadius: 10,
    borderColor: 'black',
    marginTop: 10,
  },
  textInput: {
    marginLeft: 6,
    color: 'black',
    width: '100%',
    height: '100%',
  },
  icon: {marginRight: 30},
});

export default CommonTextInput;
