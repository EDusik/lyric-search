import React, { Component } from 'react';
import axios from 'axios';
import Spiner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const ENVIROMENT = process.env.REACT_APP_MM_KEY;
const URL_HEROKU = 'https://cors-anywhere.herokuapp.com/';
const URL_BASE = 'http://api.musixmatch.com/ws/1.1/';

class Lyrics extends Component {

  state = {
      tracks: {},
      lyrics: {}
  }

  componentDidMount() {
    axios.get(`${URL_HEROKU}${URL_BASE}track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${ENVIROMENT}`)
    .then(response => {
      this.setState({ lyrics: response.data.message.body.lyrics })
      return axios.get(`${URL_HEROKU}${URL_BASE}track.get?track_id=${this.props.match.params.id}&apikey=${ENVIROMENT}`)
    })
    .then(response => {
      this.setState({ track: response.data.message.body.track })
    })
    .catch(err => console.log(err))
    }

  render() {
    const { track, lyrics } = this.state; 
    console.log(track)
    if (
      track === undefined || 
      lyrics === undefined ||
      Object.keys(track).length === 0 || 
      Object.keys(lyrics).length  === 0) {
        return <Spiner />
    } else {
        return (
          <React.Fragment>
            <Link to="/" className="btn btn-dark btn-sm mb-4">
              Go Back
            </Link>
            <div className="card">
              <h5 className="card-header">
                {track.track_name} by <span className="text-secondary">{track.artist_name}</span>
              </h5>
              <div className="card-body">
                <p className="card-text">
                  {lyrics.lyrics_body}
                </p>
              </div>
            </div>

            <ul className="list-group mt-3">
              <li className="list-group-item">
                <strong>Album ID</strong>: {track.album_id}
              </li>
              <li className="list-group-item">
                <strong>Song Genre</strong>:{' '}
                {track.primary_genres.music_genre_list.length !== 0 ? 
                track.primary_genres.music_genre_list[0].music_genre.music_genre_name : 
                'N/A'}
              </li>
              <li className="list-group-item">
                <strong>Explicit Words</strong>: {track.explicit === 0 ? 'No': 'Yes'}
              </li>
            </ul>
          </React.Fragment>
        )
    }
  }
}

export default Lyrics;
