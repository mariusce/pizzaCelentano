/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import { StyleSheet } from 'react-native';
import type { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

// import components
import { ButtonText } from '../text/CustomText';

// import colors
import Colors from '../../theme/colors';

// LinkButton Styles
const styles = StyleSheet.create({
  title: {
    padding: 2,
    color: Colors.primaryColor
  }
});

// LinkButton Props
type Props = {
  onPress: () => void,
  title: string,
  titleStyle: StyleProp
};

// LinkButton
const LinkButton = ({ onPress, title, titleStyle }: Props) => (
  <ButtonText onPress={onPress} style={[styles.title, titleStyle]}>
    {title || 'Link Button'}
  </ButtonText>
);

export default LinkButton;
