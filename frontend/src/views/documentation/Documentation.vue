<template>
  <div>
    <SideBar />
    <component :is="currentComponent()" v-bind:component="currentComponent()" />
    <Footer />
  </div>
</template>

<script>
import SideBar from './SideBar.vue';
import Footer from '../../components/Footer.vue';
import DocumentationHome from './documentation-components/DocumentationHome.vue';
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
    Footer,
    DocumentationHome,
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

.content {
  position: relative;
  left: var(--aside-width);
  padding-top: calc(var(--nav-height) / 4);

  width: calc(100vw - var(--aside-width));

  background-color: var(--documentation-bg-color);

  .main-content {
    width: 90%;
    font-family: var(--primary-font);
  }
}

.heading,
.small-heading,
.text,
.text-link,
.text-break,
.ordered-list,
.code-example-box {
  margin-bottom: 20px;
}

.heading {
  align-content: left;

  font-size: 4rem;
  letter-spacing: -2px;
  font-family: var(--primary-font);

  color: var(--documentation-heading-color);

  user-select: none;
}

.small-heading {
  color: var(--documentation-subheading-color);
  font-size: 25pt;
  font-weight: 700;
}

.text {
  color: var(--documentation-fg-color);
  font-size: 16pt;
  font-weight: 500;
  padding-bottom: 15px;
}

.text-link {
  text-decoration: none;
  color: var(--documentation-link-color);
}

.text-break {
  margin: 1vw 0;
}

ol,
ul {
  list-style-position: inside;
}

.code-example-box {
  background-color: var(--documentation-codebox-bg-color);
  border-radius: 6px;

  padding: 15px;

  .code-example-heading {
    font-size: 22pt;
    color: var(--documentation-codebox-heading-color);
    padding: 0 0.2vw;
    margin: 2.5vh 0;
  }

  .code-example {
    padding: 2vw;
    .code {
      color: var(--documentation-codebox-fg-color);
      font-size: 16pt;
      margin: 10px;
    }
  }
}
</style>
