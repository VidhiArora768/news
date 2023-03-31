import React, { Component } from 'react';

export class Newsitem extends Component {
   /* constructor(){
        super();
        console.log("hello,m constructor");
    }*/   


    /* $env:NODE_OPTIONS = "--openssl-legacy-provider" */



  render() {
    let {title,description,url,newsUrl,author,date,source,colors}=this.props;
    return (
      <div>
         
        <div className="card" >
          <div style={{
            display:'flex',
            justifyContent:'flex-end',
            position:'absolute',
            right:'0'
          }}>
            <span className=" badge rounded-pill " style={{backgroundColor:`${colors}`}}>
              {source}
            </span>
            </div>
            <img src={!url?"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg":url} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href={newsUrl} target="_blank" className="btn btn-primary btn-sm btn-dark my-2">Read More</a>
                <div className="card-footer text-body-secondary">
                  By:{!author?"Unknown":author} on {new Date(date).toGMTString()}
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
