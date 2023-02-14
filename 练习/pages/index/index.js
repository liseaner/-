// 引入 用来发送请求的方法 路径不能省略、
import {request} from "../../request/index.js"
Page({
  data: {
    //轮播图数组
    swiperList:[],
    // 导航数组
    catesList:[],
    // 楼层数组
    floorList:[],
    // url2:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     console.log(result);
    //     this.setData({
    //         swiperList:result.data.message
    //     })
    //   },
    // })
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList()
  },
//   获取轮播图数据
getSwiperList(){
    request({url: '/home/swiperdata'}).then(result=>{
        // console.log(result)
        // result.forEach((v)=>{
        //     let url1=v.navigator_url;
        //     let url2=url1.replace('main','index');
        //     console.log(url2)
        // })
        // // let url1=result.navigator_url;
        // let url2=url1.replace('main','index');
        // console.log(url2)
        this.setData({
            swiperList:result,
            // url1:url2
        })
    })
    // let url="pages/goods_detail/main?goods_id=129";
    // let url1=url.replace('main','index')
    // console.log(url)
    // console.log(url1)
},
//   获取分类导航数据
getCatesList(){
    request({url: '/home/catitems'}).then(result=>{
        this.setData({
            catesList:result
        })
    })
    },
    //   获取楼层数组
getFloorList(){
    request({url: '/home/floordata'}).then(result=>{
        this.setData({
            floorList:result
        })
    })
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})