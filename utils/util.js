const setWebViewCbInfo = (sign, status, bizData) => {
  wx.setStorageSync(sign, Object.assign({ status }, { bizData }))
}

const getWebViewCbInfo = (sign) => {
  var refresh = wx.getStorageSync(sign);
  // 阅后即焚
  wx.removeStorageSync(sign);
  return refresh;
}

module.exports = {
  setWebViewCbInfo: setWebViewCbInfo,
  getWebViewCbInfo: getWebViewCbInfo
}
