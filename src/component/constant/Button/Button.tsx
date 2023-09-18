import React from 'react';
import {Pressable} from 'react-native';
import Colors from '../Colors';

import styled from 'styled-components';
import Icon from 'react-native-vector-icons/AntDesign';

type ButtonProps = {
  text?: any;
  onPress?: any;
  style?: any;
  btnColor?: any;
  fontSize?: any;
  fontFamily?: any;
  backArrow?: any;
};

const BtnView = styled.View({
  flexDirection: 'row',
  height: 45,
  paddingHorizontal: 22,
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  alignSelf: 'center',
  backgroundColor: Colors.appColor,
});
const BtnText = styled.Text(props => ({
  fontSize: 16,
  textAlign: 'center',
  ...props,
}));

const Button = ({
  text,
  onPress,
  fontSize,
  btnColor,
  backArrow,
}: ButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <BtnView borderColor={btnColor ? btnColor : Colors.appColor}>
        <BtnText fontSize={fontSize ? fontSize : '14px'} color="white">
          {text}
        </BtnText>
        {backArrow && (
          <Icon
            name="right"
            size={14}
            color={'white'}
            style={{marginLeft: 8}}
          />
        )}
      </BtnView>
    </Pressable>
  );
};
export default Button;
