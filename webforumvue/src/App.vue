<template>
  <div id="app">
    <Toolbar></Toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
import Toolbar from "./components/ToolBar";

export default {
  name: 'App',
  computed: {
    ...mapGetters(
    {
      user: "user"
    })
  },
  methods: {
    signOut() 
    {
      firebase.auth().signOut().then(() => 
      {
          this.$router.replace(
          {
            name: "forums"
          });
      });
    }
  },
  components: {
    Toolbar
  }
}
</script>

<style>
body{
   background-color: white;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
</style>
