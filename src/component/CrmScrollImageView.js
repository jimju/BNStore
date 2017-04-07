/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  AlertIOS
} from 'react-native';

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

//引入计时器类库
var timer = require('react-timer-mixin');

//引入json数据
//var ImageData = require('./ImageData.json');
import {HOST} from '../common/utils';
const BannersArr = [HOST + "/eihView/images/banner/banner_one.jpg", HOST + "/eihView/images/banner/banner_two.jpg"
    , HOST + "/eihView/images/banner/banner_three.jpg"];
export class CrmScrollImageView extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            //注册计时器
            mixins: [timer],
            //当前的页码
            currentPage:0,

            //每隔多少时间
            durationn:5000,
        }
    }


    //做一些复杂的操作,或者网络请求
    componentDidMount(){
        //开启定时器
        this.startTimer();
    }

    componentWillUnmount(){
        clearInterval(timer);
    }

    //开启定时器方法
    startTimer(){
        //AlertIOS.alert(''+this.props.durationn);

        //1.拿到scrollView
        var scrollView = this.refs.scrollView;
        var imgCount = BannersArr.length;

        //2.添加定时器
       timer = setInterval(() => {
            //定时执行的方法
            //2.1 设置圆点
            var activePage = 0;

            //2.2 判断
            if((this.state.currentPage+1) >= imgCount){
                activePage = 0;
            }else{
                activePage = this.state.currentPage+1;
            }

            //2.3 更新状态机
            this.setState({
                currentPage:activePage
            });

            //2.4 让scrollView滚动起来
            var offsetX = activePage * width;
            scrollView.scrollResponderScrollTo({x:offsetX, y:0, animated:true});
        },this.state.durationn);
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView
                    ref="scrollView"
                    horizontal={true}
                    //隐藏水平滚动条
                    showsHorizontalScrollIndicator={false}
                    //自动分页
                    pagingEnabled={true}
                    //当一帧滚动结束 方式一     方式二(把ScrollView传过去,即e)
                    //onMomentumScrollEnd = {this.onAnimationEnd}
                    onMomentumScrollEnd = {(e)=>this.onAnimationEnd(e)}
                    //开始拖拽
                    onScrollBeginDrag = {this.onScrollBeginDrag}
                    //停止拖拽
                    onScrollEndDrag={() => this.startTimer()}
                    >
                    {this.renderAllImage()}
                </ScrollView>
                {/*返回指示器*/}
                <View style={styles.pageViewStyle}>
                    {/*返回个圆点*/}
                    <View style={{flexDirection:'row'}}>
                        {this.renderPageCircle()}
                    </View>
                </View>
            </View>
        );
    }

    //调用开始拖拽
    onScrollBeginDrag(){
        //停止定时器
        clearInterval(timer);
    }

    //调用停止拖拽
    onScrollEndDrag(){
        //开启定时器
        this.startTimer();
    }

    renderAllImage(){
        //数组
        var allImage = [];
        //拿到图像数组
        var imgsArr = BannersArr;
        //遍历
        for(var i = 0;i < imgsArr.length;i++){
            //取出单独的每一个对象
            var imgItem = imgsArr[i];
            //创建组件装入数组
            allImage.push(
                <Image key = {i} source = {{uri: imgItem}} style={{width:width,height:170}}/>
            );
        }
        //返回数组
        return allImage;
    }

    //返回所有的圆点
    renderPageCircle(){
        //定义一个数组放置所有的圆点
        var indicatorArr = [];
        var style;
        //拿到图像数组
        var imgsArr =  BannersArr;
        ////console.log(this.state);
        for(var i = 0;i < imgsArr.length;i ++){

            //判断
            style = (i==this.state.currentPage) ? {color:'orange'}:{color:'#ffffff'}

            //把圆点装入数组
            indicatorArr.push(
                //这里多个样式的写法
                <Text key={i} style={[{fontSize:25},style]}>&bull;</Text>
            );
        }
        //返回
        return indicatorArr;
    }

    //当一帧滚动结束的时候调用
    onAnimationEnd(e){
        //1.求出水平方向的偏移量
        var offsetX = e.nativeEvent.contentOffset.x;

        //2.求出当前的页数
        var currentPage = Math.floor(offsetX / width);
        ////console.log(currentPage);
        //3.更新状态机,重新绘制UI
        this.setState({
            //当前页码
            currentPage:currentPage
        });
    }
}



const styles = StyleSheet.create({
    pageViewStyle:{
        width:width,
        height:25,
        backgroundColor:"rgba(0,0,0,0.2)",
        //定位
        position:'absolute',
        bottom:0,

        //设置主轴的方向
        flexDirection:'row',
        alignItems:'center'
    }
});

//输出类
module.exports = CrmScrollImageView;