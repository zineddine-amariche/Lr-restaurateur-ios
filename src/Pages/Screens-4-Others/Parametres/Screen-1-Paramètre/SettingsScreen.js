import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  Text,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import Header from '../../../../Components/Headers/header-1-Primary';
import {COLORS} from '../../../../constants/theme';

import vector from '../../../../assets/paramètres/Vector(Stroke).png';
import Horaires from '../../../../assets/paramètres/GestionB.png';
import Printer from '../../../../assets/paramètres/Vector.png';
import aide from '../../../../assets/paramètres/Vector1.png';
import {Linking} from 'react-native';

import styles from './Hooks/Styles';
import {Divider} from 'react-native-elements';
import {useSelector} from 'react-redux';
const Parametre = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const [Visible, setVisible] = useState(false);

  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => {
    setVisible(false);
  };

  const getReservations = useSelector(state => state.auth);

  const {login} = getReservations;
  let id = login?.establishments[0].id;
  let name = login?.login;
  let token = login?.token;

  // `https://m2.live-resto.fr/manager/payments/edit?token=${token}&establishment_id=${id}&login=${name}`;

  let url = `https://m2.live-resto.fr/manager?token=${token}&establishment_id=${id}&login=${name}`;

  const handleExternalLink = () => {
    // console.log('url', url);
    if (id && name && token) {
      Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <Header
        navigation={navigation}
        Color={COLORS.gray}
        openMenu={openMenu}
        Visible={Visible}
        closeMenu={closeMenu}
      />

      <View style={styles.Information}>
        <View style={styles.SectionInfo}>
          <Text style={styles.Title1}>{auth.user.title}</Text>
          <Text style={styles.Title2}>{auth.user.subtitle}</Text>
        </View>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.TextBtn}>Modifier les informations</Text>
          <Image source={vector} />
        </TouchableOpacity>
      </View>
      <Divider orientation="horizontal" style={styles.Divider} />
      <View style={{paddingHorizontal: 25, backgroundColor: '#fff'}}>
        <TouchableOpacity
          style={styles.btn2}
          // onPress={() => {
          // navigation.navigate('Horaires');
          onPress={handleExternalLink}

          // }}
        >
          {/* Horaires d’ouverture du restaurant */}

          <View style={styles.ContainerRow}>
            <Image source={Horaires} style={{marginRight: 10}} />
            <Text style={styles.TextBtn}>Paramètres de gestion</Text>
          </View>
          <Image source={vector} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn2}
          onPress={() => {
            if (Platform.OS == 'ios') {
              return;
            } else {
              navigation.navigate('Imprission');
            }
          }}>
          <View style={styles.ContainerRow}>
            <Image source={Printer} style={{marginRight: 10}} />
            <Text style={styles.TextBtn}>Paramètre de l'mprimante</Text>
          </View>
          <Image source={vector} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn2}
          onPress={() => {
            navigation.navigate('SupportScreen');
          }}>
          <View style={styles.ContainerRow}>
            <Image source={aide} style={{marginRight: 10}} />
            <Text style={styles.TextBtn}>Chercher de l’aide</Text>
          </View>
          <Image source={vector} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Parametre;
