// project import
/* eslint-disable */
import MainCard from 'components/MainCard';
import React from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';
import * as util from '../../../backend/util';

// ==============================|| SAMPLE PAGE ||============================== //

const Orgpolicies = () => {
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
            name: 'ID'
        },
        {
            name: 'Org Policy'
        },
        {
            name: 'ProjectID'
        },
        {
            name: 'CyLens Policy ID'
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
            filename: 'OrgPolicies.csv',
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
        const [constrain, setData] = useState(undefined);

        useEffect(() => {
            util.gcp_constraints()
                .then((constrains) => constrains.find((constrain) => id_from_name(constrain.display_name) === rowData[0]))
                .then((constrain) => setData(constrain));
        }, []);

        if (constrain === undefined) {
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
                                        <TableCell>CyLens Policy</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <pre>{JSON.stringify(JSON.parse(constrain.translated_avolens_policy), null, 2)}</pre>
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

    function id_from_name(name) {
        let hash_code = (str) => {
            var hash = 0, i, chr;
            if (str.length === 0) return hash;
            for (i = 0; i < str.length; i++) {
                chr = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
            return hash;
        }

        let ret = hash_code(name).toString(16)
        if (ret[0] === '-') {
            ret = ret.slice(1)
        }
        if (ret.length < 8) {
            return "0".repeat(8 - ret.length) + ret
        } else {
            return ret
        }
    }

    async function getdata() {
        return util.gcp_constraints().then((constrain) => {
            return constrain.map((con) => [
                id_from_name(con.display_name),
                con.display_name,
                con.name.match(/.*?projects\/([\w-]+)\//)[1],
                con.avolens_policy,
                con.description
            ]);
        });
    }

    return (
        <Stack sx={{ flex: 1 }}>
            <Button variant="contained" disabled={isLoading ? true : false} onClick={toggleChildRefresh}>
                refresh
            </Button>
            <TableDyn
                title={'Google Cloud Org Policies'}
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

export default Orgpolicies;
