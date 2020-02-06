/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import {
  ActivityIndicator, Modal, StatusBar, StyleSheet, Text, View
} from 'react-native';
import type { ColorProp } from 'react-native/Libraries/StyleSheet/ColorPropType';

// import layout
import Layout from '../../theme/layout';

// ActivityIndicatorModal Styles
const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: Layout.SCREEN_WIDTH - 2 * Layout.SMALL_MARGIN - 8,
    borderRadius: 4,
    backgroundColor: '#fff'
  },
  title: {
    paddingVertical: 8,
    fontWeight: "700",
    fontSize: 15,
    color: '#000'
  },
  message: {
    marginBottom: 15,
    padding: 8,
    fontWeight: "400",
    fontSize: 15,
    color: '#212121',
    textAlign: 'center'
  }
});

// ActivityIndicatorModal Props
type Props = {
  message: string,
  onRequestClose: () => {},
  statusBarColor: ColorProp,
  title: string,
  visible: boolean
};

// ActivityIndicatorModal
const ActivityIndicatorModal = ({
  message, onRequestClose, statusBarColor = "rgba(0, 0, 0, 0.2)", title, visible
}: Props) => (
  <Modal animationType="none" transparent visible={visible} onRequestClose={onRequestClose}>
    <StatusBar backgroundColor={statusBarColor} />
    <View style={styles.modalWrapper}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>{title}</Text>

        {message !== '' && message !== undefined && <Text style={styles.message}>{message}</Text>}

        <ActivityIndicator animating size="large" />
      </View>
    </View>
  </Modal>
);

export default ActivityIndicatorModal;
