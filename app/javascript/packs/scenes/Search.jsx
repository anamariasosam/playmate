import React, { Component } from 'react'

const SPORTS = [
  'Walk',
  'Run',
  'Cycle',
  'Tennis',
  'Squash',
  'Shoot',
  'PingPong',
]

const CheckBox = props => {
  return (
    <label className="search__check">
      <input type="checkbox" hidden />
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
  }

  submitSearch(event) {
    event.preventDefault()

    function position(arg) {
      this.setState({
        searchState: 'We are loonking for your Sportsmate',
      })
    }

    function error(err) {
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

    if (navigator.geolocation) {
      console.log(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(position.bind(this), error.bind(this))
    } else {
      // no geo available
    }
  }

  render() {
    return (
      <div className="search">
        <header>
          within
        </header>

        <h3>{this.state.searchState}</h3>

        <form className="search__form" onSubmit={this.submitSearch}>

          <div className="search__checks">
            {SPORTS.map(sport => <CheckBox name={sport} key={sport} />)}
          </div>

          <br />
          <button className="search__submit">Search Sportsmate</button>
        </form>
      </div>
    )
  }
}

export default Search
