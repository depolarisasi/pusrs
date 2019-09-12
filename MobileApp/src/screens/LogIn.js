import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from './../redux/actions';
import styles from './styles/LogIn';

class LogIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={[{ backgroundColor: '#000' }, styles.wrapper]}
        behavior="padding"
      >
        <View style={styles.scrolLViewWrapper}>

        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);