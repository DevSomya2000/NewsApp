import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    
    constructor(props) {
      super(props)
    
      this.state = {
         articles: [],
         loading: false
      }
    }

    async componentDidMount() {
        let url='https://newsapi.org/v2/top-headlines?country=in&apiKey=c37a53fb444a47d79801004f83831e2e'
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({articles: parsedData.articles})
    }

  render() {
    return ( 
        <div className='container my-3'>
            <h1>NewsMonkey - Top Headlines</h1>
            <div className="row">
            {this.state.articles.map((element)=>{
                return <div className="col md-4" key={element.url}>
                        <NewsItem key={element.url} title={element.title?element.title:''} description={element.description?element.description:''} imageUrl={element.urlToImage}
                newsUrl={element.url}/>
            </div>
            })}
                
            </div>
        </div>
    )
  }
}

export default News