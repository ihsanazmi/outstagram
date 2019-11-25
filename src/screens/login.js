import React, { Component } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, Button, Divider } from 'react-native-elements';
import {connect} from 'react-redux'

class login extends Component {

    state={
        look: true
    }

    componentDidUpdate(){
        if(this.props.bebas){
            const reset_stack = StackActions.reset({
                index : 0,
                actions : [NavigationActions.navigate({routeName:'home'})]
            })
            this.props.navigation.dispatch(reset_stack)
        }
    }

    render() {
        return (
            <View style={{flex:1,justifyContent:'center',paddingHorizontal:20}}>
                <Text style={{alignSelf:'center'}} h1> Insta </Text>
                <View style={{marginTop:30}}>
                    <Input
                        placeholder='Username'
                        leftIcon={
                            <Icon
                            name='user'
                            size={24}
                            color='gray'
                            style={{paddingRight:10}}
                            />
                        }
                    />
                </View>
                <View style={{marginTop:15}}> 
                    <Input
                        placeholder='Password'
                        secureTextEntry = {this.state.look}
                        leftIcon={
                            <Icon
                            name='lock'
                            size={24}
                            color='gray'
                            style={{paddingRight:10}}
                            />
                        }
                        rightIcon={
                            <Icon
                            name="eye"
                            size={20}
                            color='gray'
                            style={{paddingRight:10}}
                            onPress={()=>this.setState({look: !this.state.look})}
                            />
                        }
                    />
                </View>
                <View style={{marginTop:30}}>
                    <Button
                        title='Login'
                        loading = {false}
                    />
                </View>
                <View style={{marginTop:20}}>
                    <Text style={{alignSelf:'center'}}>Don't Have an Account? <Text style={{fontWeight:'bold'}} onPress={()=>{this.props.navigation.navigate('register')}}>Sign Up</Text></Text>
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        bebas: state.users.username
    }
}

export default connect(mapStateToProps, {})(login)
