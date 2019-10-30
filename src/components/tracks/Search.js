import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

const ENVIROMENT = process.env.REACT_APP_MM_KEY;
const URL_HEROKU = 'https://cors-anywhere.herokuapp.com/';
const URL_BASE = 'http://api.musixmatch.com/ws/1.1/';

class Search extends Component {

    state = {
        trackTitle: ''
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    findTrack = (dispatch, event) => {
        event.preventDefault();
        axios.get(
          `${URL_HEROKU}${URL_BASE}track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${ENVIROMENT}`
        )
        .then(response => {
          dispatch({
            type: 'SEARCH_TRACKS',
            payload: response.data.message.body.track_list
          })
        })
        .catch(err => 
            console.log(err)
        );
    }

    render() {
        return (
            <Consumer>
                {value => {
                    console.log(value)
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className="fas fa-music"></i> Search For A Song
                            </h1>
                            <p className="lead text-center">
                                Get the lyrics for any song
                            </p>
                            <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className="form-group"> 
                                    <input type="text" 
                                    className="form-control form-control-lg" 
                                    name="trackTitle"
                                    value={this.state.trackTitle}
                                    onChange={this.onChange.bind(this)}
                                    placeholder="Song title..." />
                                </div>
                            </form>
                            <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
                                Get Track Lyrics
                            </button>
                        </div>
                    );
                }}
            </Consumer>
        )
    }
}

export default Search;
