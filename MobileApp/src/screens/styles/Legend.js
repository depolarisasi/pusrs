/*
 * Created on Wed Oct 16 2019
 *
 * Copyright (c) 2019 Justin
 */

import { StyleSheet } from 'react-native';
import colors from './../../styles/colors';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollViewWrapper: {
    flex: 1,
    padding: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollView: {
    padding: 10,
    flex: 1,
  },
  legendItem: {
    marginBottom: 30,
  },
  legendItemText: {
    fontWeight: 'bold',
    color: colors.black,
  },
});

export default styles;