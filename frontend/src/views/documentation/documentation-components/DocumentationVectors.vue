<template>
  <div class="content">
    <div class="main-content">
      <div class="heading">Vectors</div>
      <div class="part">
        <p class="small-heading">Declaration</p>
        <hr class="text-break" />

        <p class="text">Vectors are arrows. These can be used using the 'vector' keyword.</p>
        <p class="text">
          Afterwards you need to enter two
          <router-link
            class="text-link"
            :to="{ name: 'Documentation', params: { id: 'Points' } }"
          >
            points
          </router-link>
        </p>
        <p class="text">
          The vector's arrow goes from
          <router-link
            class="text-link"
            :to="{ name: 'Documentation', params: { id: 'Points' } }"
          >
            point
          </router-link>
          1 to
          <router-link
            class="text-link"
            :to="{ name: 'Documentation', params: { id: 'Points' } }"
          >
            point
          </router-link>
          2.
        </p>
        <p class="text">
          In the example below the arrow head would appear at the
          <router-link
            class="text-link"
            :to="{ name: 'Documentation', params: { id: 'Points' } }"
          >
            point
          </router-link>
          (100, 2)
        </p>

        <div class="code-example-box">
          <p class="code-example-heading">Example</p>
          <div class="code-example">
            <p class="code">vector (3, 4) (100, 2)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DocumentationPoints from './DocumentationPoints.vue';

export default {
  name: 'DocumentationVectors',
  components: {
    DocumentationPoints,
  },
};
</script>

<style lang="scss"></style>
