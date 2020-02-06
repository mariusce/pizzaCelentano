/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

// import colors
import Colors from '../../theme/colors';

// TabBadgeIcon Config

// TabBadgeIcon Styles
const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.secondaryColor
  },
  badgeText: {
    top: -0.5,
    fontSize: 10,
    color: Colors.onSecondaryColor
  }
});

// TabBadgeIcon
class TabBadgeIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cartItems = this.props && this.props.cart && this.props.cart.items || 0;
    return (
      <View>
        <Icon name={this.props.focused ? 'cart' : 'cart-outline'} size={24} color={this.props.tintColor} />
        {cartItems > 0 && 
        (<View style={styles.badge}>
          <Text style={styles.badgeText}>{cartItems}</Text>
        </View>)}
      </View>
      )
  }
}

function mapStateToProps (state)
{
  return {
    cart: state.global.cart,
  }
}
export default connect(mapStateToProps)(TabBadgeIcon);
