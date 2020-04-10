<template>
    <v-card class="forums">
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
    </v-card>
</template>

<script>
import firebase from '../config/firebase'
export default {
    data(){
        return{
            db: firebase.firestore(),
            forums: []
        }
    },
    methods:{
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
    padding:3%;
    margin: 3%;
    background-color: rgba(255, 255, 255, 0.788);
}
</style>