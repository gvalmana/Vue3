import HomePage from "@/modules/landing/pages/HomePage.vue";
import PricingPage from "@/modules/landing/pages/PricingPage.vue";
import ContactPage from "@/modules/landing/pages/ContactPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import LandingLayout from "@/modules/landing/layouts/LandingLayout.vue";
import NotFound404 from "@/modules/common/pages/NotFound404.vue";

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/', component: LandingLayout, name: 'landing',
            children: [
                {
                    path: '/', component: HomePage, name: 'home',
                },
                {
                    path: 'features', component: () => import('@/modules/landing/pages/FeaturesPage.vue'), name: 'features',
                },
                {
                    path: 'pricing', component: () => import('@/modules/landing/pages/PricingPage.vue'), name: 'pricing',
                },
                {
                    path: 'contact', component: () => import('@/modules/landing/pages/ContactPage.vue'), name: 'contact',
                },
                {
                    path: 'pokemon/:id', component: () => import('@/modules/pokemons/pages/PokemonPage.vue'), name: 'pokemon', props: true,
                }
            ]
        },
        // Auth
        {
            path: '/auth', component: () => import('@/modules/auth/layouts/AuthLayout.vue'), name: 'auth',
            redirect: { name: 'login' },
            children: [
                {
                    path: 'login', component: () => import('@/modules/auth/pages/LoginPage.vue'), name: 'login',
                },
                {
                    path: 'register', component: () => import('@/modules/auth/pages/RegisterPage.vue'), name: 'register',
                },
            ]
        },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound404 },
    ],
});

export default router;