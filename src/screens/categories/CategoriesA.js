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
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import { connect } from 'react-redux';
import Color from "color";
import getImgSource from '../../utils/getImgSource.js';

// import components
import TouchableItem from "../../components/TouchableItem";

// import colors
import Colors from "../../theme/colors";



// CategoriesA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background
  },
  container: {
    flex: 1
  },
  contentContainerStyle: {
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  cardImg: { borderRadius: 4 },
  card: {
    marginVertical: 6,
    height: 100,
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
    alignItems: "center",
    borderRadius: 4
  },
  cardTitle: {
    padding: 16,
    fontWeight: "500",
    fontSize: 18,
    color: Colors.white,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
});

// CategoriesA
class CategoriesA extends Component {
  constructor(props) {
    super(props);
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  navigateTo = (screen, category) => () => {
    const {navigation} = this.props;
    if (category) {
      navigation.navigate(screen, {category: category});
    } else {
      navigation.navigate(screen);
    }
  };

  keyExtractor = (item, index) => index.toString();

  renderCategoryItem = ({ item, index }) => (
    <ImageBackground
      key={index}
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

  render() {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.container}>
          <FlatList
            data={this.props.categories}
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCategoryItem}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </View>
      </SafeAreaView>
    );
  }
}
function mapStateToProps (state) {
  return {
    categories: state.categories && state.categories.data
  }
}
export default connect(mapStateToProps)(CategoriesA)
