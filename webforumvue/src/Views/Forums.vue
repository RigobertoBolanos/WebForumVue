<template>
    <div class="forums">
        <v-data-table
        :headers="headers"
        :items="forums"
        item-key="id"
        class="elevation-1"
        :search="search"
        :custom-filter="filterText"
        >
        <template v-slot:top>
            <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
        </template>
        </v-data-table>
    </div>
</template>

<script>
import firebase from '../config/firebase'
export default {
    data(){
        return{
            db: firebase.firestore(),
            forums: [],
            search: '',     
        }
    },
    computed: {
      headers () {
        return [
          {
            text: 'Subject',
            sortable: true,
            value: 'subject',
          },
          {
            text: 'Creator',
            sortable: true,
            value: 'creator.name'
          },
          {
            text: 'Creation Date',
            sortable: true,
            value: 'creation_date',
          },
        ]
      },
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
        }
    },
    mounted: function () {
        this.refresh()
    }
}
</script>

<style scoped>
.forums
{
    
    -webkit-box-shadow: 0px 0px 23px 2px rgba(0,0,0,0.21);
    -moz-box-shadow: 0px 0px 23px 2px rgba(0,0,0,0.21);
    box-shadow: 0px 0px 23px 2px rgba(0,0,0,0.21);
    /* padding:3%; */
    margin: 3%;
}
</style>