export const IS_LOGGED_IN_HEADER_LINKS = [
  { name: 'Home', to: '/home' },
  { name: 'Find Tests', to: '/map' },
  { name: 'Tracing', to: '/contact-tracing' },
  { name: 'About Us', to: 'https://home.allclear.app', isExternalURL: true },
  { name: 'Profile', to: '/profile' },
  { name: 'Logout', to: '/logout' },
];

export const IS_LOGGED_OUT_HEADER_LINKS = [
  { name: 'Find Tests', to: '/map', hideOnTabletSize: true },
  { name: 'About Us', to: 'https://home.allclear.app', isExternalURL: true },
  { name: 'Login', to: '/sign-in' },
];
