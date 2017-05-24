import Overview from './routes/Overview'
import Update from './routes/Update'
import Stats from './routes/Stats'

export const routes = [
  { path: '/', component: Overview },
  { path: '/update', component: Update },
  { path: '/stats', component: Stats }
]
