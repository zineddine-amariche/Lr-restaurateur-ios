import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../constants/theme';

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray,
    borderColor: COLORS.secondary,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding :10, 
    elevation:3,
    height:48,
    marginTop:10,
    borderRadius:4,
     backgroundColor:"#FFF",
     width:'100%',marginBottom:10

  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '20%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  trie: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:"flex-end",
    marginBottom:20,
    paddingHorizontal:20
  },
});

