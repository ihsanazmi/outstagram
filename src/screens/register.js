import React, { Component } from 'react'
import { View, ActivityIndicator,AsyncStorage } from 'react-native'
import {Text, Input ,Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import Axios from 'axios'
import {onRegisterSuccess} from './../redux/actions/users'
import { urlApi } from '../support/url';
import { StackActions,NavigationActions } from 'react-navigation'

class register extends Component {

    state={
        username : '',
        email : '',
        password: '',
        confim_password : '',
        loading_check_username: false,
        username_available: null,
        check_storage : false,
        loading_btn_register: false,
        look: true
    }

    componentDidMount(){
        console.disableYellowBox = true
        AsyncStorage.getItem('data')
        .then((data) => {
            if(data){
                var obj_data = JSON.parse(data)
                this.props.onRegisterSuccess(obj_data)
                this.setState({check_storage : true})
            }
            this.setState({check_storage : true})
            console.log(obj_data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidUpdate(){
        if(this.props.user){
            const reset_stack = StackActions.reset({
                index : 0,
                actions : [NavigationActions.navigate({routeName:'home'})]
            })
            this.props.navigation.dispatch(reset_stack)
        }
    }

    onCheckUsername = () => {
        this.setState({loading_check_username : true})
        console.log('trigered')
        Axios.post(urlApi + 'auth/check-username',{username : this.state.username})
        .then((res) => {
            if(res.data.error){
                // munculin
            }else{
                this.setState({loading_check_username : false,username_available:res.data.available})
                console.log(res.data.available)
            }
        })
        .catch((err) => {
            console.log(err)
        })

    }

    onBtnRegisterClick = ()=>{
        this.setState({loading_btn_register : true})
        
        var { username,password,email } = this.state
        var date= new Date()
        if(username && password && email){
            if(password !== this.state.confim_password){
                return alert('Password Tidak sama')
            }
            Axios.post(urlApi + 'auth/register',{
                username,
                password,
                email,
                created_at : `${date.getDate()}-${date.getMonth()}-${date.getFullYear().toString().slice(-2)} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            })
            .then((res) => {
                console.log(res.data)
                if(res.data.error){
                    alert(res.data.message)
                }
                else{
                    AsyncStorage.setItem('data',JSON.stringify({email,username}),(err) => {
                        if(err) return alert(err.message)
                        this.props.onRegisterSuccess({email,username})
                        alert(res.data.message)
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    render() {
        return (
            <View style={{flex:1,justifyContent:'center',paddingHorizontal:20}}>
                <Text style={{alignSelf:'center'}} h1> Insta </Text>
                <View style={{marginTop:30}}>
                    <Input
                        onChangeText={(text) => this.setState({username:text})}
                        onBlur={this.onCheckUsername}
                        placeholder='Username'
                        rightIcon={
                            this.state.username === '' || this.state.loading_check_username === false?
                            null
                            :
                            this.state.username_available ?
                            <Icon
                                name='check'
                                size={24}
                                color='green'
                                style={{paddingLeft:10}}
                            /> 
                            : 
                            
                            this.state.loading_check_username ? 
                            <ActivityIndicator size='small' />
                            :
                            <Icon
                            name='times'
                            size={24}
                            color='red'
                            style={{paddingLeft:10}}
                            />   
                        }
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
                        onChangeText={(email) => this.setState({email: email})}
                        placeholder='Email'
                        leftIcon={
                            <Icon
                            name='envelope'
                            size={20}
                            color='gray'
                            style={{paddingRight:10}}
                            />
                        }
                    />
                </View>
                <View style={{marginTop:15}}>
                    <Input
                        onChangeText={(text) => this.setState({password: text})}
                        secureTextEntry={this.state.look}
                        placeholder='Password'
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
                            name='eye'
                            size={24}
                            color='gray'
                            style={{paddingRight:10}}
                            onPress={() => this.setState({look : !this.state.look})}
                            />
                        }
                    />
                </View>
                <View style={{marginTop:15}}>
                    <Input
                        onChangeText={(text) => this.setState({confim_password: text})}
                        secureTextEntry={this.state.look}
                        placeholder='Confirm Password'
                        errorMessage= 
                        {
                            (this.state.confim_password !=='') && (this.state.password !== this.state.confim_password)
                            ?
                            'password doesnt match':
                            null
                        } 
                        
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
                            name='eye'
                            size={24}
                            color='gray'
                            style={{paddingRight:10}}
                            onPress={() => this.setState({look : !this.state.look})}
                            />
                        }
                    />
                </View>
                <View style={{marginTop:30}}>
                    <Button
                        title='Register'
                        loading={this.state.loading_btn_register}
                        onPress={this.onBtnRegisterClick}
                        // loading={true}
                    />
                </View>
                <View style={{flexDirection:'row', marginTop:15}}>
                    <View style={{flex:1}}>
                        <Button
                            icon={
                                <Icon 
                                    name='google'
                                    size={25}
                                    color='white'
                                />
                            }
                            buttonStyle={{backgroundColor:'red'}}
                            onPress={this._signIn}
                        />
                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',marginTop:15}}>
                    <Text> Sudah Punya Akun? </Text>
                    <Text style={{fontWeight:'bold'}} onPress={() => this.props.navigation.navigate('login')}>Login</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user : state.users.username,
    }
}

export default connect(mapStateToProps,{onRegisterSuccess})(register)