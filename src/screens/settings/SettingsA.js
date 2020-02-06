/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  View
} from "react-native";
import { SafeAreaView } from "react-navigation";

// import components
import Avatar from "../../components/avatar/Avatar";
import Divider from "../../components/divider/Divider";
import Icon from "../../components/icon/Icon";
import {
  Heading6,
  Subtitle1,
  Subtitle2
} from "../../components/text/CustomText";
import TouchableItem from "../../components/TouchableItem";

// import colors
import Colors from "../../theme/colors";

// SettingsA Config
const IOS = Platform.OS === "ios";
const DIVIDER_MARGIN_LEFT = 60;
const arrowIcon = "ios-arrow-forward";
const addressIcon = IOS ? "ios-pin" : "md-pin";
const notificationsOffIcon = IOS
  ? "ios-notifications-off"
  : "md-notifications-off";
const notificationsIcon = IOS ? "ios-notifications" : "md-notifications";
const paymentIcon = IOS ? "ios-card" : "md-card";
const ordersIcon = IOS ? "ios-list" : "md-list";
const termsIcon = IOS ? "ios-paper" : "md-paper";
const aboutIcon = IOS
  ? "ios-information-circle-outline"
  : "md-information-circle-outline";
const logoutIcon = IOS ? "ios-log-out" : "md-log-out";

// SettingsA Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  contentContainerStyle: {
    paddingBottom: 16
  },
  titleContainer: {
    paddingHorizontal: 16
  },
  titleText: {
    paddingTop: 16,
    paddingBottom: 24,
    fontWeight: "700"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16
  },
  profileContainer: {
    // height: 88
    paddingVertical: 16
  },
  leftSide: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  profileInfo: {
    paddingLeft: 16
  },
  mediumText: {
    fontWeight: "500"
  },
  email: {
    paddingVertical: 2
  },
  setting: {
    height: 56
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    width: 28,
    height: 28
  },
  extraDataContainer: {
    top: -8,
    marginLeft: DIVIDER_MARGIN_LEFT,
    paddingBottom: 8
  },
  logout: { color: Colors.secondaryColor }
});

// SettingsA Props
type Props = {
  icon: string,
  title: String,
  onPress: () => {},
  extraData: React.Node
};

// SettingsA Components
const Setting = ({ icon, title, onPress, extraData }: Props) => (
  <TouchableItem onPress={onPress}>
    <View>
      <View style={[styles.row, styles.setting]}>
        <View style={styles.leftSide}>
          {icon !== undefined && (
            <View style={styles.iconContainer}>
              <Icon name={icon} size={24} color={Colors.primaryColor} />
            </View>
          )}
          <Subtitle1 style={styles.mediumText}>{title}</Subtitle1>
        </View>

        <Icon name={arrowIcon} size={16} color="rgba(0, 0, 0, 0.16)" />
      </View>

      {extraData ? (
        <View style={styles.extraDataContainer}>{extraData}</View>
      ) : (
        <View />
      )}
    </View>
  </TouchableItem>
);

// SetingsA
export default class SettingsA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsOn: true
    };
  }

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  toggleNotifications = value => {
    this.setState({
      notificationsOn: value
    });
  };

  logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
        { text: "OK", onPress: () => {} }
      ],
      { cancelable: false }
    );
  };

  render() {
    const { notificationsOn } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.titleContainer}>
            <Heading6 style={styles.titleText}>Settings</Heading6>
          </View>

          {/* <TouchableItem useForeground onPress={this.navigateTo("EditProfile")}>
            <View style={[styles.row, styles.profileContainer]}>
              <View style={styles.leftSide}>
                <Avatar
                  imageUri={require("../../assets/img/profile_1.jpeg")}
                  rounded
                  size={60}
                />
                <View style={styles.profileInfo}>
                  <Subtitle1 style={styles.mediumText}>Kristin Evans</Subtitle1>
                  <Subtitle2 style={styles.email}>
                    kristin.evans@gmail.com
                  </Subtitle2>
                </View>
              </View>
            </View>
          </TouchableItem> */}

          <Divider />

          <Setting
            onPress={this.navigateTo("DeliveryAddress")}
            icon={addressIcon}
            title="Delivery Address"
            extraData={
              <View>
                <Subtitle2>1600 Pennsylvania Avenue</Subtitle2>
                <Subtitle2>Washington DC, USA</Subtitle2>
              </View>
            }
          />
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

          {/* <Setting
            onPress={this.navigateTo("PaymentMethod")}
            icon={paymentIcon}
            title="Payment Method"
            extraData={
              <View>
                <Subtitle2>Visa MasterCard</Subtitle2>
                <Subtitle2>xxxx xxxx xxxx 3456</Subtitle2>
              </View>
            }
          />
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

          <View style={[styles.row, styles.setting]}>
            <View style={styles.leftSide}>
              <View style={styles.iconContainer}>
                {notificationsOn ? (
                  <Icon
                    name={notificationsIcon}
                    size={24}
                    color={Colors.primaryColor}
                  />
                ) : (
                  <Icon
                    name={notificationsOffIcon}
                    size={24}
                    color={Colors.primaryColor}
                  />
                )}
              </View>
              <Subtitle1 style={styles.mediumText}>
                Push Notifications
              </Subtitle1>
            </View>

            <Switch
              value={notificationsOn}
              onValueChange={this.toggleNotifications}
            />
          </View>
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

          <Setting
            onPress={this.navigateTo("Orders")}
            icon={ordersIcon}
            title="My Orders"
          />
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} /> */}

          {/* <Setting icon={termsIcon} title="Privacy Policy" />
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} /> */}

          {/* <Setting
            onPress={this.navigateTo("TermsConditions")}
            icon={termsIcon}
            title="Terms and Conditions"
          />
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

          <Setting
            onPress={this.navigateTo("AboutUs")}
            icon={aboutIcon}
            title="About Us"
          />
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

          <TouchableItem onPress={this.logout}>
            <View style={[styles.row, styles.setting]}>
              <View style={styles.leftSide}>
                <View style={styles.iconContainer}>
                  <Icon
                    name={logoutIcon}
                    size={24}
                    color={Colors.secondaryColor}
                  />
                </View>
                <Subtitle1 style={[styles.logout, styles.mediumText]}>
                  Logout
                </Subtitle1>
              </View>
            </View>
          </TouchableItem> */}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
