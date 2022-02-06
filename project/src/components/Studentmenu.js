import React from 'react';
import {
    IconButton,
    Button,
    withStyles
} from '@material-ui/core';
import {
    Edit as EditIcon,
    Search as SearchIcon
} from 'react-feather';
import { Link as RouterLink } from 'react-router-dom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import CreateIcon from '@material-ui/icons/Create';
import Switch from '@material-ui/core/Switch';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ReceiptIcon from '@material-ui/icons/Receipt';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import HistoryIcon from '@material-ui/icons/History';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { connectIntl, formatMessage } from 'src/contexts/Intl';
import httpClient from 'src/utils/httpClient';
import {
    handleDelete,
} from 'src/utils/defaultTableSettings';
import { useSnackbar } from 'notistack';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const StudentMenu = ({ intl, id, deleteStudent }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [switchstate, setSwitchState] = React.useState(true);
    const { enqueueSnackbar } = useSnackbar();

    const handleChangeSwitchState = (event) => {
        setSwitchState(event.target.checked);
    };

    const handlemenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlemenuClose = () => {
        setAnchorEl(null);
    };

    const handleopenPortal = () => {
        const urlAPI = 'api/auth/profile';
        var accessToken = window.localStorage.getItem('accessToken');
        httpClient.post(urlAPI, {
            accessToken: accessToken
        })
            .then(json => {
                if (json.success) {
                    window.open(`https://idiomasseif.com/portalalumno/?user=${json.user[0].name}&student%5Fselect%5Fid=${id}&adminAccess=true&password=12345678`);
                }
            })
    }

    return (
        <div style={{ marginTop: 5 }}>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handlemenuClick}
            >
                <MoreHorizIcon />
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handlemenuClose}
            >
                <StyledMenuItem>
                    <ListItemIcon>
                        <Switch
                            checked={switchstate}
                            onChange={handleChangeSwitchState}
                            color="primary"
                            title="Change status"
                        />
                    </ListItemIcon>
                    <ListItemText primary="Change Status" />
                </StyledMenuItem>

                <StyledMenuItem>
                    <IconButton
                        component={RouterLink}
                        to={formatMessage(intl.urlStudentDetail, { studentId: id })}
                    >
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Detail" />
                    </IconButton>
                </StyledMenuItem>

                <StyledMenuItem>
                    <IconButton
                        component={RouterLink}
                        to={formatMessage(intl.urlCertificationAdd, { studentId: id })}
                    >
                        <ListItemIcon>
                            <CreateIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create certificate" />
                    </IconButton>
                </StyledMenuItem>

                {/* <StyledMenuItem>
                    <IconButton
                        component={RouterLink}
                        to={formatMessage(intl.urlBillAdd, { studentId: id })}
                    >
                        <ListItemIcon>
                            <NoteAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create bill" />
                    </IconButton>
                </StyledMenuItem> */}

                <StyledMenuItem>
                    <IconButton
                        component={RouterLink}
                        to={formatMessage(intl.urlStudentEdit, { studentId: id })}
                    >
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary="Edit" />
                    </IconButton>
                </StyledMenuItem>

                <StyledMenuItem>
                    <IconButton
                        component={RouterLink}
                        to={formatMessage(intl.urlLesson, { studentId: id })}
                    >
                        <ListItemIcon>
                            <LibraryBooksIcon />
                        </ListItemIcon>
                        <ListItemText primary="Lessons" />
                    </IconButton>
                </StyledMenuItem>

                <StyledMenuItem>
                    <IconButton
                        component={RouterLink}
                        to={formatMessage(intl.urlBill, { studentId: id })}
                    >
                        <ListItemIcon>
                            <ReceiptIcon />
                        </ListItemIcon>
                        <ListItemText primary="Bills" />
                    </IconButton>
                </StyledMenuItem>

                <StyledMenuItem>
                    <IconButton
                        onClick={handleopenPortal}
                    >
                        <ListItemIcon>
                            <img src="/static/images/billsIcon.png" alt="billsIcon" style={{ width: 17, height: 17 }} />
                        </ListItemIcon>
                        <ListItemText primary="Web portal" />
                    </IconButton>
                </StyledMenuItem>

                {/* <StyledMenuItem>
                    <IconButton
                    // component={RouterLink}
                    // to={formatMessage(intl.urlCertificationAdd, { studentId: id })}
                    >
                        <ListItemIcon>
                            <HistoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Log" />
                    </IconButton>
                </StyledMenuItem>

                <StyledMenuItem>
                    <IconButton
                    // component={RouterLink}
                    // to={formatMessage(intl.urlCertificationAdd, { studentId: id })}
                    >
                        <ListItemIcon>
                            <MoreHorizIcon />
                        </ListItemIcon>
                        <ListItemText primary="More Info" />
                    </IconButton>
                </StyledMenuItem> */}

                <StyledMenuItem>
                    <IconButton
                        onClick={() => handleDelete(
                            id,
                            deleteStudent,
                            enqueueSnackbar,
                            { ...intl, formatMessage }
                        )}
                    >
                        <ListItemIcon>
                            <HighlightOffIcon />
                        </ListItemIcon>
                        <ListItemText primary="Delete" />
                    </IconButton>
                </StyledMenuItem>

            </StyledMenu>
        </div>
    )
}

export default StudentMenu;