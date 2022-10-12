import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page

const Policysets = Loadable(lazy(() => import('pages/components-overview/Policysets')));

const GReports = Loadable(lazy(() => import('pages/components-overview/gcloud/Reports')));
const GOrgpoliciesreports = Loadable(lazy(() => import('pages/components-overview/gcloud/Orgpoliciesreports')));
const GInventory = Loadable(lazy(() => import('pages/components-overview/gcloud/Inventory')));
const GPolicies = Loadable(lazy(() => import('pages/components-overview/gcloud/Policies')));
const GOrgpolicies = Loadable(lazy(() => import('pages/components-overview/gcloud/Orgpolicies')));

const MReports = Loadable(lazy(() => import('pages/components-overview/mazure/Reports')));
const MAzurepoliciesreports = Loadable(lazy(() => import('pages/components-overview/mazure/Azurepoliciesreports')));
const MInventory = Loadable(lazy(() => import('pages/components-overview/mazure/Inventory')));
const MPolicies = Loadable(lazy(() => import('pages/components-overview/mazure/Policies')));
const MAzurepolicies = Loadable(lazy(() => import('pages/components-overview/mazure/Azurepolicies')));

const Settings = Loadable(lazy(() => import('pages/components-overview/Settings')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'policysets',
            element: <Policysets />
        },
        {
            path: 'gcloud',
            children: [
                {
                    path: 'reports',
                    element: <GReports />
                },
                {
                    path: 'orgpoliciesreport',
                    element: <GOrgpoliciesreports />
                },
                {
                    path: 'inventory',
                    element: <GInventory />
                },
                {
                    path: 'policies',
                    element: <GPolicies />
                },
                {
                    path: 'orgpolicies',
                    element: <GOrgpolicies />
                }
            ]
        },
        {
            path: 'mazure',
            children: [
                {
                    path: 'reports',
                    element: <MReports />
                },
                {
                    path: 'azurepoliciesreports',
                    element: <MAzurepoliciesreports />
                },
                {
                    path: 'inventory',
                    element: <MInventory />
                },
                {
                    path: 'policies',
                    element: <MPolicies />
                },
                {
                    path: 'azurepolicies',
                    element: <MAzurepolicies />
                }
            ]
        },
        {
            path: '/aws',
            children: []
        },
        {
            path: 'settings',
            element: <Settings />
        }
    ]
};

export default MainRoutes;
