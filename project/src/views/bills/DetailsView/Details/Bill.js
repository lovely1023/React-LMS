import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import renderHTML from 'react-render-html';

// const useStyles = makeStyles((theme) => ({
const styles = theme => ({
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
});
class Bill extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        };
    }

    handlegetBillText = (billtext, billNum) => {
        const { classes } = this.props;

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

    componentDidMount() {
        let content = this.handlegetBillText(this.props.billtext_data, this.props.billNum)
        this.setState({ content: content })
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                {
                    renderHTML(this.state.content)
                }
            </div>
        );
    }
}

export default withStyles(styles)(Bill);