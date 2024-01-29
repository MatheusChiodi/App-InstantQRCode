import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
  Share,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import scaleFactor from '../functions/ScaleFactor';
import AlertView from '../components/AlertView';

export default function Historic() {
  const [links, setLinks] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadLinks = async () => {
        const data = await AsyncStorage.getItem('link');
        const loadedLinks = data ? JSON.parse(data) : [];
        // Ordena pelo date mais recente
        loadedLinks.sort((a, b) => {
          // Transforma a string de data em um objeto Date
          const dateA = createDateFromString(a.date);
          const dateB = createDateFromString(b.date);
          return dateB - dateA;
        });

        setLinks(loadedLinks);
      };
      loadLinks();
    }, [])
  );

  function createDateFromString(dateString) {
    // Extrai as partes da data e hora da string
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes, seconds] = timePart.split(':');

    // Retorna um novo objeto Date
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }

  const animations = links.map(() => new Animated.Value(0));

  useEffect(() => {
    Animated.stagger(
      300,
      links.map((_, i) =>
        Animated.timing(animations[i], {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [links]);

  const handleLink = (link) => {
    Linking.openURL(link);
  };

  const shareLink = async (linkShare) => {
    try {
      await Share.share({
        message: `Confira este link: ${linkShare}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLink = async (linkId) => {
    const newLinks = links.filter((item) => item.id !== linkId);
    await AsyncStorage.setItem('link', JSON.stringify(newLinks));
    setLinks(newLinks);
  };

  if (links.length === 0) {
    return <AlertView title="Nenhum link salvo" />;
  } else {
    return (
      <ScrollView style={styles.scrollContainer}>
        {links.map((link, index) => (
          <Animated.View
            key={link.id} // Usando o ID do link como chave
            style={[
              styles.linkCard,
              {
                opacity: animations[index],
                transform: [{ scale: animations[index] }],
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => handleLink(link.link)}
              style={styles.touchableArea}
            >
              <View style={styles.textContainer}>
                <Text style={styles.linkTitle} numberOfLines={1}>
                  {link.link}
                </Text>
              </View>
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={styles.buttonDelete}
                  onPress={() => deleteLink(link.id)}
                >
                  <Text style={styles.textButton}>Deletar link</Text>
                  <MaterialCommunityIcons
                    name="delete-forever"
                    size={24 * scaleFactor}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonShare}
                  onPress={() => shareLink(link.link)}
                >
                  <Text style={styles.textButton}>Enviar link</Text>
                  <MaterialCommunityIcons
                    name="share"
                    size={24 * scaleFactor}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
        <View style={{ height: 100 * scaleFactor }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    height: 900 * scaleFactor,
    padding: 10 * scaleFactor,
  },
  linkCard: {
    width: '100%',
    height: 120 * scaleFactor,
    backgroundColor: '#fff',
    borderRadius: 10 * scaleFactor,
    marginBottom: 20 * scaleFactor,
    elevation: 3 * scaleFactor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15 * scaleFactor,
  },
  touchableArea: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    overflow: 'hidden',
    paddingLeft: 10 * scaleFactor,
  },
  linkTitle: {
    fontSize: 18 * scaleFactor,
    fontWeight: 'bold',
  },
  buttonsRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1 * scaleFactor,
    borderTopColor: '#ccc',
    marginVertical: 10 * scaleFactor,
  },
  buttonDelete: {
    width: '45%',
    padding: 5 * scaleFactor,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff686b',
    borderRadius: 10 * scaleFactor,
    marginTop: 10 * scaleFactor,
  },
  buttonShare: {
    width: '45%',
    padding: 5 * scaleFactor,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a0c4ff',
    borderRadius: 10 * scaleFactor,
    marginTop: 10 * scaleFactor,
  },
  textButton: {
    fontSize: 16 * scaleFactor,
    fontWeight: 'bold',
  },
});
