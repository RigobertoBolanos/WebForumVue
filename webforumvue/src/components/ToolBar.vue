<template>
    <v-toolbar dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
        <v-toolbar-items>
        <v-icon style="margin-right:5%">mdi-forum</v-icon>
        <v-btn to='/users' text>Users</v-btn>
        <v-btn to='/forums' text>Forums</v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <v-toolbar-items>
        <template v-if="user.loggedIn">
            <div>{{user.data.name}}</div>
            <v-btn @click="signOut" text>Sign Out</v-btn>
        </template>
        <template v-else>
            <v-btn to='/logIn' text><v-icon left>mdi-account-circle</v-icon>Login</v-btn>
            <v-btn to='/signUp' text><v-icon left>mdi-account-plus</v-icon>Sign Up</v-btn>
        </template>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

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
        if(this.$route.name !== 'forums')
        {
          this.$router.replace(
          {
            name: "forums"
          })
        }
      });
    }
  }
}
</script>

<style scoped>
.v-toolbar--prominent .v-toolbar__content {
    align-items: center
}
</style>
