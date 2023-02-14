// pages/order/index.js
import {request} from "../../request/index.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orders:[],
        tabs:[
            {
              id:0,
              value:"全部",
              isActive:true
            },
            {
              id:1,
              value:"待付款",
              isActive:false
            },
            {
              id:2,
              value:"代发货",
              isActive:false
            },
            {
                id:3,
                value:"退货/退款",
                isActive:false
              }
          ],
    },
    // 获取订单列表的方法
    async getOrders(type){
        const res=await request({url:"/my/orders/all",data:{type}})
        console.log(res)
        this.setData({
            orders:res.orders.map(v=>({...v,create_time_cn:(new DataCue(v.create_time*1000).toLocaleString())}))
        })
    },
    // 根据标题索引来激活选中 
    changeTitleByIndex(index){
 // 2.修改原数组
        let {tabs}=this.data;
        tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
        this.setData({
          tabs
        })

    },
    handleTabsItemChange(e){
        // 获取被点击的标题索引
        const {index}=e.detail;
        // // 2.修改原数组
        // let {tabs}=this.data;
        // tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
        // this.setData({
        //   tabs
        // })
        this.changeTitleByIndex(index)
        // 重新发送请求 type=index+1
        this.getOrders(index+1)
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow(options) {
        const token=wx.getStorageSync('token')
        // if(!token){
        //     wx.navigateTo({
        //       url: '/pages/auth/index',
        //     })
        //     return;
        // }
// 获取小程序的页面栈-数组 长度最大是10个页面
        let pages=getCurrentPages();
        // 2.数组中 索引最大的页面就是当前页面
        let currentPages=pages[pages.length-1]
        console.log(currentPages.options)
        // 获取url上的type参数
        const {type}=currentPages.options;
        this.getOrders(type)
        this.changeTitleByIndex(type-1)
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