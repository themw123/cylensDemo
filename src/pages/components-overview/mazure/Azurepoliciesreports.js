// project import
import MainCard from 'components/MainCard';
import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TableDyn from '../TableDyn';
import { useState, useEffect } from 'react';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@mui/material/CircularProgress';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import * as util from '../../../backend/util';

// ==============================|| SAMPLE PAGE ||============================== //

const Azurepoliciesreports = () => {
    const [refreshChild, doRefreshChild] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const toggleChildRefresh = () => {
        setLoading(true);
        util.azure_refresh().then(() => {
            doRefreshChild((prevState) => !prevState);
            setLoading(false);
        });
    };

    const columns = [
        {
            name: 'ID'
        },
        {
            name: 'Name'
        },
        {
            name: 'Type'
        },
        {
            name: 'Namespace'
        },
        {
            name: 'Ressource Group'
        },
        {
            name: 'Description'
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
            filename: 'Policies.csv',
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
        const [policy, setData] = useState(undefined);

        useEffect(() => {
            util.policies()
                .then((policies) =>
                    policies.map((policy) => JSON.parse(policy.raw_json_policy)).find((policy) => policy.metadata.name === rowData[1])
                )
                .then((policy) => setData(policy));
        }, []);

        if (policy === undefined) {
            return <></>;
        }
        return (
            <React.Fragment>
                <tr>
                    <td colSpan={7}>
                        <TableContainer component={Paper}>
                            <Table style={{ minWidth: '650' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Why</TableCell>
                                        <TableCell align="left">Rules</TableCell>
                                        <TableCell align="left">Filter</TableCell>
                                        <TableCell align="left">Remedation</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {policy.spec.why}
                                        </TableCell>
                                        <TableCell align="left">
                                            <pre>{JSON.stringify(policy.spec.rules, null, 2)}</pre>
                                        </TableCell>
                                        <TableCell align="left">
                                            <pre>{JSON.stringify(policy.spec.filter, null, 2)}</pre>
                                        </TableCell>
                                        <TableCell align="left">{policy.spec.remedation}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </td>
                </tr>
            </React.Fragment>
        );
    };

    async function getdata() {
        return util
            .policies_by_cloud(await util.policies(), 'azure')
            .map((policy) => {
                return {
                    raw: JSON.parse(policy.raw_json_policy),
                    policy: policy
                };
            })
            .map(({ policy, raw }) => {
                let anno = JSON.parse(raw.metadata.annotations);
                return [policy.uid, raw.metadata.name, raw.kind, raw.metadata.namespace, anno.resourceGroup, raw.spec.description];
            });
    }

    return (
        <Stack sx={{ flex: 1 }}>
            <Button variant="contained" disabled={isLoading ? true : false} onClick={toggleChildRefresh}>
                refresh
            </Button>
            <TableDyn
                title={'Microsoft Azure Policies'}
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

export default Azurepoliciesreports;
