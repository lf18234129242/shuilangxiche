const BASEURL = 'http://xiche.com/api.php/'
const URL = {
    getSelfInfo : BASEURL + 'Client/getSelfInfo',               //获取用户信息
    BindClientPhone: BASEURL + 'Client/BindClientPhone',        //用户注册、绑定手机
    UpdateClientPhone: BASEURL + 'Client/UpdateClientPhone',    //用户更换手机号
    getCode: BASEURL + 'Common/getCode',                        //获取短信验证码
    getCarList: BASEURL + 'Car/getCarList',                     //获取用户车辆列表信
    getCarBrands: BASEURL + 'Car/getCarBrands',                 //获取用户车辆品牌信
    deleteCarInfo: BASEURL + 'Car/deleteCarInfo',               //删除车辆信息
    addCarInfo: BASEURL + 'Car/addCarInfo',                     //添加车辆信息
    editCarInfo: BASEURL + 'Car/editCarInfo',                   //修改车辆信息
    getInitInfo: BASEURL + 'Order/getInitInfo',                 //下单页面获取信息接口
    CreateOrder: BASEURL + 'Order/CreateOrder',                 //用户提交、生成订单
    getOrderList: BASEURL + 'Order/getOrderList',               //获取用户订单列表
    getOauthRedirect: BASEURL + 'Wechat/getOauthRedirect',      //获取微信授权
    getClientInfo: BASEURL + 'Client/getClientInfo',            //获取微信用户信息
}

module.exports = URL