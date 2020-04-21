
<template>
  <div>
      <BackTop :target="getTarget" :bottom="0" :right="50"></BackTop>

      a
  </div>
</template>

<script>

export default {
  methods: {
    getTarget() {
      return document.querySelector('.right-frame');
    }
  }
};
</script>