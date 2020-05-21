
<template>
  <div>
      <BackTop :target="getTarget" :bottom="0" :right="50"></BackTop>

      <!-- v-html 可以识别htm标签 -->
      <div v-html="msg">{{ msg }}</div>
      {{ msg }}

      <h2 v-show="ok">Hellow word</h2>

      <h2 v-if="ok">Hellow word</h2>

      {{ resver_msg }}

      <p>{{ counter }}

        <Button @click="counter++">+</Button>
      </p>





  </div>
</template>

<script>

export default {

  data(){
    return{
      msg:'<h1>这是一个变量</h1>',
      ok:1,
      counter:0,
    }
  },
  watch:{

    counter:function(nval,oval){

        console.log('计数器由'+oval+'变成了'+nval);

    }

  },
  //计算属性
  computed:{
      resver_msg(){
        return this.msg.split('').reverse().join('')
      }
  },
  methods: {
    getTarget() {
      return document.querySelector('.right-frame');
    }
  }
};
</script>