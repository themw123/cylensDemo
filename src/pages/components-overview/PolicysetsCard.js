// project import
/*eslint-disable*/
import { useState } from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ButtonBase from '@material-ui/core/ButtonBase';

import cis from 'assets/images/cis.png';
import gdpr from 'assets/images/gdpr.png';

const icons = [cis, gdpr];

// ==============================|| SAMPLE PAGE ||============================== //

const PolicysetsCard = (props) => {
    var i = 0;

    if (props.version == null) {
        props.version == '';
    }
    if (props.level == null) {
        props.level == '';
    }

    //debugger;
    if (props.name == 'cis') {
        i = 0;
    }
    if (props.name == 'gdpr') {
        i = 1;
    }

    var name = props.name.toUpperCase();

    const buttonClick = () => {

        //achtung 3. und 6. Card sind die gleichen!!!!!!
        if (
            name.toLowerCase() === 'cis' &&
            props.cloudd == 'Google Cloud' &&
            props.version == 'Version 1.3.0' &&
            props.level == 'level=1'
        ) {
            props.cardClick([
                ['CyLens Policy', 'CIS-4.1', 'Automated', 'Ensure That Instances Are Not Configured To Use the Default Service Account'],
                ['CyLens Policy', 'CIS-4.2', 'Automated', 'Ensure That Instances Are Not Configured To Use the Default Service Account With Full Access to All Cloud APIs'],
                ['CyLens Policy', 'CIS-4.3', 'Automated', 'Ensure “Block Project-Wide SSH Keys” Is Enabled for VM Instances'],
                ['CyLens Policy', 'CIS-4.4', 'Automated', 'Ensure Oslogin Is Enabled for a Project'],
                ['CyLens Policy', 'CIS-4.5', 'Automated', 'Ensure ‘Enable Connecting to Serial Ports’ Is Not Enabled for VM Instance'],
                ['CyLens Policy', 'CIS-4.6', 'Automated', 'Ensure That IP Forwarding Is Not Enabled on Instances'],
                ['GCP ORG Policy', 'CIS-4.6', '', 'Ensure That IP Forwarding Is Not Enabled on Instances']
            ]);
        }
        if (
            name.toLowerCase() === 'cis' &&
            props.cloudd == 'Microsoft Azure' &&
            props.version == 'Version 1.5.0' &&
            props.level == 'level=1'
        ) {
            props.cardClick([
                ['CyLens Policy', 'CIS-7.1', 'Automated (as Manual specified)', 'Ensure Virtual Machines are utilizing Managed Disks'],
                ['CyLens Policy', 'CIS-7.4', 'Manual', 'Ensure that Only Approved Extensions Are Installed'],
                ['Azure Policy', 'CIS-7.1', '', 'Ensure Virtual Machines are utilizing Managed Disks']
            ]);
        }
        if (
            name.toLowerCase() === 'cis' &&
            props.cloudd == 'Google Cloud' &&
            props.version == 'Version 1.3.0' &&
            props.level == 'level=2'
        ) {
            props.cardClick([
                ['CyLens Policy', 'CIS-4.7', 'Automated', 'Ensure VM Disks for Critical VMs Are Encrypted With Customer-Supplied Encryption Keys (CSEK)'],
                ['CyLens Policy', 'CIS-4.8', 'Automated', 'Ensure Compute Instances Are Launched With Shielded VM Enabled'],
                ['CyLens Policy', 'CIS-4.9', 'Automated', 'Ensure That Compute Instances Do Not Have Public IP Addresses'],
                ['CyLens Policy', 'CIS-4.10', 'Manual', 'Ensure That App Engine Applications Enforce HTTPS Connections'],
                ['CyLens Policy', 'CIS-4.11', 'Automated', 'Ensure That Compute Instances Have Confidential Computing Enabled'],
                ['CyLens Policy', 'CIS-4.12', 'Manual', 'Ensure the Latest Operating System Updates Are Installed On Your Virtual Machines in All Projects'],
                ['GCP ORG Policy', 'CIS-4.8', '', 'Ensure Compute Instances Are Launched With Shielded VM Enabled'],
                ['GCP ORG Policy', 'CIS-4.11', '', 'Ensure That Compute Instances Have Confidential Computing Enabled']
            ]);
        }
        if (
            name.toLowerCase() === 'cis' &&
            props.cloudd == 'Microsoft Azure' &&
            props.version == 'Version 1.5.0' &&
            props.level == 'level=2'
        ) {
            props.cardClick([
                ['CyLens Policy', 'CIS-7.2', 'Automated', 'Ensure that \'OS and Data\' disks are encrypted with Customer Managed Key (CMK)'],
                ['CyLens Policy', 'CIS-7.3', 'Automated', 'Ensure that \'Unattached disks\' are encrypted with \'Customer Managed Key\' (CMK)'],
                ['CyLens Policy', 'CIS-7.5', 'Manual', 'Ensure that Endpoint Protection for all Virtual Machines is installed'],
                ['CyLens Policy', 'CIS-7.6 (Legacy)', 'Manual', 'Ensure that VHDs are Encrypted']
            ]);
        }
        if (name.toLowerCase() === 'cis' && props.cloudd == 'Amazon AWS' && props.version == 'coming' && props.level == 'soon') {
            props.cardClick([]);
        }
        if (name.toLowerCase() === 'cis' && props.cloudd == 'Amazon AWS' && props.version == 'coming' && props.level == 'soon') {
            props.cardClick([]);
        }
        if (name.toLowerCase() === 'gdpr' && props.cloudd == 'Google Cloud' && props.version == 'coming' && props.level == 'soon') {
            props.cardClick([]);
        }
        if (name.toLowerCase() === 'gdpr' && props.cloudd == 'Microsoft Azure' && props.version == 'coming' && props.level == 'soon') {
            props.cardClick([]);
        }
        if (name.toLowerCase() === 'gdpr' && props.cloudd == 'Amazon AWS' && props.version == 'coming' && props.level == 'soon') {
            props.cardClick([]);
        }
    };

    return (
        <Card sx={{ marginBottom: '20px' }}>
            <ButtonBase style={{ width: '100%' }} onClick={buttonClick}>
                <CardContent>
                    <div style={{ textAlign: 'center' }}>
                        <div>
                            <Typography sx={{ fontSize: 18 }} gutterBottom variant="h5">
                                {name}
                            </Typography>
                        </div>
                        <div>
                            <img src={icons[i]} width={50} height={50} alt=""></img>
                        </div>
                        <div>
                            <Typography sx={{ fontSize: 16, marginTop: '10px' }} gutterBottom variant="h5">
                                {props.cloudd}
                            </Typography>
                        </div>
                    </div>
                </CardContent>
            </ButtonBase>
            {props.version != null && props.level != null > 0 && (
                <div>
                    <Divider sx={{ borderBottomWidth: '3px' }} />
                    <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <Typography sx={{ fontSize: 14, marginTop: '10px' }} gutterBottom variant="h5">
                                {props.version}
                            </Typography>
                        </div>
                        <div style={{ marginLeft: 0 }}>
                            <Typography sx={{ fontSize: 12 }} gutterBottom variant="h5">
                                {props.level}
                            </Typography>
                        </div>
                    </CardActions>
                </div>
            )}
        </Card>
    );
};

export default PolicysetsCard;

/*
                    <div>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                                <FormControlLabel value={radio} control={<Radio size="small" />} label="Female" />
                                <FormControlLabel value={radio} control={<Radio size="small" />} label="Male" />
                                <FormControlLabel value={radio} control={<Radio size="small" />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                    </div>

                 <CardActions style={{ justifyContent: 'center', display: 'flex' }}>
                    <Button variant="contained" size="small">
                        search
                    </Button>
                </CardActions>
*/
