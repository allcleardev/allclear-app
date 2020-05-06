export const isLoggedInHeaderLinks = [
  { name: 'Home', to: '/home' },
  { name: 'Find Tests', to: '/map' },
  { name: 'Tracing', to: '/contact-tracing' },
  { name: 'About Us', to: 'https://home.allclear.app/', isExternalURL: true },
  { name: 'Profile', to: '/profile' },
  { name: 'Logout', to: '/logout' },
];

export const isLoggedOutHeaderLinks = [
  { name: 'Find Tests', to: '/map', hideOnTabletSize: true },
  { name: 'About Us', to: 'https://home.allclear.app/', isExternalURL: true },
  { name: 'Login', to: '/sign-in' },
  // { name: 'Get Alerts', to: '/get-started' } // this gets added dynamically because its a button on desktop
];
