/*
 * Created on Mon Sep 30 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, StatusBar, View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from './../redux/actions';
import NavBarButton from './../components/buttons/NavBarButton';
import transparentHeaderStyle from './../styles/navigation';
import colors from './../styles/colors';

class PrivacyTerms extends Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: (
            <NavBarButton
                handleButtonPress={() => navigation.goBack()}
                location="left"
                icon={
                    <Icon name="angle-left" color={colors.gray01} size={30} />
                }
            />
        ),
        headerStyle: transparentHeaderStyle,
        headerTransparent: true,
        headerTintColor: colors.white,
    });

    render() {
        const {headingText, bodyText} = this.props.navigation.getParam(
            'content',
        );
        return (
            <View style={styles.scrollViewWrapper}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}>
                    <StatusBar
                        translucent
                        backgroundColor={colors.transparent}
                        barStyle="dark-content"
                    />
                    <Text style={styles.heading}>{headingText || ''}</Text>
                    <Text style={styles.body}>{bodyText || ''}</Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    heading: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    body: {
        fontSize: 12,
        fontWeight: '500',
    },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
    bindActionCreators(ActionCreators, dispatch);

PrivacyTerms.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        goBack: PropTypes.func,
    }).isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PrivacyTerms);
