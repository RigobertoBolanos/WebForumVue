<template>
  <div id="app">
    <v-app>
      <v-layout justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat align-center>
              <v-spacer />
              <v-toolbar-title class="toolbarTitle">New Forum</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid">
                <v-text-field
                  label="Forum Title"
                  type="text"
                  :counter="100"
                  v-model="title"
                  :rules="titleRules"
                ></v-text-field>

                <v-textarea
                  :counter="300"
                  label="Forum Subject"
                  :rules="subjectRules"
                  v-model="subject"
                ></v-textarea>
              </v-form>
              <v-spacer>
                <v-btn type="submit" :disabled="!valid" outlined color="primary" @click="addForum">
                  <v-icon>mdi-login-variant</v-icon>
                </v-btn>
              </v-spacer>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-app>
  </div>
</template>

<script>
import firebase from "../config/firebase";

export default {
  data() {
    return {
      db: firebase.firestore(),
      valid: true,
      title: "",
      subject: "",
      titleRules: [
        title => !!title || "Title is required",
        title => title.length <= 100 || "Title must be less than 100 characters"
      ],
      subjectRules: [
        subject => !!subject || "Subject is required",
        subject =>
          subject.length <= 300 || "Title must be less than 300 characters"
      ]
    };
  },
  methods: {
    addForum() {
      let user = firebase.auth().currentUser 
        if (user) {
            this.db.collection("params").doc("lastEntryId").get().then((lastEntryId) =>
            {
                let newEntryId = (parseInt(lastEntryId.data().value) + 1).toString()
                this.db.collection("entries").doc(newEntryId).set({
                    creation_date: new Date(Date.now()),
                    id: newEntryId,
                    creator: user.email,
                    parent: null,
                    title: this.title,
                    subject: this.subject
                });
                this.db.collection("params").doc("lastEntryId").set({
                    value: newEntryId
                });
                this.title = "",
                this.subject = ""
                this.$emit('notifyNewForum')
            })
        } else {
          // No user is signed in.
        }
      }
    }
};
</script>

<style scoped>
.toolbarTitle {
  font-size: 180%;
}
</style>