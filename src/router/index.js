import Vue from 'vue'
import VueRouter from 'vue-router'
import AI from '../AI.vue';
import Chat from '../Chat.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/ai',
        name: 'ai',
        component: AI
    },
    {
        path: '/chat',
        name: 'chat',
        component: Chat
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
