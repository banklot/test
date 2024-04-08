import {createRouter, createWebHashHistory} from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard/Dashboard.vue')
                },
                {
                    path: '/fondos',
                    name: 'money',
                    component: () => import('@/views/Money/MoneyView.vue')
                },
                {
                    path: '/loteria',
                    name: 'lottery',
                    component: () => import('../views/Games/Lottery/LotteryView.vue'),
                    props: true
                },
                {
                    path: '/animalitos',
                    name: 'animalitos',
                    component: () => import('@/views/Games/Animalitos/AnimalitosView.vue'),
                    props: true
                },
                {
                    path: '/perfil',
                    name: 'profile',
                    component: () => import('@/views/Profile/ProfileView.vue')
                },
                {
                    path: '/ganancias',
                    name: 'gains',
                    component: () => import('@/views/Funds/FundsView.vue')
                },
                {

                    path: '/resultados',
                    name: 'results',
                    component: () => import('@/views/Results/ResultsView.vue')
                },
                {
                    path: '/preguntas',
                    name: 'questions',
                    component: () => import('@/views/Help/QuestionsView.vue')
                },
                {
                    path: '/terminos_y_condiciones',
                    name: 'termcond',
                    component: () => import('@/views/Help/TermcondView.vue')
                },
                {
                    path: '/politicas',
                    name: 'policy',
                    component: () => import('@/views/Help/PolicyView.vue')
                },
                {
                    path: '/contacto',
                    name: 'contact',
                    component: () => import('@/views/Help/ContactView.vue')
                },
                {
                    path: '/historial',
                    name: 'history',
                    redirect: {
                        name: 'history.games'
                    },
                    component: () => import('@/views/Ticket/TicketsView.vue'),
                    children: [
                        {
                            path: 'juegos',
                            name: 'history.games',
                            component: () => import('@/views/Ticket/components/TicketTab.vue')
                        },
                        {
                            path: 'fondos',
                            name: 'history.funds',
                            component: () => import('@/views/Ticket/components/TransactionTab.vue')
                        }
                    ]
                },
                {
                    path: '/tbd',
                    name: 'tbd',
                    component: () => import('@/views/TBD.vue')
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login/LoginView.vue')
        },
        {
            path: '/registro',
            name: 'register',
            component: () => import('@/views/Register/RegisterView.vue')
        }

    ]
});

// router.beforeEach((to, from, next) => {
//     const authRequired = !publicPages.includes(to.path);
//     const session: Session = ganador.session;
//     const csrfToken = session.getToken();
//     const ssoInfo = session.getSSOInfo();
//
//     if (authRequired && !csrfToken) {
//         next('/login');
//     } else if (csrfToken && to.path === '/login' && csrfToken.length !== null) {
//         next('/');
//     } else {
//         if (ssoInfo && to.path === '/login') {
//             next('/registro');
//         } else {
//             next();
//         }
//     }
// });

// router.afterEach((to, from, failure) => {
//     if (!failure) {
//         console.log(to.fullPath)
//     }
// })

export default router;
