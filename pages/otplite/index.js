//index.js
//获取应用实例
const app = getApp()

Page({
  onReady: function () {
    //获得dialog组件
    this.otplite = this.selectComponent("#otplite");
    this.otplitePopup = this.selectComponent('#otplitePopup');
  },
  data: {},
  otpStart: function () {
    this.otplite.open();
  },
  onHide: function () { },
  onShow: function () { },
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
