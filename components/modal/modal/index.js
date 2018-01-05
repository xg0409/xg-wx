// components/d.js
Component({
  // 组件的属性列表
  properties: {
    closeByDocument: {
      type: Boolean,
      value: false
    }
  },
  // 组件的初始数据
  data: {},
  methods: {
    open() {
      this.setData({ showModalStatus: true, modalPortal: "modal-portal-open" });
      this.triggerEvent('onAfterOpen',{t:'xxx'});
    },
    close(){
      this._handleDocument(true);
    },
    _handleDocument(status) {
      if (this.data.closeByDocument === true || status === true) {
        this.triggerEvent("onRequestClose");
        this.setData({ modalPortal: "modal-portal-close" });
        setTimeout(() => {
          this.setData({ showModalStatus: false });
          this.triggerEvent("onAfterClose");
        }, 400);
      }
    }
  }
})
