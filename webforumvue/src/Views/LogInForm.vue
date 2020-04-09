<template>
    <div class="form-wrapper">
        <v-form v-model="valid">
            <v-text-field
                label="Email"
                required
                :rules="emailRules"
                v-model="email"
            ></v-text-field>
            <v-text-field
                label="Password"
                type="password"
                required
                v-model="password"
            ></v-text-field>
            <v-btn @click="logIn" :disabled="!valid">Log In</v-btn>
        </v-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name: "",
            email: "",
            valid: true,
            emailRules: 
            [
                email => !!email || "Email is required",
                email => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) || "Email must be valid"
            ]
        }
    },
    methods: {
        signUp(){    
                 
        }
    }
}
</script>

<style scoped>
.form-wrapper{
    padding: 40px;
    text-align: center;
}

.details{
    padding-top: 30px;
}

h3{
    padding-bottom: 20px;
}
</style>