import React, { Component } from 'react'
import superagent from 'superagent'

import { LOCAL_KEY, SPORTS } from '../constants'

const CheckBox = props => {
  return (
    <label className="search__check" htmlFor={`check_${props.name}`}>
      <input
        type="checkbox"
        hidden
        onChange={props.onChange}
        value={props.name}
        id={`check_${props.name}`}
      />
      <span className="search__checktext">{props.name}</span>
    </label>
  )
}

class Search extends Component {

  constructor() {
    super()

    this.state = {
      searchState: 'Check the sports you practice and hit search',
    }

    this.submitSearch = this.submitSearch.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.errorOnGeo = this.errorOnGeo.bind(this)
  }

  submitSearch(event) {
    event.preventDefault()


    function position() {
      this.setState({
        searchState: 'We are loonking for your Sportsmate',
      })
    }

    if (navigator.geolocation) {
      console.log(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(position.bind(this), this.errorOnGeo)
    } else {
      // no geo available
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

    this.setState({ searchState: message })
  }

  handleCheckbox(event) {
    const { userId = null } = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {}

    if (userId && event.currentTarget.checked) {
      superagent
        .post('/api/workouts')
        .query({
          user_id: Number(userId),
          sport_id: SPORTS.indexOf(event.currentTarget.value) + 1,
        })
        .end((err, res) => {
          if (err) { return }

          console.log(res.body);
        })
    }

    if (userId && !event.currentTarget.checked) {
      // superagent
      //   .del('/api/workouts')
      //   .query({ id: workoutId})
      //   .end(function(err, res){
      //     console.log(res.body);
      //     done();
      //   });
    }
  }

  render() {
    return (
      <div className="search">
        <header>
          <h2 className="search__title">Search</h2>
        </header>

        <h3>{this.state.searchState}</h3>

        <form className="search__form" onSubmit={this.submitSearch}>

          <div className="search__checks">
            {SPORTS.map(sport => (
              <CheckBox name={sport} key={sport} onChange={this.handleCheckbox} />
            ))}
          </div>

          <br />
          <button className="search__submit">Search Sportsmate</button>
        </form>
      </div>
    )
  }
}

export default Search
