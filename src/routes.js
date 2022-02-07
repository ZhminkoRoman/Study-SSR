// import Home from '../client/pages/Home';
// import About from '../client/pages/About';
// import Chat from '../client/pages/Chat';
// import NotFound from '../client/pages/NotFound';

const PageRoutes = [
  {
    url: '/',
    exact: true,
  },
  {
    url: '/about',
    exact: false,
  },
  {
    url: '/chat',
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

export default PageRoutes;