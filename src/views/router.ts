import { createRouter, createWebHistory, NavigationGuard, RouteRecordRaw } from 'vue-router';
import { useEthereumStore } from '~/stores/ethereum.store';

const routes: RouteRecordRaw[] = [
  {
    name: 'Layout',
    path: '/',
    component: () => import('~views/layout/index.vue'),
    children: [
      {
        name: 'Wallet',
        path: '',
        component: () => import('~views/pages/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

export { routes };

export const routerInstance = createRouter({
  routes,
  history: createWebHistory(),
});

const beforeEach: NavigationGuard = async (to, from, next) => {
  next();
};

routerInstance.beforeEach(beforeEach);
