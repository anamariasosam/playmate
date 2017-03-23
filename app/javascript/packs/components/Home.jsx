import React, { Component } from 'react'

class Home extends Component {

  constructor() {
    super()

    this.textAreaAdjust = this.textAreaAdjust.bind(this)
    this.simulateUpload = this.simulateUpload.bind(this)
  }

  simulateUpload() {
    this.file.click()
  }

  textAreaAdjust() {
    this.description.style.height = '1px'
    this.description.style.height = `${15 + this.description.scrollHeight}px`
  }

  render() {
    return (
      <div>
        <form className="profile__form">
          <button onClick={this.simulateUpload} className="profile__simulator">
            <img
              src="http://www.sheffield.com/wp-content/uploads/2013/06/placeholder.png"
              alt="name"
              height={150}
              width={150}
              className="profile__picture"
            />
          </button>

          <input type="file" ref={node => { this.file = node }} hidden />
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

export default Home
