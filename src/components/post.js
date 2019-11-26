import React, { Component } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, Button, Divider, Avatar, Image } from 'react-native-elements';

export default class post extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                {/* avatar username and setting */}
                <View style={{paddingHorizontal:15, paddingVertical:15, justifyContent:'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <View>
                            <Avatar
                                rounded
                                source={{
                                    uri: this.props.avatarUrl,
                                }}
                            />
                        </View>
                        <View style={{paddingLeft:15, justifyContent:'center'}}>
                            <Text onPress={this.props.onPindah} style={{fontWeight:'bold'}}>{this.props.username}</Text>
                        </View>
                        <View style={{justifyContent:'center', marginLeft:'auto'}}>
                            <Icon
                                name="ellipsis-v"
                                size={24}
                            />
                        </View>
                    
                    </View>
                </View>
                {/* image */}
                <View style={{height:300}}>
                    <Image

                        source={{ uri: this.props.postUrl }}
                        style={{ width:420, height:300}}
                    />
                </View>
                {/* Button Like, Comment, and Share */}
                <View style={{height:45, paddingHorizontal:15, flexDirection:'row'}}>
                    <View style={{alignSelf:'center'}}>
                        <Icon
                            name='heart-o'
                            size={25}
                            color="black"
                        />
                    </View>
                    <View style={{alignSelf:'center', paddingLeft:10}}>
                        <Icon
                            name='comment-o'
                            size={28} 
                        />
                    </View>
                    <View style={{alignSelf:'center', paddingLeft:10, marginLeft:'auto'}}>
                        <Icon
                            name='bookmark-o'
                            size={28} 
                        />
                    </View>
                </View>
                <View style={{paddingHorizontal:15}}>
                    <Text style={{fontWeight:'bold'}}>100 Likes</Text>
                </View>
                {/* Caption */}
                <View style={{flexDirection:'row', paddingHorizontal:15}}>
                    <Text style={{fontWeight:'bold'}}>{this.props.username} <Text style={{paddingLeft:10, fontWeight:'normal'}}>{this.props.caption} </Text></Text>
                </View>
            </View>
        )
    }
}
