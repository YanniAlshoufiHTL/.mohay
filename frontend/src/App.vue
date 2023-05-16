<template>
  <NavigationBar />
  <main>
    <router-view />
  </main>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';

document.body.classList.add(
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
);

export default {
  components: {
    NavigationBar,
  },
};
</script>

<style lang="scss">
@import './styles/global.scss';

* {
  font-family: var(--primary-font);
}
</style>
