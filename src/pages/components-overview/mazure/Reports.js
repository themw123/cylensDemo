// project import
/*eslint-disable*/
import React from 'react';
import MainCard from 'components/MainCard';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TableDyn from '../TableDyn';
import { useState, useEffect } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import * as util from '../../../backend/util';
import CircularProgress from '@mui/material/CircularProgress';

// ==============================|| SAMPLE PAGE ||============================== //

const Reports = () => {
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
        return util.complete_result().then((results) =>
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
    }

    return (
        <Stack sx={{ flex: 1 }}>
            <Button variant="contained" disabled={isLoading ? true : false} onClick={toggleChildRefresh}>
                refresh
            </Button>
            <TableDyn
                title={'Microsoft Azure Reports'}
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

export default Reports;
