import HomePage from "@/modules/landing/pages/HomePage.vue";
import PricingPage from "@/modules/landing/pages/PricingPage.vue";
import ContactPage from "@/modules/landing/pages/ContactPage.vue";
import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/', component: HomePage, name: 'home',
        },
        {
            path: '/features', component: () => import('@/modules/landing/pages/FeaturesPage.vue'), name: 'features',
        },
        {
            path: '/pricing', component: () => import('@/modules/landing/pages/PricingPage.vue'), name: 'pricing',
        },
        {
            path: '/contact', component: () => import('@/modules/landing/pages/ContactPage.vue'), name: 'contact',
        },
    ],
});

export default router;