/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from "react";
import {FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View, Button} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

// import components
import ActionProductCardHorizontal from "../../components/cards/ActionProductCardHorizontal";
import { updateCart } from "../../actions/global.js";
import { updateProducts } from "../../actions/products.js";

// import colors
import Colors from "../../theme/colors";


// CategoryA Config

// CategoryA Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 12
  },
  titleText: {
    fontWeight: "700"
  },
  productList: {
    // spacing = padding + ActionProductCardHorizontal margin = 12 + 4 = 16
    padding: 12
  }
});

class CategoryA extends React.Component {
  constructor(props) {
    super(props);
    this.category = this.props.navigation.getParam('category');
    console.log('category is: ' + JSON.stringify(this.category));
    // this.products = _.filter(this.props.products, {'category': this.category.id});
    this.onPressAdd = this.onPressAdd.bind(this);
    this.onPressRemove = this.onPressRemove.bind(this);
  }

  static navigationOptions = ({navigation}) => {
    let categoryNav = navigation.getParam('category');
    return {
      title: categoryNav.name
    };
  };

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  navigateTo = (screen, product) => () => {
    const {navigation} = this.props;
    navigation.navigate(screen, {product: product});
  };

  onPressRemove = item => () => {
    let { quantity } = item;
    quantity -= 1;

    const { products } = this.props;
    const { cart } = this.props;
    if (products) {
      const index = products.indexOf(item);

      if (quantity < 0) {
        return;
      }
      products[index].quantity = quantity;

      this.props.dispatch(updateCart({items: cart.items - 1, total: cart.total - products[index].priceHome}));
      this.props.dispatch(updateProducts(_.unionBy(products, this.props.products, 'id')));
    }
  };

  onPressAdd = item => () => {
    const { quantity } = item;
    const { products } = this.props;
    const { cart } = this.props;

    if (products) {
      const index = products.indexOf(item);
      products[index].quantity = quantity + 1;

      this.props.dispatch(updateCart({items: cart.items + 1, total: cart.total + products[index].priceHome}));
      this.props.dispatch(updateProducts(_.unionBy(products, this.props.products, 'id')));
    }
  };

  keyExtractor = (item, index) => index.toString();

  renderProductItem = ({ item, index }) => (
    <ActionProductCardHorizontal
      onPress={this.navigateTo("Product", item)}
      onPressRemove={this.onPressRemove(item)}
      onPressAdd={this.onPressAdd(item)}
      swipeoutDisabled
      key={index}
      imageUri={item.imageUri}
      title={item.name}
      description={item.description}
      rating={item.rating}
      price={item.priceHome}
      quantity={item.quantity}
      size={item.size}
      discountPercentage={item.discountPercentage}
      label={item.label}
    />
  );

  render() {
    const products = _.filter(this.props.products, {'category': this.category.id});

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <FlatList
          data={products}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderProductItem}
          contentContainerStyle={styles.productList}
        />
      </SafeAreaView>
    );
  }
}

function mapStateToProps (state) {

  return {
    products: state.products && state.products.data,
    cart: state.global.cart
  }
}
export default connect(mapStateToProps)(CategoryA)
