// 生成标准jmc接口返回格式

export default (message, success = true, error = '') => {
    return {
        message,
        success,
        error,
    };
};
