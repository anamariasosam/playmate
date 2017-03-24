// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Start from './scenes/Start'
import Search from './scenes/Search'
import Welcome from './scenes/Welcome'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Welcome} />
          <Route path="/start" component={Start} />
          <Route path="/search" component={Search} />
        </div>
      </Router>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('root'))
})
