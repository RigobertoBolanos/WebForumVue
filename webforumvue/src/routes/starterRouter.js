import Vue from 'vue';
import Router from 'vue-router'
import Users from '../Views/Users.vue'
import Forums from '../Views/Forums.vue'
import Forum from '../components/Forum.vue'
import LogInForm from '../Views/LogInForm.vue'
import SignUpForm from '../Views/SignUpForm.vue'


Vue.use(Router);

export default new Router({
  mode : 'history',
  routes: [
    {path: "/users", name: 'users', component: Users},
    {path: "/", redirect: "/forums"},
    {path: "/forums", name: 'forums', component: Forums},
    {path: "/forums/:id", name: 'forum', component: Forum},
    {path: "/logIn", name: 'logIn', component: LogInForm},
    {path: "/signUp", name: 'signUp', component: SignUpForm}
  ],
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});
