import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type HeaderProps = {
  onPress?: any;
  text?: string;
  backArrow?: boolean;
  flexNumber?: number;
  isSearch?: boolean;
  isClose?: boolean;
  AddPayment?: boolean;
};

const CommonHeader = ({onPress, text, backArrow, AddPayment}: HeaderProps) => {
  return (
    <View style={styles.mainHeaderView}>
      <SafeAreaView style={styles.safeAreaColor} />

      <StatusBar
        backgroundColor="darkcyan"
        // barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}
        barStyle="light-content"
      />

      <View style={[styles.iconView]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {backArrow && (
            <Icon
              name="arrow-back"
              size={30}
              color={'white'}
              onPress={onPress}
            />
          )}

          <Text style={styles.headerText}>{text}</Text>
        </View>
        {AddPayment && (
          <View>
            <Icon
              name="add-circle"
              size={30}
              color={'white'}
              onPress={onPress}
            />
          </View>
        )}
      </View>

      <SafeAreaView />
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 12,
    textAlign: 'center',
  },
  iconView: {
    flexDirection: 'row',
    minHeight: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },

  mainHeaderView: {
    backgroundColor: 'darkcyan',
  },
});

export default CommonHeader;
