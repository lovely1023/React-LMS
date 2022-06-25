import React, { useRef } from 'react';
import clsx from 'clsx';
import {
  Card,
  Divider,
  CardHeader,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connectIntl } from 'src/contexts/Intl';
import renderHTML from 'react-render-html';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import ReactToPrint from 'react-to-print';
import Bill from './Bill';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  boldletter: {
    fontWeight: 'bold',
  },
  row_container: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 25,
    "@media (max-width: 599px)": { justifyContent: 'space-between' },
  },
  avatarImg: {
    width: '100%',
    height: 145,
    "@media (max-width: 599px)": { height: 300 },
    "@media (max-width: 400px)": { height: 250 }
  },
  totalcontainer: {
    display: 'flex',
    "@media (max-width: 875px)": {
      width: '100%',
      justifyContent: 'space-around',
      marginTop: 20
    },
  },
  bill_container: {
    backgroundColor: '#fffff7',
    width: '100%',
    padding: 10
  },
  billLogo_container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  billLogo_container1: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  billLogo: {
    margin: 20
  },
  bill_header_container: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 20
  },
  bill_header_txt_style: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#000'
  },
  bill_date_time_container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  bill_studentinfo_container: {
    width: '100%',
    marginBottom: 40
  },
  bill_total_txt_style: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#000'
  }
}));

const BillInfo = ({ bill, billNum }) => {
  const classes = useStyles();
  const componentRef = useRef()
  const [openZoom, setOpenzoom] = React.useState(false);
  const [opendownload, setOpendownload] = React.useState(false);

  const handlegetBillText = (billtext) => {
    let html = '', res = '', headerTxt = '', footerTxt = '', itemTxt = '', billNumber = '', dateText = '', payment = '', printType = '', studentInformation = '', timeText = '', totalText = '', startNum = 0, endNum = 0;
    let tmp = String.fromCharCode(13);
    for (var i = 0; i < billtext.length; i++) {
      res += String.fromCharCode(billtext[i]);
    }
    // start header part
    startNum = res.indexOf("<headerText>");
    endNum = res.lastIndexOf("</headerText>");

    for (var i = 0; i < billtext.length; i++) {
      if (i >= startNum + 12 && i <= endNum - 1) {
        headerTxt += String.fromCharCode(billtext[i]);
      }
    }
    headerTxt = headerTxt.split(tmp);
    // end header part

    // start footer part
    startNum = res.indexOf("<footerText>");
    endNum = res.lastIndexOf("</footerText>");

    for (var i = 0; i < billtext.length; i++) {
      if (i >= startNum + 12 && i <= endNum - 1) {
        footerTxt += String.fromCharCode(billtext[i]);
      }
    }
    footerTxt = footerTxt.split(tmp);
    // end footer part

    // start itemText part
    startNum = res.indexOf("<itemText>");
    endNum = res.lastIndexOf("</itemText>");

    for (var i = 0; i < billtext.length; i++) {
      if (i >= startNum + 10 && i <= endNum - 1) {
        itemTxt += String.fromCharCode(billtext[i]);
      }
    }
    itemTxt = itemTxt.split(tmp);
    // end itemText part

    // start billNumber part
    startNum = res.indexOf("<billNumber>");
    endNum = res.lastIndexOf("</billNumber>");

    for (var i = 0; i < billtext.length; i++) {
      if (i >= startNum + 12 && i <= endNum - 1) {
        billNumber += String.fromCharCode(billtext[i]);
      }
    }
    billNumber = billNumber.split(tmp);
    // end billNumber part

    // start dateText part
    startNum = res.indexOf("<dateText>");
    endNum = res.lastIndexOf("</dateText>");

    for (var i = 0; i < billtext.length; i++) {
      if (i >= startNum + 10 && i <= endNum - 1) {
        dateText += String.fromCharCode(billtext[i]);
      }
    }
    dateText = dateText.split(tmp);
    // end billNumber part

    // start payment part
    startNum = res.indexOf("<payment>");
    endNum = res.lastIndexOf("</payment>");

    for (var i = 0; i < billtext.length; i++) {
      if (i >= startNum + 9 && i <= endNum - 1) {
        payment += String.fromCharCode(billtext[i]);
      }
    }
    payment = payment.split(tmp);
    // end billNumber part

    // start printType part
    startNum = res.indexOf("<printType>");
    endNum = res.lastIndexOf("</printType>");

    for (var i = 0; i < billtext.length; i++) {
      if (i >= startNum + 11 && i <= endNum - 1) {
        printType += String.fromCharCode(billtext[i]);
      }
    }
    printType = printType.split(tmp);
    // end billNumber part

    // start studentInformation part
    startNum = res.indexOf("<studentInformation>");
    endNum = res.lastIndexOf("</studentInformation>");

    for (var i = 0; i < billtext.length; i++) {
      if (i >= startNum + 20 && i <= endNum - 1) {
        studentInformation += String.fromCharCode(billtext[i]);
      }
    }
    studentInformation = studentInformation.split(tmp);
    // end billNumber part

    // start timeText part
    startNum = res.indexOf("<timeText>");
    endNum = res.lastIndexOf("</timeText>");

    for (var i = 0; i < billtext.length; i++) {
      if (i >= startNum + 10 && i <= endNum - 1) {
        timeText += String.fromCharCode(billtext[i]);
      }
    }
    timeText = timeText.split(tmp);
    // end billNumber part

    // start totalText part
    startNum = res.indexOf("<totalText>");
    endNum = res.lastIndexOf("</totalText>");

    for (var i = 0; i < billtext.length; i++) {
      if (i >= startNum + 11 && i <= endNum - 5) {
        totalText += String.fromCharCode(billtext[i]);
      }
    }
    totalText = totalText.split(tmp);
    // end billNumber part
    if (printType[0] === 'A4') {
      html += `<div className=${classes.bill_container} id='bill_container'><div className=${classes.billLogo_container}><img src='/static/images/bill_logo.png' alt='billLogo' className=${classes.billLogo} /></div>`;
      html += `<div className=${classes.bill_header_container}>`;
      for (var i = 0; i < headerTxt.length; i++)
        html += `<div className=${classes.bill_header_txt_style}>${headerTxt[i]}</div>`;
      html += `</div>`;
      html += `<div className=${classes.bill_date_time_container} ><div style="color: #000;">${dateText[0]}</div><div style="color: #000;">${timeText[0]}</div></div>`
      html += `<div className=${classes.bill_studentinfo_container} >`;
      for (var i = 0; i < studentInformation.length; i++)
        html += `<div style="color: #000;">${studentInformation[i]}</div>`;
      html += `</div>`;

      html += `<div className=${classes.bill_studentinfo_container} ><div style="color: #000;">Factura n:${billNum}</div></div>`

      html += `<div className=${classes.bill_studentinfo_container} style='margin-bottom:10px;' >`;
      for (var i = 0; i < itemTxt.length; i++)
        html += `<div style="color: #000;">${itemTxt[i]}</div>`;
      html += `</div>`;
      html += `<div className=${classes.bill_header_container}><div className=${classes.bill_total_txt_style} style='margin-bottom:40px;'>${totalText} €</div></div`;

      html += `<div className=${classes.bill_header_container}>`;
      for (var i = 0; i < footerTxt.length; i++)
        html += `<div style="color: #000;">${footerTxt[i]}</div>`;
      html += `</div>`;

      html += `</div>`;
    }
    // if (printType[0] === 'A4') {
    //   html += `<div className=${classes.bill_container}><div className=${classes.billLogo_container1}><img src='/static/images/bill_logo1.png' alt='billLogo' className=${classes.billLogo} /></div>`;
    //   html += `<div style='display:flex; flex-wrap:wrap; justify-content:space-between'>`;
    //   html += `<div style='text-align:center;'>`;
    //   for (var i = 0; i < headerTxt.length; i++)
    //     html += `<div className=${classes.bill_header_txt_style}>${headerTxt[i]}</div>`;
    //   html += `</div>`
    //   html += `<div>${}</div>`
    //   html += `</div>`
    //   html += `</div>`;
    // }
    return html;
  }

  const handleSaveXML = () => {
    var FileSaver = require('file-saver');
    let res = '', billtext = bill.billText.data;
    for (var i = 0; i < billtext.length; i++) {
      res += String.fromCharCode(billtext[i]);
    }
    // var file = new File([handlegetBillText(bill.billText.data)], billNum + ".xml", { type: "text/plain;charset=utf-8" });
    var file = new File([res], billNum + ".xml", { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(file);
  }

  return (
    <Card className={clsx(classes.root)} >
      <div>
        <Dialog
          open={opendownload}
          onClose={() => { setOpendownload(false) }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-confirm-title" style={{ fontSize: 20 }}>{"Remember the extension!"}</DialogTitle>
          <DialogContent style={{ padding: '12px !important' }}>
            <DialogContentText id="alert-confirm-description">
              When renaming the file, please be sure to add '.xml as an extension'
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { handleSaveXML(); setOpendownload(false) }} color="primary">
              Ok
            </Button>
            <Button onClick={() => { setOpendownload(false) }} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={openZoom}
          onClose={() => { setOpenzoom(false) }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <div id="alert-dialog-description">
              {
                renderHTML(handlegetBillText(bill.billText.data))
              }
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <CardHeader title={`${bill.studentFname} ${bill.studentLname}'s bill Details`} onClick={() => { handlegetBillText(bill.billText.data) }} />
      <Divider />
      <Grid container>
        <Grid item xs={12} sm={5} style={{ padding: 15 }}>
          {/* {
            renderHTML(handlegetBillText(bill.billText.data))
          } */}
          <Bill billtext_data={bill.billText.data} billNum={billNum} ref={componentRef} />
          {/* <Bill ref={componentRef} /> */}
        </Grid>
        <Grid item xs={12} sm={7} style={{ padding: 15 }}>
          <Grid container style={{
            marginBottom: 30, paddingBottom: 25, borderBottom: '2px solid rgb(214,227,224)'
          }}>
            < Grid item xs={12} sm={6} >
              <Grid container>
                < Grid item xs={12} sm={6} style={{ paddingRight: 15 }}>
                  <img src="/static/images/post_1.png" alt="avatar" className={classes.avatarImg} />
                </Grid>
                < Grid item xs={12} sm={6}>
                  <div>
                    <div style={{ marginBottom: 17 }}>{bill.studentFname}</div>
                    <div style={{ marginBottom: 17 }}>{bill.studentLname}</div>
                    <div style={{ width: '100%', display: 'flex' }}>
                      <div className={classes.boldletter} style={{ marginRight: 17 }}>ID:</div>
                      <div style={{ marginBottom: 17 }}>{bill.studentidnum}</div>
                    </div>
                    <div style={{ width: '100%', display: 'flex' }}>
                      <div className={classes.boldletter}>Postcode:</div>
                      <div>{bill.studentpostcode}</div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.row_container}>
                <div className={classes.boldletter}>Date Time:</div>
                <div>{bill.dTime.substr(0, 10)} {bill.dTime.substr(11, 8)}</div>
              </div>
              <div className={classes.row_container}>
                <div className={classes.boldletter}>By User:</div>
                <div>{bill.user}</div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: 30, paddingBottom: 25, borderBottom: '2px solid rgb(214,227,224)' }} className={classes.row_container}>
            <Button
              color="secondary"
              variant="contained"
              style={{ width: 105 }}
              // onClick={handleZoom}
              onClick={() => { setOpenzoom(true) }}
            >
              Zoom
            </Button>
            <ReactToPrint
              trigger={() => <Button
                color="secondary"
                variant="contained"
                style={{ width: 105 }}
              >Print</Button>}
              content={() => componentRef.current}
            />
            <Button
              color="secondary"
              variant="contained"
              style={{ width: 105 }}
              onClick={() => { setOpendownload(true) }}
            >
              Save XML
            </Button>
            <div className={classes.totalcontainer}>
              <div className={classes.boldletter}>Total:</div>
              {/* <div>{bill.cents} €</div> */}
              <div>{(parseFloat(bill.cents)/100).toFixed(2)} €</div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Card >
  );
};

BillInfo.propTypes = {
  className: PropTypes.string,
  bill: PropTypes.object.isRequired,
  billNum: PropTypes.string.isRequired
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(BillInfo);
