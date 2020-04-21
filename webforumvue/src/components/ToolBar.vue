<template>
  <v-toolbar dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
    <v-toolbar-items>
      <v-icon style="margin-right:5%">mdi-forum</v-icon>
      <v-btn to="/users" text>Users</v-btn>
      <v-btn to="/forums" text>Forums</v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <template v-if="user.loggedIn">
        <v-btn text @click="enableOptions = !enableOptions">{{user.data.email}}</v-btn>
        <template v-if="enableOptions" class="options">
          <v-btn @click="signOut" text>Sign Out</v-btn>
          <v-btn @click="deleteAccount" text>Delete Account</v-btn>
          <v-btn @click="editAccount" text>Edit Account</v-btn>
        </template>
      </template>
      <template v-else>
        <v-btn to="/logIn" text>
          <v-icon left>mdi-account-circle</v-icon>Login
        </v-btn>
        <v-btn to="/signUp" text>
          <v-icon left>mdi-account-plus</v-icon>Sign Up
        </v-btn>
      </template>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  name: "App",
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  data() {
    return {
      enableOptions: false
    };
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          if (this.$route.name !== "forums") {
            console.log(this.user)
            this.$router.replace({
              name: "forums"
            });
          }
        });
    },
    deleteAccount() {
      var user = firebase.auth().currentUser;
      user.delete().then(function() {
          // User deleted.
        })
    },
    editAccount(){
      this.$router.replace(
      {
        name: "updateAccount"
      });
    }
  }
};
</script>

<style scoped>
.v-toolbar--prominent .v-toolbar__content {
  align-items: center;
}
.v-list-item {
  background-color: transparent;
  height: 100%;
}
.options{
  /* height: 100%; */
  background: transparent;
  color: #fff;
  padding-bottom: 0;
  padding-top: 0;
}
</style>
