/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from "react";
import {
  Animated,
  Modal,
  PanResponder,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

// BottomSheet Styles
const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  },
  scrim: {
    flex: 1,
    backgroundColor: "transparent"
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    overflow: "hidden"
  }
});

// BottomSheet Config
const SUPPORTED_ORIENTATIONS = ["portrait"];

// BottomSheet
export default class BottomSheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      pan: new Animated.ValueXY()
    };

    this.createPanResponder();
  }

  setModalVisible(visible) {
    const { animatedHeight, pan } = this.state;
    const { height, duration, onClose } = this.props;

    if (visible) {
      this.setState({ modalVisible: visible });
      Animated.timing(animatedHeight, {
        toValue: height,
        duration
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration
      }).start(() => {
        this.setState({ modalVisible: visible });
        pan.setValue({ x: 0, y: 0 });
        if (typeof onClose === "function") onClose();
      });
    }
  }

  createPanResponder() {
    const { pan } = this.state;
    const { closeOnSwipeDown, height } = this.props;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnSwipeDown,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy < 0) {
          return null;
        }
        return Animated.event([null, { dy: pan.y }])(e, gestureState);
      },
      onPanResponderRelease: (e, gestureState) => {
        if (height / 4 - gestureState.dy < 0) {
          this.setModalVisible(false);
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
        }
      }
    });
  }

  open() {
    this.setModalVisible(true);
  }

  close() {
    this.setModalVisible(false);
  }

  render() {
    const { animatedHeight, modalVisible, pan } = this.state;
    const {
      closeOnPressScrim,
      children,
      modalWrapperStyle,
      modalContainerStyle,
      statusBarColor
    } = this.props;

    const panStyle = {
      transform: pan.getTranslateTransform()
    };

    return (
      <Modal
        transparent
        animationType="none"
        visible={modalVisible}
        supportedOrientations={SUPPORTED_ORIENTATIONS}
        onRequestClose={() => {
          this.setModalVisible(false);
        }}
      >
        <View style={[styles.modalWrapper, modalWrapperStyle]}>
          <StatusBar backgroundColor={statusBarColor} />

          <TouchableOpacity
            style={styles.scrim}
            activeOpacity={1}
            onPress={() => (closeOnPressScrim ? this.close() : {})}
          />
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[
              panStyle,
              styles.modalContainer,
              modalContainerStyle,
              { height: animatedHeight }
            ]}
          >
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

// BottomSheet Props
BottomSheet.defaultProps = {
  closeOnPressScrim: true,
  closeOnSwipeDown: true,
  duration: 300,
  height: 112,
  modalWrapperStyle: {},
  modalContainerStyle: {},
  statusBarColor: "rgba(0, 0, 0, 0.2)"
};
