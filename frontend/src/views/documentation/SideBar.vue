<template>
  <div class="side-bar">
    <li v-for="page in this.$store.state.documentationPages" class="side-bar-element-wrapper">
      <router-link
        class="side-bar-element"
        :to="{ name: 'Documentation', params: { id: page.name } }"
      >
        {{ page.name }}
      </router-link>
    </li>
  </div>
</template>

<script>
import Documentation from './Documentation.vue';

export default {
  name: 'SideBar',
  components: { Documentation },
};
</script>

<style lang="scss" scoped>
@import '../../styles/global.scss';

.side-bar {
  position: fixed;
  top: var(--nav-height);
  left: 0;

  z-index: 99;

  display: flex;
  flex-direction: column;

  padding-top: calc(var(--nav-height) / 4);

  width: --aside-width;
  height: calc(100vh - var(--nav-height) - var(--footer-height));

  background-color: rgba(var(--bg-color), 52);
}

.side-bar-element-wrapper {
  display: flex;
  align-items: center;
  width: 100%;

  user-select: none;

  .side-bar-element {
    width: 100%;
    margin-left: 1vw;
    padding: 1vw 0;

    text-align: left;

    text-decoration: none;

    font-size: 14pt;
    font-family: var(--primary-font);

    color: var(--fg-color);

    transition: padding-left ease-in 0.3s;

    &:hover {
      padding-left: 1.5vw;

      filter: brightness(0.9);
    }
  }
}
</style>
