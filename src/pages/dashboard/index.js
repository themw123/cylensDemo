/* eslint-disable  */
import { useState } from 'react';

// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography,
    Chip
} from '@mui/material';

// project import
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

import gcloud from '../../assets/images/gcloud2.png';
import mazure from '../../assets/images/mazure.png';
import aws from '../../assets/images/aws.png';

import WarningIcon from '@mui/icons-material/Warning';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';
import TableDyn from '../components-overview/TableDyn';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import * as util from '../../backend/util';
import CircularProgress from '@mui/material/CircularProgress';

// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};

// sales report status
const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const [value, setValue] = useState('today');
    const [slot, setSlot] = useState('week');

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
                sx={{
                    width: '100%',
                    marginTop: 5,
                    paddingLeft: {
                        lg: '0px',
                        xs: '22px'
                    }
                }}
            >
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <MainCard contentSX={{ p: 2.25 }}>
                        <Stack spacing={0.5} alignItems="center">
                            <div>
                                <img style={{ width: 35, height: 30 }} src={gcloud} alt="" />
                            </div>
                            <Typography variant="h5" color="textSecondary">
                                Google Cloud
                            </Typography>
                            <div style={{ display: 'flex', gap: 20 }}>
                                <div style={{ display: 'flex', gap: 5 }}>
                                    <WarningIcon style={{ color: 'red' }} />
                                    <Typography variant="h4" color="inherit">
                                        15
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', gap: 5 }}>
                                    <CheckIcon style={{ color: 'green', fontSize: '25' }} />
                                    <Typography variant="h4" color="inherit">
                                        6
                                    </Typography>
                                </div>
                            </div>
                        </Stack>
                    </MainCard>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <MainCard contentSX={{ p: 2.25 }}>
                        <Stack spacing={0.5} alignItems="center">
                            <div>
                                <img style={{ width: 35, height: 30 }} src={mazure} alt="" />
                            </div>
                            <Typography variant="h5" color="textSecondary">
                                Microsoft Azure
                            </Typography>
                            <div style={{ display: 'flex', gap: 20 }}>
                                <div style={{ display: 'flex', gap: 5 }}>
                                    <WarningIcon style={{ color: 'red' }} />
                                    <Typography variant="h4" color="inherit">
                                        1
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', gap: 5 }}>
                                    <CheckIcon style={{ color: 'green', fontSize: '25' }} />
                                    <Typography variant="h4" color="inherit">
                                        2
                                    </Typography>
                                </div>
                            </div>
                        </Stack>
                    </MainCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <MainCard contentSX={{ p: 2.25 }}>
                        <Stack spacing={0.5} alignItems="center">
                            <div>
                                <img style={{ width: 35, height: 30 }} src={aws} alt="" />
                            </div>
                            <Typography variant="h5" color="textSecondary">
                                Amazon AWS
                            </Typography>
                            <div style={{ display: 'flex', gap: 20 }}>
                                <div style={{ display: 'flex', gap: 5 }}>
                                    <WarningIcon style={{ color: 'red' }} />
                                    <Typography variant="h4" color="inherit">
                                        -
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', gap: 5 }}>
                                    <CheckIcon style={{ color: 'green', fontSize: '25' }} />
                                    <Typography variant="h4" color="inherit">
                                        -
                                    </Typography>
                                </div>
                            </div>
                        </Stack>
                    </MainCard>
                </Grid>
            </Stack>

            <Grid item md={1} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* row 2 */}

            <div style={{ marginTop: '2rem', width: "inherit", marginLeft: "1rem" }}>
                <Reports />
            </div>
            {/* row 3 */}

            {/* row 4 */}
        </Grid >
    );
};

export default DashboardDefault;

const Reports = () => {
    const [refreshChild, doRefreshChild] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const toggleChildRefresh = () => {
        setLoading(true);
        util.gcp_refresh().then(() => {
            doRefreshChild((prevState) => !prevState);
            setLoading(false)
        })
    };
    const columns = [
        {
            name: 'Resource Type'
        },
        {
            name: 'Resource Name'
        },
        {
            name: 'Project ID'
        },
        {
            name: 'Policy Name'
        },
        {
            name: 'Status'
        }
    ];

    const options = {
        filter: true,
        rowHover: true,
        selectableRows: 'multiple',
        selectableRowsHideCheckboxes: true,
        selectableRowsOnClick: true,
        filterType: 'dropdown',
        responsive: 'scrollFullHeight',
        rowsPerPage: 10,
        expandableRows: true,
        page: 0,
        sortOrder: {
            name: 'ID',
            direction: 'desc'
        },
        downloadOptions: {
            filename: 'Report.csv',
            filterOptions: {
                useDisplayedColumnsOnly: true,
                useDisplayedRowsOnly: true
            }
        },
        textLabels: {
            body: {
                noMatch: isLoading ? <CircularProgress /> : 'Sorry, there is no matching data to display'
            }
        },
        renderExpandableRow: (rowData, rowMeta) => {
            return <ExpandableRow rowData={rowData} rowMeta={rowMeta} />;
        }
    };

    const ExpandableRow = ({ rowData, rowMeta }) => {
        const [result, setData] = useState(undefined);

        useEffect(() => {
            util.complete_result()
                .then((results) =>
                    results.find((result) => result.policy.raw.metadata.name === rowData[3] && result.resource.raw.name === rowData[1])
                )
                .then((result) => setData(result));
        }, []);

        if (result === undefined) {
            return <></>;
        }
        return (
            <React.Fragment>
                <tr>
                    <td colSpan={6}>
                        <TableContainer component={Paper}>
                            <Table style={{ minWidth: '650' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Policy Check</TableCell>
                                        <TableCell align="left">Resource Entry</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <pre>{JSON.stringify({
                                                rules: result.policy.raw.spec.rules,
                                                filter: result.policy.raw.spec.filter,
                                            }, null, 2)}</pre>
                                        </TableCell>
                                        <TableCell align="left">
                                            <pre>
                                                {JSON.stringify(
                                                    field_from_path(result.resource.raw, result.policy.raw.spec.rules[0].path),
                                                    null,
                                                    2
                                                )}
                                            </pre>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </td>
                </tr>
            </React.Fragment>
        );
    };

    function field_from_path(obj, path) {
        try {
            return path.split('.').reduce((acc, prop) => acc[uppercamel_to_snake(prop)], obj);
        } catch (e) {
            return '';
        }
    }

    function uppercamel_to_snake(name) {
        return name.split('').reduce((acc, c) => {
            const cc = c.charCodeAt(0);
            if (0x41 <= cc && cc <= 0x41 + 26) {
                return acc + (acc.length > 0 ? '_' : '') + String.fromCharCode(cc + 0x20);
            } else {
                return acc + c;
            }
        }, '');
    }

    async function getdata() {
        let azure = await util.complete_result().then((results) =>
            results
                .filter((result) => result.resource.cloud === "azure")
                .map((result) => {
                    let resource = result.resource.raw
                    let policy = result.policy.raw;

                    return [
                        resource.type,
                        resource.name,
                        resource.id.match(/.*?resourceGroups\/([\w-]+)\//)[1],
                        policy.metadata.name,
                        result.enforced === 1 ? 'PASS' : 'FAIL'
                    ];
                })
        );
        return azure.concat(await util.complete_result().then((results) =>
            results
                .filter((result) => result.resource.cloud === "gcp")
                .map((result) => {
                    let resource = result.resource.raw
                    let policy = result.policy.raw;

                    return [
                        resource.kind.replace('#', '-'),
                        resource.name,
                        resource.self_link.match(/.*?projects\/([\w-]+)\//)[1],
                        policy.metadata.name,
                        result.enforced === 1 ? 'PASS' : 'FAIL'
                    ];
                })
        ));
    }

    return (
        <Stack sx={{ flex: 1 }}>
            <Button variant="contained" disabled={isLoading ? true : false} onClick={toggleChildRefresh}>
                refresh
            </Button>
            <TableDyn
                title={'Reports'}
                columns={columns}
                tablerowdata={getdata}
                refreshChild={refreshChild}
                options={options}
                setLoading={setLoading}
                isLoading={isLoading}
            />
        </Stack>
    );
};
