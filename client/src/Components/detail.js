import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import { Fab, 
    Avatar, 
    Tabs, 
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import backIcon from '../assets/back.svg';

const DETAIL_URL = "http://localhost:8080/api/detail/";
const BREAKDOWN_URL = "http://localhost:8080/api/breakdown/";
const TYPE_YEAR = "year";
const TYPE_VARIETY = "variety";
const TYPE_REGION = "region";
const TYPE_YEAR_VARIETY = "year-variety";

const INITIAL_STATE = {
    detail: {},
    breakdown : [],
    type : TYPE_YEAR,
    index: 0,
}

const TYPE_INDEX_MAP = {
    0 : { 
            type : TYPE_YEAR,
            display : 'Year'
        },
    1 : { 
            type : TYPE_VARIETY,
            display : 'Variety'
        },
    2 : { 
            type : TYPE_REGION,
            display : 'Region'
        },
    3 : { 
            type : TYPE_YEAR_VARIETY,
            display : 'Year & Variety'
        },
}

const styles = () => ({
    container: {
        height: "100%",
        width: "50%",
        position: "fixed",
        margin : "1rem auto",
        left: 0,
        right: 0,
        fontFamily: "Montserrat",
        fontStyle: "normal",
    },
    titleSection: {
        fontWeight: 300,
        fontSize: 30,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 10
    },
    titleLeft: {
        display : 'flex',
        flexDirection: 'row',
    },
    avatar: {
        backgroundColor: '#cb617e',
        border: "1px #c76781 solid",
        fontFamily: "Montserrat",
        fontWeight: 400,
        marginRight: 20
    },
    fab: {
        backgroundColor: '#00ADA8',
        color: '#fff',
    },
    backIcon: {
        marginLeft: 10
    },
    des: {
        color: '#242525',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 18,
        marginTop: 10,
        marginLeft: 5
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20
    },
    infoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 5,
        fontSize: '1rem',
    },
    infoField: {
        fontWeight: 400,
        fontSize: 15
    },
    infoValue: {
        fontWeight: 300
    },
    tableContainer: {
        overflow: 'auto',
        maxHeight: 330,
    },
    tableRow: {
        height : 40,
    },
    tableCell: {
        fontFamily: "Montserrat",
        height: "auto !important",
    },
    tableBody: {
        fontWeight: 300
    },
    tableHead: {
        fontWeight: 400,
    }
})

const AntTabs = withStyles({
    root: {
      borderBottom: '1px solid #e1e1e1',
    },
    indicator: {
      backgroundColor: '#00ada8',
    },
})(Tabs);

const AntTab = withStyles(() => ({
    root: {
      textTransform: 'none',
      minWidth: 60,
      fontSize: 15,
      fontWeight: 300,
      marginRight: 28,
      color: '#3A3B3B',
      fontFamily: [
        'Montserrat',
        'Arial',
        'sans-serif',
      ].join(','),
      '&:hover': {
        color: '#black',
        opacity: 1,
      },
      '&$selected': {
        color: '#0F1010',
        fontWeight: 400,
      },
      '&:focus': {
        color: '#0F1010',
      },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

function Detail(props) {

    const lotCode = props.match.params.lotCode
    const [state, setState] = useState(INITIAL_STATE);
    const { detail, breakdown, type, index} = state;
    const { classes } = props; 

    const handleChange = (event, newIndex) => {
        setState({
            ...state,
            index : newIndex,
            type: TYPE_INDEX_MAP[newIndex].type,
        })
    };

    useEffect(() => {
        const detailUrl = `${DETAIL_URL}${lotCode}`;
        const breakdownUrl = `${BREAKDOWN_URL}${type}/${lotCode}`;
        const fetchData = async() => {
            const resDetail = await axios(detailUrl);
            const resBreakdown = await axios(breakdownUrl);
            setState({
                ...state,
                detail : resDetail.data,
                breakdown : resBreakdown.data,
            })
        }
        fetchData();
    }, [type]);

    console.log(state);

    return (
        <div className={classes.container}>
            <Link className={classes.backIcon} to="/"><img src={backIcon} /></Link>
            <div className={classes.titleSection}>
                <div className={classes.titleLeft}>
                    <Avatar className={classes.avatar}>W</Avatar>
                    {detail.lotCode}
                </div>
                <Fab className={classes.fab} size="large" aria-label="edit">
                    <EditIcon />
                </Fab>
            </div>
            <div className={classes.des}>{detail.description}</div>
            <div className={classes.info}>
                <div className={classes.infoRow}>
                    <div className={classes.infoField}>Volume</div>
                    <div className={classes.infoValue}>{detail.volume? detail.volume.toLocaleString('en')+"L" : ""}</div>
                </div>
                <div className={classes.infoRow}>
                    <div className={classes.infoField}>Tank Code</div>
                    <div className={classes.infoValue}>{detail.tankCode}</div>
                </div>
                <div className={classes.infoRow}>
                    <div className={classes.infoField}>Product State</div>
                    <div className={classes.infoValue}>{detail.productState}</div>
                </div>
                <div className={classes.infoRow}>
                    <div className={classes.infoField}>Owner</div>
                    <div className={classes.infoValue}>{detail.ownerName}</div>
                </div>
            </div>
            <AntTabs value={index} onChange={handleChange}>
                {Object.keys(TYPE_INDEX_MAP).map((key) => (
                    <AntTab label={TYPE_INDEX_MAP[key].display} />
                ))}
            </AntTabs>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow className={classes.tableRow}>
                            <TableCell className={classes.tableCell}>{TYPE_INDEX_MAP[index].display}</TableCell>
                            <TableCell className={classes.tableCell} align="right">Percentage</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                        {breakdown.breakdown ? breakdown.breakdown.map(row => (
                            <TableRow className={classes.tableRow}>
                                <TableCell className={classes.tableCell}>{row[type]}</TableCell>
                                <TableCell className={classes.tableCell} align="right">{row.percentage}</TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default withStyles(styles)(Detail);