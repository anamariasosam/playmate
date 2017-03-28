import React, { Component } from 'react'
import superagent from 'superagent'

import { LOCAL_KEY, SPORTS, SPORTSSVG } from '../constants'

const CheckBox = props => {
  return (
    <label className="search__check" htmlFor={`check_${props.name}`}>
      <input
        type="checkbox"
        hidden
        onChange={props.onChange}
        value={props.name}
        id={`check_${props.name}`}
        checked={props.checked}
      />
      <span className="search__icon" dangerouslySetInnerHTML={{ __html: SPORTSSVG[props.name] }} />
      <span className="search__checktext">{props.name}</span>
    </label>
  )
}

class Search extends Component {

  constructor() {
    super()
    const { userId = null } = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {}

    this.state = {
      searchState: 'Check the sports you practice and hit search',
      sports: [],
    }

    superagent
    .get(`/api/users/${userId}`)
    .end((err, res) => {
      if (err) { alert('Sorry, something went wrong') }

      this.setState({ sports: res.body.sports})
    })

    this.submitSearch = this.submitSearch.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.errorOnGeo = this.errorOnGeo.bind(this)
  }

  submitSearch(event) {
    event.preventDefault()
    this.setState({
      searchState: 'Finding your location...',
    })

    const { userId = null } = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {}


    function showPosition(position) {
      let crd = position.coords
      let sports = this.state.sports
      let latitude = crd.latitude
      let longitude = crd.longitude

      superagent
       .put(`/api/users/${userId}`)
       .send({
         sports,
         latitude,
         longitude
        })
       .end((err, res) => {
         if (err) { alert('Sorry, something went wrong') }

         this.setState({ searchState: '👯 now lets find your playmates...'})
         superagent
          .get(`/api/users/nearby/${userId}`)
          .end((err, res) => {
             if (err) { alert('Sorry, something went wrong') }

             console.log(JSON.stringify(res.body))
           })
       })
    }

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition.bind(this), this.errorOnGeo)
    } else {
      this.setState({
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

    this.setState({ searchState: message })
  }

  handleCheckbox(event) {
    let sports = []

    if (event.currentTarget.checked) {
      sports = this.state.sports.slice()
      sports.push(event.currentTarget.value.toLowerCase())
    }

    if (!event.currentTarget.checked) {
      let value = event.currentTarget.value.toLowerCase()
      sports = this.state.sports.filter(item => item !== value)
    }

    this.setState({ sports })
  }

  render() {
    return (
      <div className="search">
        <header>
          <h2 className="search__title">Search</h2>
        </header>

        <h3 className="search__status" >{this.state.searchState}</h3>
        <form className="search__form" onSubmit={this.submitSearch}>

          <div className="search__checks">
            {SPORTS.map(sport => {
              const checked = this.state.sports.indexOf(sport) > -1

              return (
                <CheckBox
                  checked={checked}
                  key={sport}
                  name={sport}
                  onChange={this.handleCheckbox}
                />
              )
            })}
          </div>

          <br />
          <button className="search__submit">Search Sportsmate</button>
        </form>
      </div>
    )
  }
}

export default Search
