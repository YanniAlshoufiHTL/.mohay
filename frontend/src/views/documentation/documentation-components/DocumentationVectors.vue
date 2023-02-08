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
          <a href="./point.html" class="text-link">points</a>.
        </p>
        <p class="text">
          The vector's arrow goes from
          <a href="./point.html" class="text-link">point</a> 1 to
          <a href="./point.html" class="text-link">point</a> 2.
        </p>
        <p class="text">
          In the example below the arrow head would appear at the
          <a href="./point.html" class="text-link">point</a> (100, 2)
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
export default {
  name: 'DocumentationVectors',
};
</script>

<style lang="scss"></style>
