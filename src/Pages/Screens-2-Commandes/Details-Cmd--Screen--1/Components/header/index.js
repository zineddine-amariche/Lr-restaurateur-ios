import {View, Text} from 'react-native';
import React from 'react';
import Close from '../../../../../assets/x.png';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {Image} from 'react-native';
import dots from '../../../../../assets/dots.png';

const HeaderInfo = ({onPress,isconfirm}) => {
  return (
    <View style={styles.containerId}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={Close} />
      </TouchableOpacity>
{      isconfirm?  <TouchableOpacity>
        <Image
          source={dots}
          style={{height: 40, width: 40, marginRight: 10, marginTop: 10}}
        />
      </TouchableOpacity> : <View/>}
    </View>
  );
};

export default HeaderInfo;
