import React from 'react';
import clsx from 'clsx';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  CardHeader,
  Button,
  makeStyles,
  CardContent,
  withStyles
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FixedTextField from 'src/components/FixedTextField';
import 'src/components/global';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
/* connectIntl */
import { connectIntl } from 'src/contexts/Intl';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
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
    height: 50, width: 200, marginRight: 10,
    "@media (max-width: 414px)": { width: '100%' }
  }
}));

const TextbookAddEditForm = ({ textbook, update, intl }) => {
  const classes = useStyles();
  const [textbookitems, setTextbookitems] = React.useState([]);

  // transfer list for start
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;
          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  // transfer list for end

  const handleAddTextbookItem = () => {
    let data = [];
    let demo = '0';
    if (textbookitems.length === 0)
      data.push(demo)
    else {
      for (let i = 0; i < textbookitems.length; i++)
        data.push(i)
      data.push(textbookitems.length)
    }
    setTextbookitems(data);
  }

  const handleRemoveTextbookItem = (index) => {
    const newtextbookitems = [...textbookitems];
    newtextbookitems.splice(index, 1);
    setTextbookitems(newtextbookitems);
  }

  return (
    <Formik
      initialValues={{
        name: textbook.name || '',
        stock: textbook.stock || ''
      }}
      onSubmit={
        async (values, { setErrors }) => {

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
                        <div className={classes.boldletter}>Textbook</div>
                        <div style={{ marginRight: 15 }}>Exam reminders:</div>
                        <div className={classes.boldletter}>Progress test from unit:</div>
                        <CssTextField
                          required
                          name="from_unit"
                          className={classes.inputStyle}
                          style={{ width: 70 }}
                        />
                        <div className={classes.boldletter}>To:</div>
                        <CssTextField
                          required
                          name="to_unit"
                          className={classes.inputStyle}
                          style={{ width: 70 }}
                        />
                        <div className={classes.boldletter}>Final exam from unit:</div>
                        <CssTextField
                          required
                          name="unit"
                          className={classes.inputStyle}
                          style={{ width: 70 }}
                        />
                      </div>

                      <div className={classes.row_Div}>
                        <div className={classes.boldletter}>Name:</div>
                        <CssTextField
                          required
                          name="name"
                          className={classes.inputStyle}
                          style={{ width: 300 }}
                          value={values.name}
                        />
                        <div className={classes.boldletter}>Stock:</div>
                        <CssTextField
                          required
                          name="stock"
                          className={classes.inputStyle}
                          style={{ width: 70 }}
                          value={values.stock}
                        />
                      </div>
                      <div className={classes.row_Div}>
                        <div className={classes.boldletter}>Students:</div>
                        <div>Adding students to this textbook will affect the value of "stock", unless you have manually edited stock</div>
                      </div>
                      <div className={classes.row_Div}>
                        <div className={classes.boldletter}>Search:</div>
                        <CssTextField
                          required
                          name="search"
                          className={classes.inputStyle}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="only_active"
                              color="primary"
                              style={{ marginLeft: 10 }}
                            />
                          }
                          label="Only active"
                        />
                      </div>
                    </Grid>
                    <Grid container alignItems="center" className={classes.transfer_root}>
                      <Grid item md={5} xs={12}>
                        {customList('Choices', left)}
                      </Grid>
                      <Grid item md={2} xs={12}>
                        <Grid container direction="column" alignItems="center">
                          <div className={classes.boldletter}>Books</div>
                          <Button
                            color="secondary"
                            variant="contained"
                            className={classes.button}
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label="move selected right"
                          >
                            Add &gt;&gt;
                          </Button>
                          <Button
                            color="secondary"
                            variant="contained"
                            className={classes.button}
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label="move selected left"
                          >
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid item md={5} xs={12}>
                        {customList('Chosen', right)}
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

TextbookAddEditForm.propTypes = {
  update: PropTypes.bool,
  textbook: PropTypes.object,
  className: PropTypes.string,
};

TextbookAddEditForm.defaultProps = {
  textbook: {},
}

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(TextbookAddEditForm);
