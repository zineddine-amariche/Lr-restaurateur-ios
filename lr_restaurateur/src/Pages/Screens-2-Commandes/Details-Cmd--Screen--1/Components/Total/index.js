import {View, Text, Image, useColorScheme} from 'react-native';
import React from 'react';
import product from '../../../../../assets/Info/product.png';
import {styles} from './styles';
import { COLORS } from '../../../../../constants/theme';
import { useSelector } from 'react-redux';
const Total = ({orders, item,width}) => {
  const Tablet = useSelector(state => state.IsTab);
  const {IsTab} = Tablet;
  const container = {
    paddingHorizontal:10,
    paddingVertical:10,
    backgroundColor:COLORS.gray,
    flexDirection:IsTab ?'row' : 'column',
    justifyContent:'space-between',
    width:width,
  }
  const COL = {
    width:IsTab ? '49%' : '100%',
    padding:5
  }

  const   rowDetails = {
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:IsTab ? '49%' : '100%',
    padding:5

  }
  const colorScheme = useColorScheme();
let typeIo = item.type == 10 ? "Frais de livraison" :item.type == 20 ? "Frais de préparation" : "Frais de préparation"

  return (
    <View style={container}>
      <View style={COL}>
        <View style={styles.Articles}>
          <Image source={product} style={{width:22,height:22}} />
            <Text style={[styles.TextArticles, {color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,}]}>{orders.productsCount} produits</Text>
        </View>
        <View style={styles.rowDetails}>
          <Text style={[styles.TextSemiBold,{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,}]}>{typeIo} </Text>
          <Text style={[styles.TextSemiBold,{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,}]}>
            {item.delivery_price.toFixed(2)} €
          </Text>
        </View>
        <View style={styles.rowDetails}>
          <Text style={[styles.TextSemiBold,{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,}]}>Remise</Text>
          <Text style={[styles.TextSemiBold,{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,}]}>{item.discount.toFixed(2)} €</Text>
        </View>
      </View>

      <View style={rowDetails}>
        <Text style={[styles.TextBold,{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,}]}>Total</Text>
        <Text style={[styles.TextBold,{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,}]}>{item.total.toFixed(2)} €</Text>
      </View>
    </View>
  );
};

export default Total;
