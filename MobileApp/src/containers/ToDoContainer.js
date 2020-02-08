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
    ToastAndroid,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from './../styles/colors';
import HeaderToDo from './../components/headers/HeaderToDo';

const TODOS = [
    {id: 1, name: 'Throw burnable garbage'},
    {id: 2, name: 'Throw plastic garbage'},
    {id: 3, name: 'Clean and cover water containers'},
    {id: 4, name: 'Replace water in flower vases'},
    {id: 5, name: 'Clean ditches around the house'},
    {id: 6, name: 'Barangay fogging'},
    {id: 7, name: 'Spray insecticides'},
    {id: 8, name: 'Cut bushes around the house'},
    {id: 9, name: 'Apply repllent lotion'},
];

class ToDoContainer extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: () => <HeaderToDo navigation={navigation} />,
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            newToDoName: '',
            modalAddToDoVisible: false,
            date: new Date('2020-06-12T14:42:42'),
            mode: 'date',
            show: false,
        };
    }

    setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            show: false,
            date,
        });
    };

    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    };

    showDatepicker = () => {
        this.show('date');
    };

    showTimepicker = () => {
        this.show('time');
    };

    componentDidMount() {
        this.props.navigation.setParams({
            toggleModalAddToDo: this.toggleModalAddToDo.bind(this),
        });
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

    async showDate() {
        const {show, date, mode} = this.state;
        return (
            <View>
                {show && (
                    <DateTimePicker
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.setDate}
                    />
                )}
            </View>
        );
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
                                onPress={() => {}}>
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

    render() {
        return (
            <View style={styles.wrapper}>
                <StatusBar
                    backgroundColor={colors.green01}
                    barStyle="dark-content"
                />
                <FlatList
                    contentContainerStyle={styles.listContainer}
                    data={TODOS}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <TouchableHighlight
                            key={item.id}
                            onPress={() =>
                                ToastAndroid.show('Success', ToastAndroid.SHORT)
                            }>
                            <View style={styles.listRow}>
                                <View style={styles.listLeft}>
                                    <Text>{item.name}</Text>
                                </View>
                                <View style={styles.listRight}>
                                    <TouchableOpacity>
                                        <Text style={styles.listButton}>
                                            Add Reminder
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableHighlight>
                    )}
                    ItemSeparatorComponent={this.renderListItemSeparator}
                    keyExtractor={item => `${item.id}`}
                />
                {this.renderModalAddToDo()}
            </View>
        );
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
    modalAddToDo: {
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
});

export default ToDoContainer;
