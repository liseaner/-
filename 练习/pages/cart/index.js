// pages/cart/index.js
import {getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/asyncWx.js";
import {request} from "../../request/index.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address:{},
        cart:[],
        allChecked:false,
        totalPrice:0,
        totalNum:0
    },


// 点击收获地址
async handleChooseAddress(){
    try{
    //   1.获取权限状态
    const res1=await getSetting();
    const scopeAddress=res1.authSetting["scope.address"];
    // 2.判断权限状态
    if(scopeAddress===false){
        // 3.诱导用户打开授权页面
        await openSetting();
        // 调用获取收获地址的api
        const res2=await chooseAddress()
        console.log(res2)
    }
    // 4.调用获取地址的api
    let address=await chooseAddress();
    address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo
    // 存入到缓存中
    wx.setStorageSync('address', address)
    console.log(address)
    }catch(error){
        console.log(error)
    }
    },
    // 商品的选中
    handeItemChange(e){
      // 获取被修改的商品id
      const goods_id=e.currentTarget.dataset.id;
      // 获取购物车数组
      let {cart}=this.data;
      // 找到被修改的对象
      let index=cart.findIndex(v=>v.goods_id===goods_id);
      cart[index].checked=!cart[index].checked;
      // this.setData({
      //   cart
      // })
      console.log( goods_id)
      this.setCart(cart)
          },

          // 商品的重新计算
        setCart(cart){
            // 1.总价格 总数量
        let totalPrice=0;
        let totalNum=0;
        let allChecked=true;
        cart.forEach(v=> {
          if(v.checked){
            totalPrice+=v.num*v.goods_price;
            totalNum+=v.num;
          }else{
          allChecked=false;
          }   
        });
        // 判断一下数组是否为空
        allChecked=cart.length!=0?allChecked:false;
        // 2.给data赋值
        this.setData({
            // address,
            cart,
            allChecked,
            totalPrice,
            totalNum
        }); 
        wx.setStorageSync('cart', cart)
        } , 
        handleItemallchange(){
          let {cart,allChecked}=this.data;
          // 修改值
          allChecked=!allChecked;
          cart.forEach(v=>v.checked=allChecked)
          this.setCart(cart);
        },
       async handleItemNumEdit(e){
          //1 获取传过来的数据
          let {operation,id}=e.currentTarget.dataset;
          console.log(operation,id)
          // 2获取购物车数组
          let {cart}=this.data;
          //3 找到需要修改的商品的索引
          const index=cart.findIndex(v=>v.goods_id===id);
          // 4.判断是否要执行删除
          if(cart[index].num<=1&&operation===-1){
            // 4.1弹窗提示
            const res=await showModal({content:'是否要删除该商品？'})
            if(res.confirm){
              cart.splice(index,1)
              this.setCart(cart);
            }
            // wx.showModal({
            //   title:'提示',
            //   content:'是否要删除该商品？',
            //   success:(res)=>{
            //     if(res.confirm){
            //       cart.splice(index,1)
            //       this.setCart(cart);
            //     }else if(res.cancel){
            //      console.log('用户点击取消')
            //     }
            //   }
            // })
          }else{
               // 进行修改数量
               cart[index].num+=operation;
               // 设置回缓存
               this.setCart(cart)
          }
         
        },
        async handlePay(){
          // 判断收获地址
          const {address,totalNum}=this.data;
          if(!address.userName){
            await showToast({title:'请先选择收货地址'});
            return;
          }
          // 判断是否选购商品
          if(totalNum===0){
            await showToast({title:'您还没有加购商品'});
            return;
          }
          // 跳转到支付页面
          wx.navigateTo({
            url:'/pages/pay/index'
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
    onShow(){
        // 1.获取缓存中 的收货地址信息
        const address=wx.getStorageSync('address');
        const cart=wx.getStorageSync('cart')||[];
        this.setData({address})
        // const allChecked=cart.length?cart.every(v=>v.checked):false;遍历两次浪费性能
        // // 1.总价格
        // let totalPrice=0;
        // let totalNum=0;
        // let allChecked=true;
        // cart.forEach(v=> {
        //   if(v.checked){
        //     totalPrice+=v.num*v.goods_price;
        //     totalNum+=v.num;
        //   }else{
        //   allChecked=false;
        //   }   
        // });
        // // 判断一下数组是否为空
        // allChecked=cart.length!=0?allChecked:false;
        // // 2.给data赋值
        // this.setData({
        //     address,
        //     cart,
        //     allChecked,
        //     totalPrice,
        //     totalNum
        // })
        this.setCart(cart)
        // console.log('address',address)
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