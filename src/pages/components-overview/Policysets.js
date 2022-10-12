// project import
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from './TablePolicy';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import gcloud from 'assets/images/gcloud.png';
import mazure from 'assets/images/mazure.png';
import aws from 'assets/images/aws.png';

import PolicysetsCard from './PolicysetsCard';

import { useState, useEffect } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

const Policysets = () => {
    const [data, cardClick] = useState([]);

    return (
        <Stack direction="row" justifyContent="flex-start" alignItems="stretch" spacing={1}>
            <Stack direction="column" justifyContent="flex-start" spacing={1}>
                <PolicysetsCard cardClick={cardClick} name={'cis'} cloudd={'Google Cloud'} version={'Version 1.3.0'} level={'level=1'} />
                <PolicysetsCard cardClick={cardClick} name={'cis'} cloudd={'Microsoft Azure'} version={'Version 1.5.0'} level={'level=1'} />

                <PolicysetsCard cardClick={cardClick} data={data} name={'cis'} cloudd={'Amazon AWS'} version={'coming'} level={'soon'} />

                <PolicysetsCard cardClick={cardClick} name={'cis'} cloudd={'Google Cloud'} version={'Version 1.3.0'} level={'level=2'} />
                <PolicysetsCard cardClick={cardClick} name={'cis'} cloudd={'Microsoft Azure'} version={'Version 1.5.0'} level={'level=2'} />

                <PolicysetsCard cardClick={cardClick} name={'cis'} cloudd={'Amazon AWS'} version={'coming'} level={'soon'} />

                <PolicysetsCard cardClick={cardClick} name={'gdpr'} cloudd={'Google Cloud'} version={'coming'} level={'soon'} />
                <PolicysetsCard cardClick={cardClick} name={'gdpr'} cloudd={'Microsoft Azure'} version={'coming'} level={'soon'} />
                <PolicysetsCard cardClick={cardClick} data={data} name={'gdpr'} cloudd={'Amazon AWS'} version={'coming'} level={'soon'} />
            </Stack>

            <Stack sx={{ flex: 1 }}>
                <Table title={'CyLens Policysets'} data={data} />
            </Stack>
        </Stack>
    );
};

export default Policysets;

/*

            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
*/
