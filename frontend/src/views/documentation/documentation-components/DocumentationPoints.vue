<template>
  <div class="content">
    <div class="main-content">
      <div class="heading">Points</div>
      <div class="part">
        <p class="small-heading">Definition</p>
        <hr class="text-break" />

        <p class="text">A point is a two-dimentional dot that doesn't get displayed.</p>
        <p class="small-heading">Usage</p>
        <hr class="text-break" />

        <p class="text">
          Because of their importance in
          <router-link class="text-link" :to="{ name: 'Home' }">.mohay</router-link>, points
          have a special syntax. To create one, type in two brackets with the x and y values
          inside of them, separated by a comma.
        </p>

        <div class="code-example-box">
          <p class="code-example-heading">Example</p>
          <div class="code-example">
            <p class="code">.p = (1, 1)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Home from '@/views/Home.vue';

export default {
  name: 'DocumentationPoints',
  components: {
    Home,
  },
};
</script>

<style lang="scss"></style>
