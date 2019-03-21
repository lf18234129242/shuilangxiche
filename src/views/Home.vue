<template>
  <div class="hello">
    <van-nav-bar 
      title="首页"
      fixed
      border
    ></van-nav-bar>
    <h1>{{ msg }}</h1>
    <h1>{{ msg }}</h1>
    <h1>{{ msg }}</h1>
    <h1>{{ msg }}</h1>
    <h1>{{ msg }}</h1>
    <h1>{{ msg }}</h1>
    <h1>{{ msg }}</h1>
    <van-button>hello world</van-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    backOne() {
      this.$router.go(-1)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
