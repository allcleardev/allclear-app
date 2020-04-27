export const isLoggedInHeaderLinks = [
  { name: 'Home', to: '/home' },
  { name: 'Map', to: '/map' },
  { name: 'Tracing', to: '/contact-tracing' },
  { name: 'About Us', to: 'https://home.allclear.app/', isExternalLink: true },
  { name: 'Profile', to: '/profile' },
  { name: 'Logout', to: '/logout' }
];

export const isLoggedOutHeaderLinks = [
  { name: 'Map', to: '/map', hideOnTabletSize: true },
  { name: 'About Us', to: 'https://home.allclear.app/', isExternalLink: true },
  { name: 'Login', to: '/sign-in' },
  { name: 'Create an Account', to: '/get-started' }
];