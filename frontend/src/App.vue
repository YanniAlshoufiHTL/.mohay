<template>
  <NavigationBar />
  <main>
    <router-view />
  </main>
</template>

<script>
import { analyzeAndGetNew } from './scripts/transpilationFlow';

// The following code can be uncomented to execute a simple test.

async function tst() {
  console.log(await analyzeAndGetNew(`
        wow EEE = 10
        .v = 35
        rect (EEE,EEE) EEE EEE
        line (1,1) (1,1)
        rect (1,1) 10 10
        circle (1,1) 10
        arc (1,1) .v 20 30
        c #123456
        f true
        f false
        s true
        s false
        line (1,1) (1,1)
        //asdf

                    .v = 35
                    rect (EEE,EEE) EEE EEE
                    rect (1,1) 10 10
                    circle (1,1) 10
                    arc (1,1) .v 20 30
                    c #3abcaa
                    f true
                    f false
                    s true
                    s false
                    line (1,1) (1,1)
                    //asdf
`));
}
tst();

import NavigationBar from './components/NavigationBar.vue';

document.body.classList.add(
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
);

export default {
  components: {
    NavigationBar,
  },
};
</script>

<style lang="scss">
@import './styles/global.scss';
</style>
