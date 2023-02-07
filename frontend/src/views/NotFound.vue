<template>
  <h1>404 &mdash; Page not Found</h1>
  <p>Sorry :( {{ msg }}</p>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    return {
      msg: 'We appologize!',
    };
  },
};
</script>

<style lang="scss"></style>
