import React, { Component } from 'react'
import axios from  'axios';
const Context = React.createContext();

const ENVIROMENT = process.env.REACT_APP_MM_KEY;
const URL_HEROKU = 'https://cors-anywhere.herokuapp.com/';
const URL_BASE = 'http://api.musixmatch.com/ws/1.1/';

const reducer = (state, action) => {
    switch(action.type) {
        case 'SEARCH_TRACKS':
            return {
                ...state,
                track_list: action.payload,
                heading: 'Search Results'
            }
        default:
            return state;
    }
}

export class Provider extends Component {

    state = {
        track_list: [],
        heading: 'Top 10 Tracks',
        dispatch: action => this.setState(state => reducer(state, action))
    };
    componentDidMount() {
        axios.get(`${URL_HEROKU}${URL_BASE}chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${ENVIROMENT}`)
        .then(
            response => {
                this.setState({ 
                    track_list: response.data.message.body.track_list 
                })
            }
        ).catch(
            err => console.log(err)
        )
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;
