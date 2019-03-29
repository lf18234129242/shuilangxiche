<template>
    <div class="author">
        正在登陆中...
    </div>
</template>

<script>
import {Toast} from 'vant'
import url from '@/serviceAPI.config.js'
import mdFive from '@/md5.js'
export default {
    data() {
        return {
            access_token: md5(mdFive.prefix_str + mdFive.access_date + mdFive.api_key),
        }
    },
    created(){
        let fromUrl = localStorage.getItem('beforeLoginUrl');
        if(!localStorage.getItem('openid')){
            //访问服务器，如果没有 openid ，去授权获取 openid
            axios.post(url.getOauthRedirect,{
                access_token:this.access_token,
                redirect_uri:`http://www.ichevip.com/view/${fromUrl}`
            }).then(res => {
                if(res.data.code == 0){
                    window.location.href = res.data.data.oauth_url;
                }
            }).catch(err => {
                Toast(`获取授权失败,请重试一次 ${err.data}`)
                // 第一次授权失败后的回调
                // 如果 openid 失效，重新获取
                axios.post(url.getOauthRedirect,{
                    access_token:this.access_token,
                    redirect_uri:`http://www.ichevip.com/view/${fromUrl}`
                }).then(res => {
                    if(res.data.code == 0){
                    window.location.href = res.data.data.oauth_url;
                    }
                }).catch(err => {
                    Toast(`获取授权失败,请稍后再试 ${err.data}`)
                })
            })
        }else{
            window.location.href = `http://www.ichevip.com/view/${fromUrl}`
        }
    }
}
</script>

  <script type="text/javascript">
    $(function(){

    $('#paytest-btn').click(function(){

      var order_id = $('#order_id').val();
      var token = 'eeb0dea9c4436e87d0473247106ac4fa';
      var url = window.location.href;

      $.post(
        'http://www.ichevip.com/api.php/orderpay/getWxVoucher',
        {id:order_id, access_token:token, url:url}, 
        function(data){
          var options    = data.data.options;
          var configJson = data.data.configJson;
          var configJson = eval('(' + configJson + ')');
          
          wx.config({
            debug: configJson.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
            appId: configJson.appId, // 必填，公众号的唯一标识
            timestamp: configJson.timestamp, // 必填，生成签名的时间戳
            nonceStr: configJson.nonceStr, // 必填，生成签名的随机串
            signature: configJson.signature,// 必填，签名，见附录1
            jsApiList: [
              configJson.jsApiList
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });

          // wx.config(configJson);
            wx.ready(function () {
               // 支付成功后的操作
               options.success = function () {
                  window.location.href = "支付成功后的跳转地址，通常是订单列表";
               };
              
              //  取消支付的操作
               options.cancel = function () {
                   pay_order = true;
               };
               
              // 支付失败的处理 
               options.fail = function () {
                  pay_order = true;
               };
               
               // 传入参数，发起JSAPI支付
               wx.chooseWXPay(options);
            })
        });
      })

    })

  </script>
<style scoped>
.author{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>