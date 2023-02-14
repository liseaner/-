export const getSetting=()=>{
return new Promise((resolve,reject)=>{
    wx.getSetting({
        success:(result)=>{
            resolve(result)
        },
        fail:(err)=>{
            reject(err)
        }
    })
})
}


// Promise 形式 chooseAddress
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
          success: (result) => {
              resolve(result)
          },
          fail:(err)=>{
              reject(err)
          }
        })
    })
}

// Promise 形式 openSetting
export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
          success: (result) => {
              resolve(result)
          },
          fail:(err)=>{
              reject(err)
          }
        })
    })
}

export const showModal=({content})=>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      title:'提示',
      content:content,
      success:(res)=>{
        resolve(res);
      },
      fail:(error)=>{
        reject(error);
      }
    })
  })
}

// promise形式的showToast
export const showToast=({title})=>{
  return new Promise((resolve,reject)=>{
    wx.showToast({
      title:title,
      icon:'none',
      success:(res)=>{
        resolve(res);
      },
      fail:(error)=>{
        reject(error);
      }
    })
  })
}
// promise形式的login
export const login=()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout:10000,
      success:(res)=>{
        resolve(res);
      },
      fail:(error)=>{
        reject(error);
      }
    })
  })
}

// promise形式的getUserProfile
export const getUserProfile=()=>{
    return new Promise((resolve,reject)=>{
        wx.getUserProfile({
            lang: 'zh_CN',
            desc: '用户登录',
            success: (res) => {
                resolve(res)     
        },
            // 失败回调
            fail: (err) => {
                // 弹出错误
            resolve(err)
            }
        })
    })
  }




// promise形式的requestpayment
// @param {object} pay支付所必要的参数
export const requestPayment=(pay)=>{
  return new Promise((resolve,reject)=>{
  wx.requestPayment({
    ...pay,
  success:(result)=>{
    resolve(result)
  },
  fail:(error)=>{
    reject(error)
  }
})
  })
}