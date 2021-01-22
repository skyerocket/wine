import React, { useEffect, useState } from 'react';
import './search.css';
import wineIcon from '../assets/wine.svg';
import searchIcon from '../assets/search.svg';
import InputBase from '@material-ui/core/InputBase';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    list: {
        width: 624,
        backgroundColor: "#fff",
        position: "fixed",
        margin : "0 auto",
        paddingTop: 0,
        paddingBottom: 0,
        left: 0,
        right: 0,
        border: "1px #f5f5f54d solid",
        borderRadius: 2,
        boxShadow: "0px 0px 3px #e2dede"
    },
    listItemTitle: {
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: 15,
        color: "#0F1010",
    },
    listItemDes: {
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontWeight: 300,
        fontSize: 13,
        color: "#3A3B3B",
    }
  }));

const SEARCH_URL = "http://localhost:8080/api/search/";

const INITIAL_STATE = {
    loading : false,
    query : "",
    cancel : "",
    results : []
}

function Search() {

    const [state, setState] = useState(INITIAL_STATE);

    const classes = useStyles();

    function fetchSearchResults(queryParam) {

        const searchUrl = `${SEARCH_URL}${queryParam}`;
        state.cancel ? state.cancel.cancel() : setState({
            ...state,
            cancel : axios.CancelToken.source()
        })
    
        axios
            .get(searchUrl, {
                cancelToken: state.cancel.token,
            })
            .then((res) => {
                setState({
                    ...state,
                    loading : false,
                    results : res.data,
                })
            })
            .catch((error) => {
                if (axios.isCancel(error) || error) {
                    setState({
                        ...state,
                        loading : false 
                    })
                }
            });
    };

    console.log(state.results)

    useEffect(() => {
        fetchSearchResults(state.query);
    }, [state.query])

    const Item = ( { result, i } ) => (
        <Link className="link" to="/detail">
            <ListItem className="listItem" button key={i}>
                <ListItemText 
                classes={{ 
                    primary: classes.listItemTitle,
                    secondary: classes.listItemDes,
                }}
                primary={result.lotCode} 
                secondary={result.description} />
                <ListItemSecondaryAction>
                    <div className="smallText">{result.volume.toLocaleString('en')}</div>
                    <div className="smallText">{result.tankCode}</div>
                </ListItemSecondaryAction>
            </ListItem>
        </Link>
    )

    return (
        <div className="container">
            <div className="title">Wine search<img src={wineIcon} alt="Wine Icon" className="wineIcon" /></div>
            <InputBase
                className="searchInput"
                placeholder="Search by lot code and description......"
                startAdornment={<img src={searchIcon} className="searchIcon" />}
                value={state.query}
                onChange={ (event) => {
                    const query = event.target.value;
                    query ? setState({
                        ...state,
                        query,
                        loading : true,
                        message : ""
                    }) : setState({
                        ...state,
                        query,
                        results : [],
                        message : ""
                    })
                }}
            />
            {state.results.length > 0 ? 
            <List className={classes.list} aria-label="cards">
                {state.results.map((result, i) => (
                    state.results.length !== i + 1 ?  (
                        <React.Fragment key={i}>
                            <Item result={result} key={i}/>
                            <Divider variant="middle" />
                        </React.Fragment>
                     ) : (
                        <Item result={result} key={i}/>
                     )
                ))}
            </List> :
            null
        }
        </div>
    );
}

export default Search;