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
};

const CommonTextInput = ({
  // placeholder,
  onChangeText,
  value,
  keyboardType,
  text,
  editable,
  multiline,
}: CommonTextInputProps) => {
  return (
    <View>
      <Text
        style={{
          marginBottom: 10,
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
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#000',
    borderBottomWidth: 0.8,
    // borderWidth: 1,
    // shadowOffset: {
    //   width: 0,
    //   height: 0.1,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 1,
    // elevation: 2,
  },
  textInput: {
    height: 50,
    marginLeft: 10,
    flex: 1,
    color: 'black',
  },

  icon: {marginRight: 30},
});

export default CommonTextInput;
