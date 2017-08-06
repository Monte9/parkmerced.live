import React, { Component } from 'react';
import YouTube from 'react-youtube'
import ScrollView from 'react-scrollview'

import Weather from './weather/Weather.js'
import News from './news/News'

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
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      }
    };

    return (
      <div className="app-container" style={{ width: width, height: height }}>
        <div className="first-name" style={{paddingLeft: 0.01 * this.state.width, paddingRight: 0.01 * this.state.width}}>
          <ScrollView
            style={{ width: 350, borderRadius: 20, backgroundColor: '#3F5765', textAlign: 'center', position: 'absolute', top: 0.1 * this.state.height / 2,  height: height - 0.1 * this.state.height }}
          >
            <News source="techcrunch" />
            <News source="buzzfeed" />
            <News source="cnn" />
            <News source="espn" />
          </ScrollView>
          <div className="weather-app">
            <Weather />
          </div>
        </div>
        <YouTube
          videoId="xjiXY4S7R5M"
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
