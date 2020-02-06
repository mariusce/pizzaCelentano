/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from "react";
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";

// import components
import Button from "../../components/buttons/Button";
import { Caption } from "../../components/text/CustomText";

// import colors
import Colors from "../../theme/colors";

// TermsConditionsA Config
const APP_NAME = "App Name";
const COMPANY_NAME = "Company Name";
const COUNTRY = "Serbia";

// TermsConditionsA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background
  },
  content: { padding: 24 },
  caption: {
    paddingBottom: 12
  },
  heading: {
    paddingBottom: 16,
    fontWeight: "700",
    fontSize: 16,
    color: Colors.primaryColor,
    letterSpacing: 0.2
  },
  textBlock: {
    paddingBottom: 24,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primaryText,
    letterSpacing: 0.4
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 12,
    width: "100%",
    backgroundColor: Colors.surface
  },
  button: {
    width: "45%"
  }
});

// TermsConditionsA
export default class TermsConditionsA extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  callPhone = () => {
    Linking.openURL(`tel:${1601234567}`);
  };

  render() {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />
        <ScrollView>
          <View style={styles.content}>
            <Caption style={styles.caption}>Last update: 15 August, 2019</Caption>
            <Text style={styles.textBlock}>{`Please read these terms and conditions carefully, before you start using the mobile application ${APP_NAME}.`}</Text>

            <Text style={styles.heading}>0. Introduction</Text>
            <Text style={styles.textBlock}>
              {
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                 \nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
              }
            </Text>

            <Text style={styles.heading}>1. Your Content</Text>
            <Text style={styles.textBlock}>
              {
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                \nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
              }
            </Text>

            <Text style={styles.heading}>2. No warranties</Text>
            <Text style={styles.textBlock}>
              {
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                \nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
              }
            </Text>

            <Text style={styles.heading}>3. License</Text>
            <Text style={styles.textBlock}>
              {
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                \nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
              }
            </Text>
          </View>
        </ScrollView>

        <View style={styles.buttonsContainer}>
          <Button
            onPress={this.goBack}
            buttonStyle={styles.button}
            title="Decline"
            outlined
            rounded
          />

          <Button
            onPress={this.goBack}
            buttonStyle={styles.button}
            title="Accept"
            rounded
          />
        </View>
      </SafeAreaView>
    );
  }
}
