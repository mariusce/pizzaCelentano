/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import Color from "color";
import { connect } from 'react-redux';
import _ from 'lodash';
import { SafeAreaView } from "react-navigation";
import getImgSource from "../../utils/getImgSource.js";
import {getCategories} from './../../actions/categories'
import { getProducts, updateProducts } from "../../actions/products.js";
import { updateCart, setAuth } from "../../actions/global.js";
import { authForThisApp } from '../../../App';

// import components
import ActionProductCard from "../../components/cards/ActionProductCard";
import ActionProductCardHorizontal from "../../components/cards/ActionProductCardHorizontal";
import LinkButton from "../../components/buttons/LinkButton";
import { Heading6 } from "../../components/text/CustomText";
import TouchableItem from "../../components/TouchableItem";

// import colors
import Colors from "../../theme/colors";

// HomeA Config
const imgHolder = require("../../assets/img/imgholder.png");

// HomeA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background
  },
  container: {
    flex: 1
  },
  categoriesContainer: {
    paddingBottom: 16
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 12
  },
  titleText: {
    fontWeight: "700"
  },
  viewAllText: {
    color: Colors.primaryColor
  },
  categoriesList: {
    paddingTop: 4,
    paddingRight: 16,
    paddingLeft: 8
  },
  cardImg: { borderRadius: 4 },
  card: {
    marginLeft: 8,
    width: 104,
    height: 72,
    resizeMode: "cover"
  },
  cardOverlay: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: Color(Colors.overlayColor).alpha(0.2),
    overflow: "hidden"
  },
  cardContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  cardTitle: {
    padding: 12,
    fontWeight: "500",
    fontSize: 16,
    color: Colors.white,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  productsList: {
    paddingBottom: 16,
    // spacing = paddingHorizontal + ActionProductCard margin = 12 + 4 = 16
    paddingHorizontal: 12
  },
  popularProductsList: {
    // spacing = paddingHorizontal + ActionProductCardHorizontal margin = 12 + 4 = 16
    paddingHorizontal: 12,
    paddingBottom: 16
  }
});

class HomeA extends Component {
  constructor(props) {
    super(props);
    this.onPressRemove = this.onPressRemove.bind(this);
    this.onPressAdd = this.onPressAdd.bind(this);
  }

  componentDidMount() {
    authForThisApp.signInAnonymously().catch(function(error) {
      console.log('Anonymous authentication failed: ' + JSON.stringify(error));
    });
    authForThisApp.onAuthStateChanged((user) => {
      if (user) {
        setAuth({isAuthenticated: true, user: user});
        console.log('Anonymous authentication success, user: ' + JSON.stringify(user));
      } else {
        setAuth({isAuthenticated: false, user: undefined});
      }
    });
    setTimeout(() => {
      this.props.dispatch(getCategories);
      this.props.dispatch(getProducts);
      this.props.dispatch(updateCart({items: 0.00, total: 0.00}));
    }, 100);
  };

  navigateTo = (screen, item) => () => {
    const {navigation} = this.props;
    if (screen === 'Category') {
      navigation.navigate(screen, {category: item});
    } else if (screen === 'Product') {
      navigation.navigate(screen, {product: item});
    } else {
      navigation.navigate(screen);
    }
  };

  onPressRemove = item => () => {
    let { quantity } = item;
    let cart = Object.assign({}, this.props.cart);
    quantity -= 1;
    const { products } = this.props;

    const popularProducts = _.filter(products, {'popular': true});
    const index = popularProducts.indexOf(item);

    if (quantity < 0) {
      return;
    }
    popularProducts[index].quantity = quantity;

    this.props.dispatch(updateCart({items: cart.items -= 1, total: parseFloat(cart.total*1.00 - popularProducts[index].priceHome*1.00)}));
    this.props.dispatch(updateProducts(_.unionBy(popularProducts, products, 'id')));
  };

  onPressAdd = item => () => {
    const { quantity } = item;
    const { products } = this.props;
    let cart = Object.assign({}, this.props.cart);

    const popularProducts = _.filter(products, {'popular': true});

    const index = popularProducts.indexOf(item);
    popularProducts[index].quantity = quantity + 1;

    this.props.dispatch(updateCart({items: cart.items += 1, total: parseFloat(cart.total*1.00 + popularProducts[index].priceHome*1.00)}));
    this.props.dispatch(updateProducts(_.unionBy(popularProducts, products, 'id')));
  };

  keyExtractor = (item, index) => index.toString();

  renderCategoryItem = ({ item, index }) => (
    <ImageBackground
      key={index}
      defaultSource={imgHolder}
      source={getImgSource(item.imageUri)}
      imageStyle={styles.cardImg}
      style={styles.card}
    >
      <View style={styles.cardOverlay}>
        <TouchableItem
          onPress={this.navigateTo("Category", item)}
          style={styles.cardContainer}
          // borderless
        >
          <Text style={styles.cardTitle}>{item.name}</Text>
        </TouchableItem>
      </View>
    </ImageBackground>
  );

  renderProductItem = ({ item, index }) => (
    <ActionProductCard
      onPress={this.navigateTo("Product", item)}
      key={index}
      imageUri={item.imageUri}
      title={item.name}
      price={item.priceHome}
      discountPercentage={item.discountPercentage}
      label={item.label}
    />
  );

  renderPopularProductItem = ({ item, index }) => (
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
      discountPercentage={item.discountPercentage}
      label={item.label}
    />
  );

  render() {
    const { products } = this.props;

    const popularProducts = _.filter(products, {'popular': true});

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.container}>
          <ScrollView>
            <View style={styles.categoriesContainer}>
              <View style={styles.titleContainer}>
                <Heading6 style={styles.titleText}>Meniuri</Heading6>
                <LinkButton
                  title="Vezi toate"
                  titleStyle={styles.viewAllText}
                  onPress={this.navigateTo("Categories")}
                />
              </View>

              <FlatList
                data={this.props.categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                alwaysBounceHorizontal={false}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderCategoryItem}
                contentContainerStyle={styles.categoriesList}
              />
            </View>

            {/* <View style={styles.titleContainer}>
              <Heading6 style={styles.titleText}>Special Offers</Heading6>
            </View>

            <FlatList
              data={products}
              horizontal
              showsHorizontalScrollIndicator={false}
              alwaysBounceHorizontal={false}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderProductItem}
              contentContainerStyle={styles.productsList}
            /> */}

            <View style={styles.titleContainer}>
              <Heading6 style={styles.titleText}>Produse populare</Heading6>
              <LinkButton
                title="Vezi toate"
                titleStyle={styles.viewAllText}
                onPress={this.navigateTo("SearchResults")}
              />
            </View>

            <FlatList
              data={popularProducts}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderPopularProductItem}
              contentContainerStyle={styles.popularProductsList}
            />

          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps (state)
{
  return {
    categories: state.categories && state.categories.data,
    products: state.products && state.products.data,
    cart: state.global.cart,
    auth: state.global.auth
  }
}
export default connect(mapStateToProps)(HomeA);
