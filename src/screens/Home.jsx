import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Alert, Vibration, Image } from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Camera } from 'expo-camera';
import * as Linking from 'expo-linking';

import scaleFactor from '../functions/ScaleFactor';
import CameraView from '../components/CameraView';
import ModalView from '../components/ModalView';
import AlertView from '../components/AlertView';

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [modalView, setModalView] = useState(false);
  const [link, setLink] = useState('');
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const requestPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (isActive) {
          setHasPermission(status === 'granted');
        }
      };

      if (!hasPermission) {
        requestPermission();
      }

      return () => {
        isActive = false;
        setScanned(false);
        setModalView(false);
        setLink('');
      };
    }, [hasPermission]) // Dependência para reexecutar o efeito quando hasPermission mudar
  );

  const handleBarCodeScanned = ({ type, data }) => {
    if (scanned) return; // Evita múltiplas leituras

    setScanned(true);
    Vibration.vibrate();
    
    Linking.canOpenURL(data).then(
      (isSupported) => {
        if (isSupported) {
          setLink(data);
          setModalView(true);
        } else {
          Alert.alert(
            'Link Inválido',
            `Este QR Code não contém um link válido: ${data}`
          );
          setScanned(false); // Permite novos escaneamentos se o link for inválido
        }
      },
      (error) => {
        Alert.alert('Erro', `Erro ao abrir o link: ${error}`);
        setScanned(false); // Permite novos escaneamentos em caso de erro
      }
    );
  };

  const toggleFlash = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  };

  const cancelLink = () => {
    setScanned(false);
    setModalView(false);
    setLink('');
  };

  const openLink = () => {
    setScanned(false);
    setModalView(false);

    const data = {
      id: Math.random().toString(),
      link: link,
      date: new Date().toLocaleDateString(),
    };
    try {
      AsyncStorage.getItem('link').then((link) => {
        const linkArray = link ? JSON.parse(link) : [];
        linkArray.push(data);
        AsyncStorage.setItem('link', JSON.stringify(linkArray));
      });

      Linking.openURL(link);
      setLink('');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Substitua o setTimeout por uma verificação de prontidão mais precisa, se necessário
    setTimeout(() => {
      setIsReady(true);
    }, 300);
  }, []);

  if (!isReady) {
    return (
      <View style={styles.container2}>
        <Image
          source={require('../../assets/splash.png')}
          style={{ width: 350 * scaleFactor, height: 350 * scaleFactor }}
        />
      </View>
    );
  } else {
    if (hasPermission === null) {
      return <AlertView title="Solicitando permissão da câmera..." />;
    } else if (hasPermission === false) {
      return <AlertView title="Acesso à câmera negado" />;
    } else {
      return (
        <View style={styles.container}>
          {isFocused && (
            <CameraView
              cameraRef={cameraRef}
              scanned={scanned}
              onHandleBarCodeScanned={handleBarCodeScanned}
              onToggleFlash={toggleFlash}
              flashMode={flashMode}
            />
          )}
          {modalView && (
            <ModalView
              link={link}
              onCancelLink={cancelLink}
              onOpenLink={openLink}
            />
          )}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
