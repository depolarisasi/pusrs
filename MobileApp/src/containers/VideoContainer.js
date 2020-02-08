/*
 * Created on Thu Oct 03 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import {
    StatusBar,
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    Linking,
    TouchableHighlight,
} from 'react-native';
import colors from './../styles/colors';
import HeaderTitleOnly from './../components/headers/HeaderTitleOnly';
const entryBorderRadius = 8;
const VIDEOS = [
    {
        id: 1,
        title: 'How to protect yourself from dengue',
        subtitle:
            'Red Alert shows how to protect your house and family against dengue.',
        url_youtube: 'https://www.youtube.com/watch?v=VC9Kl182E-E&t=13s',
        url_thumbnail_youtube:
            'https://img.youtube.com/vi/VC9Kl182E-E/hqdefault.jpg',
    },
    {
        id: 2,
        title: 'Health officials: 2019 going to be a big dengue year',
        subtitle: 'CNN Philippines',
        url_youtube: 'https://www.youtube.com/watch?v=pABkc9mX_0M&t=10s',
        url_thumbnail_youtube:
            'https://img.youtube.com/vi/pABkc9mX_0M/hqdefault.jpg',
    },
    {
        id: 3,
        title: 'Citizens vs. dengue: Symptoms, treatment, prevention',
        subtitle:
            'Data from the World Health Organization show 50 to 100 million dengue infections are estimated annually in over 100 endemic countries.',
        url_youtube: 'https://www.youtube.com/watch?v=uw-TgokvEi4',
        url_thumbnail_youtube:
            'https://img.youtube.com/vi/uw-TgokvEi4/hqdefault.jpg',
    },
    {
        id: 4,
        title: 'Dengue Fever - Tips #9 In Filipino by Dr Willie Ong',
        subtitle:
            'Alisin ang mga pinamumugaran ng lamok.Alisin ang naka-imbak na basura, gulong, vase at tubig na nag-iipon.',
        url_youtube: 'https://www.youtube.com/watch?v=cnU-npubpKw',
        url_thumbnail_youtube:
            'https://img.youtube.com/vi/cnU-npubpKw/hqdefault.jpg',
    },
    {
        id: 5,
        title: 'Dengue Fever: Effective Treatment - by Doc Richard Mata',
        subtitle: 'Dengue Fever: Effective Treatment - by Doc Richard Mata ',
        url_youtube: 'https://www.youtube.com/watch?v=rEyslDif1o4&t=17s',
        url_thumbnail_youtube:
            'https://img.youtube.com/vi/rEyslDif1o4/hqdefault.jpg',
    },
    {
        id: 6,
        title: 'Dengue Fever Tips',
        subtitle: 'Paano pataasin ang platelets sa Dengue Fever?',
        url_youtube: 'https://www.youtube.com/watch?v=o9y-5VKJRiQ',
        url_thumbnail_youtube:
            'https://img.youtube.com/vi/o9y-5VKJRiQ/hqdefault.jpg',
    },
    {
        id: 7,
        title: 'Dengue Virus infection',
        subtitle:
            'a scientist at Sanofi Pasteur and lead author of a dozen scientific publications in the field of dengue vaccine research',
        url_youtube: 'https://www.youtube.com/watch?v=I2G2o-oJHl0',
        url_thumbnail_youtube:
            'https://img.youtube.com/vi/I2G2o-oJHl0/hqdefault.jpg',
    },
    {
        id: 8,
        title: 'Dengue Fever: Signs and Symptoms',
        subtitle:
            'MK showcases heightened and unmatched public services, sensible exchanges of stories and opinions, and trustworthy news reports. ',
        url_youtube: 'https://www.youtube.com/watch?v=WUNDs3RLN-U&t=316s',
        url_thumbnail_youtube:
            'https://img.youtube.com/vi/WUNDs3RLN-U/hqdefault.jpg',
    },
    {
        id: 9,
        title: 'How to protect yourself from dengue',
        subtitle:
            'Red Alert shows how to protect your house and family against dengue.',
        url_youtube: 'https://www.youtube.com/watch?v=WUNDs3RLN-U&t=316s',
        url_thumbnail_youtube:
            'https://img.youtube.com/vi/VC9Kl182E-E/hqdefault.jpg',
    },
    {
        id: 10,
        title: 'Pinoy MD: Sakit na dengue, paano nga ba maiiwasan?',
        subtitle:
            'Ngayong tag-ulan, mas malaki ang posibilidad ng tamaan ng dengue ang isang tao lalo na kung namamalagi ito sa maduming lugar.',
        url_youtube: 'https://www.youtube.com/watch?v=9KzMjjgFmKc&t=23s',
        url_thumbnail_youtube:
            'https://img.youtube.com/vi/9KzMjjgFmKc/hqdefault.jpg',
    },
];

class VideoContainer extends Component {
    static navigationOptions = () => {
        return {
            header: () => <HeaderTitleOnly title="Videos" />,
        };
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <StatusBar
                    backgroundColor={colors.green01}
                    barStyle="dark-content"
                />
                <FlatList
                    contentContainerStyle={styles.listContainer}
                    data={VIDEOS}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <TouchableHighlight
                            key={`video-${item.id}`}
                            onPress={() => Linking.openURL(item.url_youtube)}>
                            <View style={styles.videoContainer}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{
                                            uri: item.url_thumbnail_youtube,
                                        }}
                                        style={styles.image}
                                    />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>
                                        {item.title}
                                    </Text>
                                    <Text style={styles.subtitle}>
                                        {item.subtitle}
                                    </Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    )}
                    keyExtractor={item => `video-${item.id}`}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.gray05,
    },
    listContainer: {
        padding: 15,
    },
    videoContainer: {
        width: '100%',
        height: 300,
        marginBottom: 15,
    },
    imageContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius,
    },
    title: {
        color: colors.black,
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        marginBottom: 10,
    },
    subtitle: {
        color: colors.black,
        fontSize: 14,
        letterSpacing: 0.5,
        marginBottom: 10,
    },
});

export default VideoContainer;
