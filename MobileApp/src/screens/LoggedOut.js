/*
 * Created on Sat Sep 14 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import {
    StatusBar,
    Alert,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableHighlight,
    ScrollView,
} from 'react-native';
import colors from './../styles/colors';
import RoundedButton from './../components/buttons/RoundedButton';
import styles from './styles/LoggedOut';

const imgBg = require('./../img/bg.jpg');
const appIcon = require('./../img/app-icon.jpg');

const privacyTerms = {
    privacy: {
        headingText: 'Privacy Policy',
        bodyText: `
Effective date: June 17, 2019
Mozzify ("us", "we", or "our") operates the Mozzify mobile application (hereinafter referred to as the "Service").
This page informs you of our policies regarding the collection, use and disclosure of personal data when you use our Service and the choices you have associated with that data.
We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.
Definitions
Service
Service is the Mozzify mobile application operated by Mozzify
Personal Data
Personal Data means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).
Usage Data
Usage Data is data collected automatically either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).
Cookies
Cookies are small files stored on your device (computer or mobile device).
Information Collection and Use
We collect several different types of information for various purposes to provide and improve our Service to you.
Types of Data Collected
Personal Data
While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
Email address
First name and last name
Phone number
Address, State, Province, ZIP/Postal code, City
Cookies and Usage Data
Usage Data
When you access the Service with a mobile device, we may collect certain information automatically, including, but not limited to, the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data ("Usage Data").
Location Data
We may use and store information about your location if you give us permission to do so ("Location Data"). We use this data to provide features of our Service, to improve and customise our Service.
You can enable or disable location services when you use our Service at any time by way of your device settings.
Tracking & Cookies Data
We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information.
Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Other tracking technologies are also used such as beacons, tags and scripts to collect and track information and to improve and analyse our Service.
You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
Examples of Cookies we use:
Session Cookies. We use Session Cookies to operate our Service.
Preference Cookies. We use Preference Cookies to remember your preferences and various settings.
Security Cookies. We use Security Cookies for security purposes.
Use of Data
Mozzify uses the collected data for various purposes:
To provide and maintain our Service
To notify you about changes to our Service
To allow you to participate in interactive features of our Service when you choose to do so
To provide customer support
To gather analysis or valuable information so that we can improve our Service
To monitor the usage of our Service
To detect, prevent and address technical issues
Transfer of Data
Your information, including Personal Data, may be transferred to - and maintained on - computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.
If you are located outside Japan and choose to provide information to us, please note that we transfer the data, including Personal Data, to Japan and process it there.
Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
Mozzify will take all the steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organisation or a country unless there are adequate controls in place including the security of your data and other personal information.
Disclosure of Data
Legal Requirements
Mozzify may disclose your Personal Data in the good faith belief that such action is necessary to:
To comply with a legal obligation
To protect and defend the rights or property of Mozzify
To prevent or investigate possible wrongdoing in connection with the Service
To protect the personal safety of users of the Service or the public
To protect against legal liability
Security of Data
The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
Service Providers
We may employ third party companies and individuals to facilitate our Service ("Service Providers"), provide the Service on our behalf, perform Service-related services or assist us in analysing how our Service is used.
These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
Analytics
We may use third-party Service Providers to monitor and analyse the use of our Service.
Firebase
Firebase is an analytics service provided by Google Inc.
You may opt-out of certain Firebase features through your mobile device settings, such as your device advertising settings or by following the instructions provided by Google in their Privacy Policy: https://policies.google.com/privacy?hl=en
We also encourage you to review the Google's policy for safeguarding your data: https://support.google.com/analytics/answer/6004245.
For more information on what type of information Firebase collects, please visit the Google Privacy & Terms web page: https://policies.google.com/privacy?hl=en
Links to Other Sites
Our Service may contain links to other sites that are not operated by us. If you click a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
Children's Privacy
Our Service does not address anyone under the age of 18 ("Children").
We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
Changes to This Privacy Policy
We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.
You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
Contact Us
If you have any questions about this Privacy Policy, please contact us:
By email: herbuelavonralphdane@gmail.com
By phone number: +818039252523
    `,
    },
    terms: {
        headingText: 'Terms & Conditions',
        bodyText: `
Last updated: June 17, 2019
These Terms and Conditions ("Terms", "Terms and Conditions") govern your relationship with Mozzify mobile application (the "Service") operated by Mozzify ("us", "we", or "our").
Please read these Terms and Conditions carefully before using our Mozzify mobile application (the "Service").
Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
Content
Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights. You agree that this license includes the right for us to make your Content available to other users of the Service, who may also use your Content subject to these Terms.
You represent and warrant that: (i) the Content is yours (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.
Accounts
When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trade mark that is subject to any rights of another person or entity other than you without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.
Links To Other Web Sites
Our Service may contain links to third-party web sites or services that are not owned or controlled by Mozzify.
Mozzify has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Mozzify shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
Termination
We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
Limitation Of Liability
In no event shall Mozzify, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
Disclaimer
Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
Mozzify its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.
Governing Law
These Terms shall be governed and construed in accordance with the laws of Japan, without regard to its conflict of law provisions.
Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
Changes
We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
Contact Us
If you have any questions about these Terms, please contact us.
    `,
    },
};

export default class LoggedOut extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    constructor(props) {
        super(props);
        this.onPrivacyPolicyPress = this.onPrivacyPolicyPress.bind(this);
        this.onTermsConditionsPress = this.onTermsConditionsPress.bind(this);
        this.onLoginPress = this.onLoginPress.bind(this);
        this.onSignUpPress = this.onSignUpPress.bind(this);
    }

    onPrivacyPolicyPress() {
        this.props.navigation.navigate('PrivacyTerms', {
            content: privacyTerms.privacy,
        });
    }

    onTermsConditionsPress() {
        this.props.navigation.navigate('PrivacyTerms', {
            content: privacyTerms.terms,
        });
    }

    onLoginPress() {
        setTimeout(() => this.props.navigation.navigate('LogIn'), 500);
    }

    onSignUpPress() {
        setTimeout(
            () =>
                Alert.alert(
                    'Privasi Polisi dan Syarat & Ketentuan',
                    'Apakah Anda setuju dengan Privasi Polisi dan Syarat & Ketentuan kami?',
                    [
                        {text: 'Tidak', style: 'cancel'},
                        {
                            text: 'Ya, Saya Setuju',
                            onPress: () =>
                                this.props.navigation.navigate('SignUp'),
                        },
                    ],
                ),
            500,
        );
    }

    render() {
        return (
            <ImageBackground source={imgBg} style={styles.bg}>
                <ScrollView style={styles.wrapper}>
                    <StatusBar
                        translucent
                        backgroundColor={colors.transparent}
                        barStyle="dark-content"
                    />
                    <View style={styles.wrapperInner}>
                        <Image source={appIcon} style={styles.appIcon} />
                        <Text style={styles.appName}>Mozzify</Text>
                        <View
                            style={[
                                styles.termsAndConditions,
                                {marginTop: 50, marginBottom: 5},
                            ]}>
                            <Text style={styles.termsText}>
                                Dengan mendaftar, Anda setuju dengan
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.termsAndConditions,
                                {marginBottom: 50},
                            ]}>
                            <TouchableHighlight
                                onPress={this.onPrivacyPolicyPress}>
                                <Text
                                    style={[styles.termsText, styles.linkText]}>
                                    Privasi Polisi
                                </Text>
                            </TouchableHighlight>
                            <Text style={styles.termsText}>{' dan '}</Text>
                            <TouchableHighlight
                                onPress={this.onTermsConditionsPress}>
                                <Text
                                    style={[styles.termsText, styles.linkText]}>
                                    Syarat & Ketentuan
                                </Text>
                            </TouchableHighlight>
                            <Text style={styles.termsText}>{' kami '}</Text>
                        </View>
                        <RoundedButton
                            text="Masuk"
                            textColor={colors.white}
                            background={colors.transparent}
                            borderColor={colors.white}
                            handleOnPress={this.onLoginPress}
                        />
                        <RoundedButton
                            text="Daftar"
                            textColor={colors.white}
                            background={colors.transparent}
                            borderColor={colors.white}
                            handleOnPress={this.onSignUpPress}
                        />
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}
