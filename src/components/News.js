import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
  /*  articles=  [
        {
          "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
          "author": null,
          "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
          "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
          "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
          "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
          "publishedAt": "2020-04-27T11:41:47Z",
          "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
          "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
          "author": null,
          "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
          "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
          "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
          "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
          "publishedAt": "2020-03-30T15:26:05Z",
          "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        },
        
      ]   */
    constructor(props){
        super(props);
       // console.log("hello,m constructor from news.js");
        this.state={
           /* articles:this.articles,*/
           articles:[],
            loading:true,
            page:1,
            totalResults:0
            
        }
        document.title=`${this.props.category}-News`
        
    }

    async updateUrl(){
      this.setState({loading:true})
      this.props.setProgress(10)
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=68a23ca6325049698fca3ec28c6d7d17&page=${this.state.page}&pageSize=${this.props.pagesize}&category=${this.props.category}`;
      let data=await fetch(url);
      this.props.setProgress(30)
      let parsedData=await data.json();
      this.props.setProgress(70)
      this.setState({articles:parsedData.articles,
        loading:false,
        totalResults:parsedData.totalResults})
        this.props.setProgress(100)
        
    }

    async componentDidMount(){
     /* let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=68a23ca6325049698fca3ec28c6d7d17&page=${this.state.page}&pageSize=${this.props.pagesize}&category=${this.props.category}`;
      let data=await fetch(url);
      let parsedData=await data.json();
      this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults});  */

      this.updateUrl()
    }

     handlePrevious=async ()=>{
    /*  this.setState({loading:true})
     
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=68a23ca6325049698fca3ec28c6d7d17&page=${this.state.page-1}&pageSize=${this.props.pagesize}&category=${this.props.category}`;
      let data=await fetch(url);
      let parsedData=await data.json();
      this.setState({articles:parsedData.articles,page:this.state.page-1,loading:false});*/
     
      this.setState({page:this.state.page-1})
      this.updateUrl()
    }

     handleNext=async ()=>{
     /* this.setState({loading:true})
     
      
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=68a23ca6325049698fca3ec28c6d7d17&page=${this.state.page+1}&pageSize=${this.props.pagesize}&category=${this.props.category}`;
      let data=await fetch(url);
      let parsedData=await data.json();
      this.setState({articles:parsedData.articles,page:this.state.page+1,loading:false});*/
      
      this.setState({page:this.state.page+1})
      this.updateUrl()
    }

    static defaultProps={
      country:"in",
      pagesize:6,
      category:"general"
    }

    static propTypes={
      country:PropTypes.string,
      pagesize:PropTypes.number,
      category:PropTypes.string
    }


    fetchMoreData = async () => {
      
      
      this.setState({loading:false}) 
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=68a23ca6325049698fca3ec28c6d7d17&page=${this.state.page+1}&pageSize=${this.props.pagesize}&category=${this.props.category}`;
      this.setState({page:this.state.page+1});
      let data=await fetch(url);
      let parsedData=await data.json();
     
      this.setState({articles:this.state.articles.concat(parsedData.articles),
        
        totalResults:parsedData.totalResults})
        
    };
    
    
  render() {
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
    
    return (
        <>


        <h1 className='text-center' style={{marginTop:"100px",marginBotton:"70px"}} >News-Top {capitalizeFirstLetter(this.props.category)} Headlines</h1>
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
    >  
     
      {this.state.loading && <Spinner></Spinner>}   
     <div className='container'>
       <div className='row'> 
     { /* !this.state.loading &&    */}
         {  this.state.articles.map((element)=>{
            return <div className="col-md-4 my-3 " key={element.url}>
            <Newsitem title={element.title?element.title.slice(0,33)+"....":""} description={element.description?element.description.slice(0,88)+"....":""} url={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} colors={this.props.colors}></Newsitem>
            </div>
          
        })}
        </div>
        
      
  
      </div>
     </InfiniteScroll>
      {/*     <div className="container d-flex justify-content-between">
      <button disabled={this.state.page<=1} onClick={this.handlePrevious} type="button" className="btn btn-dark">&larr; Previous</button>
      <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pagesize)} onClick={this.handleNext} type="button" className="btn btn-dark">Next &rarr;</button>
      </div>     */}
    
      </>
    );
  }
}

export default News;
