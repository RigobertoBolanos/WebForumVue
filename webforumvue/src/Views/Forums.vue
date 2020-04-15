<template>
    <div class="forums">
        <v-data-table
        :headers="headers"
        :items="desserts"
        item-key="name"
        class="elevation-1"
        :search="search"
        :custom-filter="filterOnlyCapsText"
        >
        <template v-slot:top>
            <v-text-field v-model="search" label="Search (UPPER CASE ONLY)" class="mx-4"></v-text-field>
        </template>
        </v-data-table>
    </div>
    <!-- <v-card class="forums">
        <v-simple-table dark>
        <template v-slot:default>
            <thead>
            <tr>
                <th class="text-left">Title</th>
                <th class="text-left">Subject</th>
                <th class="text-left">Creator</th>
                <th class="text-left">Creation Date</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="forum in forums" :key="forum.id">
                <td>{{ forum.title }}</td>
                <td>{{ forum.subject }}</td>
                <td>{{ forum.creator }}</td>
                <td>{{ forum.creation_date }}</td>
            </tr>
            </tbody>
        </template>
        </v-simple-table>
    </v-card> -->
</template>

<script>
import firebase from '../config/firebase'
export default {
    data(){
        return{
            db: firebase.firestore(),
            forums: [],
            search: '',
        calories: '',
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      
        }
    },
    computed: {
      headers () {
        return [
          {
            text: 'Title',
            sortable: true,
            value: 'name',
          },
          {
            text: 'Subject',
            sortable: true,
            value: 'calories'
          },
          {
            text: 'Creator',
            sortable: true,
            value: 'fat',
          },
          {
            text: 'Creation Date',
            sortable: true,
            value: 'protein',
          }
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
            this.db.collection("forums").get().then((result) => {
                    result.forEach(forum => {
                        this.forums.push(forum.data())
                    });
                })
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