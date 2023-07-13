import {StyleSheet, Dimensions} from 'react-native';
import { COLORS } from '../../../../../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  trie: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:"flex-end",
    marginTop:10,
    paddingHorizontal:20
  },
  FlatList: {

    height:"70%",
    backgroundColor: COLORS.white,
    width:'100%',
    overflow:'visible',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    marginTop:10
  },
  wrapper:{
 
    justifyContent:"center",
    backgroundColor:COLORS.white,
    width:'100%',
    alignSelf:'center',
    paddingBottom:90

}
});
