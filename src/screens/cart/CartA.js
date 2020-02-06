/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component, Fragment } from "react";
import { StatusBar, StyleSheet, View, FlatList } from "react-native";
import _ from 'lodash';
import remove from "lodash/remove";
import { connect } from 'react-redux';
import { SafeAreaView } from "react-navigation";
import { updateCart } from "../../actions/global.js";
import { updateProducts } from "../../actions/products.js";

// import components
import ActionProductCardHorizontal from "../../components/cards/ActionProductCardHorizontal";
import Button from "../../components/buttons/Button";
import { Heading6, Subtitle1 } from "../../components/text/CustomText";
import Divider from "../../components/divider/Divider";
import EmptyState from "../../components/emptystate/EmptyState";

// import colors
import Colors from "../../theme/colors";

// CartA Config
const EMPTY_STATE_ICON = "cart-remove";

// CartA Styles
const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  inline: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24
  },
  titleText: {
    fontWeight: "700",
  },
  productList: {
    // spacing = paddingHorizontal + ActionProductCardHorizontal margin = 12 + 4 = 16
    paddingHorizontal: 12
  },
  subTotalText: {
    top: -2,
    fontWeight: "500",
    color: Colors.onSurface
  },
  subTotalPriceText: {
    fontWeight: "700",
    color: Colors.primaryColor
  },
  bottomButtonContainer: {
    width: "100%",
    padding: 16
  }
});

// CartA
class CartA extends Component {
  constructor(props) {
    super(props);

    this.onPressRemove = this.onPressRemove.bind(this);
    this.onPressAdd = this.onPressAdd.bind(this);
  }

  componentDidMount() {
    const total = this.calculateTotalAmount();
    const items = this.calculateQuantity();
    this.props.dispatch(updateCart({items: items, total: parseFloat(total*1.00)}));
  };

  navigateTo = (screen, item) => () => {
    const { navigation } = this.props;
    navigation.navigate(screen, {product: item});
  };

  swipeoutOnPressRemove = item => () => {
    const { products } = this.props;
    const { cart } = this.props;
    const index = products.indexOf(item);

    const quantity = item.quantity*1.00;
    const price = item.priceHome*1.00;

    // products = remove(products, n => products.indexOf(n) !== index);
    products[index].quantity = 0;

    this.props.dispatch(updateCart({items: cart.items - quantity, total: parseFloat(cart.total*1.00 - quantity*price)}));
    this.props.dispatch(updateProducts(products));
  };

  onPressRemove = item => () => {
    let { quantity } = item;
    quantity -= 1;

    const { products } = this.props;
    const { cart } = this.props;

    const index = products.indexOf(item);
    products[index].quantity = quantity;
    
    // if (products) {
    //   const index = products.indexOf(item);

    //   if (quantity === 0) {
    //     products = remove(products, n => products.indexOf(n) !== index);
    //   } else {
    //     products[index].quantity = quantity;
    //   }

    this.props.dispatch(updateCart({items: cart.items - 1, total: parseFloat(cart.total*1.00 - item.priceHome*1.00)}));
    this.props.dispatch(updateProducts(products));
  };

  onPressAdd = item => () => {
    const { quantity } = item;
    const { products } = this.props;
    const { cart } = this.props;

    const index = products.indexOf(item);
    products[index].quantity = quantity + 1;

    this.props.dispatch(updateCart({items: cart.items + 1, total: parseFloat(cart.total + item.priceHome)}));
    this.props.dispatch(updateProducts(products));
  };

  calculateTotalAmount = () => {
    const { products } = this.props;
    let total = 0;

    products.forEach(product => {
      let { priceHome } = product;
      const { discountPercentage, quantity } = product;

      if (typeof discountPercentage !== "undefined") {
        priceHome -= priceHome * discountPercentage * 0.01;
      }
      if (quantity) {
        total += priceHome * quantity * 1.00;
      }
    });

    return total;
  }

  calculateQuantity = () => {
    const { products } = this.props;
    let quantity = 0;
    products.forEach((o) => quantity += o.quantity);
    return quantity;
  }

  keyExtractor = item => item.id.toString();

  renderProductItem = ({ item }) => (
    <ActionProductCardHorizontal
      key={item.id}
      onPress={this.navigateTo("Product", item)}
      onPressRemove={this.onPressRemove(item)}
      onPressAdd={this.onPressAdd(item)}
      imageUri={item.imageUri}
      title={item.name}
      description={item.description}
      rating={item.rating}
      price={item.priceHome}
      quantity={item.quantity}
      size={item.size}
      discountPercentage={item.discountPercentage}
      label={item.label}
      swipeoutOnPressRemove={this.swipeoutOnPressRemove(item)}
    />
  );

  render() {
    const { total } = this.props.cart;
    const products = _.filter(this.props.products, (o) => { return o.quantity > 0; });
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Coş cumparaturi</Heading6>
          {
            products.length > 0 &&
              <View style={styles.inline}>
                <Subtitle1 style={styles.subTotalText}>Subtotal: </Subtitle1>
                <Heading6 style={styles.subTotalPriceText}>
                  {`${parseFloat(Math.round(total * 100) / 100).toFixed(2)} lei`}
                </Heading6>
              </View>
          }
        </View>

        {
          products.length === 0 ? (
            <EmptyState
              showIcon
              iconName={EMPTY_STATE_ICON}
              title="Your Cart is Empty"
              message="Looks like you haven't added anything to your cart yet"
            />
          ) : (
            <Fragment>
              <View style={styles.flex1}>
                <FlatList
                  data={products}
                  keyExtractor={this.keyExtractor}
                  renderItem={this.renderProductItem}
                  contentContainerStyle={styles.productList}
                />
              </View>

              <Divider />

              <View>
                <View style={styles.bottomButtonContainer}>
                  <Button
                    onPress={this.navigateTo("Checkout", total)}
                    title="Comandă"
                  />
                </View>
              </View>
            </Fragment>
          )
        }
      </SafeAreaView>
    );
  }
}

function mapStateToProps (state)
{
  return {
    cart: state.global.cart,
    products: state.products && state.products.data,
  }
}
export default connect(mapStateToProps)(CartA);