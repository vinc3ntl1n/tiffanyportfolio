import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/Layout/Layout.vue'
import Home from '../pages/Home/Home.vue'
import Portfolio from '../pages/Portfolio/Portfolio.vue'
import PortfolioDetail from '../pages/PortfolioDetail/PortfolioDetail.vue'
import Connect from '../pages/Connect/Connect.vue'

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            { path: '', component: Home },
            { path: 'portfolio', component: Portfolio },
            { path: 'portfolio/:category', component: PortfolioDetail },
            { path: 'connect', component: Connect },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
