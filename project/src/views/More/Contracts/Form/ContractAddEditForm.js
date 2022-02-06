import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Formik } from 'formik';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  Button,
  makeStyles,
  CardContent,
  withStyles
} from '@material-ui/core';
import FixedTextField from 'src/components/FixedTextField';
import 'src/components/global';
import NumberFormat from 'react-number-format';
import { connectIntl } from 'src/contexts/Intl';
import httpClient from 'src/utils/httpClient';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';

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
    width: 230, height: 50,
    // "@media (max-width: 1370px)": { width: 200 }
  },
  inputStyle: {
    width: 200, marginRight: 10,
    "@media (max-width: 611px)": { width: '100% !important' }
  }
}));

const ContractAddEditForm = ({ contract, update }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [paymentitems, setPaymentitems] = React.useState([]);
  const [contractid, setContractid] = React.useState(0)

  useEffect(() => {
    handleSetPaymentArr();
    if (contract.length !== undefined)
      setContractid(contract[0].id)
  }, [])

  const handleSetPaymentArr = () => {
    // console.log('contract.length--->', contract.length)
    let data = []
    if (contract.length !== 0)
      for (let i = 0; i < contract.length; i++)
        data.push(contract[i].cost);
    if (contract.length === undefined)
      data.push('')
    setPaymentitems(data);
  }

  const handleAddPaymentItem = () => {
    let data = [];
    if (paymentitems.length === 0)
      data.push('')
    else {
      for (let i = 0; i < paymentitems.length; i++)
        data.push(paymentitems[i])
      data.push('')
    }
    setPaymentitems(data);
  }

  const handleRemovePaymentItem = (index) => {
    if (paymentitems.length !== 1) {
      const newgroupitems = [...paymentitems];
      newgroupitems.splice(index, 1);
      setPaymentitems(newgroupitems);
    }
  }

  const handleChangePrices = (event, index) => {
    let data = [...paymentitems]
    data[index] = event.target.value
    setPaymentitems(data)
  }

  return (
    <Formik
      initialValues={{
        name: contract.length !== undefined ? contract[0].name : '' || '',
        hours: contract.length !== undefined ? contract[0].hours : '' || ''
      }}
      onSubmit={
        async (values, { setErrors }) => {
          let senddata = {
            values: values,
            payments: paymentitems,
            id: contractid
          }
          console.log(senddata)
          const url = `api/more/contract/${(update) ? 'update' : 'create'}`
          const method = (update) ? 'put' : 'post';
          httpClient[method](url, senddata)
            .then(json => {
              if (json.success && isMountedRef.current) {
                enqueueSnackbar(
                  update ? 'Updated successfully' : 'Added successfully',
                  { variant: 'success' }
                )
                history.push('/app/more/contracts');
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
      }
    >
      {({
        errors,
        values,
        touched,
        handleBlur,
        handleSubmit,
        handleChange,
      }) => {

        return (
          <form onSubmit={handleSubmit} className={clsx(classes.root)} >
            <Card>
              <CardContent>
                <Grid container >
                  <Grid item xs={12} sm={3}></Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <div className={classes.row_Div}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div className={classes.boldletter}>Contract:</div>
                          <CssTextField
                            required
                            name="name"
                            className={classes.inputStyle}
                            style={{ width: 300 }}
                            value={values.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div className={classes.boldletter}>Hours:</div>
                          <CssTextField
                            required
                            name="hours"
                            className={classes.inputStyle}
                            style={{ width: 70 }}
                            value={values.hours}
                            placeholder="HH:MM"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </Grid>
                    <Grid container style={{ marginTop: 20 }}>
                      <Grid item md={2} xs={12}>
                        <div className={classes.boldletter}>Payments:</div>
                      </Grid>
                      <Grid item md={10} xs={12}>
                        {
                          paymentitems.map((val, index) => {
                            return (
                              <div style={{ width: '100%', marginBottom: 20, display: 'flex' }} key={index}>
                                <CssTextField1
                                  key={index + 1}
                                  variant="outlined"
                                  name="price"
                                  InputProps={{
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  placeholder="0,00 €"
                                  value={val}
                                  onChange={(e) => { handleChangePrices(e, index) }}
                                />
                                <Button
                                  key={index + 2}
                                  color="secondary"
                                  variant="contained"
                                  style={{ marginRight: 10, marginLeft: 10 }}
                                  onClick={() => { handleRemovePaymentItem(index) }}
                                >
                                  -
                                </Button>
                                <Button
                                  key={index + 3}
                                  color="secondary"
                                  variant="contained"
                                  style={{ marginRight: 10 }}
                                  onClick={handleAddPaymentItem}
                                >
                                  +
                                </Button>
                              </div>
                            )
                          })
                        }
                      </Grid>
                      <Grid item xs={12}
                        style={{ marginTop: 10, textAlign: 'right' }}
                      >
                        <Button
                          color="secondary"
                          variant="contained"
                          style={{ marginRight: 10 }}
                          onClick={() => { history.goBack() }}
                        >
                          Cancel
                        </Button>
                        <Button
                          color="secondary"
                          variant="contained"
                          type={'submit'}
                        >
                          Save
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={3}></Grid>
                </Grid>
              </CardContent>
            </Card>
          </form>
        )
      }}
    </Formik >
  );
};

ContractAddEditForm.propTypes = {
  update: PropTypes.bool,
  contract: PropTypes.object,
  className: PropTypes.string,
};

ContractAddEditForm.defaultProps = {
  contract: {},
}

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(ContractAddEditForm);
