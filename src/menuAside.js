import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiReact,
} from '@mdi/js'

export default [
  {
    to: '/dashboard',
    icon: mdiMonitor,
    label: 'dashboard',
  },
  {
    to: '/tables',
    label: 'tables',
    icon: mdiTable,
  },
  {
    to: '/forms',
    label: 'forms',
    icon: mdiSquareEditOutline,
  },
  {
    to: '/brands',
    label: 'brands',
    icon: mdiTable,
  },
  {
    to: '/driver-cards',
    label: 'driverCards',
    icon: mdiTable,
  },
  {
    to: '/facilities',
    label: 'facilities',
    icon: mdiTable,
  },
  {
    to: '/drivers',
    label: 'drivers',
    icon: mdiTable,
  },
  {
    to: '/vehicles',
    label: 'vehicles',
    icon: mdiTable,
  },
  {
    to: '/ui',
    label: 'ui',
    icon: mdiTelevisionGuide,
  },
  {
    to: '/responsive',
    label: 'responsive',
    icon: mdiResponsive,
  },
  {
    to: '/',
    label: 'styles',
    icon: mdiPalette,
  },
  {
    to: '/profile',
    label: 'profile',
    icon: mdiAccountCircle,
  },
  {
    to: '/login',
    label: 'login',
    icon: mdiLock,
  },
  {
    to: '/error',
    label: 'error',
    icon: mdiAlertCircle,
  },
  {
    label: 'dropdown',
    icon: mdiViewList,
    menu: [
      {
        label: 'itemOne',
      },
      {
        label: 'itemTwo',
      },
    ],
  },
  {
    href: 'https://github.com/justboil/admin-one-vue-tailwind',
    label: 'github',
    icon: mdiGithub,
    target: '_blank',
  },
  {
    href: 'https://github.com/justboil/admin-one-react-tailwind',
    label: 'reactVersion',
    icon: mdiReact,
    target: '_blank',
  },
]
