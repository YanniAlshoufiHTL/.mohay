<template>
  <div class="footer-wrapper">
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss">
@import '../styles/global.scss';

.footer-wrapper {
  position: relative;
  left: 0;
  z-index: 100;

  margin-top: calc(var(--footer-height) / 2);

  width: 100vw;
  height: var(--footer-height);

  background-color: var(--footer-bg-color);

  box-shadow: 0 -30px 50px 20px var(--footer-shadow-color);

  footer {
    position: inherit;
    flex: 1;
  }
}
</style>
