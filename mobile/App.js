import React from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import AppNavigation from './config/routes';
import { Root } from 'native-base';
import { ChatProvider } from './context/ChatProvider';

class App extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            isReady: false
        };
    }

    /**
     * Load nativebase fonts.
     */
    async _getFonts(){
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),      
            'noto-font': require('./assets/fonts/NotoKufiArabic-Regular.ttf')
        });
    }
    
    render(){
        if(!this.state.isReady){
            return (
                <AppLoading startAsync={this._getFonts} onFinish={() => this.setState({isReady: true})} onError={()=> {}} />
            );
        }
        return (
            <ChatProvider>
                <Root>
                    <AppNavigation />
                </Root>
            </ChatProvider>
            
        );
    }
    
}

export default App;

