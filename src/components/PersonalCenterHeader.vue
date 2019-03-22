<template>
    <div>
        <header>
            <div class="avatar">
                <img :src="avatar" alt="您的头像">
            </div>
            <p class="user-name">{{userName}}</p>
            <p class="user-id">ID：{{userId}}</p>
        </header>
    </div>
</template>

<script>
    export default {
        props:{
            avatar:String,
            userName:String,
            userId:String,
        }
    }
</script>

<style scoped lang="scss">
  header{
    width: 100%;
    height: 11.566667rem;
    background: url(./../assets/img/personal-center-bg.jpg) no-repeat center;
    background-size: 100% 11.566667rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar{
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      border: 3px solid #86e1fc;
      margin-top: 1.5rem;
      margin-bottom: .8rem;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .user-name{
      width: 100%;
      height: 1rem;
      color: #fff;
      font-size: 14px;
      line-height: 1rem;
      text-align: center;
      margin-bottom: .3rem;
    }
    .user-id{
      width: 100%;
      height: .8rem;
      font-size: 12px;
      line-height: 0.8rem;
      text-align: center;
    }
  }
</style>