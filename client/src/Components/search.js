import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import { InputBase,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import wineIcon from '../assets/wine.svg';
    
const SEARCH_URL = "http://localhost:8080/api/search/";

const INITIAL_STATE = {
    query : "",
    cancel : "",
    results : []
}

const styles = () => ({
    container: {
        height: "100%",
        position: "fixed",
        margin : "10% auto",
        left: 0,
        right: 0,
        textAlign: "center",
    },
    title: {
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontWeight: 300,
        fontSize: 26,
        color: "#0F1010",
    },
    wineIcon: {
        color: "#3A3B3B",
        height: 22,
        width: 16,
        marginLeft: 12,
    },
    searchInput: {
        width: 624,
        height: 48,
        background: "#FFFFFF",
        border: "rgba(255, 255, 255, 0.514)",
        borderRadius: 3,
        marginTop: 24,
        alignSelf: "center",
    },
    searchIcon: {
        color: "#CCC",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 20,
        marginLeft: 12,
        marginRight: 8,
    },
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
    listItem: {
        height: 56
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
    },
    smallText: {
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontWeight: 300,
        fontSize: 13,
        color: "#0F1010",
        opacity: 0.6,
    },
    link: {
        color: "inherit",
        textDecoration: "inherit",
    }
  });

function Search(props) {

    const [state, setState] = useState(INITIAL_STATE);
    const { classes } = props;
    const { query, cancel, results } = state;

    const hightlightSearchText = (query, texts) => {
        
    };

    const fetchSearchResults = query => {

        const searchUrl = `${SEARCH_URL}${query}`;
        cancel ? cancel.cancel() : setState({
            ...state,
            cancel : axios.CancelToken.source()
        })
    
        axios
            .get(searchUrl, {
                cancelToken: cancel.token,
            })
            .then((res) => {
                setState({
                    ...state,
                    results : res.data,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchSearchResults(query);
    }, [query])

    const Item = ( { result, i } ) => (
        <Link 
        className={classes.link} 
        to={`/detail/${result.lotCode}`}>
            <ListItem className={classes.listItem} button key={i}>
                <ListItemText 
                classes={{ 
                    primary: classes.listItemTitle,
                    secondary: classes.listItemDes,
                }}
                primary={result.lotCode} 
                secondary={result.description} />
                <ListItemSecondaryAction>
                    <div className={classes.smallText}>{result.volume.toLocaleString('en')}</div>
                    <div className={classes.smallText}>{result.tankCode}</div>
                </ListItemSecondaryAction>
            </ListItem>
        </Link>
    );

    return (
        <div className={classes.container}>
            <div className={classes.title}>Wine search<img src={wineIcon} alt="Wine Icon" className={classes.wineIcon} /></div>
            <InputBase
                className={classes.searchInput}
                placeholder="Search by lot code and description......"
                startAdornment={<SearchIcon className={classes.searchIcon}/>}
                value={query}
                onChange={ (event) => {
                    const query = event.target.value;
                    query ? setState({
                        ...state,
                        query,
                    }) : setState({
                        ...state,
                        query,
                        results : [],
                    })
                }}
            />
            {results.length > 0 ? 
            <List className={classes.list} aria-label="cards">
                {results.map((result, i) => (
                    results.length !== i + 1 ?  (
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

export default withStyles(styles)(Search);