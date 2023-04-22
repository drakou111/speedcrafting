

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/HomeView.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../components/SettingsView.vue')
  }
]

export default routes
