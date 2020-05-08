<template>
  <div class="home">
    <button @click="test">请求数据</button>
    <div class="test">你好了</div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import request from '@/utils/http';
export default {
  name: 'home',
  components: {},
  mounted() {},
  methods: {
    test() {
      request.post('http://localhost:3000/goodsList').then(res => {
        console.log({ res });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.test {
  font-size: pxTorem(14);
}
</style>
