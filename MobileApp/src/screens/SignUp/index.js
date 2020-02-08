/*
 * Created on Sun Sep 15 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    StatusBar,
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import ImagePicker from 'react-native-image-crop-picker';
import NavBarButton from './../../components/buttons/NavBarButton';
import styles from './../styles/Authentication';
import colors from './../../styles/colors';
import transparentHeaderStyle from './../../styles/navigation';
import InputField from './../../components/form/InputField';
import RoundedButton from './../../components/buttons/RoundedButton';
import submitSignUp from './submitSignUp';

const imgBg = require('./../../img/bg.jpg');
const defaultPic = require('./../../img/user.png');

class SignUp extends Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: (
            <NavBarButton
                handleButtonPress={() => navigation.goBack()}
                location="left"
                icon={<Icon name="angle-left" color={colors.white} size={30} />}
            />
        ),
        headerStyle: transparentHeaderStyle,
        headerTransparent: true,
        headerTintColor: colors.white,
    });

    constructor(props) {
        super(props);
        this.state = {
            //
        };

        this.changeProfilePic = this.changeProfilePic.bind(this);
    }

    renderInput({input, label, type, meta: {error}}) {
        return (
            <View>
                <InputField
                    input={input}
                    labelText={label}
                    labelTextSize={12}
                    labelColor={colors.white}
                    textColor={colors.white}
                    borderBottomColor={colors.white}
                    inputType={type}
                    customStyle={{marginBottom: 30}}
                    error={error}
                />
            </View>
        );
    }

    renderProfilePic = field => (
        <TouchableOpacity
            onPress={() => this.changeProfilePic(field.input.onChange)}>
            <Image
                source={field.input.value || defaultPic}
                style={styles.imgUser}
            />
        </TouchableOpacity>
    );

    changeProfilePic(onChange) {
        ImagePicker.openPicker({
            width: 100,
            height: 100,
            cropping: true,
        })
            .then(image => {
                onChange({
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    type: 'image/jpeg',
                    name: 'user.jpg',
                    mime: image.mime,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <ImageBackground source={imgBg} style={styles.bg}>
                <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
                    <StatusBar
                        translucent
                        backgroundColor={colors.transparent}
                        barStyle="dark-content"
                    />
                    <View style={styles.scrollViewWrapper}>
                        <ScrollView style={styles.scrollView}>
                            <View style={styles.topWrapper}>
                                <Text style={styles.titleText}>Daftar</Text>
                                <Field
                                    name="profilePic"
                                    component={this.renderProfilePic}
                                />
                                <Text style={styles.changeImgText}>
                                    Tekan untuk Mengubah
                                </Text>
                            </View>
                            <Field
                                name="username"
                                label="USERNAME"
                                type="text"
                                component={this.renderInput}
                            />
                            <Field
                                name="email"
                                label="ALAMAT EMAIL"
                                type="text"
                                component={this.renderInput}
                            />
                            <Field
                                name="password"
                                label="PASSWORD"
                                type="password"
                                component={this.renderInput}
                            />
                            <RoundedButton
                                text="Daftar"
                                textColor={colors.blue01}
                                background={colors.gray03}
                                borderColor={colors.transparent}
                                handleOnPress={handleSubmit(submitSignUp)}
                            />
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

export default reduxForm({
    form: 'signUpForm',
})(SignUp);
