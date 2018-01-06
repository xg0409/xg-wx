// pages/main/index.js
const { getWebViewCbInfo, encryptQuery, appendUrlParameter } = require('../../utils/common');
Page({
  pageId: "page_main",
  /**
   * 页面的初始数据
   */
  data: {},
  onLaunch: function (params) {
    console.log(`${this.pageId} lifecycle onLaunch`, params);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(`${this.pageId} lifecycle onLoad`);
  },
  onShow: function (e) {
    console.log(`${this.pageId} lifecycle onShow`);
    const cbdata = getWebViewCbInfo(this.pageId);
    if (Object.keys(cbdata).length) {
      wx.showModal({
        title: 'cbdata',
        content: JSON.stringify(cbdata),
        showCancel: false
      });
    }
  },
  onHide: function (params) {
    console.log(`${this.pageId} lifecycle onHide`);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(`${this.pageId} lifecycle onReady`);
  },
  handleModal: function () {
    let modalUrl = "../modal/index";
    modalUrl = appendUrlParameter('third', encryptQuery({
      refreshId: this.pageId
    }), modalUrl);
    wx.navigateTo({
      url: modalUrl,
      success: function () {
        console.log('navigateTo success');
      }
    });
  },
  handleOtplite: function () {
    wx.navigateTo({
      url: '../otplite/index',
      success: function () {
        console.log('redirectTo success');
      }
    });
  }
})