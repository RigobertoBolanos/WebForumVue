<template>
    <div id="app">
        <v-app class="LoginDiv">
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
                            Login
                        </v-toolbar-title>
                    <v-spacer />  
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                        <v-text-field
                            label="Email"
                            prepend-icon="mdi-account"
                            type="text"
                            :v-model="email"
                        ></v-text-field>

                        <v-text-field
                            v-model="password"
                            :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showpassword ? 'text' : 'password'"
                            label="Password"
                            @click:append="showpassword = !showpassword"
                            prepend-icon="mdi-lock"
                        ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer>
                        <v-btn outlined color="primary"  @click="logIn"><v-icon>mdi-login-variant</v-icon></v-btn>
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
            email: "",
            password: "", 
            showpassword: false
        }
    },
    methods: {
        logIn()
        {    
            this.db.collection("users").where("email", "==", this.email).get().then((user) => 
            {
                console.log(user)
                if(user.password === this.password)
                {
                    this.db.collection("users").doc(user.data().id).set(
                    {
                        active: true,
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
#app{
    margin-top: 2px;
}
.toolbarTitle{
    font-size: 180%;
}
.LoginDiv{
    padding-top: 10%;
}
</style>