<template>
   <div id="app">               
        <v-app class="LoginDiv" >
            <v-layout justify-center>
                <v-flex xs12 sm8 md6>
                    <div class="forums">
                      <div class="Title">
                          <p>Forums</p>
                      </div>
                        <v-data-table
                        :headers="headers"
                        :items="forums"
                        item-key="id"
                        class="elevation-1"
                        :search="search"
                        :custom-filter="filterText"
                        align-center
                        >
                        <template v-slot:item.creation_date="{item}">
                            <p >{{item.creation_date | formatDate}}</p>
                        </template>

                        <template v-slot:item.actions="{ item }">
                          <v-icon @click="moreDetails(item)">
                            mdi-arrow-right-bold-circle-outline
                          </v-icon>
                         
                        </template>
                        <template v-slot:top>
                            <v-text-field v-model="search" label="Search Forum" class="mx-4"></v-text-field>
                        </template>
                      </v-data-table>
                    </div>
                </v-flex>
            </v-layout>
        </v-app>
    </div>
</template>

<script>
import firebase from '../config/firebase'
import { mapGetters } from "vuex";

export default {
    data(){
        return{
            db: firebase.firestore(),
            forums: [],
            search: '',     
        }
    },
    computed: {
      headers () 
      {
        return [
          {
            text: 'Subject',
            sortable: true,
            value: 'subject',
            align: "center"
          },
          {
            text: 'Creator',
            sortable: true,
            value: 'creator.name',
            align: "center"
          },
          {
            text: 'Creation Date',
            sortable: true,
            value: 'creation_date',
            align: "center"
          },
          { text: '',
            value: 'actions',
            sortable: false ,
            align: "center"
            },
        ]
      },
      ...mapGetters(
      {
        user: "user"
      })
    },
    methods:{
         filterText (value, search) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().indexOf(search) !== -1
      },
        refresh()
        {
            this.db.collection("entries").get().then((forums) => {
                    forums.forEach(forum => 
                    {
                        if(forum.data().parent === null)
                        {
                            this.db.collection("users").doc(forum.data().creator.id).get().then((user) => 
                            {
                              this.pushForum(forum,user.data())
                            })
                        }
                    });
                })
        },
        pushForum(newForum, user)
        {
          let forum = newForum.data()
          forum.creator = user
          this.forums.push(forum)
        },
        moreDetails(item){
          console.log(item)
          return this.$router.push({path: '/forums/forum/'+item.id});    
        }     
    },
    filters: {
      formatDate: function (value) {
              if (!value) return '';
              return new Date(value.seconds*1000).toLocaleDateString("es-ES");
      }
    },
    mounted: function () {
        this.refresh()
    }
}
</script>

<style scoped>
.LoginDiv{
    padding-top: 5%;
}
.Title{
  font-size: 180%;
  background: #1976D2;
  color: white;
}
.forums
{
    
    -webkit-box-shadow: 0px 0px 23px 2px rgba(0,0,0,0.21);
    -moz-box-shadow: 0px 0px 23px 2px rgba(0,0,0,0.21);
    box-shadow: 0px 0px 23px 2px rgba(0,0,0,0.21);
    /* padding:3%; */
    margin: 3%;
}
</style>