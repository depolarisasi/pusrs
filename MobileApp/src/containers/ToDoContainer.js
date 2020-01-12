/*
 * Created on Thu Oct 03 2019
 *
 * Copyright (c) 2019 Justin
 */

import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {
    StatusBar,
    BackHandler,
    View,
    Text,
    TextInput,
    Modal,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
import colors from './../styles/colors';
import HeaderToDo from './../components/headers/HeaderToDo';

const TODOS = [
    {id: 1, name: 'TASK 1'},
    {id: 2, name: 'TASK 2'},
    {id: 3, name: 'TASK 3'},
    {id: 4, name: 'TASK 4'},
    {id: 5, name: 'TASK 5'},
    {id: 6, name: 'TASK 6'},
    {id: 7, name: 'TASK 7'},
    {id: 8, name: 'TASK 8'},
    {id: 9, name: 'TASK 9'},
    {id: 10, name: 'TASK 10'},
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
        };
    }

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
                        <View style={styles.listRow}>
                            <View style={styles.listLeft}>
                                <Text>{item.name}</Text>
                            </View>
                            <View style={styles.listRight}>
                                <TouchableOpacity onPress={() => {}}>
                                    <Text style={styles.listButton}>
                                        Add Reminder
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
