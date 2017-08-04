import React, { Component } from 'react';
import YouTube from 'react-youtube'

import Weather from './weather/Weather.js'
import './App.css';


var getDimensions = () => ({
  width: window.innerWidth,
  height: window.innerHeight
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = getDimensions();

    this.handleResize = this.handleResize.bind(this);
  }

  handleResize() {
    this.setState(getDimensions());
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { width, height } = this.state
    const opts = {
      height: height,
      width: width,
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <div className="app-container" style={{ width: width, height: height }}>
        <div className="first-name" style={{paddingLeft: 0.01 * this.state.width, paddingRight: 0.01 * this.state.width}}>
          <div className="app">
            <Weather />
          </div>
        </div>
        <YouTube
          videoId="5yqbjUG_gLQ"
          opts={opts}
        />
      </div>
    );
  }
}

export default App;


// <YouTube
//           videoId="5yqbjUG_gLQ"
//           opts={opts}
//         />
