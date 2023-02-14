// pages/category/index.js
import {request} from "../../request/index.js"
// import  regeneratorRuntime  from  ' . ./ . ./lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 左侧的菜单数据
        leftMenuList:[],
        // 右侧的返回数据
        rightContent:[],
        // 点击的左侧菜单
        currentIndex:0,
      // 滚动条距离顶部的距离
         scrollTop:0
    },
    // 接口的返回数据
    Cates:[],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // this.getCates()
        const Cates=wx.getStorageSync('cates')
        if(!Cates){
          this.getCates()
        }else if(Date.now() - Cates.time > 1000 * 10 ){
          this.getCates()
        }else{
          this.Cates=Cates.data;
          let leftMenuList=this.Cates.map(v=>v.cat_name)
          let rightContent=this.Cates[0].children
             this.setData({
              leftMenuList,
              rightContent
             })
        }
    },
    // 获取分类数据
    async getCates(){
        // request({
        //     url:'/categories'
        // }).then((res)=>{
        //     console.log(res)
        //    this.Cates=res.data.message
        //    console.log(this.Cates)
        // wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
        // let leftMenuList=this.Cates.map(v=>v.cat_name)
        // let rightContent=this.Cates[0].children
        //    this.setData({
        //     leftMenuList,
        //     rightContent
        //    })
        // //    console.log(this.data.leftMenuList)
        // })

        // 1.使用es7的async await来发送请求
        const res=await request({url:"/categories"});
        // this.Cates=res.data.message;
        this.Cates=res;
        wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
        let leftMenuList=this.Cates.map(v=>v.cat_name)
        let rightContent=this.Cates[0].children
           this.setData({
            leftMenuList,
            rightContent
           })

    },
    // 点击渲染右边数据
    handleItemTap(e){
      console.log(e)
      // e.currentTarget.dataset.index
      const {index}=e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;
    console.log('.........',rightContent)
      this.setData({
        currentIndex: index,
        rightContent,
        scrollTop:0
      })
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