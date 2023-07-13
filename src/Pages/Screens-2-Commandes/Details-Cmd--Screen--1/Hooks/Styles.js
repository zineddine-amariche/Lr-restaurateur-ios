import {StyleSheet} from 'react-native';
import { COLORS } from '../../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS?.white,
  },
  containerId: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  TextId: {
    fontSize: 40,
    fontWeight: '700',
  },
  ContainerBodyTab: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ContainerBody: {},
  BoxOrders: {
    width: '100%',
    alignSelf: 'center',
    height: '40%',
    backgroundColor: '#fff',
    flex: 1,
  },
  BoxOrdersTab: {
    width: '60%',
    alignSelf: 'center',
    height: '40%',
    backgroundColor: '#fff',
    flex: 1,
  },
  BottomItems: {},
});
