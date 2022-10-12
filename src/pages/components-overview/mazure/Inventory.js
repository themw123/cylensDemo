// project import
/* eslint-disable */
import MainCard from 'components/MainCard';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TableDyn from '../TableDyn';
import * as util from '../../../backend/util';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

// ==============================|| SAMPLE PAGE ||============================== //

const Inventory = () => {
    const [refreshChild, doRefreshChild] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const toggleChildRefresh = () => {
        setLoading(true);
        util.azure_refresh().then(() => {
            doRefreshChild((prevState) => !prevState);
            setLoading(false)
        })
    };

    const columns = [
        {
            name: 'Type'
        },
        {
            name: 'Name'
        },
        {
            name: 'Resource Group'
        },
        {
            name: 'Provisioning State'
        },
        {
            name: 'Location'
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
        expandableRows: false,
        page: 0,
        sortOrder: {
            name: 'ID',
            direction: 'desc'
        },
        downloadOptions: {
            filename: 'Inventory.csv',
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
        const [resource, setData] = useState({});

        useEffect(() => {
            util.resources()
                .then((resources) =>
                    resources.map((resource) => JSON.parse(resource.raw_json_resource)).find((resource) => resource.name === rowData[1])
                )
                .then((resource) => setData(resource));
        }, []);

        return (
            <React.Fragment>
                <tr>
                    <td colSpan={6}>{JSON.stringify(resource)}</td>
                </tr>
            </React.Fragment>
        );
    };

    async function getdata() {
        return util.resources().then((resources) => {
            return resources
                .filter((resource) => resource.cloud === 'azure')
                .map((resource) => JSON.parse(resource.raw_json_resource))
                .map((res) => [
                    res.type,
                    res.name,
                    res.id.match(/.*?resourceGroups\/([\w-]+)\//)[1],
                    res.properties.provisioningState,
                    res.location
                ]);
        });
    }

    return (
        <Stack sx={{ flex: 1 }}>
            <Button variant="contained" disabled={isLoading ? true : false} onClick={toggleChildRefresh}>
                refresh
            </Button>
            <TableDyn
                title={'Microsoft Azure Inventory'}
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

export default Inventory;
