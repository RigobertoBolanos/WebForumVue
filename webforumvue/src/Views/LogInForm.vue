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
                            label="Username"
                            prepend-icon="mdi-account"
                            type="text"
                            :v-model="username"
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
export default {
    data(){
        return{
            username: "",
            password: "", 
            showpassword: false
        }
    },
    methods: {
        logIn(){    

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