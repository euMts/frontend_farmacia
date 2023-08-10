import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: <TrendingUpIcon />,
  },
  {
    title: 'Vendas / Estoque',
    path: '/vendasestoque',
    icon: <TrackChangesIcon />,
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
