import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { LOCAL_KEY } from '../constants'

class Welcome extends Component {

  constructor() {
    super()

    this.state = {
      goto: '/start',
    }
  }

  componentWillMount() {
    const { userId = null } = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {}

    if (userId) {
      this.setState({
        goto: '/search',
      })
    }
  }

  render() {
    return (
      <div className="welcome">
        <h2 className="welcome__headline">Welcome to</h2>
        <h1 className="welcome__name">Playmate</h1>
        <p className="welcome__deck">Connecting people to practice the sports they love</p>
        <Link className="welcome__start" to={this.state.goto}>Start</Link>
      </div>
    )
  }
}

export default Welcome
