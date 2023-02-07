<template>
  <nav>
    <div class="wrapper">
      <router-link id="logo-link" :to="{ name: 'Home' }">.mohay</router-link>
      <div id="nav-div">
        <router-link class="nav-link" :to="{ name: 'Documentation' }">
          Documentation
        </router-link>
        <router-link class="nav-link" :to="{ name: 'AboutUs' }"> About Us </router-link>
        <div id="nav-btn-div">
          <router-link id="btn-link" class="codespace-btn" :to="{ name: 'Codespace' }"
            >Codespace</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import HomeView from '@/views/Home.vue';

export default {
  name: 'NaviagionBar',
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  width: 100vw;
  height: $nav-height;

  background-color: $nav-bg-dark;

  > .wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;

    #logo-link {
      color: $primary-dark-color;

      font-size: 4vw;
      font-family: 'Fredoka One', sans-serif;
      text-decoration: none;

      cursor: pointer;

      user-select: none;

      transform: translateY(-10%);
    }

    #nav-div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      font-family: 'Work Sans', sans-serif;

      width: 50%;

      .nav-link {
        color: $fg-dark-color;
        transition: color linear 0.09s;

        text-decoration: none;
        font-size: 20pt;

        user-select: none;

        &:hover {
          color: $fg-dark-darker-color;

          &::after {
            content: ' ';
            position: relative;

            display: block;
            animation: scale-x forwards 0.8s;
            height: 1px;
            background-color: $fg-dark-darker-color;
          }
        }
      }

      #nav-btn-div {
        display: flex;
        justify-content: center;
        align-items: center;

        #btn-link {
          cursor: pointer;
          user-select: none;

          text-decoration: none;

          background-color: $primary-dark-color;

          transition: background-color 0.2s;
          box-sizing: border-box;

          &:hover {
            color: white;
            background-color: $primary-dark-darker-color;
          }

          &:active {
            transform: scale(0.98);
          }

          &:focus {
            background-color: $primary-dark-darker-color;
            box-shadow: 0 0 0 2px $primary-dark-color;
          }
        }

        .router-link-active {
          color: $fg-dark-color;
        }

        .router-link-exact-active {
          color: $fg-dark-color;
        }
      }
    }
  }
}

@keyframes scale-x {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

@-webkit-keyframes scale-x {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
</style>
