import * as React from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from "@mui/material/Alert";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {setAppIsErrorAC, setAppStatusAC} from "../../app/app-reducer";


export default function ErrorCnackBar() {
    // const [open, setOpen] = React.useState(true);
    //
    //
    const isError = useSelector<AppRootStateType, string | null>(state => state.app.isError)
    const dispatch = useDispatch()
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {

        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppIsErrorAC(null))

    };


    return (


        <Snackbar open={isError !== null} autoHideDuration={4000} onClose={handleClose}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
            <MuiAlert onClose={handleClose} variant="filled" severity="error" sx={{width: '100%'}}>
                {isError}
            </MuiAlert>
        </Snackbar>

    );
}