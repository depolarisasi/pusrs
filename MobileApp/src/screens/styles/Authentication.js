/*
 * Created on Thu Sep 12 2019
 *
 * Copyright (c) 2019 Justin
 */

import { StyleSheet } from 'react-native';
import colors from './../../styles/colors';

let titleTextSize = 16;
let changeImgTextSize = 12;

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    flex: 1,
    display: 'flex'
  },
  wrapper: {
    display: 'flex',
    flex: 1,
  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1,
    padding: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollView: {
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
  },
  topWrapper: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgUser: {
    width: 50,
    height: 50,
    marginTop: 20,
    marginBottom: 5,
  },
  titleText: {
    fontSize: titleTextSize,
    color: colors.white,
    fontWeight: 'bold',
  },
  changeImgText: {
    fontSize: changeImgTextSize,
    color: colors.white,
    fontWeight: '500',
  },
  bottomWrapper: {
    marginTop: 100,
  },
});

export default styles;