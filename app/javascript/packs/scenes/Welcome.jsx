import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Welcome extends Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div className="welcome">
        <h2 className="welcome__headline">Welcome to</h2>
        <h1 className="welcome__name">Sports-mate</h1>
        <p className="welcome__deck">Connecting people to practice the sports they love</p>
        <Link className="welcome__start" to="/start">Start</Link>
      </div>
    )
  }
}

export default Welcome
