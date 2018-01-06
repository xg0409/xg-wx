Component({
  ready() {
    console.log('otplite lifecycle ready');
    this.ticksTimer;
    this.otpStart();
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
    format: {
      type: String,
      value: "{t}s后可重发"
    },
    sendTxt: {
      type: String,
      value: "获取验证码"
    },
    sentTxt: {
      type: String,
      value: "重新获取"
    },
    processingTxt: {
      type: String,
      value: "发送中..."
    }
  },

  // 组件的初始数据
  data: {
    ticksNumber: "",
    running: false
  },
  // 组件的方法列表
  methods: {
    otpStart() {
      if (this.ticksTimer) {
        // clearTimeout(this.ticksTimer);
        return;
      }
      let ticksNumber = this.data.totalTicks;
      if (!this.data.autoStart) {
        ticksNumber = this.data.sendTxt;
        this.setData({ ticksNumber: ticksNumber });
      } else {
        this._startTicker(ticksNumber);
      }
    },
    _handleStart() {
      if (this.data.running === true) { return; }
      this.setData({ ticksNumber: this.data.processingTxt, running: true });
      this.triggerEvent("onSendRequest");
    },
    onSendResult(status) {
      if (status === "success") {
        this._startTicker(this.data.totalTicks);
      } else {
        this.setData({ ticksNumber: this.data.sendTxt, running: false });
      }
    },
    _startTicker(count) {
      this.setData({ ticksNumber: this._getSendMessage(count), running: true });
      this.ticksTimer = setTimeout(() => {
        if (count > 1) {
          this._startTicker(count - 1);
        } else {
          this.setData({ ticksNumber: this.data.sentTxt, running: false });
        }
      }, this.data.duration);
    },
    _getSendMessage(count) {
      return this.data.format.replace("{t}", count);
    }
  },
  // 在组件实例被从页面节点树移除时执行
  detached() {
    console.log('otplite lifecycle detached');
    clearTimeout(this.ticksTimer);
  }
})
