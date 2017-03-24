import React, { Component } from 'react'
import { BrowserHistory } from 'react-router-dom'

class Start extends Component {

  constructor() {
    super()

    this.textAreaAdjust = this.textAreaAdjust.bind(this)
    this.simulateUpload = this.simulateUpload.bind(this)
    this.submitProfile = this.submitProfile.bind(this)
    this.readURL = this.readURL.bind(this)
  }

  readURL(event) {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      const reader = new FileReader()

      reader.onload = (e) => {
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

    this.props.history.push('/search')
  }

  textAreaAdjust() {
    this.description.style.height = '1px'
    this.description.style.height = `${15 + this.description.scrollHeight}px`
  }

  render() {
    return (
      <div>
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
            rows={1}
          />
          <br />

          <textarea
            ref={node => { this.description = node }}
            placeholder="Why do you do sports."
            className="profile__description"
            onKeyUp={this.textAreaAdjust}
          />
          <br />

          <button className="profile__submit">Check Sports</button>
        </form>
      </div>
    )
  }
}

export default Start
