import React from 'react';
import Box from '@material-ui/core/Container';
import { Grid, Button } from '@material-ui/core';
import Header from '../../components/headers/header-homescreen';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import NavBottom from '../../components/navBottom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AlertSwitch from '../../components/switch';
import states from './Setting.state';
import Axios from 'axios';


class Settings extends React.Component {
    state = states;

    componentDidMount = () => {
    };

    confirm() {
        this.setState({ open: true });
    }

    async delete() {
        this.setState({ loading: true });


        await Axios.delete('/peoples')
            .then((response) => {
                this.history.push('/map');
            })
            .catch((error) => {
                this.setState({ loading: false });
            });
    }

    handleClose() {
        this.setState({ open: false });
    }

    render() {
        return (
            <Box className="complete-profile">
                <Header>
                    <p>Settings</p>
                </Header>
                <Grid container spacing={3} style={{ justifyContent: 'center', margin: '-55px 0px 0px -9px' }}>
                    <Grid item xs={12} sm={11}>
                        <div className="profile-body" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Card style={{
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderRadius: 15,
                            }}>
                                <div style={{ width: '100%', display: 'flex' }}>
                                    <CardContent style={{ width: '80%' }}>
                                        <p className="card-title" style={{ color: 'black' }}>
                                            {'Text Notification Settings'}
                                        </p>
                                    </CardContent>
                                    <div style={{ width: '20%' }}>
                                        <div style={{ float: 'right' }}>
                                            <AlertSwitch></AlertSwitch>
                                        </div>

                                    </div>
                                </div>
                                <div style={{ width: '100%', display: 'flex' }}>
                                    <CardContent style={{ width: '80%' }}>
                                        <p className="card-title" style={{ color: 'black' }}>
                                            {'Location Settings'}
                                        </p>
                                    </CardContent>
                                    <div style={{ width: '20%' }}>
                                        <div style={{ float: 'right' }}>
                                            <AlertSwitch></AlertSwitch>
                                        </div>

                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} className="settingBtn">
                        <Button onClick={() => this.confirm()} className="btn-big settingDelBtn fontsize-16">Delete Profile</Button>
                    </Grid>
                </Grid>


                <NavBottom active={0}></NavBottom>
                <Dialog
                    open={this.state.open}
                    onClose={() => this.handleClose()}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    style={{ zIndex: '5', borderRadius: '14px' }}
                >
                    <DialogTitle id="scroll-dialog-title" style={{ textAlign: 'center' }}>Delete Account</DialogTitle>
                    <DialogContent >
                        <h5 className="settingModalTxt">
                            Are you sure you want to permanently delete your Account? This is irreversible.
                        </h5>
                        <Grid
                            container
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',

                                padding: '5px 0',
                            }}
                            className="btn-group"
                        >
                            <Grid item xs={12} sm={5}>
                                <Button onClick={() => this.delete()}
                                className="btn-big settingDelBtn " >Permanently Delete Account</Button>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Button onClick={() => this.handleClose()} className="btn-big bg-grey2 fontsize-16">Cancel</Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </Box>
        );
    }
}
export default Settings;



