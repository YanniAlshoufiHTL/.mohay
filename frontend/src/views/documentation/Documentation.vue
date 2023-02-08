<template>
  <div class="content">
    <SideBar />
    <h1>{{ id }}</h1>
  </div>
</template>

<script>
import SideBar from './SideBar.vue';

export default {
  props: ['id'],
  name: 'Documentation',
  components: { SideBar },
};
</script>

<style lang="scss" scoped>
@import '../../styles/global.scss';

body {
  background-color: $bg-dark-color;
}

.content {
  position: fixed;
  right: 0;

  padding-top: calc($nav-height / 4);

  width: calc(100vw - $aside-width);

  background-color: $bg-dark-color;

  .main-content {
    width: 100%;
    font-family: $primary-font;
  }

  .footer-wrapper {
    margin-top: calc($footer-height / 4);
    transform: translateX(-$aside-width);
  }
}

.heading {
  align-content: left;

  font-size: 4rem;
  font-family: $primary-font;

  color: $primary-dark-color;

  user-select: none;
}

.small-heading {
  color: $fg-dark-color;
  font-size: 25pt;
  font-weight: 700;
}

.text {
  color: $fg-dark-color;
  font-size: 16pt;
  font-weight: 500;
  padding-bottom: 15px;
}

.text-link {
  text-decoration: none;
  color: $primary-dark-color;
}

.text-break {
  margin: 1vw 0;
  width: 75vw;
}

.code-example-box {
  background-color: $nav-bg-dark;
  border-radius: 6px;

  padding: 0.7vw;

  .code-example-heading {
    font-size: 22pt;
    color: $fg-dark-color;
    padding: 0 0.2vw;
    margin: 2.5vh 0;
  }

  .code-example {
    padding: 2vw;
    background-color: $bg-dark-color;
    .code {
      color: $fg-dark-color;
      font-size: 16pt;
      margin: 10px;
    }
  }
}
</style>
