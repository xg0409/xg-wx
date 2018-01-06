// pages/main/index.js
const { getWebViewCbInfo, encryptQuery, appendUrlParameter } = require('../../utils/common');
Page({
  pageId: "page_main",
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(`${this.pageId} lifecycle onReady`);
  },
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
  },
  handleChooseImage: function () {
    wx.chooseImage({
      count: 1,
      sizeType: "compressed",// original 原图，compressed 压缩图，默认二者都有
      success: (res) => {
        console.log(res);
        var tempFilePaths = res.tempFilePaths;
        this.setData({ src: tempFilePaths[0] });
        console.log('tempFilePaths', tempFilePaths);
      },
      fail: (res) => {
        console.log('wx.chooseImage fail', res);
      }
    });
  },
  handleDom:function(){
    wx.navigateTo({
      url:'../form/index'
    });
  }
})