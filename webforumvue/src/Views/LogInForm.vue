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
                v-model="password"
                :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showpassword ? 'text' : 'password'"
                label="Password"
                @click:append="showpassword = !showpassword"
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
            password: "",
            valid: true,
            showpassword: false,
            emailRules:
            [
                email => !!email || "Email is required",
                email => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) || "Email must be valid"
            ]
        }
    },
    methods: {
        logIn(){    

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