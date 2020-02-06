/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from 'react';
import {
  Image, Platform, StyleSheet, Text, View
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import getImgSource from '../../utils/getImgSource.js';

// import components
import Icon from '../icon/Icon';
import TouchableItem from '../TouchableItem';

// import colors
import Colors from '../../theme/colors';

// ActionProductCardHorizontal Config
const IOS = Platform.OS === 'ios';
const MINUS_ICON = IOS ? 'ios-remove' : 'md-remove';
const PLUS_ICON = IOS ? 'ios-add' : 'md-add';
const imgHolder = require('../../assets/img/imgholder.png');

// ActionProductCardHorizontal Styles
const styles = StyleSheet.create({
  container: {
    margin: 4
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: '#f1f1f1',
    borderRadius: 4,
    backgroundColor: Colors.surface
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  productImg: {
    width: 116,
    height: 124,
    resizeMode: 'cover'
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between'
  },
  productDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 12,
  },
  title: {
    flex: 1,
    fontWeight: "500",
    fontSize: 16,
    color: Colors.primaryText,
    letterSpacing: 0.15
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  oldPrice: {
    fontSize: 15,
    fontWeight: "500",
    color: '#8e8e8e'
  },
  size: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8e8e8e'
  },
  hr: {
    position: 'absolute',
    top: 10,
    width: '82%',
    height: 1,
    backgroundColor: '#8e8e8e'
  },
  price: {
    fontWeight: "700",
    fontSize: 18,
    color: Colors.primaryColor
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 4
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  quantity: {
    top: -1,
    paddingHorizontal: 20,
    fontSize: 18,
    color: Colors.black,
    textAlign: 'center'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.secondaryColor
  },
  newLabelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottomRightRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.primaryColor
  },
  label: {
    fontSize: 12,
    color: Colors.onPrimaryColor
  }
});



// ActionProductCardHorizontal Props
type Props = {
  onPress: () => {},
  onPressRemove: () => void,
  onPressAdd: () => void,
  activeOpacity: number,
  imageUri: string,
  title: string,
  price: number,
  quantity: number,
  discountPercentage: number,
  swipeoutDisabled: boolean,
  swipeoutOnPressRemove: () => {},
  label: 'new'
};

// ActionProductCardHorizontal
export default class ActionProductCardHorizontal extends Component<Props> {
  constructor(props) {
    super(props);
  }

  onPressAdd = () => {
    const { onPressAdd = () => {} } = this.props;
    onPressAdd();
  };

  onPressRemove = () => {
    const { onPressRemove = () => {} } = this.props;
    onPressRemove();
  };

  renderLabel = (label) => {
    if (label === 'new') {
      return (
        <View style={styles.newLabelContainer}>
          <Text style={styles.label}>NEW</Text>
        </View>
      );
    }

    return <View />;
  };

  render() {
    const {
      activeOpacity,
      onPress,
      imageUri,
      title,
      price = 0,
      quantity = 0,
      size = 0,
      discountPercentage,
      swipeoutDisabled,
      swipeoutOnPressRemove,
      label,
    } = this.props;
    console.log('inside render ActionProductCardHorizontal, quantity is: '+ quantity);

    const swipeoutBtns = [
      {
        text: 'Remove',
        backgroundColor: Colors.error,
        onPress: swipeoutOnPressRemove,
        sensitivity: 100
      }
    ];

    // const size = parseInt(this.props.size);

    return (
      <View style={styles.container}>
        <Swipeout
          right={swipeoutBtns}
          autoClose
          backgroundColor={Colors.surface}
          disabled={swipeoutDisabled}
          style={styles.borderContainer}
        >
          {// (quantity > 0)
          (<TouchableItem activeOpacity={activeOpacity} onPress={onPress} borderless useForeground>
            <View style={styles.innerContainer}>
              <Image
                defaultSource={imgHolder}
                source={getImgSource(imageUri)}
                style={styles.productImg}
              />

              <View style={styles.productInfo}>
                <View style={styles.productDetails}>
                  <Text numberOfLines={2} style={styles.title}>
                    {title}
                  </Text>

                  {discountPercentage ? (
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>
                        {`${(((100 - discountPercentage) / 100) * price).toFixed(2)} lei`}
                      </Text>
                      <View>
                        <Text style={styles.oldPrice}>{`${price.toFixed(2)} lei`}</Text>
                        <View style={styles.hr} />
                      </View>
                    </View>
                  ) : (
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>{`${price.toFixed(2)} lei`}</Text>
                      {size > 0 &&  (<View>
                        <Text style={styles.size}>{`${size} ∅`}</Text>
                      </View>)}
                    </View>
                  )}
                </View>

                <View style={styles.actionContainer}>
                  {quantity > 0 && (
                    <View style={styles.actions}>
                      <TouchableItem onPress={this.onPressRemove} borderless>
                        <View style={styles.iconContainer}>
                          <Icon name={MINUS_ICON} size={20} color={Colors.onPrimaryColor} />
                        </View>
                      </TouchableItem>

                      <Text style={styles.quantity}>{quantity}</Text>
                    </View>
                  )}
                  <TouchableItem onPress={this.onPressAdd} borderless>
                    <View style={styles.iconContainer}>
                      <Icon name={PLUS_ICON} size={20} color={Colors.onPrimaryColor} />
                    </View>
                  </TouchableItem>
                </View>
              </View>

              {this.renderLabel(label)}
            </View>
          </TouchableItem>
          )}
        </Swipeout>
      </View>
    );
  }
}
