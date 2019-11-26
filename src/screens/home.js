import React, { Component } from 'react'
import { View, ScrollView, ActivityIndicator } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Input, Text, Button, Divider, Avatar, Image } from 'react-native-elements';
import Post from '../components/post'
import {urlApi} from '../support/url'
import axios from 'axios'


export default class home extends Component {

    state = {
        post: null,
    }

    componentDidMount(){
        axios.get(urlApi + 'post/getallpost')
        .then(res=>{
            this.setState({post: res.data.data})
            // console.log(res.data.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    pindah =(username)=>{
        // console.log(username)
        this.props.navigation.navigate('detail', {username: username})
    }

    render() {
        if(this.state.post === null){
            return(
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
        return (
            <ScrollView style={{paddingTop:20}}>
                {
                    this.state.post.map((val)=>{
                        return(
                            <Post onPindah={()=>{this.pindah(val.username)}} avatarUrl = {urlApi+`public/profile/default.png`}  postUrl = {urlApi + val.foto_url} username = {val.username} caption={val.caption}  />
                        )
                    })
                }
            </ScrollView>
        )
    }
}
