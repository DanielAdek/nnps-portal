import DashboardIcon from '../assets/icons/dashboard.svg';
import PosIcon from '../assets/icons/icons-pos.png';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: PosIcon,
        path: '/bulk-mapping',
        title: 'Bulk Map Terminals',
    },
    {
        id: 3,
        icon: PosIcon,
        path: '/single-mapping',
        title: 'Map Single Terminal',
    },
    {
        id: 4,
        icon: PosIcon,
        path: '/terminal',
        title: 'Terminal',
    }
]

export default sidebar_menu;