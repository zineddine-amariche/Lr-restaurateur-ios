import {StyleSheet} from 'react-native';
import { COLORS } from '../../../../constants/theme';


export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  row: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  imageBox: {
    width: 35,
    alignItems: 'center',
  },
  Textbold: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  TextSemibold: {
    fontSize: 15,
    fontWeight: '600',
  },
  rowBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-around",
    alignSelf:'center',
    zIndex:-1,
    backgroundColor:"#FFF",
    paddingBottom:20
 
 
  },
  Btn1: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 20,
    height: 35,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'

  },
  Btn2: {
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 20,
    height: 35,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'
  },
  Textbtn1: {
    color: COLORS.secondary,
    fontWeight: '600',
    fontSize: 15,
    paddingLeft:6

  },
  Textbtn2: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 15,
    paddingLeft:6
  },
  select :{
    // position:"absolute",
    // bottom:-50,
    zIndex:100,
     elevation:2,
  justifyContent:'space-evenly',
  right:6

  },
});
