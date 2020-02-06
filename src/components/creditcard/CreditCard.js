/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Color from 'color';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import type { ColorProp } from 'react-native/Libraries/StyleSheet/ColorPropType';

// import components
import GradientContainer from '../gradientcontainer/GradientContainer';
import { Caption, Heading6 } from '../text/CustomText';

// import colors
import Colors from '../../theme/colors';

// CreditCard Styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
    height: 228
  },
  creditCard: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  cardNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    maxWidth: 286
  },
  caption: {
    color: Color(Colors.white).alpha(0.8)
  },
  whiteText: {
    color: Colors.white
  }
});

// CreditCard Props
type Props = {
  colors: [ColorProp, ColorProp],
  brand: 'visa' | 'mastercard' | 'discover' | 'amex',
  last4Digits: number,
  cardHolder: string,
  expiry: string
};

// CreditCard
const CreditCard = ({
  colors, brand, last4Digits, cardHolder, expiry
}: Props) => (
  <View style={styles.container}>
    <GradientContainer colors={colors} containerStyle={styles.creditCard}>
      <View style={styles.cardInfo}>
        <FAIcon name={`cc-${brand}`} size={36} color={Colors.white} />
      </View>

      <View style={styles.cardNumberContainer}>
        <Heading6 style={styles.whiteText}>XXXX</Heading6>
        <Heading6 style={styles.whiteText}>XXXX</Heading6>
        <Heading6 style={styles.whiteText}>XXXX</Heading6>
        <Heading6 style={styles.whiteText}>{last4Digits}</Heading6>
      </View>

      <View style={styles.cardInfo}>
        <View>
          <Caption style={styles.caption}>Card Holder</Caption>
          <Heading6 style={styles.whiteText}>{cardHolder}</Heading6>
        </View>
        <View>
          <Caption style={styles.caption}>Expires</Caption>
          <Heading6 style={styles.whiteText}>{expiry}</Heading6>
        </View>
      </View>
    </GradientContainer>
  </View>
);

export default CreditCard;
