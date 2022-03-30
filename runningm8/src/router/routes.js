export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/workout/:id?',
    name: 'Workout',
    component: () => import('../views/Workout.vue'),
    props: true
  },
  {
    path: '/schemas',
    name: 'Schemas',
    component: () => import('../views/Schemas.vue')
  },
  {
    path: '/schemas/editSchema/:SchemaId?',
    name: 'EditSchema',
    component: () => import('../views/EditSchema'),
    props: true
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/PageNotFound')
  }
]
