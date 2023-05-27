<template>
  <div id="codespace-wrapper">
    <div id="top-bar-wrapper">
      <div id="menu-wrapper">
        <div class="menu-element">File</div>
        <div class="menu-element">Edit</div>
        <div class="menu-element">Find</div>
        <div class="menu-element">Navigate</div>
        <div class="menu-element">Project</div>
        <div class="menu-element">Help</div>
      </div>
      <div id="profile-icon-wrapper">
        <div class="profile-icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Codespace',
};
</script>

<style lang="scss" scoped>
@import '../styles/global.scss';
@import '../styles/variables.scss';

$select-ui-color: #77769642;
$top-bar-height: 50px;
$top-bar-elements-width: 750px;

$bar-element-border-weight: 4px;

$main-wrapper-width: 95vw;

#codespace-wrapper {
  position: relative;
  left: calc((100vw - $main-wrapper-width) / 2);

  width: $main-wrapper-width;
}

#top-bar-wrapper {
  position: relative;
  top: calc(var(--nav-height) / 10);

  display: flex;
  width: 100%;
  height: $top-bar-height;

  background-color: var(--bg-color);
  font-family: var(--primary-font);

  #menu-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: $top-bar-elements-width;
    box-sizing: border-box;

    font-size: 1.2rem;

    color: var(--codespace-menu-bar-fg-color);

    .menu-element {
      min-width: 110px;
      text-align: center;
      font-weight: bold;

      padding: 3px 12px;

      user-select: none;
      box-sizing: border-box;

      border: $bar-element-border-weight solid var(--codespace-menu-btn-border-color);
      border-radius: 13px;

      background-color: var(--codespace-menu-btn-bg-color);
      transition: background filter 0.1s;
      cursor: pointer;

      &:hover {
        background-color: var(--codespace-menu-btn-bg-hover-color);
      }

      &:active {
        filter: brightness(0.8);
      }
    }
  }

  #profile-icon-wrapper {
    width: calc(100% - $top-bar-elements-width);
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .profile-icon {
      box-sizing: border-box;
      background-color: var(--codespace-account-circle-bg-color);

      border-radius: 50%;
      border: $bar-element-border-weight solid var(--codespace-account-circle-border-color);
      height: calc($top-bar-height * 0.9);
      width: calc($top-bar-height * 0.9);
    }
  }
}

$frame-gap: 30px;
#main-editor-frame {
  position: fixed;
  bottom: calc((100vw - $main-wrapper-width) / 2);

  display: flex;
  gap: $frame-gap;

  height: calc(
    100vh - var(--nav-height) - $top-bar-height - (100vw - $main-wrapper-width) / 2 -
      calc(var(--nav-height) / 10) - (100vw - $main-wrapper-width) / 4
  );
  width: $main-wrapper-width;

  background-color: var(--bg-color);

  #non-editor-frame-section {
    flex: 1;

    display: flex;
    flex-direction: column;
    gap: $frame-gap;

    > * {
      width: 100%;
      background-color: var(--nav-bg);
    }

    #frame-run-window {
      flex: 3;
    }

    #frame-explorer-window {
      flex: 2;
    }
  }

  #frame-editor-section {
    flex: 1;

    display: flex;

    #frame-editor {
      flex: 1;
      background-color: var(--nav-bg);

      font-family: monospace;
      font-size: 1rem;
      padding: 30px;
    }
  }
}
</style>
