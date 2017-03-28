import React, { Component } from 'react'
import superagent from 'superagent'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import Checkbox from 'material-ui/Checkbox'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'

import { LOCAL_KEY, SPORTS } from '../constants'

class Search extends Component {

  constructor() {
    super()

    this.state = {
      searchState: 'Check the sports you practice and hit search',
      playmates: [],
      sports: [],
      openSnackbar: true,
    }

    this.submitSearch = this.submitSearch.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.errorOnGeo = this.errorOnGeo.bind(this)
    this.getSports = this.getSports.bind(this)
  }

  componentDidMount() {
    this.getSports();
  }

  getSports() {
    const { userId = null } = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};

    superagent
    .get(`/api/users/${userId}`)
    .end((err, res) => {
      if (err) { alert('Sorry, something went wrong'); }

      this.setState({ sports: res.body.sports})
    })
  }

  submitSearch(event) {
    event.preventDefault();
    this.setState({
      openSnackbar: true,
      searchState: 'Finding your location...',
    })

    const { userId = null } = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};


    function showPosition(position) {
      let crd = position.coords;
      let sports = this.state.sports;
      let latitude = crd.latitude;
      let longitude = crd.longitude;

      superagent
       .put(`/api/users/${userId}`)
       .send({
         sports,
         latitude,
         longitude
        })
       .end((err, res) => {
         if (err) { alert('Sorry, something went wrong'); }

         this.setState({
           openSnackbar: true,
           searchState: 'Now lets find your playmates...',
         });

         superagent
          .get(`/api/users/playmates/${userId}`)
          .end((err, res) => {
             if (err) { alert('Sorry, something went wrong'); }
             const playmates = res.body;

             if (!playmates.length) {
               this.setState({
                 openSnackbar: true,
                 searchState: 'No playmates founded'
               });
             } else {
               this.setState({
                 openSnackbar: true,
                 searchState: 'We have found some playmates',
                 playmates
               });
             }
           })
       })
    }

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition.bind(this), this.errorOnGeo);
    } else {
      this.setState({
        openSnackbar: true,
        searchState: 'Allow our site to get your current location ',
      })
    }
  }

  errorOnGeo(err) {

    let message

    switch (err.code) {
      case err.PERMISSION_DENIED:
        message = 'User denied the request for Geolocation.'
        break
      case err.POSITION_UNAVAILABLE:
        message = 'Location information is unavailable.'
        break
      case err.TIMEOUT:
        message = 'The request to get user location timed out.'
        break
      case err.UNKNOWN_ERROR:
        message = 'An unknown error occurred.'
        break
      default:
    }

    this.setState({ openSnackbar: true, searchState: message })
  }

  handleCheckbox(event) {
    let sports = [];
    let value = event.currentTarget.value.toLowerCase();

    if (event.currentTarget.checked) {
      sports = this.state.sports.slice();
      sports.push(value);
    }else {
      sports = this.state.sports.filter(item => item !== value);
    }

    this.setState({ sports: sports })
  }

  render() {
    return (
      <div className="search">
        <header>
          <h2 className="search__title">Search</h2>
        </header>

        <form className="search__form" onSubmit={this.submitSearch}>
          <div>
            { SPORTS.map( sport => {
                const checked = this.state.sports.indexOf(sport) > -1;

                return (
                  <Checkbox
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder />}
                    label={sport}
                    key={sport}
                    value={sport}
                    onCheck={this.handleCheckbox}
                    defaultChecked={checked}
                    className="search__checkbox"
                  />
                )
              })
            }
          </div>

          <br />
          <RaisedButton label="Search playmates" fullWidth={true} type="submit"/>
        </form>

        <div className="playmates">
          { !!this.state.playmates.length &&
             this.state.playmates.map( playmate => {
               return (
                 <p key={playmate.id} >{playmate.name}</p>
               )
             })
          }
        </div>

        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.searchState}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

export default Search
