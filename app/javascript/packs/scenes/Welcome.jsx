import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';

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

        <RaisedButton
          containerElement={<Link to={this.state.goto} />}
          linkButton={true}
          primary={true}
          fullWidth={true}
          label='Start'
          className="welcome__start"
        />
      </div>
    )
  }
}

export default Welcome
