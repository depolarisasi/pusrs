/*
 * Created on Thu Dec 05 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text, Image} from 'react-native';
import {Linking} from 'react-native';
import {TouchableHighlight} from 'react-native';
import colors from './../../styles/colors';

const WEBSITES = [
    {id: 1, img: require('./../../img/who.png')},
    {id: 2, img: require('./../../img/dept_of_health_logo.png')},
];

const NEWS = [
    {
        id: 1,
        img: require('./../../img/relief_web.png'),
        title:
            'Dengue cases slightly up in Pengasinan - Philippines - ReliefWeb',
    },
    {
        id: 2,
        img: require('./../../img/relief_web.png'),
        title:
            'Dengue cases slightly up in Pengasinan - Philippines - ReliefWeb',
    },
    {
        id: 3,
        img: require('./../../img/relief_web.png'),
        title:
            'Dengue cases slightly up in Pengasinan - Philippines - ReliefWeb',
    },
];

class News extends Component {
    renderWebsites() {
        return (
            <View>
                {WEBSITES.map((website, index) => (
                    <View
                        key={`website-${index}`}
                        style={styles.websiteContainer}>
                        <TouchableHighlight
                            style={styles.image}
                            onPress={() =>
                                Linking.openURL('https://www.google.com')
                            }>
                            <Image source={website.img} />
                        </TouchableHighlight>
                    </View>
                ))}
            </View>
        );
    }

    renderNews() {
        return (
            <View>
                {NEWS.map((news, index) => (
                    <View key={`news-${index}`} style={styles.newsContainer}>
                        <View style={styles.imageContainer}>
                            <Image source={news.img} style={styles.image} />
                        </View>
                        <View style={styles.newsTextContainer}>
                            <Text style={styles.title}>{news.title}</Text>
                        </View>
                    </View>
                ))}
            </View>
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.header}>
                    <Text style={[styles.text, styles.bold]}>Web & News</Text>
                </View>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.sectionTitle}>
                            <Text style={[styles.text, styles.bold]}>
                                Websites
                            </Text>
                        </View>
                        {this.renderWebsites()}
                        <View style={styles.sectionTitle}>
                            <Text style={[styles.text, styles.bold]}>News</Text>
                        </View>
                        {this.renderNews()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green01,
    },
    header: {
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '500',
        color: colors.white,
        marginHorizontal: 15,
    },
    bold: {
        fontWeight: 'bold',
    },
    sectionTitle: {
        backgroundColor: colors.black,
        paddingVertical: 5,
    },
    sectionTitleText: {
        fontWeight: '500',
        color: colors.white,
        marginHorizontal: 15,
    },
    websiteContainer: {
        backgroundColor: colors.white,
        width: '100%',
        height: 150,
    },
    imageContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.gray05,
    },
    image: {
        flex: 1,
        height: 150,
        alignSelf: 'center',
        marginTop: '2%',
        marginBottom: '5%',
    },
    imageStyle: {
        flex: 1,
        height: 150,
        alignSelf: 'center',
        marginTop: '2%',
        marginBottom: '5%',
        resizeMode: 'contain',
    },
    newsTextContainer: {
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
    title: {
        color: colors.black,
        fontSize: 14,
        letterSpacing: 0.5,
    },
});

export default News;
