import {StyleSheet} from 'react-native';
import { COLORS } from '../../../../../constants/theme';


export const styles = StyleSheet.create({
  container: {
    flex:1,
  },

  FlatList: {
    flex:1,
  },
  wrapper:{
 
    justifyContent:"center",
    backgroundColor:COLORS.white,
    alignSelf:'center',
    paddingBottom:20,overflow:'hidden'

}
});
