const BASEURL = 'http://xiche.com/api.php/'
const URL = {
    getSelfInfo : BASEURL + 'Client/getSelfInfo',       //获取用户信息
    BindClientPhone: BASEURL + 'Client/BindClientPhone',     //用户注册、绑定手机号
    UpdateClientPhone: BASEURL + 'Client/UpdateClientPhone',     //用户更换手机号
    getCode: BASEURL + 'Common/getCode',     //获取短信验证码
    getCarList: BASEURL + 'Car/getCarList',     //获取用户车辆列表信息
}

module.exports = URL