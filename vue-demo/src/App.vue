<template>
    <div id="app">
        <img src="./assets/logo.png">
        <!-- <router-view/> -->
        <!-- <TplDemo /> -->
        <!-- <conditionDemo /> -->
        <!-- <eventDemo /> -->
        <!-- <ComponentsDemo /> -->
        <advanceUse />
        <!-- <nextTick /> -->
    </div>
</template>

<script>
// import TplDemo from './components/BaseUse/TplDemo';
// import conditionDemo from './components/BaseUse/conditionDemo';
// import eventDemo from './components/BaseUse/eventDemo';
// import ComponentsDemo from './components/componentsDemo/index';
import advanceUse from "./components/advanceUse/index";
export default {
  name: 'App',
  components: {
    // TplDemo
    // conditionDemo
    // eventDemo
    // ComponentsDemo
    advanceUse
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
