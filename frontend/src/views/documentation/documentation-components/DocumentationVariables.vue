<template>
  <div class="content">
    <div class="main-content">
      <div class="heading">Variables</div>
      <div class="part">
        <p class="small-heading">Declaration</p>
        <hr class="text-break" />

        <p class="text">
          Variables are declared with a period, followed by the variable's name.
        </p>

        <p class="small-heading">Naming Convension</p>
        <hr class="text-break" />

        <p class="text">Variables names should be camel case.</p>
        <p class="text">
          Meaning, you start with a lower-case letter and for each word, you start with an
          upper-case letter. The first character in the name can only be a letter. The rest of
          the name is allowed to contain numbers too.
        </p>

        <div class="code-example-box">
          <p class="code-example-heading">Example</p>
          <div class="code-example">
            <p class="code">.userAge1 = 16</p>
            <p class="code">.userAge2 = 17</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocumentationVariables',
};
</script>

<style lang="scss"></style>
