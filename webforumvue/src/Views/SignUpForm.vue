<template>
    <div id="app">
        <div class="text-xs-center" v-if="submitted">
                <h2>Thank you for signing to our forums</h2>
                <div class="details text-xs-left">
                    <h3 class="blue-grey--text">User details</h3>
                    <p><strong>Name:</strong> {{name}}</p>
                    <p><strong>Lastname:</strong> {{lastname}}</p>
                    <p><strong>Email:</strong> {{email}}</p>
                    <p><strong>Password:</strong> {{password}}</p>
                </div>
                <br><v-btn to="/">Go to homepage</v-btn>
            </div>        
        <v-app class="LoginDiv" v-else>
                <v-layout
                justify-center
                >
                <v-flex
                    xs12
                    sm8
                    md4
                >
                    <v-card class="elevation-12">
                    <v-toolbar
                        color="primary"
                        dark
                        flat
                        align-center
                    >
                    <v-spacer />
                        <v-toolbar-title class="toolbarTitle">
                            Sign Up
                        </v-toolbar-title>
                    <v-spacer />  
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid">
                        <v-text-field
                            label="Name"
                            required
                            :rules="nameRules"
                            v-model="name"
                            prepend-icon="mdi-account-circle"
                            type="text"
                        ></v-text-field>
                        <v-text-field
                            label="Lastname"
                            required
                            :rules="lastnameRules"
                            v-model="lastname"
                            prepend-icon="mdi-account-circle"
                            type="text"
                        ></v-text-field>
                        <v-text-field
                            label="Email"
                            required
                            :rules="emailRules"
                            v-model="email"
                            prepend-icon="mdi-email"
                            type="email"
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showpassword ? 'text' : 'password'"
                            :rules="passwordRules"
                            label="Password"
                            @click:append="showpassword = !showpassword"
                            prepend-icon="mdi-lock"
                        ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer>
                        <v-btn outlined color="primary" @click="signUp" :disabled="!valid" >Submit <v-icon right>mdi-login-variant</v-icon></v-btn>
                        </v-spacer>
                    </v-card-actions>
                    </v-card>
                </v-flex>
                </v-layout>
        </v-app>
    </div>
</template>


<script>
import firebase from '../config/firebase'
export default {
    data(){
        return{
            db: firebase.firestore(),
            name: "",
            lastname: "",
            email: "",
            password: "",
            submitted: false,
            valid: true,
            showpassword: false,
            nameRules: 
            [
                name => !!name || "Name is required",
                name => name.length > 3 || "Name must be longer than 3 characters"
            ],
            lastnameRules: 
            [
                lastname => !!lastname || "Lastname is required",
                lastname => lastname.length > 3 || "Name must be longer than 3 characters"
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
            let ids = [] 
            this.db.collection("users").get().then((result) => {
                    result.forEach(user => {
                        //ids.push(user.data().id)
                        alert(user.data().id + "")
                        alert(typeof(user.data().id))
                    });
                })
            alert(ids[0] + "Que es esta verga")
            let newId = ids.sort(function(a,b){return parseInt(b.id,10)-parseInt(a.id,10)})[0] + 1
            
            this.db.collection("users").doc(newId).set({
                id: newId + "",
                name: this.name,
                lastname: this.name,
                email: this.email,
                password: this.password,
                active: true,
                valid_until: Date.now() + 1000*60*60*24*365
            })
            this.submitted = true
        }
    }
}
</script>

<style>
.LoginDiv{
    padding-top: 5%;
}
</style>