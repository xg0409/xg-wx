// pages/main/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('main onLoad', options);
  },
  onShow: function (e) {
    console.log('main onShow', wx.getStorageSync('modal'))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  handleModal: function () {
    wx.navigateTo({
      url: '../modal/index?id=1&name=xxx',
      success: function () {
        console.log('navigateTo success');
      }
    });
  }
})