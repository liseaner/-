// pages/login/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUseGetUserProfile: false,
    },

    getUserProfile(e){
        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                const {userInfo}=res;
                console.log(res)
              wx.setStorageSync('userinfo', userInfo)
            },
            fail:(err)=>{
              console.log(err)
            },
            complete: ()=> {
               wx.navigateBack({
                delta: 1,
              })
             }
          })
    setTimeout(function(){
            // wx.navigateBack({
            //     delta: 1,
            //   })
          },1000)
     
    },
    // onChooseAvatar(e) {
    //     const { avatarUrl } = e.detail 
    //     console.log(e)
    //     this.setData({
    //       avatarUrl,
    //     })
    //   },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (wx.getUserProfile) {
            this.setData({
              canIUseGetUserProfile: true
            })
          }
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