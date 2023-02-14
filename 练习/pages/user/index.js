// pages/user/index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userinfo:{},
        collectNums:0,
        avatarUrl:defaultAvatarUrl
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const userinfo=wx.getStorageSync('userinfo')
        this.setData({
            userinfo,
            // collectNums:collect.length
        })
       let avatarUrl=wx.getStorageSync('avatarUrl')
       this.setData({
           avatarUrl
       })
        
    },
    onChooseAvatar(e) {
        const { avatarUrl } = e.detail 
        this.setData({
          avatarUrl,
        })
        wx.setStorageSync('avatarUrl', avatarUrl)
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        const userinfo=wx.getStorageSync('userinfo')
        const collect=wx.getStorageSync("collect")||[];
        this.setData({
            userinfo,
            collectNums:collect.length
        })
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