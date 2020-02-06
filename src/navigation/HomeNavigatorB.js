/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import type { ColorProp } from 'react-native/Libraries/StyleSheet/ColorPropType';

// import components
import TabBadgeIcon from '../components/navigation/TabBadgeIcon';

// import Home screen
import Home from '../screens/home/HomeB';

// import Search screen
import Search from '../screens/search/SearchA';

// import Favorites screen
import Favorites from '../screens/favorites/FavoritesB';

// import Cart screen
import Cart from '../screens/cart/CartB';

// import Settings screen
import Settings from '../screens/settings/SettingsB';

// import colors
import Colors from '../theme/colors';

// HomeNavigator Config

type Props = {
  focused: string,
  horizontal: number,
  tintColor: ColorProp
};

// HomeNavigator
const HomeNavigator = createBottomTabNavigator(
  {
    Home,
    Search,
    Cart: {
      screen: Cart,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <TabBadgeIcon focused={focused} tintColor={tintColor} />
        )
      }
    },
    Favorites,
    Settings
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }: Props) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Search') {
          iconName = 'magnify';
        } else if (routeName === 'Favorites') {
          iconName = `star${focused ? '' : '-outline'}`;
        } else if (routeName === 'Cart') {
          iconName = `cart${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `settings${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={horizontal ? 20 : 24} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: Colors.primaryColor,
      inactiveTintColor: Colors.secondaryText,
      showLabel: false, // hide labels
      style: {
        backgroundColor: Colors.surface // TabBar background
      }
    }
  }
);

export default HomeNavigator;
