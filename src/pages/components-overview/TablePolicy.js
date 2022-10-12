import axios from 'axios';

import React from 'react';
import MUIDataTable from 'mui-datatables';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect } from 'react';

const ExpandableRowTable = (props) => {
    const columns = [
        {
            name: 'Type'
        },
        {
            name: 'Name'
        },
        {
            name: 'Mode'
        },
        {
            name: 'Description'
        }
    ];

    function createData(a, b, c, d, e) {
        return { a, b, c, d, e };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9)
    ];

    const divStyle = {
        margin: '20px',
        visibility: 'hidden'
    };

    const options = {
        filter: true,
        rowHover: true,
        selectableRows: 'multiple',
        selectableRowsHideCheckboxes: true,
        selectableRowsOnClick: true,
        filterType: 'dropdown',
        responsive: 'scrollFullHeight',
        rowsPerPage: 10,
        expandableRows: false,
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
        customToolbarSelect: (selectedRows, displayData, setSelectedRows) => <div style={divStyle}>vorherDeleteButton</div>,
        renderExpandableRow: (rowData, rowMeta) => {
            console.log(rowData, rowMeta);
            return (
                <React.Fragment>
                    <tr>
                        <td colSpan={6}>
                            <TableContainer component={Paper}>
                                <Table style={{ minWidth: '650' }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Dessert (100g serving)</TableCell>
                                            <TableCell align="right">Calories</TableCell>
                                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                            <TableCell align="right">Calories</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.a}>
                                                <TableCell component="th" scope="row">
                                                    {row.a}
                                                </TableCell>
                                                <TableCell align="right">{row.b}</TableCell>
                                                <TableCell align="right">{row.c}</TableCell>
                                                <TableCell align="right">{row.d}</TableCell>
                                                <TableCell align="right">{row.e}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </td>
                    </tr>
                </React.Fragment>
            );
        }
    };

    return <MUIDataTable title={props.title} data={props.data} columns={columns} options={options} />;
};

export default ExpandableRowTable;
