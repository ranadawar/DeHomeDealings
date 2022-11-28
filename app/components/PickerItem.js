import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import RegularText from '../components/texts/RegularText';

function PickerItem({onPress, item}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <RegularText style={styles.text}>{item.label}</RegularText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItem;
