/* eslint-disable */

import React from 'react';
import MUIDataTable from 'mui-datatables';
import { useState, useEffect } from 'react';

const ExpandableRowTable = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        props.tablerowdata().then((x) => afterFetch(x));
    }, []);

    useEffect(() => {
        setData([]);
        props.tablerowdata().then((x) => afterFetch(x));
    }, [props.refreshChild]);

    function afterFetch(x) {
        setData(x);
        props.setLoading(false);
        console.log('gerefresht!');
    }

    // const options = {
    //     filter: true,
    //     rowHover: true,
    //     selectableRows: 'multiple',
    //     selectableRowsHideCheckboxes: true,
    //     selectableRowsOnClick: true,
    //     filterType: 'dropdown',
    //     responsive: 'scrollFullHeight',
    //     rowsPerPage: 10,
    //     expandableRows: true,
    //     page: 0,
    //     sortOrder: {
    //         name: 'ID',
    //         direction: 'desc'
    //     },
    //     downloadOptions: {
    //         filename: 'Policies.csv',
    //         filterOptions: {
    //             useDisplayedColumnsOnly: true,
    //             useDisplayedRowsOnly: true
    //         }
    //     },
    //     textLabels: {
    //         body: {
    //             noMatch: <CircularProgress />
    //         }
    //     },
    //     /*
    //     textLabels: {
    //         body: {
    //             noMatch: props.isLoading ? <CircularProgress /> : 'Sorry, there is no matching data to display'
    //         }
    //     },
    //     */
    //     customToolbarSelect: (selectedRows, displayData, setSelectedRows) => <div style={divStyle}>vorherDeleteButton</div>,
    //     renderExpandableRow: (rowData, rowMeta) => {
    //         return <ExpandableRow rowData={rowData} rowMeta={rowMeta} />
    //     }
    // };

    return <MUIDataTable title={props.title} data={data} columns={props.columns} options={props.options} />;

    //{
    //loading ?  <Loader loading={loading}/> :
    //}
};

export default ExpandableRowTable;
