
import {countdown} from "../../utils/countdown.js";
//获取应用实例
const app = getApp()

Page({
  data: {
    selectedNo:'1',    //１快车；２出租车；３代驾
    orderTime:'预约时间',
    isOrder:false
  },


  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    countdown(this);  
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  // 选择订单类型
 select:function(event){
   let selectedNo = event.currentTarget.dataset.no;
   console.log(selectedNo)
   this.setData({
    selectedNo:selectedNo
   })
   console.log("selected",this.data.selectedNo)
 },
//  选择预约
 selectOrder:function(){
  this.setData({
    isOrder:!this.data.isOrder
  })
 }
})
