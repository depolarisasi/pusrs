/*
 * Created on Sat Sep 14 2019
 *
 * Copyright (c) 2019 Justin
 */

import { StyleSheet } from 'react-native';
import colors from './../../styles/colors';

let headingTextSize = 30;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    backgroundColor: colors.green01,
  },
  welcomeWrapper: {
    flex: 1,
    display: 'flex',
    marginTop: 30,
    padding: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 50,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: headingTextSize,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
  },
  facebookButtonIcon: {
    color: colors.green01,
    position: 'relative',
    left: 20,
    zIndex: 8,
  }
});

export default styles;