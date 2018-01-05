//index.js
//获取应用实例
const app = getApp()

Page({
  onReady: function () {
    console.log('modal onReady',this.prePage)
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
    this.bottomup = this.selectComponent("#bottomup");
  },
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    modalHidden2: true
  },
  onUnload: function (e) {
    console.log('modal onUnload', e)
    wx.setStorageSync('modal',{
      status:'refresh'
    })
  },
  //事件处理函数
  bindViewTap: function () {
    this.dialog.open();
  },
  closeModal: function () {
    this.dialog.close();
  },
  openBottomup:function(){
    this.bottomup.open();
  },
  onAfterOpen: function (data) {
    console.log('onAfterOpen', data);
  },
  onRequestClose: () => {
    console.log('onRequestClose');
  },
  onAfterClose: () => {
    console.log('onAfterClose');
  },
  onLoad: function (option) {
    console.log('modal onLoad',option);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  onPullDownRefresh: function () {
    console.log(1);
  },
  onReachBottom: function (e) {
    // console.log('onReachBottom',e)
  },
  onPageScroll: function (e) {
    // console.log('onPageScroll',e);
  }
})
