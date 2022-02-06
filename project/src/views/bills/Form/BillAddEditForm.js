import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  Button,
  makeStyles,
  CardContent,
  withStyles
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FixedTextField from 'src/components/FixedTextField';
import BillItemDetail from 'src/components/BillcommonItemdetail';
import BillItem from 'src/components/BillcommonItem';
import Radio from '@material-ui/core/Radio';
import 'src/components/global';
import GroupComponent from 'src/components/group';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import RadioGroup from '@material-ui/core/RadioGroup';
import httpClient from 'src/utils/httpClient';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import { connectIntl } from 'src/contexts/Intl';
import { useHistory } from 'react-router';
import {
  getLevels,
  getAllLevels,
  getTextbooks,
  getTeachers,
  getRooms,
  getAllStudents,
  getAllTeachers,
  getAllTextbooks,
  getAllRooms
} from 'src/localstorage';
var { global_levels } = getLevels();
var { global_textbooks } = getTextbooks();
var { global_rooms } = getRooms();
var { global_teachers } = getTeachers();
var { global_allstudents } = getAllStudents();
var { global_allteachers } = getAllTeachers();
var { global_alllevels } = getAllLevels();
var { global_alltextbooks } = getAllTextbooks();
var { global_allrooms } = getAllRooms();

var { } = getLevels();

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

const BillAddEditForm = ({ studentinfo, userinfo, commonitems, update, intl }) => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();

  return (
    <Formik
      initialValues={{
        // name: group.name || '',
        // startTime: group.time || '',
        // endTime: group.endtime || '',
        // unit: group.unit || '',
      }}
      onSubmit={
        async (values, { setErrors }) => {
          // let levelId = '', teacherId = '', textbookId = '', roomId = '', roomName = '';
          // let jsonallteacher = global.Allteachers.length !== 0 ? global.Allteachers : JSON.parse(global_allteachers);
          // jsonallteacher.map((val) => {
          //   if (val.name === combovalues.teacher)
          //     teacherId = val.id
          // })

          // let jsonalllevels = global.Allclassis.length !== 0 ? global.Allclassis : JSON.parse(global_alllevels);
          // jsonalllevels.map((val) => {
          //   if (val.name === combovalues.level)
          //     levelId = val.id
          // })

          // let jsonalltextbooks = global.Alltextbooks.length !== 0 ? global.Alltextbooks : JSON.parse(global_alltextbooks);
          // jsonalltextbooks.map((val) => {
          //   if (val.name === combovalues.textbook)
          //     textbookId = val.id
          // })

          // let jsonallrooms = global.Allrooms.length !== 0 ? global.Allrooms : JSON.parse(global_allrooms);
          // jsonallrooms.map((val) => {
          //   if (val.name === combovalues.room) {
          //     roomId = val.id;
          //     roomName = val.name;
          //   }
          // })

          // let senddata = {
          //   values: values,
          //   students: rightStudnets,
          //   oldstudents: oldstudents,
          //   id: groupid,
          //   combovalues: {
          //     teacherId: teacherId,
          //     levelId: levelId,
          //     textbookId: textbookId,
          //     roomId: roomId,
          //     roomName: roomName
          //   },
          //   daysint: handlegetWeekdays(),
          //   groupstatus: statu_private ? '2' : '0'
          // };

          // const url = `api/group/${(update) ? 'update' : 'create'}`
          // const method = (update) ? 'put' : 'post';
          // httpClient[method](url, senddata)
          //   .then(json => {
          //     if (json.success && isMountedRef.current) {
          //       setOldStudnets(rightStudnets)
          //       enqueueSnackbar(
          //         update ? 'Updated successfully' : 'Added successfully',
          //         { variant: 'success' }
          //       )
          //     }
          //     else
          //       enqueueSnackbar(
          //         'FAILD',
          //         { variant: 'error' }
          //       )
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
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
                  <Grid item xs={12} md={3} className={classes.row_Div} style={{ padding: 10 }}>
                    <div className={classes.boldletter}>Print Preview:</div>
                    <Button
                      color="secondary"
                      variant="contained"
                    >
                      Zoom
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.row_Div} style={{ padding: 10 }}>
                    <div className={classes.boldletter}>Edit Bill:</div>
                    <div>Bill number: please select bill type</div>
                  </Grid>
                  <Grid item xs={12} md={3} className={classes.row_Div} style={{ padding: 10 }}>
                    <div className={classes.boldletter}>Common Items:</div>
                    <Button
                      color="secondary"
                      variant="contained"
                    >
                      Save
                    </Button>
                  </Grid>

                  <Grid item xs={12} md={3} style={{ padding: 10 }}>
                    <img src="/static/images/bill.png" style={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={12} md={6} style={{ padding: 10 }}>
                    <RadioGroup aria-label="gender" name="payment_method"
                      style={{ flexDirection: "row", width: '100%', justifyContent: 'space-between' }}
                    // value={values.payment_method}
                    // onChange={handleChange}
                    >
                      <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                      <FormControlLabel value="card" control={<Radio />} label="Card" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                      <FormControlLabel value="transfer" control={<Radio />} label="Transfer" />
                      <FormControlLabel value="company" control={<Radio />} label="Company" />
                      <FormControlLabel value="pro_forma" control={<Radio />} label="Pro forma" />
                    </RadioGroup>
                    <div style={{ width: '100%', marginTop: 5, marginBottom: 5, padding: 10, border: '1px solid #333', overflow: 'auto', height: 460 }}>
                      <BillItemDetail />
                      <BillItemDetail />
                      <BillItemDetail />
                    </div>
                    <div className={classes.row_Div}>
                      <RadioGroup aria-label="gender" name="library_access"
                        style={{ flexDirection: "row" }}
                      // value={values.payment_method}
                      // onChange={handleChange}
                      >
                        <FormControlLabel value="give_library" control={<Radio />} label="Give Library Access" />
                        <FormControlLabel value="remove_library" control={<Radio />} label="Remove Library Access" />
                      </RadioGroup>
                      <div style={{ display: 'flex' }}>
                        <div className={classes.boldletter}>Total:</div>
                        <div className={classes.boldletter}>43.50 €</div>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={3} style={{ padding: 10, height: 550, overflow: 'auto' }}>
                    {
                      commonitems.map((val, index) => {
                        return (
                          <BillItem
                            item={val}
                            key={index}
                          />
                        )
                      })
                    }
                  </Grid>
                  <Grid item xs={12} md={4} className={classes.row_Div} style={{ padding: 10 }}>
                    <div className={classes.row_Div} style={{ width: '100%' }}>
                      <div className={classes.boldletter}>Header:</div>
                      <Button
                        color="secondary"
                        variant="contained"
                      >
                        Save
                      </Button>
                      <CssTextField
                        style={{ width: '100%', marginTop: 5 }}
                        id="header"
                        multiline
                        variant="outlined"
                        rows={4}
                      // value={values.newnotes}
                      // onChange={handleChange}
                      />
                    </div>
                    <div className={classes.row_Div} style={{ width: '100%' }}>
                      <div className={classes.boldletter}>Footer:</div>
                      <CssTextField
                        style={{ width: '100%', marginTop: 5 }}
                        id="footer"
                        multiline
                        variant="outlined"
                        rows={4}
                      // value={values.newnotes}
                      // onChange={handleChange}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} className={classes.row_Div} style={{ padding: 10 }}>
                    <Grid container >
                      <div style={{ alignItems: 'center', width: '100%', display: 'flex' }}>
                        <Grid item xs={3} style={{ padding: 5 }}>
                          <div style={{ width: '100%' }}>Item Name:</div>
                        </Grid>
                        <Grid item xs={9} style={{ padding: 5 }}>
                          <div style={{ width: '100%', display: 'flex' }}>
                            <CssTextField
                              style={{ width: '70%', marginRight: 7 }}
                              id="itemName"
                              variant="outlined"
                            // value={values.newnotes}
                            // onChange={handleChange}
                            />
                            <Button
                              color="secondary"
                              variant="contained"
                              style={{ width: '30%' }}
                            >
                              Save
                            </Button>
                          </div>
                        </Grid>
                      </div>
                      <div style={{ width: '100%', display: 'flex' }}>
                        <Grid item xs={3} style={{ padding: 5 }}>
                          <div style={{ width: '100%', marginBottom: 30 }}>Item Text:</div>
                          <RadioGroup aria-label="gender" name="library_access1"
                          // value={values.payment_method}
                          // onChange={handleChange}
                          >
                            <FormControlLabel value="give_library1" control={<Radio />} label="Lib .acc" />
                            <FormControlLabel value="remove_library1" control={<Radio />} label="No lib." />
                          </RadioGroup>
                        </Grid>
                        <Grid item xs={9} style={{ padding: 5 }}>
                          <CssTextField
                            style={{ width: '100%' }}
                            id="itemName"
                            multiline
                            variant="outlined"
                            rows={4}
                          // value={values.newnotes}
                          // onChange={handleChange}
                          />
                        </Grid>
                      </div>
                      <div style={{ width: '100%', display: 'flex', marginBottom: 10 }}>
                        <Grid item xs={3} style={{ padding: 5 }}></Grid>
                        <Grid item xs={9} style={{ padding: 5 }}>
                          <div style={{ width: '100%', display: 'flex' }}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="reddemRec"
                                  color="primary"
                                />
                              }
                              label="Redeem rec."
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="recommeded"
                                  color="primary"
                                />
                              }
                              label="Recommeded"
                            />
                          </div>
                        </Grid>
                      </div>
                      <div className={classes.row_Div} style={{ width: '100%' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="itemPrice"
                              color="primary"
                            />
                          }
                          label="Item Price:"
                        />
                        <div style={{ display: 'flex' }}>
                          <CssTextField
                            id="IDNumber"
                            variant="outlined"
                            style={{ marginRight: 5, marginLeft: 5, width: 150 }}
                          // value={values.IDNumber}
                          // onChange={handleChange}
                          />
                          <div style={{ marginTop: 'auto' }}>,</div>
                          <CssTextField
                            id="IDNumber"
                            variant="outlined"
                            style={{ marginRight: 5, marginLeft: 5, width: 70 }}
                          // value={values.IDNumber}
                          // onChange={handleChange}
                          />
                          <div style={{ marginTop: 'auto' }}>€</div>
                        </div>
                      </div>

                      <div className={classes.row_Div} style={{ width: '100%' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="discount"
                              color="primary"
                            />
                          }
                          label="Discount:"
                        />
                        <div style={{ display: 'flex' }}>
                          <CssTextField
                            id="IDNumber"
                            variant="outlined"
                            style={{ marginRight: 5, marginLeft: 5, width: 100 }}
                          // value={values.IDNumber}
                          // onChange={handleChange}
                          />
                          <div style={{ margin: 'auto', marginRight: 15, marginLeft: 15 }}>%</div>
                          <Button
                            color="secondary"
                            variant="contained"
                          >
                            Add to bill
                          </Button>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4} className={classes.row_Div} style={{ padding: 10 }}>
                    <div className={classes.row_Div} style={{ width: '100%' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="name"
                            color="primary"
                          />
                        }
                        label="Name:"
                      />
                      <CssTextField
                        id="IDNumber"
                        variant="outlined"
                        style={{ marginLeft: 5, width: '70%' }}
                      // value={values.IDNumber}
                      // onChange={handleChange}
                      />
                    </div>
                    <div className={classes.row_Div} style={{ width: '100%' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="id"
                            color="primary"
                          />
                        }
                        label="ID:"
                      />
                      <CssTextField
                        id="IDNumber"
                        variant="outlined"
                        style={{ marginLeft: 5, width: '70%' }}
                      // value={values.IDNumber}
                      // onChange={handleChange}
                      />
                    </div>
                    <div className={classes.row_Div} style={{ width: '100%' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="billingInfo"
                            color="primary"
                          />
                        }
                        label="Billing info:"
                      />
                      <CssTextField
                        id="IDNumber"
                        multiline
                        variant="outlined"
                        rows={4}
                        style={{ marginLeft: 5, width: '70%' }}
                      // value={values.IDNumber}
                      // onChange={handleChange}
                      />
                    </div>
                    <div className={classes.row_Div} style={{ width: '100%' }}>
                      <Button
                        color="secondary"
                        variant="contained"
                        style={{ height: 45 }}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="secondary"
                        variant="contained"
                        style={{ height: 45 }}
                      >
                        Just Save
                      </Button>
                      <Button
                        color="secondary"
                        variant="contained"
                        style={{ height: 45 }}
                      >
                        Save and Print
                      </Button>
                    </div>
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

BillAddEditForm.propTypes = {
  update: PropTypes.bool,
  studentinfo: PropTypes.object,
  commonitems: PropTypes.object,
  userinfo: PropTypes.object,
  className: PropTypes.string,
};

BillAddEditForm.defaultProps = {
  studentinfo: [],
  userinfo: [],
  commonitems: []
}

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(BillAddEditForm);
