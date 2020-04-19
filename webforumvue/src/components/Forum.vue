<template>
   <div id="app">               
        <v-app class="LoginDiv" >
            <v-layout justify-center>
                <v-flex xs14 sm12 md10>
                    <v-card class="elevation-12" >
                        <v-toolbar color="primary" dark flat align-center>
                            <v-btn to="/forums" icon  >
                                <v-icon x-large>mdi-arrow-left-circle</v-icon>
                            </v-btn>
                            <v-spacer />
                                <v-toolbar-title class="toolbarTitle">
                                    {{forum.title}}
                                </v-toolbar-title>
                            <v-spacer />  
                        </v-toolbar>
                        <v-card-text >
                            
                                <div class="forumDetails">
                                    <v-row style="margin:0px">
                                        <v-col cols="6"  >
                                            <b>Creation Date: </b>{{forum.creation_date | formatDate}}
                                        </v-col>
                                        <v-col cols="6" >
                                            
                                                <b>Creator:</b> Name Lastname
                                            
                                        </v-col>
                                    </v-row>
                                    <hr> 
                                </div>
                                <div class="forumSubject">

                                </div>
                                <p align="justify">
            
                                   
                                        {{forum.subject}}
                                      
                                </p>
                                
                               
                        </v-card-text>
                        <v-card-actions >
                                <v-spacer></v-spacer>
                                <v-icon large color="white" left @click="reply">mdi-reply-all</v-icon>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-app>
    </div>
</template>

<script>
// import entry from './Entry'
import firebase from '../config/firebase'
import { mapGetters } from "vuex";

export default {
    
    computed:{
      ...mapGetters(
      {
        user: "user"
      })
    },
    data(){
        return{
            // title: "",
            // creation_date: "",
             creator: null,
            // entries: [],
            // subject: "",
            db: firebase.firestore(),
            forum: null
        }
    },
    methods:{
        reply(){

        },
         refresh()
        {
            this.db.collection("entries")
                            .where("id","==",this.$route.params.id)
                            .get()
                            .then((forums) => {
                                 forums.forEach(
                                    forum => 
                                        {
                                            if(forum){
                                                this.forum = forum.data();
                                                //this.creator = this.findUser(this.forum.creator.id)
                                            }
                                        }
                                    );
                            })


        },
        pushForum(newForum, user)
        {
          let forum = newForum.data()
          forum.creator = user
          this.forums.push(forum)
        },
        findUser(userId){
            console.log("Searching user",userId)
            this.db.collection("users")
                            .where("id","==",userId)
                            .get()
                            .then((users) => {
                                 users.forEach(
                                    user => 
                                        {
                                            console.log(user.data())
                                             user.data()
                                        }
                                    );
                            }).catch(function(error) {
        console.log("Error getting documents: ", error);

    });
    
        }
    },
    components:{
        // entry
    },
    mounted: function () {
        this.refresh()
    },
    filters: {
      formatDate: function (value) {
              if (!value) return '';
              return new Date(value.seconds*1000).toLocaleDateString("es-ES");
      }
    }
}
</script>

<style scoped>
    .toolbarTitle{
        font-size: 180%;
    }
    .forumsDetails{
        text-align: left;
    }
    .forumSubject{
        margin-top: 2%;
    }
    .col{
        padding: 0px;
    }
    .v-card__actions {
    padding: 0px;
    background: #1976D2;
}
</style>