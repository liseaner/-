// pages/goods_list/index.js
// 引入 用来发送请求的方法 路径不能省略、
import {request} from "../../request/index.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
      tabs:[
        {
          id:0,
          value:"全部订单",
          isActive:true
        },
        {
          id:1,
          value:"销量",
          isActive:false
        },
        {
          id:2,
          value:"价格",
          isActive:false
        }
      ],
      goodsList:[]
    },
    // 接口要的参数
    QueryParams:{
        query:"",
        cid:"",
        pagenum:1,
        pagesize:10
    },
    // 总页数
    totalPages:1,


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
    console.log(options)
    this.QueryParams.cid=options.cid||'';
    this.QueryParams.query=options.query||'';
    this.getGoodsList()
    },
    handleTabsItemChange(e){
      // 获取被点击的标题索引
      const {index}=e.detail;
      // 2.修改原数组
      let {tabs}=this.data;
      tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
      this.setData({
        tabs
      })
    },
    // 获取商品列表
    async getGoodsList(){
        const res=await request({url:"/goods/search",data:this.QueryParams})
        // 获取总条数
        const total=res.total;
        // 计算总页数
        this.totalPages=Math.ceil(total/this.QueryParams.pagesize)
        console.log(this.totalPages)
        this.setData({
            // 拼接数组
            goodsList:[...this.data.goodsList,...res.goods]
        })
        // 关闭下拉刷新的窗口  如果没有调用下拉窗口,调用也没有影响
        wx.stopPullDownRefresh();
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
        // 1.重置数组
        this.setData({
            goodsList:[]
        })
        // 2.重置页码
        this.QueryParams.pagenum=1;
        // 3.发送请求
        this.getGoodsList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if(this.QueryParams.pagenum>=this.totalPages){
            // 没有下一页
            wx.showToast({
              title: '没有下一页了',
            })
            console.log("没有下一页")
        }else{
            //有下一页
            this.QueryParams.pagenum++;
            this.getGoodsList()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})