import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, Button, Divider } from 'react-native-elements';
import {connect} from 'react-redux'
import Axios from 'axios'
import {urlApi} from '../support/url'
import { onRegisterSuccess } from './../redux/actions/users'
import { StackActions,NavigationActions } from 'react-navigation';

class login extends Component {

    state={
        look: true,
        loading_btn : false,
        username: '',
        password: ''

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

    onBtnLoginClick = ()=>{
        this.setState({loading_btn: !this.state.loading_btn})
        let{username, password} = this.state
        // console.log(this.state.username)
        if(username && password){
            Axios.post('https://apiinstagrinjc.herokuapp.com/auth/login', {username, password})
            .then(res=>{
                if(res.data.error){
                    return alert(res.data.message)
                }
                var data_login = res.data.data[0]
                var {username,email, profile_pict} = data_login
                console.log(profile_pict)
                AsyncStorage.setItem('data',JSON.stringify({username,email, profile_pict}),(err)=>{
                    if(err) return alert(err.message)
                    this.props.onRegisterSuccess({username,email, profile_pict})
                })
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            return alert('Form cannot empty')
        }
    }

    render() {
        return (
            <View style={{flex:1,justifyContent:'center',paddingHorizontal:20}}>
                <Text style={{alignSelf:'center'}} h1> Insta </Text>
                <View style={{marginTop:30}}>
                    <Input
                        placeholder='Username'
                        onChangeText={(text)=>{this.setState({username: text})}}
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
                        onChangeText={(text)=>{this.setState({password: text})}}
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
                        onPress={this.onBtnLoginClick}
                        loading = {this.state.loading_btn}
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

export default connect(mapStateToProps, {onRegisterSuccess})(login)
