// components/otplite/index.js
const defaultNumbers = ['', '', '', '', '', ''];
Component({
  ready() {
    this.dialog = this.selectComponent("#dialog");
    this.otplite = this.selectComponent("#otplite");
  },
  /**
   * 组件的属性列表
   */
  properties: {
    totalTicks: {
      type: Number,
      value: 10
    },
    duration: {
      type: Number,
      value: 1000
    },
    autoStart: {
      type: Boolean,
      value: false
    },
    mobile: {
      type: String,
      value: '18501647351'
    },
    format: {
      type: String,
      value: '{t}s后可重发'
    },
    sendTxt: {
      type: String,
      value: '获取验证码'
    },
    sentTxt: {
      type: String,
      value: '重新获取'
    },
    processingTxt: {
      type: String,
      value: '发送中...'
    },
    otpPromptTxt: {
      type: "String",
      value: "已向{mobile}发送短信验证码"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    codeValue: '',
    otpAutoStart: false,
    otpNumbers: defaultNumbers,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    open() {
      const data = this.data;
      this.setData({
        otpAutoStart: data.autoStart,
        otpPromptTxt:data.otpPromptTxt.replace('{mobile}',data.mobile)
      });
      this.otplite.otpStart();
      this.dialog.open();
    },
    close() {
      this.dialog.close();
    },
    handleInput(e) {
      const value = e.detail.value;
      let otpNumbers = Object.assign({ length: 6 }, defaultNumbers, value.split(''));
      otpNumbers = Array.prototype.slice.call(otpNumbers);
      this.setData({ otpNumbers, codeValue: value });
    },
    handleOtpSendRequest() {
      this.triggerEvent('onSendRequest');
    },
    onSendResult(status) {
      this.otplite.onSendResult(status);
    },
    handleSubmit() {
      const code = this.data.codeValue;
      if (code.length != 6) { return; }
      this.triggerEvent('onInputFinish', { code });
    },
    handleModalAfterClose() {
      console.log('handleModalAfterClose');
      this.setData({
        otpNumbers: defaultNumbers,
        codeValue: ''
      })
    }
  }
})
