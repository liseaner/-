// pages/auth/index.js
import { request } from "../../request/index.js";
import {login,getUserProfile} from "../../utils/asyncWx.js";
// getUserProfile

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    async getUserProfile(e){
  

      try {
        let loginParams1=await getUserProfile()
        //     // 获取用户信息
        const {userInfo}=loginParams1;
        console.log(loginParams1)
      wx.setStorageSync('userinfo', userInfo)
        const {encryptedData,rowData,iv,signature}=loginParams1;
        // 获取小程序登录成功后的code
        let res=await login();
        console.log(res)
        const{code}=await login();
        const loginParams={encryptedData,rowData,iv,signature,code};
        // 发送请求获取token
        const {token}=await request({url:"/users/wxlogin",data:loginParams,method:"post"});
        console.log(token)
        // 存入token
        wx.setStorageSync('token', token);
        wx.navigateBack({
          delta:1
        })
    }catch (error){
        console.log(error)
        }
    },




    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})