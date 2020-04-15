<template>
    <div class="forums">
        <v-data-table
        :headers="headers"
        :items="forums"
        item-key="id"
        class="elevation-1"
        :search="search"
        :custom-filter="filterOnlyCapsText"
        >
        <template v-slot:top>
            <v-text-field v-model="search" label="Search (UPPER CASE ONLY)" class="mx-4"></v-text-field>
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
            value: 'creator'
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
         filterOnlyCapsText (value, search) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toUpperCase().indexOf(search) !== -1
      },
        refresh(){
            this.db.collection("entries").get().then((result) => {
                
                    result.forEach(forum => {
                        
                        if(forum.data().parent === null)
                        {
                            forum.creator = this.findUser(forum.data().creator.id)
                            this.forums.push(forum.data())
                        }
                    });
                })
        },
        findUser(id){
            let user
            let ended = false
            this.db.collection("users").doc(id).get().then((result) => {
                user = result.data()
                ended = true
            })
            while(!ended)
            {
                ended = false
            }
            return user            
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
    background-color: rgba(255, 255, 255, 0.788);
}
</style>