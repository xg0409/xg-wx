//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    console.log('xx logs onLoad');
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  skipIndex:function(){
    wx.navigateTo({
      url: '../index/index'
    })
  },
  onHide: function () {
    console.log('xx logs onHide');
  },
  onShow: function () {
    console.log('xx logs onShow');
  },
  onUnload:function(){
    console.log('xx logs onUnload');
  }
})
