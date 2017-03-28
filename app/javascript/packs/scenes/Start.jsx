import React, { Component } from 'react'
import superagent from 'superagent'

import { LOCAL_KEY } from '../constants'

class Start extends Component {

  constructor() {
    super()

    this.state = {
      name: '',
      description: '',
      picture: '',
    }

    this.textAreaAdjust = this.textAreaAdjust.bind(this)
    this.simulateUpload = this.simulateUpload.bind(this)
    this.submitProfile = this.submitProfile.bind(this)
    this.readURL = this.readURL.bind(this)
  }

  componentWillMount() {
    const {
      userId = null,
      name = '',
      description = '',
    } = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {}

    if (userId) {
      this.setState({
        name,
        description,
      })
    }
  }

  readURL(event) {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      const reader = new FileReader()

      reader.onload = e => {
        this.profilePicture.setAttribute('src', e.target.result)
      }

      reader.readAsDataURL(event.currentTarget.files[0])
    }
  }

  simulateUpload() {
    this.file.click()
  }

  submitProfile(event) {
    event.preventDefault()

    superagent
      .post('/api/users')
      .query({
        name: this.state.name,
        description: this.state.description,
      })
      .end((err, res) => {
        if (err) { return }

        console.log('res', res.body);

        const save = JSON.stringify({
          userId: res.body.id,
          name: res.body.name,
          description: res.body.description,
        })

        localStorage.setItem(LOCAL_KEY, save)

        this.props.history.push('/search')
      })
  }

  textAreaAdjust() {
    this.description.style.height = '1px'
    this.description.style.height = `${15 + this.description.scrollHeight}px`
  }

  render() {
    return (
      <div className="profile">
        <form className="profile__form" onSubmit={this.submitProfile}>
          <label htmlFor="file">
            <img
              src="http://www.sheffield.com/wp-content/uploads/2013/06/placeholder.png"
              alt="name"
              height={150}
              width={150}
              className="profile__picture"
              ref={node => { this.profilePicture = node }}
            />
            <input
              type="file"
              id="file"
              ref={node => { this.file = node }}
              hidden
              onChange={this.readURL}
            />
          </label>

          <br />

          <input
            type="text"
            ref={node => { this.name = node }}
            placeholder="Name"
            className="profile__name"
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
          />
          <br />

          <textarea
            ref={node => { this.description = node }}
            placeholder="Why do you do sports."
            className="profile__description"
            onKeyUp={this.textAreaAdjust}
            value={this.state.description}
            onChange={event => this.setState({ description: event.target.value })}
          />
          <br />

          <button className="profile__submit">Check Sports</button>
        </form>
      </div>
    )
  }
}

export default Start
