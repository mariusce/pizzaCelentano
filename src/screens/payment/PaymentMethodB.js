/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component, Fragment } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import Color from "color";

// import components
import BottomSheet from "../../components/bottomsheet/BottomSheet";
import Button from "../../components/buttons/Button";
import GradientContainer from "../../components/gradientcontainer/GradientContainer";
import HeaderIconButton from "../../components/navigation/HeaderIconButton";
import Icon from "../../components/icon/Icon";
import { Caption, Heading6, Subtitle1 } from "../../components/text/CustomText";
import TouchableItem from "../../components/TouchableItem";

// import colors
import Colors from "../../theme/colors";

// PaymentMethodA Config
const IOS = Platform.OS === "ios";
const saveIcon = IOS ? "ios-checkmark" : "md-checkmark";
const visaIcon = "cc-visa";
const discoverIcon = "cc-discover";
const moreIcon = IOS ? "ios-more" : "md-more";
const editIcon = IOS ? "ios-create" : "md-create";
const savePaymentIcon = IOS ? "ios-save" : "md-save";
const removeIcon = IOS ? "ios-remove-circle" : "md-remove-circle";
const BOTTOM_SHEET_PB = IOS ? 16 : 0;

// PaymentMethodA Styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainerStyle: {
    paddingVertical: 8
  },
  cardContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "100%",
    height: 228
  },
  creditCard: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 8
  },
  cardNumberContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    maxWidth: 286
  },
  editButtonContainer: {
    borderRadius: 16,
    backgroundColor: Colors.white
  },
  editButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32
  },
  whiteText: {
    color: Colors.white
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  caption: {
    color: Color(Colors.white).alpha(0.8)
  },
  buttonContainer: {
    padding: 16
  },
  bottomSheetItem: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    height: 64
  },
  bottomSheetCaption: { paddingVertical: 2 },
  bottomSheetAction: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
    height: 56
  },
  bottomSheetIconContainer: {
    marginRight: 32,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  }
});

// PaymentMethodA
export default class PaymentMethodA extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // react navigatin header options
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <HeaderIconButton
        onPress={() => navigation.goBack()}
        name={saveIcon}
        color={Colors.onPrimaryColor}
      />
    )
  });

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  openEditShet = () => {
    this.editSheet.open();
  };

  render() {
    return (
      <Fragment>
        <SafeAreaView style={styles.topArea} />
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={Colors.primaryColor}
            barStyle="light-content"
          />

          <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.cardContainer}>
              <GradientContainer
                colors={["#784BA0", "#2B86C5"]}
                containerStyle={styles.creditCard}
              >
                <View style={styles.cardInfo}>
                  <FAIcon name={visaIcon} size={36} color={Colors.white} />
                  <View style={styles.editButtonContainer}>
                    <TouchableItem onPress={this.openEditShet} borderless>
                      <View style={styles.editButton}>
                        <Icon name={moreIcon} size={22} color={Colors.black} />
                      </View>
                    </TouchableItem>
                  </View>
                </View>

                <View style={styles.cardNumberContainer}>
                  <Heading6 style={styles.whiteText}>XXXX</Heading6>
                  <Heading6 style={styles.whiteText}>XXXX</Heading6>
                  <Heading6 style={styles.whiteText}>XXXX</Heading6>
                  <Heading6 style={styles.whiteText}>3456</Heading6>
                </View>

                <View style={styles.cardInfo}>
                  <View>
                    <Caption style={styles.caption}>Card Holder</Caption>
                    <Heading6 style={styles.whiteText}>Kristin Evans</Heading6>
                  </View>
                  <View>
                    <Caption style={styles.caption}>Expires</Caption>
                    <Heading6 style={styles.whiteText}>09 / 21</Heading6>
                  </View>
                </View>
              </GradientContainer>
            </View>

            <View style={styles.cardContainer}>
              <GradientContainer
                colors={["#0D324D", "#7F5A83"]}
                containerStyle={styles.creditCard}
              >
                <View style={styles.cardInfo}>
                  <FAIcon name={discoverIcon} size={36} color={Colors.white} />
                  <View style={styles.editButtonContainer}>
                    <TouchableItem onPress={this.openEditShet} borderless>
                      <View style={styles.editButton}>
                        <Icon name={moreIcon} size={22} color={Colors.black} />
                      </View>
                    </TouchableItem>
                  </View>
                </View>

                <View style={styles.cardNumberContainer}>
                  <Heading6 style={styles.whiteText}>XXXX</Heading6>
                  <Heading6 style={styles.whiteText}>XXXX</Heading6>
                  <Heading6 style={styles.whiteText}>XXXX</Heading6>
                  <Heading6 style={styles.whiteText}>0123</Heading6>
                </View>

                <View style={styles.cardInfo}>
                  <View>
                    <Caption style={styles.caption}>Card Holder</Caption>
                    <Heading6 style={styles.whiteText}>Kristin Evans</Heading6>
                  </View>
                  <View>
                    <Caption style={styles.caption}>Expires</Caption>
                    <Heading6 style={styles.whiteText}>08 / 20</Heading6>
                  </View>
                </View>
              </GradientContainer>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button
              title={"Add credit card".toUpperCase()}
              height={48}
              rounded
              color={Colors.accentColor}
            />
          </View>

          <BottomSheet
            ref={ref => {
              this.editSheet = ref;
            }}
            // FIX: closeOnSwipeDown need height to work properly
            height={232 + BOTTOM_SHEET_PB} // height of BottomSheet = 64 + 3 * 56 + 16
            statusBarColor={Colors.primaryColorDark}
          >
            <View style={styles.bottomSheetItem}>
              <Caption style={styles.bottomSheetCaption}>
                {"Payment Method".toUpperCase()}
              </Caption>
              <Subtitle1>xxxx xxxx xxxx 3456</Subtitle1>
            </View>

            <TouchableItem>
              <View style={styles.bottomSheetAction}>
                <View style={styles.bottomSheetIconContainer}>
                  <Icon name={editIcon} size={22} color={Colors.accentColor} />
                </View>
                <Subtitle1>Edit card details</Subtitle1>
              </View>
            </TouchableItem>

            <TouchableItem>
              <View style={styles.bottomSheetAction}>
                <View style={styles.bottomSheetIconContainer}>
                  <Icon
                    name={savePaymentIcon}
                    size={22}
                    color={Colors.accentColor}
                  />
                </View>
                <Subtitle1>Save for checkouts</Subtitle1>
              </View>
            </TouchableItem>

            <TouchableItem>
              <View style={styles.bottomSheetAction}>
                <View style={styles.bottomSheetIconContainer}>
                  <Icon
                    name={removeIcon}
                    size={22}
                    color={Colors.accentColor}
                  />
                </View>
                <Subtitle1>Remove card</Subtitle1>
              </View>
            </TouchableItem>
          </BottomSheet>
        </SafeAreaView>
      </Fragment>
    );
  }
}
