import React from "react";
import { Header, Body, Title, View, Left, Right, Button, Icon, Item, Input } from "native-base";
import { StyleSheet } from 'react-native'
import Constants from 'expo-constants';
import { Colors, Strings } from "../config";

export default class HomeHeader extends React.Component {

    state = {
        isSearch: false
    }

    onSearchClose = () => {
        this.setState({ isSearch: false });
        this.props.onSearchChange("");
    }

    render() {
        if(this.state.isSearch){
            return(
                <Header searchBar rounded style={styles.header}>
                    <Item>
                        <Icon name="close" onPress={this.onSearchClose} />
                        <Input
                            placeholder={Strings.SEARCH}
                            onChangeText={this.props.onSearchChange} />
                        <Icon name="search" />
                    </Item>
                </Header>
            );
        }
        return (
            <View style={styles.container}>
                <Header style={styles.header}>
                    <Left style={{flex: 1}}>
                        <Button transparent onPress={this.props.onMenuClick}>
                            <Icon name='menu'/>
                        </Button>
                    </Left>                    
                    <Body style={{flex: 1}}>
                        <Title style={{alignSelf: "center"}}>{this.props.title}</Title>
                    </Body>
                    <Right style={{flex: 1}}>
                        <Button transparent onPress={() => this.setState({isSearch: true})}>
                            <Icon name="search" />
                        </Button>
                    </Right>
                </Header>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
   container: {
       backgroundColor: Colors.GRAY,
   },
   header: {
       elevation: 0,
       shadowOpacity: 0,
       backgroundColor: Colors.GRAY,
       marginTop: Constants.statusBarHeight,
   },
});
