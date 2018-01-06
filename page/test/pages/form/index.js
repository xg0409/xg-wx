// page/test/pages/dom/index.js
// var WxValidate = require('../../utils/wxValidate');
import WxValidate from '../../utils/wxValidate';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pickerIdex: 0,
    array: [
      {
        id: '00',
        name: '美国'
      },
      {
        id: '01',
        name: '中国'
      },
      {
        id: '02',
        name: '巴西'
      },
      {
        id: '03',
        name: '日本'
      }
    ],
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pickerIdex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.wxValidate = new WxValidate({
      username: {
        required: true,
        minlength: 2
      },
      identityNo: {
        required: true,
        idcard: true
      },
      bankcard: {
        required: true,
      }
    }, {
        username: {
          required: '请输入您的姓名'
        },
        identityNo: {
          required: '请输入您本人身份证号码'
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  formSubmit: function (e) {
    console.log(e);
    if (!this.wxValidate.checkForm(e)) {
      const error = this.wxValidate.errorList[0];
      wx.showModal({
        content: error.msg,
        showCancel: false,
        success: () => {
          this.setData({ whoFocus: error.param });
        }
      });
      console.log('formSubmit error', error);
    }
  },
  handleButton: function (event) {
    console.log('handleButton', event);
    wx.showShareMenu({
      complete: function (res) {
        console.log('complete', res);
      }
    });
  },
  onShareAppMessage: function (res) {
    return {
      title: '我要被转发了',
      path: '/page/test/pages/otplite/index'
    }
  }
})