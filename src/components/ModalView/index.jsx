import React, { useState } from 'react';
import { Text, View, StyleSheet, Modal, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import scaleFactor from '../../functions/ScaleFactor';
import ButtonModal from './ButtonModal';

export default function ModalView({
  modalView,
  link,
  onCancelLink,
  onOpenLink,
}) {
  const [alert, setAlert] = useState('');

  const saveLink = async () => {
    
    const data = {
      id: 1 + Math.random(),
      link: link,
      date : new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    };
    try {
      AsyncStorage.getItem('link').then((link) => {
        const linkArray = link ? JSON.parse(link) : [];
        linkArray.push(data);
        AsyncStorage.setItem('link', JSON.stringify(linkArray));
      });

      setAlert('Link salvo com sucesso!');
      setTimeout(() => {
        setAlert('');
        onCancelLink();
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  const shareLink = async () => {
    try {
      await Share.share({
        message: `Confira este link: ${link}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalView}
      onRequestClose={onCancelLink}
      style={styles.modalContainer}
    >
      <View style={styles.modalSubContainer}>
        <View style={styles.modalBase}>
          {alert !== '' ? (
            <Text style={styles.modalTitle}>{alert}</Text>
          ) : (
            <>
              <Text style={styles.modalTitle}>
                O que você deseja ?
              </Text>
              <Text style={styles.modalLink}>
                {link}
              </Text>
              <View style={styles.row}>
                <ButtonModal
                  onPress={onCancelLink}
                  Title="Cancelar"
                  bgColor="#ff686b"
                />
                <ButtonModal
                  onPress={onOpenLink}
                  Title="Abrir"
                  bgColor="#caffbf"
                />
              </View>
              <View style={styles.row}>
                <ButtonModal
                  onPress={shareLink}
                  Title="Compartilhar"
                  bgColor="#a0c4ff"
                />
                <ButtonModal
                  onPress={saveLink}
                  Title="Salvar"
                  bgColor="#bdb2ff"
                />
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalSubContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -22 * scaleFactor,
  },
  modalTitle: {
    fontSize: 20 * scaleFactor,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10 * scaleFactor,
  },
  modalBase: {
    width: 300 * scaleFactor,
    height: 300 * scaleFactor,
    margin: 20 * scaleFactor,
    backgroundColor: '#fff',
    borderRadius: 20 * scaleFactor,
    padding: 25 * scaleFactor,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25 * scaleFactor,
    shadowRadius: 4 * scaleFactor,
    elevation: 5 * scaleFactor,
  },
  modalLink: {
    fontSize: 16 * scaleFactor,
    textAlign: 'center',
    marginBottom: 10 * scaleFactor,
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
