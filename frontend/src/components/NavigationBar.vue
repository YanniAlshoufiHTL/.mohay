<template>
  <nav>
    <div class="wrapper">
      <router-link id="logo-link" :to="{ name: 'Home' }">.mohay</router-link>
      <div id="nav-div">
        <router-link class="nav-link" :to="{ name: 'Documentation', params: { id: 'Home' } }">
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
export default {
  name: 'NaviagionBar',
};
</script>

<style lang="scss">
@import '../styles/global.scss';

nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  width: 100vw;
  height: var(--nav-height);

  background-color: var(--nav-bg);

  > .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;

    #logo-link {
      color: var(--logo-color);

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

      width: 50%;

      .nav-link {
        color: var(--fg-color);
        transition: color linear 0.09s;

        text-decoration: none;
        font-size: 20pt;

        user-select: none;

        &:hover {
          color: var(--fg-darker-color);

          &::after {
            content: ' ';
            position: relative;

            display: block;
            animation: scale-x forwards 0.8s;
            height: 1px;
            background-color: var(--fg-darker-color);
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

          transition: background-color 0.2s;
          box-sizing: border-box;

          &:hover {
            // color: white;
            background-color: var(--btn-codespace-bg-hover);
          }

          &:active {
            transform: scale(0.98);
          }

          &:focus {
            background-color: var(--btn-codespace-bg);
            box-shadow: 0 0 0 2px var(--primary-color);
          }
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

$first-query-width: 1200px;
@media (max-width: $first-query-width) {
  #logo-div {
    font-size: calc($first-query-width / (100 / 4));
  }

  #nav-div {
    width: 70%;
  }
}
</style>
