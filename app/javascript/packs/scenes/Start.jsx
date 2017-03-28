import React, { Component } from 'react'
import superagent from 'superagent'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
    const input = event.target;
    const reader = new FileReader();

    reader.onload = e => {
      this.profilePicture.setAttribute('src', reader.result);

      this.setState({picture: input.files[0] })
    }

    reader.readAsDataURL(input.files[0]);
  }

  simulateUpload() {
    this.file.click()
  }

  submitProfile(event) {
    event.preventDefault();

    superagent
      .post('/api/users/')
      .query({
        name: this.state.name,
        description: this.state.description
        })
      .attach('picture', this.state.picture)
      .end((err, res) => {
        if (err) console.log(err);

        const save = JSON.stringify({
          userId: res.body.id,
          name: res.body.name,
          description: res.body.description,
          picture: res.body.picture.url,
        })

        localStorage.setItem(LOCAL_KEY, save)

        this.props.history.push('/search')
      });

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
              src="/uploads/user/picture/41/AGILE-Graphic01.png"
              alt="picture placeholder"
              height={150}
              width={150}
              ref={node => { this.profilePicture = node }}
              className="profile__picture"
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

          <TextField
            hintText="Name"
            floatingLabelText="Name"
            ref={node => { this.name = node }}
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
            className="profile__name"
            fullWidth={true}
          />

          <br />

          <TextField
            hintText="Why do you do sports"
            floatingLabelText="Why do you do sports"
            multiLine={true}
            rows={2}
            rowsMax={4}
            ref={node => { this.description = node }}
            className="profile__description"
            onKeyUp={this.textAreaAdjust}
            value={this.state.description}
            onChange={event => this.setState({ description: event.target.value })}
            fullWidth={true}
          />

          <br />

          <RaisedButton
            label="Check Sports"
            className="profile__submit"
            fullWidth={true}
            type="submit"
          />
        </form>
      </div>
    )
  }
}

export default Start
