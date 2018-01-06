export const isHttpUrl = (url) => {
  // match //www.baidu.com pattern
  return url && (url.indexOf('//') === 0 || new RegExp('(https|http|ftp)?://').test(url));
};

/**
 * @description parseParamToObj("a=1&b=2&a=3") ==> {a: "3", b: "2"}
 * @param  {string} str query string
 * @returns {Object} the object mapping to all query string.
 */
export const parseParamToObj = (str) => {
  if (!str) { return {}; }

  return str.split('&').reduce(function interator(params, param) {
    // handle "key=value=string=me";
    const equalIndex = param.indexOf('=');
    let paramsFragments = [];
    if (equalIndex !== -1) {
      paramsFragments = [param.substr(0, equalIndex), param.substr(equalIndex + 1)];
    } else {
      paramsFragments = [param];
    }
    const paramSplit = paramsFragments.map((value) => {
      return decodeURIComponent(value.replace('+', ' '));
    });

    params[paramSplit[0]] = paramSplit[1];
    return params;
  }, {});
};

/**
 * @description parse objet to query string, if we passed parameter key==="" remove "=" sign
 * @param  {object} obj {name:'ssss', password:''}
 * @returns {String} the string converted from query Object.
 */
export const toQueryString = (obj) => {
  const parts = [];
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      const paramValue = encodeURIComponent(obj[i]);
      if (paramValue === '' || paramValue === 'undefined') {
        parts.push(encodeURIComponent(i));
      } else {
        parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
      }
    }
  }
  return parts.join('&');
};

export const getSerializedUrl = (url, requestData) => {
  const serializedParams = toQueryString(requestData);
  return serializedParams ? url.split('?')[0] + '?' + serializedParams : url.split('?')[0];
};

export const parseURL = (url) => {
  const parser = document.createElement('a');
  // Let the browser do the work
  parser.href = url;

  const searchObject = {};
  // Convert query string to object
  const queries = parser.search.replace(/^\?/, '').split('&');

  for (let i = 0; i < queries.length; i++) {
    const split = queries[i].split('=');
    searchObject[split[0]] = split[1];
  }

  return {
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    searchObject,
    hash: parser.hash
  };
};

/**
 * normalize your url segments.
 * @param {...[String]} args '/','path/','to/'
 * @return {String} without prefix '/'
 */
export const normalize = (http, ...args) => {
  const result = [];
  if (isHttpUrl(http)) {
    http = http.replace(/\/*$/, '/');
  } else {
    if (http) {
      args.unshift(http);
      http = '';
    }
  }
  args.forEach((path) => {
    const newPath = path ? path.replace(/^\/+|\/+$/ig, '') : '';
    if (newPath) {
      result.push(newPath);
    }
  });
  return http + result.join('/').replace(/\/{2,}/ig, '/');
};

/**
 * add url parameters e.g. http://wwww.domain.com/path/to/you?name=tian&pwd=xxx#/home
 * @param  {String}   key   the param key e.g. `name`
 * @param  {String}   value the param value of key e.g. `tian`, if null will remove this key
 * @param  {String}   url the url you want to modified.
 * @return {String}   new url
 */
export const appendUrlParameter = (key, value, url) => {
  url = url || '';

  const urlFragmentHash = url.split(/#/)[1] || '';
  const urlFragments = url.replace('#' + urlFragmentHash, '').split('?');
  const urlRoot = urlFragments[0] || '';
  const urlParams = urlFragments[1] || '';

  const params = parseParamToObj(urlParams);

  if (value === null) {
    delete params[key];
  } else {
    params[key] = value;
  }

  const finalUrlFragments = [urlRoot];

  const newUrlParamStr = toQueryString(params);
  if (newUrlParamStr) {
    finalUrlFragments.push('?' + newUrlParamStr);
  }
  if (urlFragmentHash) {
    if (newUrlParamStr) {
      finalUrlFragments.push('#' + urlFragmentHash);
    } else {
      finalUrlFragments.push('?#' + urlFragmentHash);
    }
  }
  return finalUrlFragments.join('');
};