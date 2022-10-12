// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined,
    FolderOpenOutlined,
    ReadOutlined,
    PaperClipOutlined,
    DashboardOutlined
} from '@ant-design/icons';

// icons
const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
    FolderOpenOutlined,
    ReadOutlined,
    PaperClipOutlined,
    DashboardOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const testRouter = {
    id: 'test',
    title: 'test',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },

        {
            id: 'util-color',
            title: 'Policiy Sets',
            type: 'item',
            url: '/policysets',
            icon: icons.ReadOutlined
        },

        {
            id: 'util-typography',
            title: 'Reports',
            type: 'item',
            url: '/gcloud/reports',
            icon: icons.FolderOpenOutlined
        },
        {
            id: 'util-color',
            title: 'Org Policy Reports',
            type: 'item',
            url: '/gcloud/orgpoliciesreport',
            icon: icons.FolderOpenOutlined
        },
        {
            id: 'util-color',
            title: 'Inventory',
            type: 'item',
            url: '/gcloud/inventory',
            icon: icons.ReadOutlined
        },
        {
            id: 'util-color',
            title: 'Policies',
            type: 'item',
            url: '/gcloud/policies',
            icon: icons.ReadOutlined
        },
        {
            id: 'util-color',
            title: 'Org Policies',
            type: 'item',
            url: '/gcloud/orgpolicies',
            icon: icons.ReadOutlined
        },

        {
            id: 'util-typography',
            title: 'Reports',
            type: 'item',
            url: '/mazure/reports',
            icon: icons.FolderOpenOutlined
        },
        {
            id: 'util-typography',
            title: 'Azure Policies Reports',
            type: 'item',
            url: '/mazure/azurepoliciesreports',
            icon: icons.FolderOpenOutlined
        },
        {
            id: 'util-color',
            title: 'Inventory',
            type: 'item',
            url: '/mazure/inventory',
            icon: icons.ReadOutlined
        },
        {
            id: 'util-color',
            title: 'Policies',
            type: 'item',
            url: '/mazure/policies'
        },
        {
            id: 'util-color',
            title: 'Azure Policies',
            type: 'item',
            url: '/mazure/azurepolicies',
            icon: icons.ReadOutlined
        },
        {
            id: 'util-color',
            title: 'Settings',
            type: 'item',
            url: '/Settings',
            icon: icons.ReadOutlined
        }
    ]
};

export default testRouter;
