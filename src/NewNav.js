import SimpleBar from 'components/third-party/SimpleBar';
import { Navigation } from 'react-minimal-side-navigation';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from 'awesome-react-icons';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
// ==============================|| DRAWER CONTENT ||============================== //
import {
    BarsOutlined,
    UserOutlined,
    TeamOutlined,
    SnippetsOutlined,
    ContainerOutlined,
    BookOutlined,
    ProfileOutlined,
    SettingOutlined
} from '@ant-design/icons';

import gcloud from 'assets/images/gcloud.png';
import mazure from 'assets/images/mazure.png';
import aws from 'assets/images/aws.png';

const NewNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const locationName = location.pathname;

    return (
        <Navigation
            activeItemId={locationName}
            // you can use your own router's api to get pathname
            onSelect={({ itemId }) => {
                // maybe push to the route
                if (itemId != '/gcloud' && itemId != '/mazure' && itemId != '/aws' && itemId != '/settings') {
                    navigate(itemId);
                }
            }}
            items={[
                {
                    title: 'Dashboard',
                    itemId: '/dashboard/default',
                    // you can use your own custom Icon component as well
                    // icon is optional
                    elemBefore: () => <Icon name="inbox" />
                },
                {
                    title: 'Policy Sets',
                    itemId: '/policysets',
                    elemBefore: () => <BarsOutlined style={{ fontSize: 20 }} />
                },
                {
                    title: 'Google Cloud',
                    itemId: '/gcloud',
                    elemBefore: () => <img src={gcloud} style={{ width: 50, height: 30, marginLeft: -14, marginRight: -16 }} alt="" />,

                    subNav: [
                        {
                            title: 'Reports',
                            itemId: '/gcloud/reports',
                            elemBefore: () => <SnippetsOutlined />
                        },
                        {
                            title: 'Org Policies Reports',
                            itemId: '/gcloud/orgpoliciesreport',
                            elemBefore: () => <SnippetsOutlined />
                        },
                        {
                            title: 'Inventory',
                            itemId: '/gcloud/inventory',
                            elemBefore: () => <ContainerOutlined />
                        },
                        {
                            title: 'Policies',
                            itemId: '/gcloud/policies',
                            elemBefore: () => <BookOutlined />
                        },
                        {
                            title: 'Org Policies',
                            itemId: '/gcloud/orgpolicies',
                            elemBefore: () => <ProfileOutlined />
                        }
                    ]
                },
                {
                    title: 'Microsoft Azure',
                    elemBefore: () => <img src={mazure} style={{ width: 20, height: 20, marginLeft: 1, marginRight: -1 }} alt="" />,
                    itemId: '/mazure',
                    subNav: [
                        {
                            title: 'Reports',
                            itemId: '/mazure/reports',
                            elemBefore: () => <SnippetsOutlined />
                        },
                        {
                            title: 'Inventory',
                            itemId: '/mazure/inventory',
                            elemBefore: () => <ContainerOutlined />
                        },
                        {
                            title: 'Policies',
                            itemId: '/mazure/policies',
                            elemBefore: () => <BookOutlined />
                        }
                    ]
                },
                {
                    title: 'Amazon AWS',
                    elemBefore: () => <img src={aws} style={{ width: 22, height: 15, marginLeft: 2, marginRight: -4 }} alt="" />,
                    itemId: '/aws',
                    subNav: []
                },
                {
                    title: 'Settings',
                    itemId: '/settings',
                    elemBefore: () => <SettingOutlined />
                }
            ]}
        />
    );
};

export default NewNav;
