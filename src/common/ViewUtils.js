/**
 * Created by Administrator on 2017/3/13.
 */
let ViewUtils ={
    ScreenWidth:() => {
        let {width} = Dimensions.get('window');
        let ScreenWidth = Dimensions.get('window').width;
        return (ScreenWidth);
    },
    ScreenHeight:() => {
        let {height} = Dimensions.get('window');
        let ScreenHeight = Dimensions.get('window').height;
        return (ScreenHeight);
    }
}