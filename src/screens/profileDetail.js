import React, { Component } from 'react'
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { Header, Left, Body, Right } from 'native-base'
import {Avatar, Image, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';
import {urlApi} from './../support/url'
import {connect} from 'react-redux'

// import Icon from 'react-native-vector-icons/FontAwesome'

class profileDetail extends Component {

    state = {
        post: null,
    }

    componentDidMount(){
        this.getAllPost()
    }

    getAllPost = ()=>{
        var username = this.props.navigation.getParam('username')
        // console.log(this.props.user)
        Axios.get( urlApi + 'post/getallpost')
        .then(res=>{
            let filtered = res.data.data.filter((val)=>{
                return val.username.includes(username)
            })
            // console.log(filtered)
            this.setState({
                post: filtered
            })
        })
    }

    renderPost = ()=>{
        let foto = this.state.post.map(val=>{
            return (
                <View style={{width:`33%`,height:120, marginTop:2}}>
                    <Image 
                            source={{uri : urlApi + `public/posts/${val.foto_url}`}}
                            style={{ width: '100%',height:'100%'}}
                        />
                </View>
            )
        })
        return foto

    }
    

    render() {
        if(this.state.post === null){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size='small' />
                </View>
            )
        }
        return (
            <View style={{backgroundColor:'white', height:'100%'}}>
                <Header style={{backgroundColor:"white"}}>
                    <Left>
                        <Icon onPress={()=>{this.props.navigation.goBack()}} name='chevron-left' />
                    </Left>
                    <Body>
                        <Text style={{fontWeight:'bold'}}>Username</Text>
                    </Body>
                    <Right></Right>
                </Header>

                {/* Container User Photo */}
                <View style={{flexDirection: 'row', height:120, paddingHorizontal:15}}>
                    <View style={{flex:1, alignSelf:'center'}}>
                        <Avatar
                            containerStyle={{borderWidth:2, borderColor:'red'}}
                            rounded
                            size={90}
                            source={{
                                uri: 'http://apiinstagrinjc.herokuapp.com/public/posts/POS1574734597340.jpeg',
                            }}
                        />
                    </View>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontWeight:'bold'}}>40</Text>
                        <Text>Post</Text>
                    </View>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontWeight:'bold'}}>14.1k</Text>
                        <Text>Followers</Text>
                    </View>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontWeight:'bold'}}>239</Text>
                        <Text>Following</Text>
                    </View>
                </View>
                <View style={{paddingHorizontal: 15}}>
                    <Text style={{fontWeight: 'bold'}}>Username</Text>
                    <Text>Bio</Text>
                </View>
                <View style={{flexDirection:'row', paddingHorizontal:15, marginTop:30, justifyContent:'space-between'}}>
                    <View style={{flex:5, marginHorizontal:5}}>
                        <Button
                            buttonStyle={{height:28}}
                            title="Follow"
                        />
                    </View>
                    <View style={{flex:5, marginHorizontal:5}}>
                        <Button
                            titleStyle={{color:'black'}}
                            buttonStyle={{height:28, borderColor:'black'}}
                            type='outline'
                            title="Message"
                        />
                    </View>
                    <View style={{flex:1, marginHorizontal:5}}>
                        <Button
                            titleStyle={{color:'black'}}
                            buttonStyle={{height:28, borderColor:'black'}}
                            type='outline'
                            icon = {
                                <Icon
                                name='chevron-down'
                                size={12}
                                />
                            }
                        />
                    </View>
                </View>

                {/* List Photo */}
                <ScrollView style={{borderTopWidth:1,borderTopColor:'grey',marginTop:15}}>
                <View style={{flexDirection:'row',flexWrap:'wrap', justifyContent:'space-between'}}>
                    {this.renderPost()}
                </View>
                
            </ScrollView>
            </View>
        )
    }
}


export default profileDetail