const Routes = [
  {
    url: '/',
    exact: true,
  },
  {
    url: '/about',
    exact: false,
  },
  {
    url: '*',
    exact: true,
  }
];

export const MenuLinks = [
  {
    url: '/',
    menuText: 'Home'
  },
  {
    url: '/about',
    menuText: 'About'
  }
];

export default Routes;