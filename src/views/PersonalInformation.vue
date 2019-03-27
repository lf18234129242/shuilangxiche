<template>
    <div class="personalInformation">
        <PersonalCenterHeader
            :avatar="avatar"
            :userName="userName"
            :userId="userId"
        ></PersonalCenterHeader>
        
        <van-cell-group>
            <van-cell
                :title="phoneNum"
                icon="1"
            >
                <van-button 
                    size="mini"
                    round
                    @click="changePhoneNum"
                >修改</van-button>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
import PersonalCenterHeader from '@/components/PersonalCenterHeader.vue'
    export default {
        name:'personalInformation',
        components:{
            PersonalCenterHeader,
        },
        data() {
            return {
                avatar:localStorage.getItem('avatar'),
                userName:localStorage.getItem('userName'),
                userId:localStorage.getItem('userId'),
                phoneNum:'18234129587',
            }
        },
        mounted(){
            this.phoneNum = this.$route.query.phone
        },
        activated(){
            let isReload = this.$route.query.isReload;
            if(isReload){
                this.phoneNum = this.$route.query.phone;
            }
        },
        methods: {
            changePhoneNum() {
                this.$router.push('/changeUserPhoneNum')
            }
        },
    }
</script>

<style scoped lang="scss">
.personalInformation{
    width: 100%;
    position: absolute;
    .van-cell-group{
        margin-top: .5rem;
        .van-cell__left-icon{
          background: url(./../assets/img/ioc.png) no-repeat -7.3rem -4rem;
          background-size: 25rem 19.8rem;
        }
        .van-cell__title{
            margin-left: 0.8rem;
        }
    }
}
</style>