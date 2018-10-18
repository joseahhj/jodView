/**
 * 解析服务器返回的数据
 * @param {object} xhr xhr对象
 * @param {string} action url
 * @returns {*} 返回解析后的json数据
 */
function parseBody(xhr, action) {
    let data = xhr.responseText || xhr.response;
    if (!data) {
        return data;
    }
    try {
        return JSON.parse(data)
    } catch (e) {
        return getError(action, xhr, '服务器返回数据格式不正确');
    }
}


/**
 * 获取错误信息
 * @param {object} xhr xhr对象
 * @param {string} action url
 * @param {string} msg 错误信息
 * @returns {object} 返回一个包含错误信息的对象
 */
function getError(xhr, action, msg) {
    let _msg = msg || '';
    if (xhr.response) {
        _msg = `${xhr.response.error || xhr.response}`;
    } else if (xhr.responseText) {
        _msg = `${xhr.responseText}`;
    } else {
        _msg = `fail to post ${action} ${xhr.status}`;
    }
    return {
        msg: _msg,
        status: xhr.status,
        url: action
    }
}

/**
 * xhr上传函数
 * @param {object} options 配置对象
 * @returns {XMLHttpRequest} 返回xhr对象
 */
export default function Ajax(options) {
    if (typeof XMLHttpRequest === 'undefined') {
        return;
    }
    let {
        action,
        params,
        withCredentials,
        headers = {},
        onProgress,
        onSuccess,
        onError
    } = options;
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    if (params) {
        Object.keys(params).forEach(key => {
            formData.append(key, params[key]);

        });
    }

    if (xhr.upload) {
        xhr.upload.onprogress = (e) => {
            if (e.total > 0) {
                e.percent = Math.round(e.loaded / e.total * 100);
                onProgress(e);
            }
        }
    }
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            onSuccess(parseBody(xhr, action));
        } else {
            onError(getError(xhr, action))
        }
        
    };

    xhr.onerror = e => {
        onError(e)
    };

    xhr.open('post', action, true);
    //跨域配置
    if (withCredentials || 'withCredentials' in xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }
    //手动添加请求头
    for (let key in headers) {
        if (headers.hasOwnProperty(key) && headers[key]) {
            xhr.setRequestHeader(key, headers[key]);
        }
    }
    xhr.send(formData);
    return xhr;
}