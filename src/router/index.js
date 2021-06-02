import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Doc from '../views/Doc.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Notes from '../views/Notes.vue';
import NewNote from '../views/New-Note.vue';
import Edition from '../views/Edition.vue';
import store from '../store';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/doc',
    name: 'Doc',
    component: Doc
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes,
    meta: { requireAuth: true },
  },
  {
    path: '/new-note',
    name: 'New-Note',
    component: NewNote,
    meta: { requireAuth: true },
  },
  {
    path: '/edit/:id',
    name: 'Edition',
    component: Edition,
    props: true,
    meta: { requireAuth: true },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const protectedRoute = to.matched.some(record => record.meta.requireAuth);

  protectedRoute && store.state.token === ''
    ? next({ name: 'Home' })
    : next();
});

export default router;

// PARA EVITAR EL ERROR «NavigationDuplicated: Avoided redundant navigation to current location: "/notes".» HAY DOS SOLUCIONES:
// (1) https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
// (1) https://www.programmersought.com/article/53746573777/

// (2) https://stackoverflow.com/questions/57837758/navigationduplicated-navigating-to-current-location-search-is-not-allowed#63263736

// HE OPTADO POR LA PRIMERA, AUNQUE AMBAS SON VALIDAS
