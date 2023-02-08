<template>
  <div class="content">
    <SideBar />
    <component :is="currentComponent()" v-bind:component="currentComponent()"></component>
  </div>
</template>

<script>
import SideBar from './SideBar.vue';
import DocumentationComments from './documentation-components/DocumentationComments.vue';
import DocumentationConstants from './documentation-components/DocumentationConstants.vue';
import DocumentationLines from './documentation-components/DocumentationLines.vue';
import DocumentationPoints from './documentation-components/DocumentationPoints.vue';
import DocumentationShapes from './documentation-components/DocumentationShapes.vue';
import DocumentationVariables from './documentation-components/DocumentationVariables.vue';
import DocumentationVectors from './documentation-components/DocumentationVectors.vue';

export default {
  props: ['id'],
  data() {
    return {
      currentComponent: () =>
        this.$store.state.documentationPages.find(e => e.name == this.id).component.name,
    };
  },
  name: 'Documentation',
  components: {
    SideBar,
    DocumentationComments,
    DocumentationConstants,
    DocumentationLines,
    DocumentationPoints,
    DocumentationShapes,
    DocumentationVariables,
    DocumentationVectors,
  },
};
</script>

<style lang="scss">
@import '../../styles/global.scss';

body {
  background-color: $bg-dark-color;
}

.content {
  position: relative;
  left: $aside-width;
  padding-top: calc($nav-height / 4);

  width: calc(100vw - $aside-width);

  background-color: $bg-dark-color;

  .main-content {
    width: 100%;
    font-family: $primary-font;
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

.ordered-list {
  list-style-position: inside;
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
