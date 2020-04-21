<template>
    <div id="app">
        <v-app class="LoginDiv" >
            <v-layout justify-center>
                <v-flex xs12 sm8 md4>
                    <div class="text-xs-center" v-if="submitted">
                        <h1>Welcome, {{name}} {{lastname}} </h1><br>
                        <h2 >¡Thank you for signin up to our forums!</h2>
                        <div class="details text-xs-left">
                            <br>
                            <p align:left><strong>Email:</strong> {{email}}</p>
                            <p><strong>Password:</strong> {{password}}</p>
                        </div>
                        <br><v-btn to="/forums">Go to Forums</v-btn>
                    </div> 
                    <v-card v-else-if="this.$route.path === '/signUp' && !submitted" class="elevation-12">
                        <v-toolbar color="primary" dark flat align-center>
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
                                <v-btn type="submit" outlined color="primary" @click="signUp" :disabled="!valid" >Submit <v-icon right>mdi-login-variant</v-icon></v-btn>
                            </v-spacer>
                        </v-card-actions>
                    </v-card>
                    <v-card v-else class="elevation-12">
                        <v-toolbar color="primary" dark flat align-center>
                            <v-spacer />
                                <v-toolbar-title class="toolbarTitle">
                                    Update Account
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
                                    text
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
                                <v-btn type="submit" outlined color="primary" @click="updateAccount(email, password)" :disabled="!valid" >Update Account <v-icon right>mdi-login-variant</v-icon></v-btn>
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
import { mapGetters } from "vuex";
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
            firebase.auth()
            .createUserWithEmailAndPassword(this.email, this.password).then(data => 
            {
                data.user.updateProfile(
                {
                    displayName: this.name + " " + this.lastname
                }).then(() => {});
            }).catch(err => {
            this.error = err.message;
            });
            this.submitted = true
        },
        updateAccount(email,password)
        {
            let user = firebase.auth().currentUser
            user.updateProfile(
            {
                displayName: this.name + " " + this.lastname
            }).then(function() 
            {
                console.log("profileupdated")
                this.user.updateEmail(email).then(function() 
                {
                    console.log("updatedemail")
                    this.user.updatePassword(password).then(function() 
                    {
                        console.log("updatedpassword")
                    }).catch(function() {
                    // An error happened.
                    });
                }).catch(function() {
                // An error happened.
                });
            }).catch(function() {
            // An error happened.
            });
        }
    },
      computed: {
        ...mapGetters({
        user: "user"
        })
      }
}
</script>

<style>
.LoginDiv{
    padding-top: 5%;
}
.toolbarTitle{
    font-size: 180%;
}
</style>