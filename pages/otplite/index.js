//index.js
//获取应用实例
const app = getApp()

Page({
  onReady: function () {
    //获得dialog组件
    this.otplite = this.selectComponent("#otplite");
    this.otplitePopup = this.selectComponent('#otplitePopup');
  },
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    modalHidden2: true
  },
  //事件处理函数
  otpStart: function () {
    console.log('xxxxx')
    this.otplite.open();
  },
  onHide: function () {
    console.log('xx index onHide');
  },
  onShow: function () {
    console.log('xx index onShow');
  },
  handleOtpSendRequest: function () {
    new Promise((resolve) => {
      setTimeout(() => {
        this.otplite.onSendResult('success');
        resolve();
      }, 1000);
    });
  },
  openOtplitePopup: function () {
    this.otplitePopup.open();
  },
  handleOtpPopupSendRequest: function () {
    new Promise((resolve) => {
      setTimeout(() => {
        this.otplitePopup.onSendResult('success');
        resolve();
      }, 1000);
    });
  },
  handleInputFinish: function ({ detail }) {
    console.log('handleInputFinish', detail.code)
  }
})
