<template>
    <div class="form-wrapper">
        <div class="text-xs-center" v-if="submitted">
            <h2>Thank you for signing to our forums</h2>
            <div class="details text-xs-left">
                <h3 class="blue-grey--text">User details</h3>
                <p><strong>Name:</strong> {{name}}</p>
                <p><strong>Lastname:</strong> {{lastname}}</p>
                <p><strong>Email:</strong> {{email}}</p>
                <p><strong>Password:</strong> {{password}}</p>
            </div>
            <v-btn to="/">Go to homepage</v-btn>
        </div>
        <v-form v-else v-model="valid">
            <v-text-field
                label="Name"
                required
                :rules="nameRules"
                v-model="name"
            ></v-text-field>
            <v-text-field
                label="Lastname"
                required
                :rules="lastnameRules"
                v-model="lastname"
            ></v-text-field>
            <v-text-field
                label="Email"
                required
                :rules="emailRules"
                v-model="email"
            ></v-text-field>
            <v-text-field
                :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="showpassword ? 'text' : 'password'"
                label="Password"
                @click:append="showpassword = !showpassword"
            ></v-text-field>
            <v-btn @click="signUp" :disabled="!valid">Sign Up</v-btn>
        </v-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name: "",
            lastname: "",
            email: "",
            password: "",
            confirmpassword: "",
            submitted: false,
            valid: true,
            showpassword: false,
            nameRules: 
            [
                name => !!name || "Name is required",
                name => name.length > 4 || "Name must be longer than 4 characters"
            ],
            lastnameRules: 
            [
                lastname => !!lastname || "Lastname is required",
                lastname => lastname.length > 4 || "Name must be longer than 4 characters"
            ],
            emailRules: 
            [
                email => !!email || "Email is required",
                email => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) || "Email must be valid"
            ],
            passwordRules:
            [
                password => !!password || "Password is required",
                password => /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(password) || "The password must contain at least 8 and no more than 16 characters, at least one digit, at least one lower case and at least one upper case.\nIt can NOT have any other symbol."
            ]
        }
    },
    methods: {
        signUp(){
            this.submitted = true
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