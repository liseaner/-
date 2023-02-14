// pages/cart/index.js
import {getSetting,chooseAddress,openSetting,showModal,showToast,requestPayment} from "../../utils/asyncWx.js";
import { request } from "../../request/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address:{},
        cart:[],
        totalPrice:0,
        totalNum:0
    },
    

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
    onShow(){
        // 1.获取缓存中 的收货地址信息
        const address=wx.getStorageSync('address');
        let cart=wx.getStorageSync('cart')||[];
        // 过滤后的购物车数组
       cart=cart.filter(v=>v.checked);
        this.setData({address})
        // this.setCart(checkedCart)
            // 1.总价格 总数量
            let totalPrice=0;
            let totalNum=0;
            cart.forEach(v=> {
                totalPrice+=v.num*v.goods_price;
                totalNum+=v.num;
            });   
            // 2.给data赋值
            this.setData({
                // address,
                cart,
                totalPrice,
                totalNum
            }); 
            // wx.setStorageSync('cart', cart)


        // console.log('address',address)
    },
    async handleOrderPay(){
     try {
        // 1.判断缓存中有没有token
      const token=wx.getStorageSync('token')
      if(!token){
        wx.navigateTo({
          url: '/pages/auth/index',
        })
      }
      // 3.创建订单
      // 3.1准备请求头参数
      // const header={Authorization:token};
      // 3.2准备请求体参数
      const order_price=this.data.totalPrice;
      const consignee_addr=this.data.address.all;
      const cart=this.data.cart;
      let goods=[];
      cart.forEach(v=>goods.push({
        goods_id:v.goods_id,
        goods_number:v.num,
        goods_price:v.goods_price
      }))
      const orderParams={order_price, consignee_addr,goods};
      // 4.准备发送请求 创建订单 获取订单编号
      const {order_number}=await request({url:"/my/orders/create",method:'POST',data:orderParams})
      console.log(order_number)
      //5 发起预支付接口
      const {pay}=await request({url:"/my/orders/req_unifiedorder",method:"POST",data:{order_number}})
      console.log(pay)
      // 6.发起微信支付
    await requestPayment(pay);
      // 7.查询后台 订单状态
      const res=await request({url:"/my/orders/chkOrder",method:"POST",data:{order_number}});
      await showToast({title:"支付成功"})
      // 8.手动删除缓存中 已经支付过的商品
      let newCart=wx.getStorageSync('cart')
      newCart=newCart.filter(v=>!v.checked)
      wx.setStorageSync('cart', newCart)
// 8.支付成功了，跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/index',
      })
} catch (error) {
       await showToast({title:"支付失败"})
       console.log(error)
     }
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