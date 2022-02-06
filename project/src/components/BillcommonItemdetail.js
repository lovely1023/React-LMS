import React from 'react';
import {
    Grid,
    Button,
    makeStyles,
    withStyles
} from '@material-ui/core';
import FixedTextField from 'src/components/FixedTextField';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const CssTextField = withStyles({
    root: {
        '& label': {
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '150%',
            alignItems: 'center',
            textAlign: 'center',

            color: '#333',
            transform: 'translate(22px, 16px) scale(1)'
        },

        '& label.Mui-focused': {
            color: '#333',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#fff',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: '1px solid#333',
                // borderRadius: '19px',
            },
            '&:hover fieldset': {
                borderColor: '#333',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#333',
            },
        },
    },
})(FixedTextField);

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormHelperText-root.Mui-required': {
            color: 'red'
        }
    },
    boldletter: {
        fontWeight: 'bold',
        marginRight: 10
    },
    row_container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        // "@media (max-width: 959px)": { width: '100%' }
    },
    row_Div: {
        display: 'flex',
        marginBottom: 10,
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
}));

const Item = () => {
    const classes = useStyles();
    return (
        <>
            <Grid container style={{ width: '100%', marginBottom: 15 }}>
                <Grid item xs={2}>
                    <Button
                        color="secondary"
                        variant="contained"
                        style={{ marginBottom: 15 }}
                    >
                        -
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        style={{ marginBottom: 5 }}
                    >
                        <ExpandLessIcon />
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                    >
                        <ExpandMoreIcon />
                    </Button>
                </Grid>
                <Grid item xs={2}>Item:</Grid>
                <Grid item xs={8}>
                    <CssTextField
                        style={{ width: '100%' }}
                        id="newnotes"
                        multiline
                        variant="outlined"
                        rows={4}
                    // value={values.newnotes}
                    // onChange={handleChange}
                    />
                </Grid>
            </Grid>
            <Grid container style={{ width: '100%', marginBottom: 15 }}>
                <Grid item xs={12} md={6}
                    className={classes.row_container}
                >
                    <div>Discount:</div>
                    <CssTextField
                        id="IDNumber"
                        variant="outlined"
                        style={{ marginRight: 5, marginLeft: 5 }}
                    // value={values.IDNumber}
                    // onChange={handleChange}
                    />
                    <div>%</div>
                </Grid>
                <Grid item xs={12} md={6}
                    className={classes.row_container}
                >
                    <div>Price:</div>
                    <CssTextField
                        id="IDNumber"
                        variant="outlined"
                        style={{ marginRight: 5, marginLeft: 5 }}
                    // value={values.IDNumber}
                    // onChange={handleChange}
                    />
                    <div>,</div>
                    <CssTextField
                        id="IDNumber"
                        variant="outlined"
                        style={{ marginRight: 5, marginLeft: 5 }}
                    // value={values.IDNumber}
                    // onChange={handleChange}
                    />
                    <div>€</div>
                </Grid>
            </Grid>
        </>
    )
}

export default Item;