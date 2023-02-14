

// pages/feedback/index.js
Page({

    /**
     * 页面的初始数据
     */
    // var chooseImgs=[];
    data: {
      tabs:[
        {
          id:0,
          value:"体验问题",
          isActive:true
        },
        {
          id:1,
          value:"商品、商家投诉",
          isActive:false
        },
      
      ],
    //   外网的图片的路径数组
    UploadImgs:[],
      // 被选中的图片路径
      chooseImgs:[]
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
    handleChooseImg(){
      let that=this;
      wx.chooseMedia({
        count: 9,
        mediaType: ['image','video'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        camera: 'back',
        success(res) {
       
          console.log(res)
          // let a=...(res.tempFiles);
          console.log(res.tempFiles)
               let chooseImgs=[];
          let a=res.tempFiles;
         a.forEach((v)=>{
            console.log(v.tempFilePath)
          //  let chooseImgs=chooseImgs.push(v.tempFilePath);
         chooseImgs.push(v.tempFilePath);
          console.log(chooseImgs)
          })
          that.setData({
            chooseImgs:[...that.data.chooseImgs,...chooseImgs]
          })
     
          // chooseImgs.push(ImagePaths)
          //     console.log(chooseImgs)
        
          console.log(that.data.chooseImgs)
        }
      })
    },
    // 点击删除图片
    handleRemoveImg(e){
        console.log(e)
        let {index}=e.currentTarget.dataset;
        let {chooseImgs}=this.data;
        console.log(index)
      chooseImgs.splice(index,1)
        this.setData({
            chooseImgs
        })
    },
    // 获取文本域输入的内容
    handleTextInput(e){
        console.log(e)
        this.setData({
            textVal:e.detail.value
        })
    },
    // 提交按钮的点击
    handleFormSubmit(){
        // 获取文本域的内容和图片数组
        const {textVal,chooseImgs}=this.data;
        // 验证合法性
        if(!textVal.trim()){
            wx.showToast({
              title: '输入不合法',
              icon:'none',
              mask:true
            })
            return
        }
        wx.showLoading({
          title: '正在等待',
          mask:true
        })
        // 判断是否上传了图片
        if(chooseImgs.length!=0){
               // 上传图片到专门的服务器
        // 上传的api不支持多个文件同时上传，所以遍历数组挨个上传
        chooseImgs.forEach((v,i)=>{
            wx.uploadFile({
                 //   图片上传到哪里
                //  url: 'https://images.ac.cn/Home/Index/UploadAction/',
                url:'url',//后台没写这个接口
                //   上传文件的名称 后台来获取文件 file
                 name: 'file',
                // 被上传图片的路径
                filePath: 'v',  
           
            //   顺带的文本信息
            formData:{},
            success:(result)=>{
                console.log(result)
                let url=JSON.parse(result.data).url;
                this.UploadImgs.push(url);
                // 所有的图片上传完毕再触发
                if(i===chooseImgs.length-1){
                    wx.hideLoading()
                    this.setData({
                        textVal:"",
                        chooseImgs:[]
                    })
                    // 返回上一个页面
                    wx.navigateBack({
                        delta:1
                    })
                }
            }
            })
        })
        }else{
            wx.hideLoading()
            wx.navigateBack({
              delta: 1,
            })
        }
     
    }
    ,    /**
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