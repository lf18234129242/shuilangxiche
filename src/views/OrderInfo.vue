<template>
    <div class="OrderInfo">
        <div v-for="(item, index) in orderInfo" :key="index">
            <shadow-box>
                <li class="first scale-1px">
                    <span></span>
                    <p>{{item.numberPlate}}</p>
                </li>
                <li class="two scale-1px">
                    <p>{{item.status}}</p>
                    <p>{{item.cooperative}}</p>
                </li>
                <li class="three scale-1px">
                    <p>套餐类型：{{item.package}}</p>
                </li>
                <li class="three">
                    <p>到期时间：{{item.endTime}}</p>
                </li>
            </shadow-box>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderInfo:[
                {
                    numberPlate:'沪A：92123',
                    status:'进行中...',
                    cooperative :'鲲鹏小区',
                    package:'包年',
                    endTime:'2019/09/09',
                },
                {
                    numberPlate:'沪A：92123',
                    status:'进行中...',
                    cooperative :'鲲鹏小区',
                    package:'包年',
                    endTime:'2019/09/09',
                },
                {
                    numberPlate:'沪A：92123',
                    status:'进行中...',
                    cooperative :'鲲鹏小区',
                    package:'包年',
                    endTime:'2019/09/09',
                },
                {
                    numberPlate:'沪A：92123',
                    status:'进行中...',
                    cooperative :'鲲鹏小区',
                    package:'包年',
                    endTime:'2019/09/09',
                },
                {
                    numberPlate:'沪A：92123',
                    status:'进行中...',
                    cooperative :'鲲鹏小区',
                    package:'包年',
                    endTime:'2019/09/09',
                },
            ]
        }
    },
}
</script>

<style scoped lang="scss">
.padding-left{
    padding-left: 1.6rem;
    box-sizing: border-box;
}
.scale-1px{
    position: relative;
    border: none;
}
.scale-1px:after{
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    background: #eeeeee;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
.OrderInfo{
    width: 100%;
    position: absolute;
    background: #f5f5f5;
    padding: 1rem 0 2rem;
    box-sizing: border-box;
    li{
        width: 100%;
        height: 2.5rem;
        font-size: .8rem;
        line-height: 2.5rem;
        display: flex;
        align-items: center;
    }
    .first{
        span{
            width: 1rem;
            height: 1rem;
            background: url(./../assets/img/ioc.png) no-repeat -11.5rem -4.45rem;
            background-size: 25rem 19.8rem;
            margin-right: .6rem;
        }
        p{
            width: 100%;
        }
    }
    .two{
        p{
            flex: 1;
            @extend .padding-left;
        }
        p:nth-child(1){
            position: relative;
            border: none;
        }
        p:nth-child(1):after{
            content: '';
            position: absolute;
            right: 0;
            top: 10px;
            background: #eee;
            width: 1px;
            height: 1.233rem;
            -webkit-transform: scaleX(0.5);
            transform: scaleX(0.5);
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
        }
    }
    .three{
        @extend .padding-left;
        border: none;
    }
}
</style>