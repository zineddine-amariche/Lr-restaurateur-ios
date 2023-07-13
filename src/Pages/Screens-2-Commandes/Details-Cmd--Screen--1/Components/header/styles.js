import {StyleSheet, Dimensions} from 'react-native';


const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    
    paddingLeft:20,paddingTop:15,
    backgroundColor: "#FFF",
  },
  containerId: {
    width:"100%",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  }
});
