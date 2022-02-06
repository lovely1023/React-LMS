import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  Divider,
  makeStyles,
  CardHeader,
  Button
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { connectIntl } from 'src/contexts/Intl';
import { asBlob } from 'html-docx-js-typescript'
import { saveAs } from 'file-saver'
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles((theme) => ({
  root: {},
  row_Div: {
    display: 'flex',
    marginBottom: 10
    // "@media (max-width: 684px)": { marginBottom: 10 },
  },
  bold_letter: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 20,
    width: 170,
    textAlign: 'right'
  },
  letter: {
    fontSize: 18,
    marginRight: 10
  }
}));

const CertificationInfo = ({ certification, intl }) => {
  const classes = useStyles();
  const [opendownload, setOpendownload] = React.useState(false);

  function timeConvert(mins) {
    let minutes = (parseInt(mins) % 60);
    let hours = Math.floor(parseInt(mins) / 60);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    let res = `${hours} : ${minutes}`;
    return res;
  }

  const handledownload = () => {
    const htmlString = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Document</title>
          </head>
          <body style="width: 100%;">
            <div style="width: 100%; text-align: center;">
              <h2>CERTIFICADO DE APROVECHAMIENTO</h2>
            </div>
            <div style="position: absolute; top: 10%; left: 0;">Nº ${certification.certNumber}</div>
            <div style="width: 100%; text-align: center;">
              <img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAABZCAIAAAAW3OdWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA1LTA1VDA3OjM1OjUyLTA3OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA1LTA1VDA3OjM1OjUyLTA3OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wNS0wNVQwNzozNTo1Mi0wNzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3ZWMxZGEyZi01NDEwLTU1NDMtYmVjNC1mNzgyOGI2ZjRmOWYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiYzhmYzE0ZS05NTE1LTljNGUtODE2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" />
            </div>
            <div style="width: 100%; text-align: center; margin: 10px;">
              <h5>Por la presente certificamos que</h5>
            </div>
            <div style="width: 100%; text-align: center; margin: 10px;">
              <h1>${certification.studentName}</h1>
            </div>
            <div style="width: 100%; text-align: center; margin: 10px;">
              <h5>con número de DNI ${'05420847T'} ha realizado un curso de ${timeConvert(certification.mins)} horas de inglés en IDIOMAS SEIF, alcanzando el nivel ${certification.level}, del ${certification.startDate} al ${certification.endDate},
              con aprovechamiento del mismo.</h5>
            </div>
            <div style="width: 100%; text-align: center; margin: 10px; margin-bottom: 30px;">
              <h5>Para que conste a los efectos oportunos, firmamos la presente en Madrid a ${moment(new Date()).format("YYYY-MM-DD")}.</h5>
            </div>
            <table style="width:100%; margin-top: 30px;">
              <tr>
                <th style="width: 33%;"></th>
                <th style="width: 33%;"></th> 
                <th style="width: 33%; padding: 0; margin: 30px 0px 30px 0px;">
                  <h3 style=" padding: 0; margin: 0;">${certification.userName}</h3>
                  <h3 style=" padding: 0; margin: 0;">${certification.title}</h3>
                </th>
              </tr>
            </table>
            <div style="width: 100%; text-align: center; margin: 10px;">
              <h4 style=" padding: 0; margin: 0;">Mega-Idiomas S.L.U. · Gran Vía, 50 1ºIzq. · 28013 Madrid</h4>
              <h5 style=" padding: 0; margin: 0;">Centro de enseñanza no reglada y sin carácter oficial</h5>
            </div>
          </body>
        </html>`
    asBlob(htmlString).then(data => {
      saveAs(data, `${certification.studentName}.docx`)
    })
  }

  return (
    <Card className={clsx(classes.root)} >
      <Dialog
        open={opendownload}
        onClose={() => { setOpendownload(false) }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-confirm-title" style={{ fontSize: 20 }}>{"Certificate ready"}</DialogTitle>
        <DialogContent style={{ padding: '12px !important' }}>
          <DialogContentText id="alert-confirm-description">
            A certificate has been generated. Would you like to download it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handledownload(); setOpendownload(false) }} color="primary">
            Ok
            </Button>
          <Button onClick={() => { setOpendownload(false) }} color="primary" autoFocus>
            Cancel
            </Button>
        </DialogActions>
      </Dialog>
      <CardHeader title={`CERTIFICATION INFO`} />
      <Divider />
      <Grid container>
        <Grid item xs={12} style={{ padding: 10 }}>
          <div className={classes.row_Div}>
            <div className={classes.bold_letter}>Student:</div>
            <div className={classes.letter}>{certification.studentName}</div>
          </div>
          <div className={classes.row_Div}>
            <div className={classes.bold_letter}>Hours:</div>
            <div className={classes.letter}>{timeConvert(certification.mins)}</div>
          </div>
          <div className={classes.row_Div}>
            <div className={classes.bold_letter}>Dates:</div>
            <div className={classes.letter}>{`${certification.startDate} - ${certification.endDate}`}</div>
          </div>
          <div className={classes.row_Div}>
            <div className={classes.bold_letter}>Level reached:</div>
            <div className={classes.letter}>{certification.level}</div>
          </div>
          <div className={classes.row_Div}>
            <div className={classes.bold_letter}>Certificate number:</div>
            <div className={classes.letter}>{certification.certNumber}</div>
          </div>
          <div className={classes.row_Div}>
            <div className={classes.bold_letter}>Issue date:</div>
            <div className={classes.letter}>{certification.issueDate}</div>
          </div>
          <div className={classes.row_Div}>
            <div className={classes.bold_letter}>User:</div>
            <div className={classes.letter}>{certification.user}</div>
          </div>
          <div className={classes.row_Div}>
            <div className={classes.bold_letter}>user title:</div>
            <div className={classes.letter}>{certification.title}</div>
          </div>
          <div className={classes.row_Div}>
            <div className={classes.bold_letter}>Full user name:</div>
            <div className={classes.letter}>{certification.userName}</div>
          </div>
          <div style={{ width: '100%', textAlign: 'end' }}>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => { setOpendownload(true) }}
            >
              Download
            </Button>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

CertificationInfo.propTypes = {
  className: PropTypes.string,
  certification: PropTypes.object.isRequired,
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(CertificationInfo);
