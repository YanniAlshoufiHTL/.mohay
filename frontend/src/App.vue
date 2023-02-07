<template>
  <NavigationBar />
  <main>
    <router-view />
  </main>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';

export default {
  components: {
    NavigationBar,
  },
};
</script>

<style lang="scss">
@import './styles/global.scss';

* {
  font-family: $primary-font;
}
</style>
