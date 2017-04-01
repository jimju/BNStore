/**
 * Created by Administrator on 2017/3/13.
 */
import {Dimensions} from 'react-native';
let ViewUtils ={
    ScreenWidth:() => {
        let ScreenWidth = Dimensions.get('window').width;
        return (ScreenWidth);
    },
    ScreenHeight:() => {
        let ScreenHeight = Dimensions.get('window').height;
        return (ScreenHeight);
    }
}