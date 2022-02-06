import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import clsx from 'clsx';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import {
  Grid,
  Card,
  Button,
  makeStyles,
  CardContent,
  withStyles
} from '@material-ui/core';
import { useHistory } from 'react-router';
import Checkbox from '@material-ui/core/Checkbox';
import FixedTextField from '../../../components/FixedTextField'
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import NumberFormat from 'react-number-format';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
/* utils */
import httpClient from 'src/utils/httpClient';
import 'src/components/global';
/* connectIntl */
import { connectIntl } from 'src/contexts/Intl';
import {
  getLanguages,
  getLevels,
  getHowdidyouhear,
  getAllGroups,
  getAllTextbooks
} from 'src/localstorage';

var { global_howdidyouhear } = getHowdidyouhear();
var { global_levels } = getLevels();
var { global_allgroups } = getAllGroups();
var { global_languages } = getLanguages();
var { global_alltextbooks } = getAllTextbooks();
var arrGroupinfo;

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

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

const CssTextField1 = withStyles({
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

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="€"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(book, pack, date, mark) {
  return { book, pack, date, mark };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Eclair', 262, 16.0),
  createData('Cupcake', 305, 3.7),
  createData('Gingerbread', 356, 16.0),
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormHelperText-root.Mui-required': {
      color: 'red'
    }
  },
  avatar: {
    width: '100%'
  },
  boldletter: {
    fontWeight: 'bold',
    // marginBottom: 7,
    textAlign: 'right'
  },
  row_container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  datePicker: {
    width: 230
  },
  left_container: {
    paddingRight: 20,
    "@media (max-width: 959px)": { padding: 0 }
  },
  recomment_combo: {
    width: 230, height: 50,
    "@media (max-width: 1370px)": { width: 200 }
  },
  payments_combo: {
    // width: '80%',
    height: 50,
    "@media (max-width: 1421px)": { width: '100%' }
  },
  transfer_root: {
    margin: 'auto',
    marginBottom: 15
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    height: 250,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 1.2),
    width: 90
  },
}));

const StudentAddEditForm = ({ student, update, intl }) => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [levels, setLevels] = useState([]);
  const [payments, setPayments] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [selectedGroups, setSelectedgroups] = useState([]);
  const isMountedRef = useIsMountedRef();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [recommendedFlag, setRecommendedFlag] = React.useState(false)
  const [monday, setMonday] = React.useState(false)
  const [tuesday, setTuesday] = React.useState(false)
  const [wednesday, setWednesday] = React.useState(false)
  const [thursday, setThursday] = React.useState(false)
  const [friday, setFriday] = React.useState(false)
  const [saturday, setSaturday] = React.useState(false)
  const [sunday, setSunday] = React.useState(false)
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState("");
  const [file, setFile] = React.useState("");

  const [combovalues, setCombovalues] = React.useState({
    language: student.LANGUAGE,
    level: student.LEVEL,
    howdidyouhear: student.howDidYouHear
  });

  const handleChangeCombovalues = (name, value) => {
    setCombovalues({ ...combovalues, [name]: value });
  };

  const [groupchecked, setGroupChecked] = React.useState([]);
  const [groupleft, setGroupLeft] = React.useState(global.Allgroups.length !== 0 ? global.Allgroups : JSON.parse(global_allgroups));
  const [groupright, setGroupRight] = React.useState(selectedGroups);

  const groupleftChecked = intersection(groupchecked, groupleft);
  const grouprightChecked = intersection(groupchecked, groupright);

  const handleGroupToggle = (value) => () => {
    const currentIndex = groupchecked.indexOf(value);
    const newChecked = [...groupchecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setGroupChecked(newChecked);
  };

  const handleCheckedGroupRight = () => {
    setGroupRight(groupright.concat(groupleftChecked));
    setGroupLeft(not(groupleft, groupleftChecked));
    setGroupChecked(not(groupchecked, groupleftChecked));
  };

  const handleCheckedGroupLeft = () => {
    setGroupLeft(groupleft.concat(grouprightChecked));
    setGroupRight(not(groupright, grouprightChecked));
    setGroupChecked(not(groupchecked, grouprightChecked));
  };

  const customGroupList = (items) => (
    <Paper style={{ whiteSpace: 'nowrap' }}>
      <List dense component="div" role="list" className={classes.list}>
        <ListItem role="listitem" button>
          <ListItemIcon>
            <Checkbox
              disabled={true}
            />
          </ListItemIcon>
          <ListItemText primary={'Time'} style={{ width: '15%', textAlign: 'center' }} />
          <ListItemText primary={'Group'} style={{ width: '70%', paddingLeft: 30 }} />
          <ListItemText primary={'Teacher'} style={{ width: '15%', textAlign: 'center' }} />
        </ListItem>
        {items.map((value, index) => {
          const labelId = `transfer-list-item-${value.id}-label`;
          return (
            <ListItem key={index} role="listitem" button onClick={handleGroupToggle(value)}>
              <ListItemIcon key={index + 1}>
                <Checkbox
                  key={index + 2}
                  checked={groupchecked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.time} key={index + 3} />
              <ListItemText id={labelId} primary={value.name} key={index + 4} />
              <ListItemText id={labelId} primary={value.teacher} key={index + 5} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );


  const [textbookchecked, setTextbookChecked] = React.useState([]);
  const [textbookleft, setTextbookLeft] = React.useState(global.Alltextbooks.length !== 0 ? global.Alltextbooks : JSON.parse(global_alltextbooks));
  const [textbookright, setTextbookRight] = React.useState([]);
  const [oldtextbookright, setOldTextbookRight] = React.useState([]);

  const textbookleftChecked = intersection(textbookchecked, textbookleft);
  const textbookrightChecked = intersection(textbookchecked, textbookright);

  const handleTextbookToggle = (value) => () => {
    const currentIndex = textbookchecked.indexOf(value);
    const newChecked = [...textbookchecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setTextbookChecked(newChecked);
  };

  const handleCheckedTextbookRight = () => {
    setTextbookRight(textbookright.concat(textbookleftChecked));
    setTextbookLeft(not(textbookleft, textbookleftChecked));
    setTextbookChecked(not(textbookchecked, textbookleftChecked));
  };

  const handleCheckedTextbookLeft = () => {
    setTextbookLeft(textbookleft.concat(textbookrightChecked));
    setTextbookRight(not(textbookright, textbookrightChecked));
    setTextbookChecked(not(textbookchecked, textbookrightChecked));
  };

  const customTextbookListLeft = (items) => (
    <Paper style={{ whiteSpace: 'nowrap' }}>
      <List dense component="div" role="list" className={classes.list}>
        <ListItem role="listitem" button>
          <ListItemIcon>
            <Checkbox
              disabled={true}
            />
          </ListItemIcon>
          <ListItemText primary={'Name'} style={{ width: '80%', textAlign: 'center' }} />
          <ListItemText primary={'Stock'} style={{ width: '20%', paddingLeft: 30 }} />
        </ListItem>
        {items.map((value, index) => {
          const labelId = `transfer-list-item-${value.id}-label`;
          return (
            <ListItem key={index} role="listitem" button onClick={handleTextbookToggle(value)}>
              <ListItemIcon key={index + 1}>
                <Checkbox
                  key={index + 2}
                  checked={textbookchecked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.name} key={index + 3} />
              <ListItemText id={labelId} primary={value.stock} key={index + 4} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );
  const customTextbookListRight = (items) => (
    <Paper style={{ whiteSpace: 'nowrap' }}>
      <List dense component="div" role="list" className={classes.list}>
        <ListItem role="listitem" button>
          <ListItemIcon>
            <Checkbox
              disabled={true}
            />
          </ListItemIcon>
          <ListItemText primary={'Name'} style={{ width: '30%' }} />
          <ListItemText primary={'Packet'} style={{ width: '10%', textAlign: 'center' }} />
          <ListItemText primary={'n'} style={{ width: '10%', textAlign: 'center' }} />
          <ListItemText primary={'Given'} style={{ width: '25%', textAlign: 'center' }} />
          <ListItemText primary={'Mark'} style={{ width: '25%', textAlign: 'center' }} />
        </ListItem>
        {items.map((value, index) => {
          const labelId = `transfer-list-item-${value.id}-label`;
          return (
            <ListItem key={index} role="listitem" button>
              <ListItemIcon key={index + 1} onClick={handleTextbookToggle(value)}>
                <Checkbox
                  key={index + 2}
                  checked={textbookrightChecked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText primary={value.name} style={{ width: '30%' }} key={index + 3} onClick={handleTextbookToggle(value.id)} />
              <ListItemText style={{ width: '10%', textAlign: 'center' }} key={index + 4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      key={index + 5}
                      // checked={state.checkedB}
                      // onChange={handleChange}
                      name="datesintransition"
                      color="primary"
                    />
                  }
                  key={index + 6}
                />
              </ListItemText>
              <ListItemText primary={''} style={{ width: '10%', textAlign: 'center' }} key={index + 7} onClick={handleTextbookToggle(value.id)} />
              <ListItemText primary={value.date} style={{ width: '25%', textAlign: 'center' }} key={index + 8} onClick={handleTextbookToggle(value.id)} />
              <ListItemText primary={value.mark} style={{ width: '25%', textAlign: 'center' }} key={index + 9} onClick={handleTextbookToggle(value.id)} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  // transfer list for end

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getAllinfos = useCallback(async () => {
    try {
      const response = await axios.get('/api/levels');
      if (isMountedRef.current) {
        setLevels(response.data.levels);
      }
    } catch (err) {
      console.log(err)
    }

    try {
      const response = await axios.get('/api/payments');
      if (isMountedRef.current) {
        setPayments(response.data.payments);
      }
    } catch (err) {
      console.log(err)
    }

    try {
      const response = await axios.get('/api/users');
      if (isMountedRef.current) {
        setRecommended(response.data.users);
      }
    } catch (err) {
      console.log(err)
    }

  }, [isMountedRef]);

  const [statearrGroupinfo, setStateArrGroupinfo] = React.useState([]);

  const getGroupsstudentids = useCallback(async () => {
    arrGroupinfo = []
    httpClient.get(`api/groupsstudents/${student.id}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          json.groupids.map((val) => {
            httpClient.get(`api/group/${val.groupid}`)
              .then(json => {
                if (json.success && isMountedRef.current) {
                  setStateArrGroupinfo(json.group)
                }
              })
              .catch((error) => {
                console.log('error--->', error);
              });
          })
        }
      })
      .catch((error) => {
        console.log('error--->', error);
      });
  }, [isMountedRef]);

  const getTextbookinfo = useCallback(async () => {
    // httpClient.get(`api/textbooks/8395`)
    httpClient.get(`api/textbooks/${student.id}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setTextbookRight(json.textbook);
          setOldTextbookRight(json.textbook);
        }
      })
      .catch((error) => {
        console.log('error--->', error);
      });
  }, [isMountedRef]);

  useEffect(() => {
    handleSetGroupinfo();
  }, [statearrGroupinfo])

  const handleSetGroupinfo = useCallback(async () => {
    if (statearrGroupinfo.length !== 0) {
      await arrGroupinfo.push(statearrGroupinfo)
      await setSelectedgroups(arrGroupinfo)
      // await setOldSelectedgroups(arrGroupinfo)
      await setGroupRight(arrGroupinfo)
    }
  });

  const handlegetWeekStatus = (daysOfWeek) => {
    if (daysOfWeek & 16) {
      setMonday(true)
    }
    if (daysOfWeek & 8) {
      setTuesday(true)
    }
    if (daysOfWeek & 4) {
      setWednesday(true)
    }
    if (daysOfWeek & 2) {
      setThursday(true)
    }
    if (daysOfWeek & 1) {
      setFriday(true)
    }
    if (daysOfWeek & 32) {
      setSaturday(true)
    }
  }

  useEffect(() => {
    getAllinfos();
    handlegetWeekStatus(student.daysOfWeek)
    getGroupsstudentids();
    getTextbookinfo();
  }, [getAllinfos]);

  const handlegetAddress = (address) => {
    var res = '';
    for (var i = 0; i < address.length; i++) {
      res += String.fromCharCode(address[i]);
    }
    return res;
  }

  const handlegetNotes = (notes) => {
    var res = '';
    for (var i = 0; i < notes.length; i++) {
      res += String.fromCharCode(notes[i]);
    }
    return res;
  }

  const handlegetRenewing = (isActive) => {
    let renewStatus = 0;
    if (isActive & 2) {
      renewStatus = 1;
    }
    if (isActive & 4) {
      renewStatus = 2;
    }
    if (renewStatus === 1) {
      return "not_renewing";
    }
    else if (renewStatus === 2) {
      return "renewing";
    }
    else {
      return "undecided";
    }
  }

  const handlegetWeekdays = () => {
    let daysofweekNum = 0;
    if (monday) {
      daysofweekNum += 16;
    }
    if (tuesday) {
      daysofweekNum += 8;
    }
    if (wednesday) {
      daysofweekNum += 4;
    }
    if (thursday) {
      daysofweekNum += 2;
    }
    if (friday) {
      daysofweekNum += 1;
    }
    if (saturday) {
      daysofweekNum = 32;
    }

    return daysofweekNum;
  }

  const Edit = ({
    onSubmit,
    children,
  }) => {
    return (
      <div className="card">
        <form onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    );
  }

  const ImgUpload = ({
    onChange,
    src,
  }) => {
    return (
      <label htmlFor="photo-upload" className="custom-file-upload fas">
        <div className="img-wrap img-upload" >
          <img htmlFor="photo-upload" src={src} style={{ width: '100%', height: '100%', objectFit: 'fill' }} alt="photo-upload" />
        </div>
        <input id="photo-upload" type="file" onChange={onChange} style={{ display: 'none' }} />
      </label>
    );
  }

  const photoUpload = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const handleChangeSatAttendance = () => {
    if (!saturday) {
      setMonday(false)
      setTuesday(false)
      setWednesday(false)
      setThursday(false)
      setFriday(false)
    }
    setSaturday(!saturday)
  }

  return (
    <Formik
      initialValues={{
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        enrolled: student.enrolled || new Date(),
        tel: student.tel || '',
        tel2: student.tel2 || '',
        IDNumber: student.IDNumber || '',
        email: student.email || '',
        postcode: student.postcode || '',
        address: student.address ? student.address.data.length !== 0 ? handlegetAddress(student.address.data) : '' : '' || '',
        birthday: student.birthday || new Date(),
        startDate: student.startDate || new Date(),
        endDate: student.endDate || new Date(),
        notes: student.notes ? student.notes.data.length !== 0 ? handlegetNotes(student.notes.data) : '' : '' || '',
        newnotes: '',
        renewals: student.renewals || 0,
        price: student.price || '',
        libraryAccess: student.libraryAccess === 'Y' ? true : false || false,
        libaccess: student.libaccess === 'Y' ? true : false || false,
        toeicaccess: student.toeicaccess === 'Y' ? true : false || false,
        maxHours: student.maxHours || '',
        renewing: student.isActive ? handlegetRenewing(student.isActive) : '' || '',
        paymentpending: student.pending === 'Y' ? true : false || false,
      }}
      onSubmit={
        async (values, { setErrors }) => {
          let userId = window.localStorage.getItem('userid');
          let daysofweekNum = handlegetWeekdays();
          setSelectedgroups(groupright)
          // setOldTextbookRight(textbookright)
          let lev, lang, howdid;
          httpClient.get(`api/classes/all`)
            .then(json => {
              if (json.success && isMountedRef.current) {
                let data = json.classes;
                for (let i = 0; i < data.length; i++) {
                  if (data[i].name === combovalues.level)
                    lev = data[i].id;
                }
                httpClient.get(`api/languages/all`)
                  .then(json => {
                    if (json.success && isMountedRef.current) {
                      setSelectedgroups(groupright)
                      // setOldTextbookRight(textbookright)
                      let data = json.languages;
                      for (let i = 0; i < data.length; i++) {
                        if (data[i].name === combovalues.language)
                          lang = data[i].id;
                      }
                      httpClient.get(`api/howdidyouhear/all`)
                        .then(json => {
                          if (json.success && isMountedRef.current) {
                            setSelectedgroups(groupright)
                            // setOldTextbookRight(textbookright)
                            let data = json.howdidyouhears;
                            for (let i = 0; i < data.length; i++) {
                              if (data[i].name === combovalues.howdidyouhear)
                                howdid = data[i].id;
                            }
                            let senddata = { userId: userId, id: student.id, values: values, combovalues: { level: lev, language: lang, howdidyouhear: howdid }, daysofweekNum: daysofweekNum, groups: groupright, oldgroups: selectedGroups, textbooks: textbookright, oldtextbooks: oldtextbookright };
                            console.log('senddata--->', senddata)
                            const url = `api/student/${(update) ? 'update' : 'create'}`
                            const method = (update) ? 'put' : 'post';
                            httpClient[method](url, senddata)
                              .then(json => {
                                setSelectedgroups(groupright)
                                setOldTextbookRight(textbookright)
                                if (json.success && isMountedRef.current) {
                                  enqueueSnackbar(
                                    update ? 'Updated successfully' : 'Added successfully',
                                    { variant: 'success' }
                                  )
                                }
                                else
                                  enqueueSnackbar(
                                    'FAILD',
                                    { variant: 'error' }
                                  )
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    >
      {({
        errors,
        values,
        touched,
        handleBlur,
        handleSubmit,
        handleChange,
        setFieldValue
      }) => {

        return (
          <form onSubmit={handleSubmit} className={clsx(classes.root)} >
            <Card>
              <CardContent>
                <Grid container >
                  <Grid item md={4} xs={12} className={classes.left_container}>
                    <Grid container style={{ justifyContent: 'center' }}>
                      <Grid item md={6}>
                        {
                          <Edit onSubmit={(e) => this.handleSubmit(e)}>
                            <ImgUpload onChange={(e) => photoUpload(e)} src={imagePreviewUrl !== "" ? imagePreviewUrl : "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"} />
                          </Edit>
                        }
                      </Grid>
                    </Grid>
                    <Grid container >
                      <Grid item md={12} style={{ width: '100%' }}>
                        <div className={classes.row_container}>
                          <div className={classes.boldletter}>First Name:</div>
                          <CssTextField
                            required
                            name="firstName"
                            style={{ height: 50, width: 230 }}
                            value={values.firstName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className={classes.row_container}>
                          <div className={classes.boldletter}>Last Name:</div>
                          <CssTextField
                            required
                            name="lastName"
                            style={{ height: 50, width: 230 }}
                            value={values.lastName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className={classes.row_container}>
                          <div className={classes.boldletter}>Language:</div>
                          <Autocomplete
                            name="language"
                            options={global.languages.length !== 0 ? global.languages : JSON.parse(global_languages)}
                            getOptionLabel={(option) => option}
                            style={{ width: 230, height: 50 }}
                            renderInput={(params) => <CssTextField {...params} />}
                            onChange={(event, value) => { handleChangeCombovalues('language', value) }}
                            value={combovalues.language}
                          />
                        </div>
                        <div className={classes.row_container}>
                          <div className={classes.boldletter}>Level:</div>
                          <Autocomplete
                            name="level"
                            options={global.classis.length !== 0 ? global.classis : JSON.parse(global_levels)}
                            getOptionLabel={(option) => option}
                            style={{ width: 230, height: 50 }}
                            renderInput={(params) => <CssTextField {...params} />}
                            value={combovalues.level}
                            onChange={(event, value) => { handleChangeCombovalues('level', value) }}
                          />
                        </div>
                        <div className={classes.row_container}>
                          <div className={classes.boldletter}>Heard of us:</div>
                          <Autocomplete
                            id="howdidheard"
                            options={global.howdidyouhear.length !== 0 ? global.howdidyouhear : JSON.parse(global_howdidyouhear)}
                            getOptionLabel={(option) => option}
                            style={{ width: 230, height: 50 }}
                            renderInput={(params) => <CssTextField {...params} />}
                            value={combovalues.howdidyouhear}
                            onChange={(event, value) => { handleChangeCombovalues('howdidyouhear', value) }}
                          />
                        </div>
                        <div className={classes.row_container}>
                          <div className={classes.boldletter}>Enrolled:</div>
                          <KeyboardDatePicker
                            className={classes.datePicker}
                            format="MM/DD/YYYY"
                            name="enrolled"
                            value={values.enrolled}
                            onChange={(date) => setFieldValue('enrolled', date)}
                          />
                        </div>
                        <div className={classes.row_container}>
                          <div className={classes.boldletter}>Phone:</div>
                          <CssTextField
                            name="tel"
                            style={{ height: 50, width: 230 }}
                            value={values.tel}
                            onChange={handleChange}
                          />
                        </div>
                        <div className={classes.row_container}>
                          <div className={classes.boldletter}>Alt. phone:</div>
                          <CssTextField
                            id="tel2"
                            style={{ height: 50, width: 230 }}
                            value={values.tel2}
                            onChange={handleChange}
                          />
                        </div>
                        <div className={classes.row_container}>
                          <div className={classes.boldletter}>ID:</div>
                          <CssTextField
                            id="IDNumber"
                            style={{ height: 50, width: 230 }}
                            value={values.IDNumber}
                            onChange={handleChange}
                          />
                        </div>
                        <div className={classes.row_container}>
                          <div className={classes.boldletter}>Email:</div>
                          <CssTextField
                            id="email"
                            style={{ height: 50, width: 230 }}
                            value={values.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className={classes.row_container}>
                          <div className={classes.boldletter}>Postcode:</div>
                          <CssTextField
                            id="postcode"
                            style={{ height: 50, width: 230 }}
                            value={values.postcode}
                            onChange={handleChange}
                          />
                        </div>
                        <div className={classes.row_container}>
                          <div className={classes.boldletter}>Address:</div>
                          <CssTextField1
                            style={{ width: 230 }}
                            id="address"
                            multiline
                            rows={5}
                            value={values.address}
                            onChange={handleChange}
                          />
                        </div>
                        <div className={classes.row_container}>
                          <div className={classes.boldletter}>Birthday:</div>
                          <KeyboardDatePicker
                            required
                            className={classes.datePicker}
                            format="MM/DD/YYYY"
                            name="birthday"
                            value={values.birthday}
                            onChange={(date) => setFieldValue('birthday', date)}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <Grid container >
                      <Grid item md={8} xs={12} className={classes.left_container}>
                        <Grid item xs={12} style={{ marginBottom: 15 }}>
                          <Grid container >
                            <Grid item md={4} xs={12}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="datesintransition"
                                    color="primary"
                                  />
                                }
                                label="Dates in transition"
                              />
                            </Grid>
                            <Grid item md={4} xs={12}>
                              <TextField id="addworkingdays" label="add working days" />
                            </Grid>
                            <Grid item md={4} xs={12}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={values.paymentpending}
                                    onChange={handleChange}
                                    name="paymentpending"
                                    color="primary"
                                  />
                                }
                                label="Payment pending"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid container style={{ marginBottom: 15 }} >
                          <Grid item md={6} xs={12}>
                            <div className={classes.row_container}>
                              <div className={classes.boldletter}>Start Date:</div>
                              <KeyboardDatePicker
                                required
                                format="MM/DD/YYYY"
                                name="startDate"
                                value={values.startDate}
                                style={{ width: '65%' }}
                                onChange={(date) => setFieldValue('startDate', date)}
                              />
                            </div>
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <div className={classes.row_container}>
                              <div className={classes.boldletter}>End Date:</div>
                              <KeyboardDatePicker
                                required
                                format="MM/DD/YYYY"
                                name="endDate"
                                value={values.endDate}
                                style={{ width: '65%' }}
                                onChange={(date) => setFieldValue('endDate', date)}
                              />
                            </div>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: 15 }}>
                          <div className={classes.row_container} style={{ flexWrap: 'wrap' }}>
                            <div className={classes.boldletter}>Attendance:</div>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={monday}
                                  onChange={() => { setMonday(!monday); setSaturday(false); }}
                                  name="mon"
                                  color="primary"
                                />
                              }
                              label="Mon"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={tuesday}
                                  onChange={() => { setTuesday(!tuesday); setSaturday(false); }}
                                  name="tue"
                                  color="primary"
                                />
                              }
                              label="Tue"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={wednesday}
                                  onChange={() => { setWednesday(!wednesday); setSaturday(false); }}
                                  name="wed"
                                  color="primary"
                                />
                              }
                              label="Wed"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={thursday}
                                  onChange={() => { setThursday(!thursday); setSaturday(false); }}
                                  name="thu"
                                  color="primary"
                                />
                              }
                              label="Thu"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={friday}
                                  onChange={() => { setFriday(!friday); setSaturday(false); }}
                                  name="fri"
                                  color="primary"
                                />
                              }
                              label="Fri"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={saturday}
                                  onChange={handleChangeSatAttendance}
                                  name="sat"
                                  color="primary"
                                />
                              }
                              label="Sat"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={sunday}
                                  onChange={() => { setSunday(!sunday) }}
                                  name="sun"
                                  color="primary"
                                />
                              }
                              label="Sun"
                            />
                          </div>
                        </Grid>
                        <Grid container style={{ marginBottom: 15 }} >
                          <Grid item md={6} xs={12} className={classes.left_container}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={recommendedFlag}
                                  onChange={() => { setRecommendedFlag(!recommendedFlag); }}
                                  name="recommended"
                                  color="primary"
                                />
                              }
                              label="Recommended by"
                            />
                            <Autocomplete
                              id="recommended"
                              options={recommended}
                              getOptionLabel={(option) => option.title}
                              className={classes.recomment_combo}
                              renderInput={(params) => <CssTextField {...params} />}
                              disabled={!recommendedFlag}
                            />
                            <TableContainer component={Paper} style={{ height: 260 }} style={!recommendedFlag ? { display: 'none' } : { display: 'block' }}>
                              <Table aria-label="customized table">
                                <TableHead>
                                  <TableRow>
                                    <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>to</StyledTableCell>
                                    <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Dealine</StyledTableCell>
                                    <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Disc.</StyledTableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {rows.map((row, index) => (
                                    <StyledTableRow key={index}>
                                      <StyledTableCell key={index + 1}>{row.book}</StyledTableCell>
                                      <StyledTableCell key={index + 2}>{row.pack}</StyledTableCell>
                                      <StyledTableCell key={index + 3}>{row.date}</StyledTableCell>
                                    </StyledTableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <div>Add quick note:</div>
                            <CssTextField1
                              style={{ width: '100%', marginBottom: 15 }}
                              id="newnotes"
                              multiline
                              variant="outlined"
                              rows={5}
                              value={values.newnotes}
                              onChange={handleChange}
                            />
                            <PerfectScrollbar>
                              <CssTextField1
                                style={{ width: '100%' }}
                                id="quick_note_content"
                                multiline
                                rows={5}
                                variant="outlined"
                                value={values.notes}
                              />
                            </PerfectScrollbar>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <Grid container style={{ marginBottom: 15 }} >
                          <Grid item md={7} xs={12} className={classes.left_container}>
                            <div className={classes.row_container} style={{ alignItems: 'baseline' }}>
                              <div className={classes.boldletter}>Renewals:</div>
                              <CssTextField
                                type='number'
                                id="renewals"
                                style={{ width: '50%' }}
                                value={values.renewals}
                                onChange={handleChange}
                              />
                            </div>
                            <div className={classes.row_container} style={{ alignItems: 'baseline' }}>
                              <div className={classes.boldletter}>Max HR:</div>
                              <CssTextField
                                id="maxHours"
                                style={{ width: '50%' }}
                                value={values.maxHours}
                                onChange={handleChange}
                                placeholder="HH:MM"
                              />
                            </div>
                          </Grid>
                          <Grid item md={5} xs={12}>
                            <FormControl component="fieldset">
                              <RadioGroup aria-label="gender" name="renewing" value={values.renewing} onChange={handleChange}>
                                <FormControlLabel value="undecided" control={<Radio />} label="Undecided" />
                                <FormControlLabel value="renewing" control={<Radio />} label="Renewing" />
                                <FormControlLabel value="not_renewing" control={<Radio />} label="Not Renewing" />
                              </RadioGroup>
                            </FormControl>
                          </Grid>
                        </Grid>
                        <Grid container style={{ marginBottom: 15 }} >
                          <div className={classes.row_container} style={{ flexWrap: 'wrap' }}>
                            <div className={classes.boldletter}>Payments:</div>
                            <Button
                              color="secondary"
                              variant="contained"
                              style={{ marginRight: 10 }}
                            >
                              New
                            </Button>
                            <Autocomplete
                              id="payments"
                              options={payments}
                              getOptionLabel={(option) => option.title}
                              className={classes.payments_combo}
                              renderInput={(params) => <CssTextField {...params} />}
                            />
                          </div>
                          <div className={classes.row_container}>
                            <CssTextField1
                              variant="outlined"
                              value={values.price}
                              onChange={handleChange}
                              name="price"
                              InputProps={{
                                inputComponent: NumberFormatCustom,
                              }}
                              style={{ width: '60%' }}
                            />
                          </div>
                          <div className={classes.row_container}>
                            <KeyboardDatePicker
                              className={classes.datePicker}
                              format="MM/DD/YYYY"
                              name="birthday"
                              value={selectedDate}
                              onChange={handleDateChange}
                              style={{ width: '60%' }}
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="paid"
                                  color="primary"
                                />
                              }
                              label="Paid"
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* 
                    <Grid container alignItems="center" className={classes.transfer_root}>
                      <Grid item md={5} xs={12}>
                        <div className={classes.row_container}>
                          <div className={classes.boldletter}>Search:</div>
                          <CssTextField
                            id="groups_search"
                            style={{ height: 50 }}
                          />
                        </div>
                        {customGroupList(groupleft)}
                      </Grid>
                      <Grid item md={2} xs={12}>
                        <Grid container direction="column" alignItems="center">
                          <div className={classes.boldletter}>Groups</div>
                          <Button
                            color="secondary"
                            variant="contained"
                            className={classes.button}
                            onClick={handleCheckedGroupRight}
                            disabled={groupleftChecked.length === 0}
                            aria-label="move selected right"
                          >
                            &gt;
                          </Button>
                          <Button
                            color="secondary"
                            variant="contained"
                            className={classes.button}
                            onClick={handleCheckedGroupLeft}
                            disabled={grouprightChecked.length === 0}
                            aria-label="move selected left"
                          >
                            &lt;
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid item md={5} xs={12}>{customGroupList(groupright)}</Grid>
                    </Grid> */}

                    {/* <Grid container alignItems="center" className={classes.transfer_root}>
                      <Grid item md={5} xs={12}>
                        <div className={classes.row_container}>
                          <div className={classes.boldletter}>Search:</div>
                          <CssTextField
                            id="textbooks_search"
                            style={{ height: 50 }}
                          />
                        </div>
                        {customTextbookListLeft(textbookleft)}
                      </Grid>
                      <Grid item md={2} xs={12}>
                        <Grid container direction="column" alignItems="center">
                          <div className={classes.boldletter}>Textbooks</div>
                          <Button
                            color="secondary"
                            variant="contained"
                            className={classes.button}
                            onClick={handleCheckedTextbookRight}
                            disabled={textbookleftChecked.length === 0}
                            aria-label="move selected right"
                          >
                            &gt;
                          </Button>
                          <Button
                            color="secondary"
                            variant="contained"
                            className={classes.button}
                            onClick={handleCheckedTextbookLeft}
                            disabled={textbookrightChecked.length === 0}
                            aria-label="move selected left"
                          >
                            &lt;
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid item md={5} xs={12}>{customTextbookListRight(textbookright)}</Grid>
                    </Grid> */}

                    <Grid item xs={12} className={classes.row_container}>
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.libaccess}
                              color="primary"
                              name="libaccess"
                              onChange={handleChange}
                            />
                          }
                          label="Can contact"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.libraryAccess}
                              color="primary"
                              name="libraryAccess"
                              onChange={handleChange}
                            />
                          }
                          label="Library access"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.toeicaccess}
                              color="primary"
                              name="toeicaccess"
                              onChange={handleChange}
                            />
                          }
                          label="TOEIC access"
                        />
                      </div>
                      <div>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => history.goBack()}
                          className={classes.button}
                        >
                          Cancel
                        </Button>
                        <Button
                          color="secondary"
                          variant="contained"
                          className={classes.button}
                          type="submit"
                        >
                          Save
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </form>
        )
      }}
    </Formik >
  );
};

StudentAddEditForm.propTypes = {
  update: PropTypes.bool,
  student: PropTypes.object,
};

StudentAddEditForm.defaultProps = {
  student: {},
}

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(StudentAddEditForm);
