// import tt from './uri';
const { decode, encode } = require('./base64');
const { isObject } = require('./lang');
const { appendUrlParameter: appendUrl } = require('./uri');
/**
 * 解密base64 字符串
 *  @param  {String}   base64Str base64字符串
 *  @return {Object}             parsed回来的JSON 对象
 */
export const decryptBase64 = (base64Str) => {
  const value = decode(base64Str || '');
  return (value && JSON.parse(decodeURIComponent(value))) || {};
};

// /**
//  * 解密URL参数
//  *  @param  {String}   key 参数名字 e.g. ?from=xxxxxx => key=from
//  *  @return {Object}   parsed回来的JSON 对象
//  */
// export const decryptQuery = (key) => {
//   return this.decryptBase64(getQueryString(key) || '');
// };

/**
 * 加密对象
 * @param  {String}   dataObj required,必须是一个object
 * @return {String}   转换后的字符串，只能用parseQuery来反解析
 */
export const encryptQuery = (dataObj) => {
  let encryptResult = '';
  if (isObject(dataObj)) {
    encryptResult = encode(encodeURIComponent(JSON.stringify(dataObj)));
  } else {
    console.error('dataObj must be an object');
  }
  return encryptResult;
};

/**
 * 设置当前 webview 回调上一个webview数据
 * @param {*} sign 
 * @param {*} status 
 * @param {*} bizData 
 */
export const setWebViewCbInfo = (sign, status, bizData) => {
  wx.setStorageSync(sign, Object.assign({ status }, { bizData }))
};

/**
 * 获取上一个webview回调数据
 * @param {*} sign 
 */
export const getWebViewCbInfo = (sign) => {
  var cacheData = wx.getStorageSync(sign);
  // 阅后即焚
  wx.removeStorageSync(sign);
  return cacheData;
};

export const appendUrlParameter = appendUrl;