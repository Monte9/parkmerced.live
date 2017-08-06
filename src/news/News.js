// API used: https://newsapi.org/

import _ from 'lodash'
import React, { Component } from 'react';
import { MdInfo } from 'react-icons/lib/md';

import './News.css';

const NEWS_API_KEY = "0941be63ba7a4a3da435dc93e95e9a0e";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.check();
  }

  check() {
    const { source } = this.props

    fetch(`https://newsapi.org/v1/articles?source=${source}&apiKey=${NEWS_API_KEY}`)
      .then(res => res.json())
      .then(articles => {
        this.setState({ articles: articles.articles, source })
      });
  }

  renderTile(article) {
    const { urlToImage, url, title } = article

    return (
      <div className="weather-today">
        <div className="top-container">
          <img src={urlToImage} style={{ width: 330, height: null, borderRadius: 20, marginTop: 10 }} />
          <a href={url} style={{ position: 'absolute', top: 20, left: 20, textDecoration: 'none' }}>
            <MdInfo style={{ color: 'white' }} size={30}/>
          </a>
          <div style={{ position: 'absolute', bottom: 0, left: 10, marginRight: 10, backgroundColor: 'black', opacity: 0.9, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
            <p style={{ color: 'white', textAlign: 'Left', marginLeft: 10, marginRight: 10 }}>{title}</p>
          </div>
        </div>
      </div>
    );
  }

  renderNews(articles) {
    return _.map(articles, (article, index) => {
      return this.renderTile(article)
    })
  }

  render() {
    const { articles, source } = this.state

    if (!articles) {
      return (
        <div className="weather-container">
          <p className="loading-label">Loading...</p>
        </div>
      );
    }
    return (
      <div>
        <p style={{color: 'white', fontSize: 21, marginTop: 30}}>
          {_.toUpper(source)}
        </p>
        {this.renderNews(articles)}
      </div>
    );
  }
}

export default News;
