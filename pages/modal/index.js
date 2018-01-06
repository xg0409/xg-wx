// const app = getApp()
const { setWebViewCbInfo, decryptBase64 } = require('../../utils/common');
Page({
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
    this.bottomup = this.selectComponent("#bottomup");
  },
  data: {},
  webviewBack: function () {
    wx.navigateBack();
  },
  //事件处理函数
  openModal: function () {
    this.dialog.open();
  },
  closeModal: function () {
    this.dialog.close();
  },
  openBottomup: function () {
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
    this.thirdFromRawData = option.third;
    this.thirdFromData = decryptBase64(this.thirdFromRawData);
    console.log('modal onLoad', option, this.thirdFromData);
  },
  onUnload: function (e) {
    const refreshId = this.thirdFromData.refreshId;
    if (refreshId) {
      setWebViewCbInfo(refreshId, 'refresh', {
        idCard: '8899'
      });
    }
  }
})
