import {
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiCrop,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiThemeLightDark,
  mdiGithub,
  mdiReact,
} from '@mdi/js'

export default [
  {
    icon: mdiMenu,
    label: 'sampleMenu',
    menu: [
      {
        icon: mdiClockOutline,
        label: 'itemOne',
      },
      {
        icon: mdiCloud,
        label: 'itemTwo',
      },
      {
        isDivider: true,
      },
      {
        icon: mdiCrop,
        label: 'itemLast',
      },
    ],
  },
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'myProfile',
        to: '/profile',
      },
      {
        icon: mdiCogOutline,
        label: 'settings',
      },
      {
        icon: mdiEmail,
        label: 'messages',
      },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: 'logOut',
        isLogout: true,
      },
    ],
  },
  {
    icon: mdiThemeLightDark,
    label: 'lightDark',
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
  {
    icon: mdiGithub,
    label: 'github',
    isDesktopNoLabel: true,
    href: 'https://github.com/justboil/admin-one-vue-tailwind',
    target: '_blank',
  },
  {
    icon: mdiReact,
    label: 'reactVersion',
    isDesktopNoLabel: true,
    href: 'https://github.com/justboil/admin-one-react-tailwind',
    target: '_blank',
  },
  {
    icon: mdiLogout,
    label: 'logOut',
    isDesktopNoLabel: true,
    isLogout: true,
  },
]
