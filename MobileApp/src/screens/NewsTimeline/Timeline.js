import React, {Component} from 'react';
import {
    ActivityIndicator,
    FlatList,
    Modal,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ToastAndroid,
    View,
} from 'react-native';
import colors from './../../styles/colors';
import database from '@react-native-firebase/database';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import auth from '@react-native-firebase/auth';
import ActionSheet from 'react-native-actionsheet';

Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
};
String.prototype.capitalizeFirstLetter = function() {
    return `${this.substr(0, 1).toUpperCase()}${this.substr(1)}`;
};

class Timeline extends Component {
    renderListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: colors.gray04,
                    marginTop: 2,
                }}
            />
        );
    };

    constructor(props) {
        super(props);
        this.state = {
            modalAddTimeLineVisible: false,
            arrData: [],
            newAddPostTimeline: '',
            fullname: '',
            id_timeline: '',
            isLoading: true,
            typeDialog: '',
            activeRow: null,
        };
    }

    componentDidMount(): void {
        this.readTimeLine().then(console.log('Success'));
        this.readPost().then(console.log('Execute ReadPost'));
        this.showActionSheet = this.showActionSheet.bind(this);
    }

    showActionSheet = index => {
        this.setState({activeRow: index});
        console.log(`position actionSheet: ${index}`);
        this.ActionSheet.show();
    };

    async readTimeLine() {
        const refDb = database()
            .ref('/timeline/')
            .orderByChild('dateTimeline')
            .limitToLast(50);
        await refDb
            .once('value', data => {
                const items = [];
                data.forEach(function(childSnapshot) {
                    try {
                        items.push({
                            username: childSnapshot.val().username,
                            dateTimeline: childSnapshot.val().dateTimeline,
                            timeline: childSnapshot.val().timeline,
                            id_timeline: childSnapshot.val().id_timeline,
                        });
                    } catch (e) {
                        console.error(e);
                        items.push({
                            username: '',
                            dateTimeline: '',
                            timeline: '',
                            id_timeline: '',
                        });
                    }
                });
                items.reverse();
                this.setState({arrData: items});
            })
            .then(() => {
                this.setState({isLoading: false});
            })
            .catch(error => {
                this.setState({isLoading: false});
                console.error(error);
                ToastAndroid.show(
                    'Maaf Timeline sedang Kosong',
                    ToastAndroid.SHORT,
                );
            });
    }

    async readPost() {
        let userId = auth().currentUser.uid;
        const refDb = database().ref(`/posts/${userId}`);
        refDb
            .once('value')
            .then(snapshot => {
                this.setState({
                    fullName: snapshot.val().fullName,
                });
            })
            .catch(error => {
                this.setState({
                    fullName: '',
                });
            });
    }

    async addPostTimeline() {
        if (this.state.newAddPostTimeline.length === 0) {
            ToastAndroid.show(
                'Silahkan Masukkan Timeline anda.',
                ToastAndroid.SHORT,
            );
        } else if (
            this.state.fullName.length === 0 ||
            this.state.fullName === 'undefined'
        ) {
            ToastAndroid.show(
                'Segera update profil anda sekarang terlebih dahulu',
                ToastAndroid.SHORT,
            );
        } else {
            let timeline = {};
            const n = new Date();
            timeline.dateTimeline = `${n.toLocaleString('en-GB')}`;
            timeline.timeline = this.state.newAddPostTimeline;
            timeline.username = this.state.fullName;
            timeline.id_timeline = n.getTime();
            const refDb = database().ref('/timeline/');
            await refDb.push(timeline).then(() => {
                this.setState({isLoading: false, newAddPostTimeline: ''});
                this.readTimeLine().then(console.log('Success'));
                this.toggleModalAddTimeLine(false);
            });
        }
    }

    refreshFlatList = deletedKey => {
        this.setState(prevState => {
            return {
                deletedRowKey: deletedKey,
            };
        });
    };

    showDialogTimeline = () => {
        this.ActionSheet.show();
    };

    toggleModalAddTimeLine = state =>
        this.setState({modalAddTimeLineVisible: state});

    renderModalAddTimeLine() {
        return (
            <Modal
                transparent={true}
                animationType="fade"
                onRequestClose={() => this.toggleModalAddTimeLine(false)}
                visible={this.state.modalAddTimeLineVisible}>
                <TouchableHighlight
                    style={styles.modalBackground}
                    onPress={() => this.toggleModalAddTimeLine(false)}
                    underlayColor={'transparent'}>
                    <View />
                </TouchableHighlight>
                <View style={styles.modalTimeLineContainer}>
                    <View style={styles.modalAddTimeLine}>
                        <View style={styles.fieldLabelContainer}>
                            <Text style={styles.fieldLabel}>
                                What is going on?
                            </Text>
                        </View>
                        <TextInput
                            value={this.state.newAddPostTimeline}
                            style={styles.fieldInput}
                            underlineColorAndroid="transparent"
                            onChangeText={newAddPostTimeline =>
                                this.setState({newAddPostTimeline})
                            }
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.buttonDismiss}
                                activeOpacity={0.7}
                                onPress={() => {
                                    this.setState({
                                        isLoading: false,
                                        newAddPostTimeline: '',
                                    });
                                    this.toggleModalAddTimeLine(false);
                                }}>
                                <Text style={styles.buttonDismissText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonAddTimeLine}
                                activeOpacity={0.7}
                                onPress={() => {
                                    if (this.state.typeDialog === 'Edit') {
                                        this.onChangeTimeline().then(
                                            'Execute Edit Post Timeline',
                                        );
                                    } else {
                                        this.addPostTimeline().then(
                                            'Execute Add Post Timeline',
                                        );
                                    }
                                }}>
                                <Text style={styles.buttonAddTimeLineText}>
                                    Post
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    async onChangeTimeline() {
        let changeTimeLine = {};
        changeTimeLine.timeline = this.state.newAddPostTimeline;
        const refDb = database().ref('/timeline/');
        await refDb
            .orderByChild('id_timeline')
            .equalTo(this.state.arrData[this.state.activeRow].id_timeline)
            .once('child_added', function(snapshot) {
                snapshot.ref.update(changeTimeLine);
            });
        this.setState({
            isLoading: false,
            newAddPostTimeline: '',
            typeDialog: '',
        });
        this.readTimeLine().then(console.log('Success'));
        this.toggleModalAddTimeLine(false);
    }

    async onDeleteTimeline() {
        const refDb = database().ref('/timeline/');
        await refDb
            .orderByChild('id_timeline')
            .equalTo(this.state.arrData[this.state.activeRow].id_timeline)
            .once('value')
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    refDb.child(childSnapshot.key).remove();
                });
            });
        this.setState({isLoading: false, newAddPostTimeline: ''});
        this.readTimeLine().then(console.log('Success'));
        this.toggleModalAddTimeLine(false);
    }

    renderTimeline() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" />
                </View>
            );
        } else {
            if (this.state.arrData.length === 0) {
                return (
                    <View>
                        <Text style={styles.textEmpty}>
                            Sorry, the Timeline Data is Empty
                        </Text>
                    </View>
                );
            } else {
                return (
                    <FlatList
                        contentContainerStyle={styles.listContainer}
                        data={this.state.arrData}
                        parentFlatList={this}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item, index}) => (
                            // <TouchableOpacity onPress={this.showActionSheet}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.showActionSheet(index);
                                }}>
                                <View style={styles.innerContainer}>
                                    <View style={styles.photoContainer}>
                                        <View
                                            style={styles.innerPhotoContainer}>
                                            <TouchableOpacity>
                                                <EvilIcons
                                                    name={'user'}
                                                    size={65}
                                                    style={styles.photo}
                                                    color={'rgb(136, 153, 166)'}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.info}>
                                        <Text style={styles.userHandleAndTime}>
                                            {item.username} ·{' '}
                                            {item.dateTimeline}
                                        </Text>
                                        <Text style={styles.tweetText}>
                                            {item.timeline}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        ItemSeparatorComponent={this.renderListItemSeparator}
                        keyExtractor={item => `${item.id_timeline}`}
                    />
                );
            }
        }
    }

    onClickTimeline(index) {
        if (index === 1) {
            Alert.alert('Edit', 'Are you sure change timeline?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        console.log(this.state.activeRow);
                        this.setState({
                            newAddPostTimeline: this.state.arrData[
                                this.state.activeRow
                            ].timeline,
                            typeDialog: 'Edit',
                        });
                        this.toggleModalAddTimeLine(true);
                    },
                },
            ]);
        } else if (index === 2) {
            Alert.alert('Delete', 'Are you sure delete timeline?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        this.onDeleteTimeline();
                    },
                },
            ]);
        }
    }

    render() {
        const optionArray = [
            <Text style={{color: colors.red01}}>Cancel</Text>,
            'Edit',
            'Delete',
        ];
        return (
            <View style={styles.container}>
                {this.renderModalAddTimeLine()}
                <View style={styles.header}>
                    <Text style={[styles.text, styles.bold]}>Timeline</Text>
                    <View style={styles.right}>
                        <TouchableOpacity
                            onPress={() => this.toggleModalAddTimeLine(true)}>
                            <Text style={styles.text}>Add post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.renderTimeline(this.state.arrData)}
                <ActionSheet
                    ref={o => (this.ActionSheet = o)}
                    title={
                        <Text style={{color: '#000', fontSize: 18}}>
                            Which one do you like?
                        </Text>
                    }
                    style={styles.actionBar}
                    options={optionArray}
                    cancelButtonIndex={0}
                    onPress={index => {
                        this.onClickTimeline(index);
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        flexDirection: 'column',
        backgroundColor: colors.gray02,
    },
    header: {
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        borderColor: 'green',
        flexDirection: 'row',
    },
    photoContainer: {
        flex: 0.23,
        borderColor: 'yellow',
        flexDirection: 'column',
        borderWidth: 0,
    },
    innerPhotoContainer: {height: 70, alignItems: 'center'},
    photo: {
        width: 75,
        height: 75,
        borderRadius: 50,
        marginTop: 15,
    },
    info: {
        flex: 0.75,
        borderColor: 'yellow',
        flexDirection: 'column',
        borderWidth: 0,
    },
    userDetails: {
        flex: 0.55,
        borderColor: 'blue',
        borderWidth: 0,
        marginBottom: 2,
    },
    userName: {
        color: 'white',
        fontWeight: 'bold',
        marginEnd: 10,
    },
    userHandleAndTime: {
        color: 'rgb(136, 153, 166)',
        marginTop: 5,
    },
    tweetTextContainer: {borderColor: 'blue', borderWidth: 0},
    tweetText: {color: colors.gray01, paddingRight: 10, flex: 0.25},
    commentButtonIcon: {
        margin: 0,
        marginLeft: -4,
        borderColor: 'red',
        borderWidth: 0,
    },
    commentsCount: {
        position: 'absolute',
        left: 27,
        color: 'rgb(136, 153, 166)',
        marginLeft: -4,
    },
    retweetButton: {
        padding: 5,
        flex: 0.25,
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: 'red',
        borderWidth: 0,
    },
    retweetButtonIcon: {
        position: 'absolute',
        left: 27,
        marginLeft: 3,
    },
    likeButton: {
        padding: 5,
        flex: 0.25,
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: 'red',
        borderWidth: 0,
    },
    likeButtonIcon: {
        position: 'absolute',
        left: 27,
        marginLeft: 3,
    },
    shareButton: {
        padding: 5,
        flex: 0.25,
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: 'red',
        borderWidth: 0,
    },
    right: {
        width: 100,
        height: 50,
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '500',
        color: colors.white,
        marginHorizontal: 15,
    },
    textEmpty: {
        fontWeight: 'bold',
        color: colors.white,
        marginHorizontal: 15,
        justifyContent: 'center',
    },
    bold: {
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 5,
        backgroundColor: colors.white,
    },
    tweetActionsContainer: {
        flex: 1,
        borderColor: 'blue',
        borderWidth: 0,
        marginTop: 5,
        flexDirection: 'row',
        paddingBottom: 5,
    },
    modalTimeLineContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    modalAddTimeLine: {
        width: 300,
        height: 150,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
    fieldLabelContainer: {
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    fieldLabel: {
        paddingVertical: 4,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#424242',
    },
    buttonDismiss: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.gray05,
        marginTop: 8,
        marginRight: 8,
        paddingVertical: 6,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
    },
    buttonDismissText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '400',
    },
    buttonAddTimeLine: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.green01,
        marginTop: 8,
        paddingVertical: 6,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
    },
    buttonAddTimeLineText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '400',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    fieldInput: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 3,
        paddingHorizontal: 10,
        color: '#212121',
        fontSize: 12,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
});

export default Timeline;
