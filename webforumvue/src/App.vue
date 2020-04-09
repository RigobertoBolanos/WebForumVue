<template>
  <div id="app">
    <v-toolbar dark prominent src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">

      <v-toolbar-items>
        <v-btn to='/users' text>Users</v-btn>
        <v-btn to='/forums' text>Forums</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn to='/logIn' text>Log In</v-btn>
        <v-btn to='/signUp' text>Sign Up</v-btn>
      </v-toolbar-items>

    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
