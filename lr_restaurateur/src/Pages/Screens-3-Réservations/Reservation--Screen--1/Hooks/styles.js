import {StyleSheet, Dimensions, Platform} from 'react-native';
import { COLORS } from '../../../../constants/theme';

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    position: "relative",
  },
  trie: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:"flex-end",
    marginTop:10,
    paddingHorizontal:20
  },
  Input: {
    // color: COLORS.darkGr,
    fontSize: 16,
    fontFamily: Platform.OS == "ios"? undefined: "RobotoBold",
    flex: 1,
    paddingLeft: 2,
    backgroundColor:COLORS.white,
    paddingLeft:20,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    borderRadius:6,
    height:45,
  },
});
