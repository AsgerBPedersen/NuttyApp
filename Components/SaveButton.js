import React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

export default class Login extends React.Component {

    render() {
        
        if(this.props.isLoggedIn) {
            return <View>
                <Button onPress={this.props.onClickSave} title="Save"></Button>
            </View>
        } else {
            return <View>
                <Text>log in to save your daily intake</Text>
            </View>
        }

        }
    }
    