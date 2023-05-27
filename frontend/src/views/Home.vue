<template>
  <img src="../assets/bg-main.jpg" alt="Background Image" id="bg-main-img" />
  <div id="homepage-overlay"></div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="scss" scoped>
@import '../styles/global.scss';

$ad-img-width: 100vw;
$ad-img-height: calc(99.5vh - var(--nav-height));

#bg-main-img {
  width: $ad-img-width;
  height: $ad-img-height;

  object-fit: cover;
}

#homepage-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  user-select: none;

  width: $ad-img-width;
  height: $ad-img-height;
  background: var(--overlay-center-color);
  background: radial-gradient(circle, var(--overlay-center-color) 0%, var(--overlay-corner-color) 100%);
}
</style>
