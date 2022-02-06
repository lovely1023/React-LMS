import React from 'react';
import {
    Grid,
    makeStyles,
    withStyles
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FixedTextField from 'src/components/FixedTextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import {
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {
    getLevels
} from 'src/localstorage';
var { global_levels } = getLevels();

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
                borderRadius: '19px',
                height: 50
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
    button: {
        marginBottom: '0.5rem',
        width: '90%'
    },
    boldletter: {
        fontWeight: 'bold',
        marginRight: 10
    },
    row_container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        // "@media (max-width: 959px)": { width: '100%' }
    },
    row_Div: {
        display: 'flex',
        marginBottom: 10,
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    recomment_combo: {
        width: 230, height: 50, marginRight: 10
        // "@media (max-width: 1370px)": { width: 200 }
    },
    datePicker: {
        width: 150,
        margin: 10
    },
}));

const GroupComponent = () => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                <div className={classes.row_Div}>
                    <div className={classes.boldletter}>Room:</div>
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position" defaultValue="group_rook">
                            <FormControlLabel value="group_rook" control={<Radio color="primary" />} label="Group Room" />
                            <FormControlLabel value="open" control={<Radio color="primary" />} label="Oepn" />
                            <FormControlLabel value="select" control={<Radio color="primary" />} label="Select" />
                        </RadioGroup>
                    </FormControl>
                    <Autocomplete
                        options={global.classis.length !== 0 ? global.classis : JSON.parse(global_levels)}
                        getOptionLabel={(option) => option}
                        className={classes.recomment_combo}
                        renderInput={(params) => <CssTextField {...params} />}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="mon"
                                color="primary"
                            />
                        }
                        label="Mon"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="tue"
                                color="primary"
                            />
                        }
                        label="Tue"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="wed"
                                color="primary"
                            />
                        }
                        label="Wed"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="thu"
                                color="primary"
                            />
                        }
                        label="Thur"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="fri"
                                color="primary"
                            />
                        }
                        label="Fri"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="sat"
                                color="primary"
                            />
                        }
                        label="Sat"
                    />
                </div>
                <div className={classes.row_Div}>
                    <div className={classes.boldletter}>Teacher:</div>
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position" defaultValue="group_rook">
                            <FormControlLabel value="group_rook" control={<Radio color="primary" />} label="Group Room" />
                            <FormControlLabel value="open" control={<Radio color="primary" />} label="Oepn" />
                            <FormControlLabel value="select" control={<Radio color="primary" />} label="Select" />
                        </RadioGroup>
                    </FormControl>
                    <Autocomplete
                        options={global.classis.length !== 0 ? global.classis : JSON.parse(global_levels)}
                        getOptionLabel={(option) => option}
                        className={classes.recomment_combo}
                        renderInput={(params) => <CssTextField {...params} />}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="grouptimes"
                                color="primary"
                            />
                        }
                        label="Group Times"
                    />
                    <CssTextField
                        id="from_time"
                        placeholder="HH:MM"
                        style={{ width: 70 }}
                    // value={values.maxHours}
                    // onChange={handleChange}
                    />
                    <div style={{ marginRight: 10, marginLeft: 10 }}>to</div>
                    <CssTextField
                        id="to_time"
                        placeholder="HH:MM"
                        style={{ width: 70 }}
                    // value={values.maxHours}
                    // onChange={handleChange}
                    />
                </div>
                <div className={classes.row_Div}>
                    <div>(schedule items with dates will override those without, and a later start date will override an earlier one)</div>
                </div>
                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="from_date"
                                color="primary"
                                style={{ padding: 5, margin: 10 }}
                            />
                        }
                        label="From"
                    />
                    <KeyboardDatePicker
                        className={classes.datePicker}
                        format="MM/DD/YYYY"
                        name="birthday"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="to_date"
                                color="primary"
                                style={{ padding: 5, margin: 10 }}
                            />
                        }
                        label="To"
                    />
                    <KeyboardDatePicker
                        className={classes.datePicker}
                        format="MM/DD/YYYY"
                        name="birthday"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </div>
            </Grid>
        </Grid>
    )
}

export default GroupComponent;
