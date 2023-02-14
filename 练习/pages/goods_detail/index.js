// pages/goods_detail/index.js
// 引入 用来发送请求的方法 路径不能省略、
import {request} from "../../request/index.js"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj:{},
        // 商品是否被选中
        isCollect:false
    },
    // 商品对象
    GoodsInfo:{

    },

    /**
     * 生命周期函数--监听页面加载
     */
 
    // 获取商品详情数据
    async getGoodsDetail(goods_id){
        const goodsObj=await request({url:'/goods/detail',data:{goods_id}})
      this.GoodsInfo=goodsObj;
      console.log('GoodsInfo',goodsObj)
    //   1.获取缓存中的商品收藏的数组
    let collect=wx.getStorageSync('collect')||[];
    // 2.判断当前商品是否被收藏
    let isCollect=collect.some(v=>v.goods_id==this.GoodsInfo.goods_id)
    console.log('isCollect',isCollect)
        this.setData({
            goodsObj:{
                goods_name:goodsObj.goods_name,
                goods_price:goodsObj.goods_price,
                // iphone部分手机 不识别webp图片的格式
                // 最好的方法是找到后台 让他进行修改
                // 临时自己改的话进行一下简单的替换 webp=>ipg
                goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
                pics:goodsObj.pics
            },
            isCollect:isCollect
        })
    },
// 点击轮播图 放大预览
    handlePreviewImage(e){
      console.log('-----')
      // 构造要预览对的图片
      const urls=this.GoodsInfo.pics.map(v=>v.pics_mid)
      const current=e.currentTarget.dataset.url;
      console.log(urls)
      console.log(current)
      wx.previewImage({
        urls,
        current,
      })
    },
    // 点击 加入购物车
    handleCartAdd(){
    // 1.获取缓存中的购物车 数据
      let cart=wx.getStorageSync('cart')||[];
      // 2.判断 商品对象是否存在于购物车数组中
      let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
      if(index===-1){
        //3. 不存在 第一次添加
        this.GoodsInfo.num=1;
        this.GoodsInfo.checked=true;
        cart.push(this.GoodsInfo)
      }else{
        //4. 已经存在
        cart[index].num++;
      }
      // 5.购物车重新添加回缓存中
      wx.setStorageSync('cart', cart)
      wx.showToast({
        title: '加入成功',
        icon:'success',
        // mask改成true 
        mask:true
      })
    },
    // 点击收藏
    handleCollect(){
        let that=this;
        let isCollect=false;
        // 获取缓存中的商品收藏数组
        let collect=wx.getStorageSync('collect')||[];
        // 2.判断该商品是否被收藏过
        let index=collect.findIndex(v=>v.goods_id===that.GoodsInfo.goods_id);
        // index=！-1时表示已经收藏过
        if(index!==-1){
            // 已经被手藏 应该在数组中删除该商品
            collect.splice(index,1);
            isCollect=false
            wx.showToast({
              title: '取消收藏',
              icon:"success",
              mask:true
            })
        }else{
            // 没有被收藏
            collect.push(that.GoodsInfo)
            isCollect=true
            wx.showToast({
                title: '收藏成功',
                icon:"success",
                mask:true
              })
              that.setData({
                isCollect:isCollect
            })
        }
        // 把数组存入到缓存当中
        wx.setStorageSync('collect', collect)
        this.setData({
            isCollect:isCollect
        })
    }  , /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    onShow:function() {
        let pages=getCurrentPages();
        let currentPage=pages[pages.length-1];
        let options=currentPage.options;
        const {goods_id}=options
        console.log(goods_id)
        this.getGoodsDetail(goods_id);
        // this.handleCollect()
    },
    /**
     * 生命周期函数--监听页面显示
     */
  

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