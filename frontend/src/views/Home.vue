<template>
  <img src="../assets/bg-main.jpg" alt="Background Image" id="bg-main-img" />
  <div id="homepage-overlay"></div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="scss">
@import '../styles/global.scss';

$ad-img-width: 100vw;
$ad-img-height: calc(99vh - $nav-height);

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
  background: rgba(0, 0, 0, 0.3);
}
</style>
