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

class Home extends Component {

  constructor() {
    super()

  }

  render() {
    return (
      <div className="search">
        <header>
          within
        </header>

        <form className="search__form">

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

export default Home
