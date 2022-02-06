import React from 'react';
import {
    Button,
    makeStyles,
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    row_container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        // "@media (max-width: 959px)": { width: '100%' }
    },
}));

const Item = ({ item }) => {
    const classes = useStyles();
    return (
        <div className={classes.row_container} style={{ justifyContent: 'space-around' }}>
            <Button
                color="secondary"
                variant="contained"
                style={{ margin: 5, width: '40%', height: 80 }}
            >
                {item.commonName}
            </Button>
            <div style={{ display: 'flex', width: '30%' }}>
                <Button
                    color="secondary"
                    variant="contained"
                    style={{ marginRight: 5, height: 80, width: '50%' }}
                >
                    -
                </Button>
                <div>
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
                </div>
            </div>
        </div>
    )
}

export default Item;