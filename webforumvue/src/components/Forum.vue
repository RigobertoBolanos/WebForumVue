<template>
    <div>
        Forum
    </div>
</template>

<script>
import entry from './Entry'

export default {
    data(){
        return{
            title: "",
            creation_date: "",
            creator: "",
            entries: [],
            subject: ""
        }
    },
    components:{
        entry
    }
}
</script>

<style scoped>

</style>