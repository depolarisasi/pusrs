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
    TextInput,
    Modal,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    DatePickerAndroid,
    TimePickerAndroid,
    ToastAndroid,
    ActivityIndicator,
} from 'react-native';
import colors from './../styles/colors';
import HeaderToDo from './../components/headers/HeaderToDo';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import moment from 'moment';

class ToDoContainer extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: () => <HeaderToDo navigation={navigation} />,
        };
    };

    constructor(props) {
        super(props);
        this.toggleModalChooseTodo = this.toggleModalChooseTodo.bind(this);
        this.state = {
            newToDoName: '',
            newAddPostTimeline: '',
            androidDate: '-',
            chooseAndroidTime: '-',
            yearDate: '',
            monthDate: '',
            dayDate: '',
            hourTime: '',
            minutesTime: '',
            secondTime: '',
            modalAddToDoVisible: false,
            modalChooseTodoVisible: false,
            todoArr: [],
            indexChooseTodo: null,
            isLoading: true,
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            toggleModalAddToDo: this.toggleModalAddToDo.bind(this),
        });
        this.readToDo().then(console.log('Success'));
    }

    renderListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: colors.gray04,
                }}
            />
        );
    };

    async readToDo() {
        let userId = auth().currentUser.uid;
        const refDb = database().ref(`/posts/${userId}/ToDo`);
        await refDb
            .once('value', data => {
                const items = [];
                data.forEach(function(childSnapshot) {
                    try {
                        items.push({
                            id_todo: childSnapshot.val().id_todo,
                            name: childSnapshot.val().name,
                            date: childSnapshot.val().date,
                            time: childSnapshot.val().time,
                            reminder: childSnapshot.val().reminder,
                        });
                    } catch (e) {
                        items.push({
                            id_todo: '',
                            name: '',
                            date: '',
                            time: '',
                            reminder: '',
                        });
                    }
                });
                this.setState({todoArr: items});
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

    async addDataToDo() {
        let userId = auth().currentUser.uid;
        const n = new Date();
        console.log(userId);
        let todo = {};
        todo.id_todo = n.getTime();
        todo.name = this.state.newToDoName;
        todo.date = this.state.androidDate;
        todo.time = this.state.chooseAndroidTime;
        todo.reminder = '0';
        const refDb = database().ref(`/posts/${userId}/ToDo`);
        await refDb.push(todo).then(() => {
            this.toggleModalAddToDo(false);
            this.readToDo().then(console.log('Successful add Todo'));
        });
    }
    renderDataToDo() {
        if (this.state.isLoading) {
            return (
                <View style={styles.wrapper}>
                    <ActivityIndicator size="large" />
                </View>
            );
        } else {
            if (this.state.todoArr.length === 0) {
                return (
                    <View>
                        <Text style={styles.textEmpty}>
                            Sorry, the To-Do Data is Empty
                        </Text>
                    </View>
                );
            } else {
                const {todoArr} = this.state;
                return (
                    <View>
                        <FlatList
                            contentContainerStyle={styles.listContainer}
                            data={todoArr}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item, index}) => (
                                <TouchableHighlight
                                    key={item.id_todo}
                                    onPress={() => {
                                        if (item.reminder) {
                                            console.log(item.name);
                                            console.log(index);
                                            this.setState({
                                                indexChooseTodo: index,
                                            });
                                            this.setState({
                                                androidDate: '-',
                                                newToDoName: '',
                                            });
                                            this.setState({
                                                chooseAndroidTime: '-',
                                            });
                                            this.toggleModalChooseTodo(true);
                                        } else {
                                            ToastAndroid.show(
                                                'You have set the reminder!',
                                                ToastAndroid.SHORT,
                                            );
                                        }
                                    }}>
                                    <View style={styles.listRow}>
                                        <View style={styles.listLeft}>
                                            <Text>{item.name}</Text>
                                        </View>
                                        {this.handleEventAddReminder({
                                            item,
                                            index,
                                        })}
                                    </View>
                                </TouchableHighlight>
                            )}
                            ItemSeparatorComponent={
                                this.renderListItemSeparator
                            }
                            keyExtractor={item => `${item.id_todo}`}
                        />
                    </View>
                );
            }
        }
    }

    static addToCalendar = (title: string, startDateUTC: string) => {
        const eventConfig = {
            title,
            startDate: startDateUTC,
            endDate: startDateUTC,
            notes: 'PUSRS',
            navigationBarIOS: {
                tintColor: 'orange',
                backgroundColor: 'green',
                titleColor: 'blue',
            },
        };

        AddCalendarEvent.presentEventCreatingDialog(eventConfig)
            .then(
                (eventInfo: {
                    calendarItemIdentifier: string,
                    eventIdentifier: string,
                }) => {
                    console.log(`eventInfo: ${eventInfo.eventIdentifier}`);
                    //xalert('eventInfo -> ' + JSON.stringify(eventInfo));
                },
            )
            .catch((error: string) => {
                console.warn(error);
                // handle error such as when user rejected permissions
            });
    };

    async onDeleteToDo() {
        let userId = auth().currentUser.uid;
        const refDb = database().ref(`/posts/${userId}/ToDo`);
        await refDb
            .orderByChild('id_todo')
            .equalTo(this.state.todoArr[this.state.activeRow].id_timeline)
            .once('value')
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    refDb.child(childSnapshot.key).remove();
                });
            });
    }

    async showDate(name) {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date(),
                minDate: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({
                    yearDate: `${year}`,
                    monthDate: `${month}`,
                    dayDate: `${day}`,
                });
                this.setState({androidDate: `${day}/${month + 1}/${year}`});
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    async showTime() {
        try {
            let date = new Date();
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: date.getHours(),
                minute: date.getMinutes(),
                is24Hour: true,
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                const m = minute < 10 ? `0${minute}` : minute;
                const h = hour < 10 ? `0${hour}` : hour;
                this.setState({chooseAndroidTime: `${h}:${m}`});
                this.setState({hourTime: `${h}`, minutesTime: `${m}`});
            }
        } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
        }
    }

    renderModalAddToDo() {
        return (
            <Modal
                transparent={true}
                animationType="fade"
                visible={this.state.modalAddToDoVisible}
                onRequestClose={() => this.toggleModalAddToDo(false)}>
                <TouchableHighlight
                    style={styles.modalBackground}
                    onPress={() => this.toggleModalAddToDo(false)}
                    underlayColor={'transparent'}>
                    <View />
                </TouchableHighlight>
                <View style={styles.modalContainer}>
                    <View style={styles.modalAddToDo}>
                        <View style={styles.fieldLabelContainer}>
                            <Text style={styles.fieldLabel}>
                                Add a new to-do item:
                            </Text>
                        </View>
                        <TextInput
                            value={this.state.newToDoName}
                            style={styles.fieldInput}
                            underlineColorAndroid="transparent"
                            onChangeText={newToDoName =>
                                this.setState({newToDoName})
                            }
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.buttonDismiss}
                                activeOpacity={0.7}
                                onPress={() => this.toggleModalAddToDo(false)}>
                                <Text style={styles.buttonDismissText}>
                                    Dismiss
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonAddToDo}
                                activeOpacity={0.7}
                                onPress={() => {
                                    if (
                                        this.state.newToDoName ===
                                            'undefined' ||
                                        this.state.newToDoName.length === 0
                                    ) {
                                        ToastAndroid.show(
                                            'Please Insert Todo',
                                            ToastAndroid.SHORT,
                                        );
                                    } else {
                                        this.addDataToDo().then(
                                            console.log('Success'),
                                        );
                                    }
                                }}>
                                <Text style={styles.buttonAddToDoText}>
                                    Add
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    toggleModalAddToDo = state => this.setState({modalAddToDoVisible: state});

    toggleModalChooseTodo = state =>
        this.setState({modalChooseTodoVisible: state});

    render() {
        return (
            <View style={styles.wrapper}>
                <StatusBar
                    backgroundColor={colors.green01}
                    barStyle="dark-content"
                />

                {this.renderDataToDo()}
                {this.renderModalAddToDo()}
                {this.renderModalChooseTodo()}
            </View>
        );
    }

    handleEventAddReminder({item, index}) {
        if (item.reminder) {
            return (
                <View style={styles.listRight} key={index}>
                    <TouchableOpacity>
                        <Text style={styles.listButton}>Add Reminder</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.listRight} key={index}>
                    <EvilIcons
                        name={'check'}
                        size={25}
                        style={styles.iconApproved}
                        color={colors.green01}
                    />
                </View>
            );
        }
    }

    renderModalChooseTodo() {
        const {
            yearDate,
            monthDate,
            dayDate,
            hourTime,
            minutesTime,
        } = this.state;
        return (
            <Modal
                transparent={true}
                animationType="fade"
                onRequestClose={() => this.toggleModalChooseTodo(false)}
                visible={this.state.modalChooseTodoVisible}>
                <TouchableHighlight
                    style={styles.modalBackground}
                    onPress={() => this.toggleModalChooseTodo(false)}
                    underlayColor={'transparent'}>
                    <View />
                </TouchableHighlight>
                <View style={styles.modalContainer}>
                    <View style={styles.modalChooseToDo}>
                        <View style={styles.fieldLabelContainer}>
                            <Text style={styles.fieldLabel}>Add Reminder</Text>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.fieldLabel}>Date</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.showDate().then('Execute');
                                }}>
                                <TextInput
                                    value={this.state.androidDate}
                                    style={styles.fieldInput}
                                    underlineColorAndroid="transparent"
                                    editable={false}
                                    onChangeText={androidDate =>
                                        this.setState({androidDate})
                                    }
                                />
                            </TouchableOpacity>
                            <Text style={styles.fieldLabel}>Time</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({chooseAndroidTime: ''});
                                    this.showTime().then('Execute');
                                }}>
                                <TextInput
                                    value={this.state.chooseAndroidTime}
                                    style={styles.fieldInput}
                                    underlineColorAndroid="transparent"
                                    editable={false}
                                    onChangeText={chooseAndroidTime =>
                                        this.setState({chooseAndroidTime})
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.buttonDismiss}
                                activeOpacity={0.7}
                                onPress={() => {
                                    this.setState({
                                        isLoading: false,
                                        newAddPostTimeline: '',
                                    });
                                    this.toggleModalChooseTodo(false);
                                }}>
                                <Text style={styles.buttonDismissText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonAddToDo}
                                activeOpacity={0.7}
                                onPress={() => {
                                    if (this.state.chooseAndroidTime === '-') {
                                        ToastAndroid.show(
                                            'Please Insert Time',
                                            ToastAndroid.SHORT,
                                        );
                                    } else if (this.state.androidDate === '-') {
                                        ToastAndroid.show(
                                            'Please Insert Date',
                                            ToastAndroid.SHORT,
                                        );
                                    } else {
                                        const dt = new Date(
                                            yearDate,
                                            monthDate,
                                            dayDate,
                                            hourTime,
                                            minutesTime,
                                            0,
                                            0,
                                        );
                                        console.log(
                                            `Android Date: ${
                                                this.state.androidDate
                                            } `,
                                        );
                                        console.log(
                                            `Date_old1 : ${dt.toLocaleDateString(
                                                'en-GB',
                                            )}`,
                                        );
                                        console.log(`Date_old2 : ${dt}`);
                                        console.log(
                                            `Date_new : ${dt.toISOString()}`,
                                        );
                                        this.addReminderTodo().then(
                                            ToDoContainer.addToCalendar(
                                                this.state.todoArr[
                                                    this.state.indexChooseTodo
                                                ].name,
                                                moment
                                                    .utc([
                                                        yearDate,
                                                        monthDate,
                                                        dayDate,
                                                        hourTime,
                                                        minutesTime,
                                                        0,
                                                        0,
                                                    ])
                                                    .toISOString(),
                                            ),
                                            console.log(
                                                'Execute Add Reminder ToDo',
                                            ),
                                        );
                                    }
                                }}>
                                <Text style={styles.buttonAddToDoText}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    async addReminderTodo() {
        let userId = auth().currentUser.uid;
        let todochange = {};
        todochange.date = this.state.androidDate;
        todochange.time = this.state.chooseAndroidTime;
        todochange.reminder = false;
        const refDb = database().ref(`/posts/${userId}/ToDo`);
        await refDb
            .orderByChild('id_todo')
            .equalTo(this.state.todoArr[this.state.indexChooseTodo].id_todo)
            .once('child_added', function(snapshot) {
                snapshot.ref.update(todochange);
            });
        this.setState({
            androidDate: '-',
            chooseAndroidTime: '-',
        });
        this.setState({indexChooseTodo: ''});
        this.readToDo().then('Execute');
        this.toggleModalChooseTodo(false);
    }

    async addReminderTodo() {
        let userId = auth().currentUser.uid;
        let todochange = {};
        todochange.date = this.state.androidDate;
        todochange.time = this.state.chooseAndroidTime;
        todochange.reminder = false;
        const refDb = database().ref(`/posts/${userId}/ToDo`);
        await refDb
            .orderByChild('id_todo')
            .equalTo(this.state.todoArr[this.state.indexChooseTodo].id_todo)
            .once('child_added', function(snapshot) {
                snapshot.ref.update(todochange);
            });
        this.setState({
            androidDate: '-',
            chooseAndroidTime: '-',
        });
        this.setState({indexChooseTodo: ''});
        this.readToDo().then('Execute');
        this.toggleModalChooseTodo(false);
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.gray02,
    },
    listContainer: {
        padding: 10,
        backgroundColor: colors.white,
    },
    listRow: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: colors.white,
    },
    listLeft: {
        flex: 7,
    },
    iconApproved: {
        width: 25,
        height: 25,
        borderRadius: 50,
    },
    listRight: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    listButton: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.green01,
    },
    listButtonApproved: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.gray01,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    modalChooseContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    modalAddToDo: {
        width: 300,
        height: 150,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
    modalChooseToDo: {
        width: 300,
        padding: 10,
        alignSelf: 'center',
        flexDirection: 'column',
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
    fieldInput: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 3,
        paddingHorizontal: 10,
        color: '#212121',
        fontSize: 12,
    },
    formGroup: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray04,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
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
    buttonAddToDo: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.green01,
        marginTop: 8,
        paddingVertical: 6,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
    },
    buttonAddToDoText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '400',
    },
    textEmpty: {
        fontWeight: 'bold',
        color: colors.black,
        marginHorizontal: 15,
        justifyContent: 'center',
    },
});

export default ToDoContainer;
