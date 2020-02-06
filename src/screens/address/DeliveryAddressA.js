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
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import ActionButton from "react-native-action-button";

// import components
import Divider from "../../components/divider/Divider";
import HeaderIconButton from "../../components/navigation/HeaderIconButton";
import Icon from "../../components/icon/Icon";
import {
  Caption,
  Subtitle1,
  Subtitle2
} from "../../components/text/CustomText";
import TouchableItem from "../../components/TouchableItem";

// import colors
import Colors from "../../theme/colors";

// DeliveryAddressA Config
const IOS = Platform.OS === "ios";
const saveIcon = IOS ? "ios-checkmark" : "md-checkmark";
const radioOffIcon = IOS ? "ios-radio-button-off" : "md-radio-button-off";
const radioOnIcon = IOS ? "ios-radio-button-on" : "md-radio-button-on";
const editIcon = IOS ? "ios-create" : "md-create";
const fabIcon = IOS ? "ios-add" : "md-add";
const homeIcon = IOS ? "ios-home" : "md-home";
const locationIcon = IOS ? "ios-pin" : "md-pin";

// DeliveryAddressA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background
  },
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.background,
    elevation: 1
  },
  addressList: {
    paddingVertical: 8
  },
  addressCard: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 20
  },
  active: {
    backgroundColor: "#f7f7f7"
  },
  leftAddresContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  addressInfo: { flex: 1, marginRight: 4 },
  caption: {
    paddingVertical: 2,
    color: Colors.accentColor
  },
  radioIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    width: 24,
    height: 24
  },
  addressText: { paddingVertical: 4 },
  editIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24
  }
});

// DeliveryAddressA Props
type Props = {
  onPress: () => {},
  onPressEdit: () => {},
  type: String,
  street: String,
  district: String,
  city: String,
  zip: String,
  number: String,
  active: String
};

// DeliveryAddressA Components
const Address = ({
  onPress,
  onPressEdit,
  type,
  street,
  district,
  city,
  zip,
  number,
  active
}: Props) => (
  <TouchableItem onPress={onPress} useForeground>
    <View style={[styles.addressCard, active && styles.active]}>
      <View style={styles.leftAddresContainer}>
        <View style={styles.radioIconContainer}>
          {active ? (
            <Icon name={radioOnIcon} size={21} color={Colors.secondaryColor} />
          ) : (
            <Icon name={radioOffIcon} size={21} color={Colors.secondaryColor} />
          )}
        </View>

        <View style={styles.addressInfo}>
          {type !== "" && (
            <Caption style={styles.caption}>
              {`${type.toUpperCase()} ADDRESS`}
            </Caption>
          )}
          <Subtitle1 style={styles.addressText}>
            {`${number} ${street}, ${district}`}
          </Subtitle1>
          <Subtitle2>{`${city} ${zip}`}</Subtitle2>
        </View>
      </View>

      <View style={{ height: 50 }}>
        <TouchableItem onPress={onPressEdit} borderless>
          <View style={styles.editIconContainer}>
            <Icon name={editIcon} size={21} color={Colors.secondaryText} />
          </View>
        </TouchableItem>
      </View>
    </View>
  </TouchableItem>
);

// DeliveryAddressA
export default class DeliveryAddressA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [
        {
          id: "address1",
          type: "Office",
          street: "Pennsylvania Avenue",
          district: "",
          city: "Washington DC",
          zip: "22",
          number: "1600",
          active: false
        },
        {
          id: "address2",
          type: "Home",
          street: "Baker Street",
          district: "",
          city: "London",
          zip: "WC2N 5DU",
          number: "221B",
          active: true
        },
        {
          id: "address3",
          type: "Apartment",
          street: "King Abdulaziz Road",
          district: "Al Amal",
          city: "Riyadh",
          zip: "12643",
          number: "2121",
          active: false
        }
      ]
    };
  }

  // react navigatin header options
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <HeaderIconButton
        onPress={() => navigation.goBack()}
        name={saveIcon}
        color={Colors.primaryColor}
      />
    )
  });

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  setDeliveryAddress = item => () => {
    const { addresses } = this.state;
    const index = addresses.indexOf(item);
    const activeIndex = addresses.findIndex(e => e.active === true);

    if (activeIndex !== index) {
      addresses[activeIndex].active = false;
      addresses[index].active = true;

      this.setState({
        addresses: [...addresses]
      });
    }
  };

  keyExtractor = (item, index) => index.toString();

  renderAddressItem = ({ item }) => (
    <Address
      key={item.id}
      onPress={this.setDeliveryAddress(item)}
      onPressEdit={this.navigateTo("EditAddress")}
      type={item.type}
      building={item.building}
      street={item.street}
      district={item.district}
      city={item.city}
      zip={item.zip}
      number={item.number}
      active={item.active}
    />
  );

  renderSeparator = () => <Divider />;

  handleFabPress = () => {
    // alert('FAB Pressed');
  };

  renderFabIcon = () => (
    <Icon name={fabIcon} size={24} color={Colors.onAccentColor} />
  );

  render() {
    const { addresses } = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.container}>
          <FlatList
            data={addresses}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderAddressItem}
            ItemSeparatorComponent={this.renderSeparator}
            contentContainerStyle={styles.addressList}
          />

          <ActionButton
            buttonColor={Colors.accentColor}
            onPress={this.handleFabPress}
            offsetX={16}
            offsetY={16}
            renderIcon={this.renderFabIcon}
            bgColor="rgba(255, 255, 255, 0.56)"
          >
            <ActionButton.Item
              buttonColor={Colors.primaryColor}
              title="Add new address"
              onPress={this.navigateTo("AddAddress")}
            >
              <Icon name={homeIcon} size={22} color={Colors.onPrimaryColor} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor={Colors.tertiaryColor}
              title="Use current location"
              onPress={() => {}}
            >
              <Icon
                name={locationIcon}
                size={22}
                color={Colors.onTertiaryColor}
              />
            </ActionButton.Item>
          </ActionButton>
        </View>
      </SafeAreaView>
    );
  }
}
