import React, { useState, useRef, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { SafeAreaContext } from 'react-native-safe-area-context';
import { PinchGestureHandler, State,GestureHandlerRootView } from 'react-native-gesture-handler';

import scaleFactor from '../functions/ScaleFactor';

export default function CameraView({
  cameraRef,
  scanned,
  onHandleBarCodeScanned,
  onToggleFlash,
  flashMode,
}) {
  const insets = useContext(SafeAreaContext);
  const { width, height } = Dimensions.get('window');
  const [zoom, setZoom] = useState(0);
  const pinchRef = useRef(null);

  const onPinchEvent = React.useCallback(
    (event) => {
      const pinchZoom = Math.min(Math.max(0, event.nativeEvent.scale - 1), 1);
      setZoom(pinchZoom);
    },
    [setZoom]
  );


  return (
    <GestureHandlerRootView style={styles.camera}>
      <PinchGestureHandler
        ref={pinchRef}
        onGestureEvent={onPinchEvent}       
      >
        <Camera
          ref={cameraRef}
          style={styles.camera}
          onBarCodeScanned={scanned ? undefined : onHandleBarCodeScanned}
          autoFocus={true}
          flashMode={flashMode}
          zoom={zoom}
        >
          <View
            style={[
              styles.topBar,
              {
                paddingHorizontal: 10 * scaleFactor,
                marginTop: insets.top + 15,
              },
            ]}
          >
            <TouchableOpacity
              onPress={onToggleFlash}
              style={styles.torchButton}
            >
              <MaterialCommunityIcons
                name={flashMode ? 'flashlight-off' : 'flashlight'}
                size={24 * scaleFactor}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.scanContainer,
              { width: 20 * 0.8, height: 20 * 0.8, top: height * 0.4 },
            ]}
          />
        </Camera>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  torchButton: {
    alignSelf: 'flex-start',
  },
  scanContainer: {
    alignSelf: 'center',
    position: 'absolute',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
});
