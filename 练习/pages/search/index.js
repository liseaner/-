// pages/search/index.js
import {request} from "../../request/index.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
      goods:[],
      isFocus:false
    },
    TimeId:-1,
    handleInput(e){
      console.log(e)
      const {value}=e.detail;
      // 检测合法性
      if(!value.trim()){
        // 值不合法
       this.setData({
         goods:[],
         isFocus:false
       })
       return;
      }
      // 准备发送请求获取数据
      this.setData({
        isFocus:true
      })
      //添加一个防抖的功能防止输入框频繁发送请求
      clearTimeout (this.TimeId);
      this.TimeId=setTimeout(()=>{
        this.qsearch(value)
      },1000)
     
    },
    // 准备发送请求获取数据
    async qsearch(query){
      const res=await request({url:"/goods/qsearch",data:{query}}) 
      console.log(res)
      this.setData({goods:res})
    },
    // 点击取消
    handleCancel(){
     this.setData({
      inputValue:"",
      isFocus:false,

      goods:[],
     })
    
    },
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