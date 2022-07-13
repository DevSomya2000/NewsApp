import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
      country:'in',
      pageSize:'5',
      category: 'general'
    }
    
    static propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string
    }

    constructor(props) {
      super(props)
    
      this.state = {
         articles: [],
         loading: false,
         page: 1,
         totalResults: 0
      }
    }

    async componentDidMount() {
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
        &apiKey=c37a53fb444a47d79801004f83831e2e&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading: true})
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
    }

    handlePrevClick = async () => {
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
      &apiKey=c37a53fb444a47d79801004f83831e2e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
      this.setState({loading: true})
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading: false
      })
    }
    
    handleNextClick = async () => {
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
      &apiKey=c37a53fb444a47d79801004f83831e2e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      this.setState({loading: true})
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
    }

  render() {
    return ( 
        <div className='container my-3'>
            <h1 className='text-center' style={{margin: '35px 0'}}>NewsMonkey - Top Headlines</h1>
            {this.state.loading && <Spinner />}
            <div className="row">
              {!this.state.loading && this.state.articles.map((element)=>{
                  return <div className="col md-4" key={element.url}>
                          <NewsItem key={element.url} title={element.title?element.title:''} description={element.description?element.description:''} imageUrl={element.urlToImage}
                  newsUrl={element.url}/>
                        </div>
              })}    
            </div>
            <div className="container d-flex justify-content-between">
              <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr;  Previous</button>
              <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next  &rarr;</button>
            </div>
        </div>
    )
  }
}

export default News