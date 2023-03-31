import './App.css';
import Navbar from './components/Navbar';
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";  
import LoadingBar from 'react-top-loading-bar'



import React, { Component } from 'react'

export default class App extends Component {
  c="Vidhi";
 /* apikey=process.env.REACT_APP_NEWS_API*/
 apikey=process.env.REACT_APP_NEWS_API
 
  state={
    progress:0
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }

  render() {
    let pagesize=6
    return (
     
    <Router>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
      
      />
      <Routes>
        <Route exact path="/" element={<News key="general" apikey={this.apikey} pagesize={this.pagesize} country="in" setProgress={this.setProgress} category="general"  colors="blue"/>}>
        </Route>
        <Route exact path="/business" element={<News key="business" apikey={this.apikey} pagesize={this.pagesize} country="in" setProgress={this.setProgress} category="business" colors="blue"/>}>
        </Route>
        <Route exact path="/entertainment" element={<News key="entertainment" apikey={this.apikey} pagesize={this.pagesize} country="in" setProgress={this.setProgress} category="entertainment" colors="pink"/>}>
        </Route>
        <Route exact path="/health" element={<News key="health" apikey={this.apikey} pagesize={this.pagesize} country="in" setProgress={this.setProgress} category="health" colors="green"/>}>
        </Route>
        <Route exact path="/science" element={<News key="science" apikey={this.apikey} pagesize={this.pagesize} country="in" setProgress={this.setProgress} category="science" colors="red"/>}>
        </Route>
        <Route exact path="/sports" element={<News key="sports" apikey={this.apikey} pagesize={this.pagesize} country="in" setProgress={this.setProgress} category="sports" colors="blue"/>}>
        </Route>
        <Route exact path="/technology" element={<News key="technology" apikey={this.apikey} pagesize={this.pagesize} country="in" setProgress={this.setProgress} category="technology" colors="red"/>}>
        </Route>
      </Routes>  
    </Router>
      
     
    )
  }
}

