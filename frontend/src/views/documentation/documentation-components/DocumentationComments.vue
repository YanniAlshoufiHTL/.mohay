<template>
  <div class="content">
    <div class="main-content">
      <div class="heading">Comments</div>
      <div class="part">
        <p class="small-heading">How to use</p>
        <hr class="text-break" />

        <p class="text">There are 2 different ways of commenting code.</p>
        <ol class="ordered-list">
          <li class="text">/* Code */</li>
          <li class="text">// Code</li>
        </ol>

        <div class="code-example-box">
          <p class="code-example-heading">Example</p>
          <div class="code-example">
            <p class="code">/* wow a = point 3 3 */</p>
            <p class="code">// wow a = point 3 3</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocumentationComments',
};
</script>

<style lang="scss"></style>
