import React, { Component } from 'react'
import { View, ActivityIndicator,AsyncStorage } from 'react-native'
import {Text, Input ,Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import Axios from 'axios'
import {onRegisterSuccess} from './../redux/actions/users'
import { urlApi } from '../support/url';
import { StackActions,NavigationActions } from 'react-navigation'
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-community/google-signin';
import { LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';

const web_client_id = '224640386748-omjpqflt3vrmu4tu9fcdkq1b3v4avval.apps.googleusercontent.com'

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
        look: true,
        
    }

    componentDidMount(){
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: web_client_id, // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
            accountName: '', // [Android] specifies an account name on the device that should be used
            iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
          });
        console.disableYellowBox = true
        AsyncStorage.getItem('data')
        .then((data) => {
            // console.log(data)
            if(data){
                var obj_data = JSON.parse(data)
                this.props.onRegisterSuccess(obj_data)
                this.setState({check_storage : true})
            }
            this.setState({check_storage : true})
            // console.log(obj_data)
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
                // console.log(res.data.available)
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

    initUser = (token) => {
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          
          // Some user object has been set up somewhere, build that user here
        //   const user = {}
        //   user.name = json.name
        //   user.id = json.id
        //   user.user_friends = json.friends
        //   user.email = json.email
        //   user.username = json.name
        //   user.loading = false
        //   user.loggedIn = true
        //   user.avatar = setAvatar(json.id)      
        //   console.log(user)  
        })
        .catch((err) => {
            console.log('ERROR GETTING DATA FROM FACEBOOK')
            console.log(err)
        })
      }

    _signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
        //   this.setState({ userInfo });
        console.log(userInfo.user)
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      };

    render() {
        if(this.state.check_storage === false){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> 
                    <Text h2>
                        Outstagram
                    </Text>
                    <ActivityIndicator size='small' />
                </View>
            )
        }
        return (
            <View style={{flex:1,justifyContent:'center',paddingHorizontal:20}}>
                <Text style={{alignSelf:'center'}} h1> Outstagram </Text>
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
                
                <View style={{marginTop:15}}>
                    <GoogleSigninButton
                        style={{ width: "100%", height: 50 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={this._signIn}
                        disabled={this.state.isSigninInProgress} 
                    />
                </View>
                <View style={{marginTop:15, alignItems:'center'}}>
                    <LoginButton
                        publishPermissions={['publish_actions']}
                        readPermissions={['public_profile']}
                        onLoginFinished={
                            (error, result) => {
                            if (error) {
                                console.log('login has error: ', result.error)
                            } else if (result.isCancelled) {
                                console.log('login is cancelled.')
                            } else {
                                AccessToken.getCurrentAccessToken().then((data) => {
                                const { accessToken } = data
                                this.initUser(accessToken)
                                })
                            }
                            }
                        }
                        />
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