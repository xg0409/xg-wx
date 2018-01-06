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
    },
    _handleDocument() {
      if (this.data.closeByDocument === true) {
        this.setData({ modalPortal: "modal-portal-close" });
        setTimeout(() => {
          this.setData({ showModalStatus: false });
        }, 400);
      }
    }
  }
})
