/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

// import components
import Button from "../../components/buttons/Button";
import GradientContainer from "../../components/gradientcontainer/GradientContainer";
import LinkButton from "../../components/buttons/LinkButton";
import Logo from "../../components/logo/Logo";

// import colors
import Colors from "../../theme/colors";

// WelcomeB Config

// WelcomeB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  logoContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonsGroup: {
    flex: 3,
    alignItems: "center",
    paddingHorizontal: 24,
    width: "100%"
  },
  vspace16: {
    height: 16
  },
  vspace32: {
    height: 32
  },
  linkButtonText: {
    color: Colors.white
  }
});

// WelcomeB Screen
export default class WelcomeB extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  render() {
    return (
      <GradientContainer>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />
        <SafeAreaView style={styles.screenContainer}>
          <View style={styles.logoContainer}>
            <Logo size={120} tintColor={Colors.white} />
          </View>

          <View style={styles.buttonsGroup}>
            <Button
              onPress={this.navigateTo("SignUp")}
              color={Colors.white}
              title={"I am new".toUpperCase()}
              titleColor={Colors.primaryColor}
            />

            <View style={styles.vspace16} />

            <Button
              onPress={this.navigateTo("SignIn")}
              borderColor={Colors.white}
              title={"I have been here".toUpperCase()}
              titleColor={Colors.white}
              outlined
            />

            <View style={styles.vspace32} />

            <LinkButton
              title="Skip"
              onPress={this.navigateTo("HomeNavigator")}
              titleStyle={styles.linkButtonText}
            />
          </View>
        </SafeAreaView>
      </GradientContainer>
    );
  }
}
