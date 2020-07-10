import React, { Component } from "react";
import "./navbar.css";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import logos from "../../assets";
import "./suggestions.css";


class DetailSuggestions extends Component {

  constructor(props) {
    
    super(props);
    this.state = {};
    console.log("------------------------")
    console.log(this.props.match.params.type)
    this.callapi = this.callapi.bind(this)
  }
  async callapi(searchQuery,searchTypes){
  let temp ={pageNo: 1, searchString: searchQuery, searchType: searchTypes}
  let headers={ "Authorization": "Bearer "  + localStorage.getItem('jwtToken'), "Accept": "application/json" }
  const response = await axios.post("http://101.53.153.96:8090/search/searchProducts", temp, headers)
  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
  console.log(response)
 }

  
  render() {
    this.callapi(this.props.match.params.suggestion,this.props.match.params.type)
    return (

      <div className="searchresults">
      <form>
         <h1>Type {this.props.match.params.type}</h1>
        <h2>Results for "{this.props.match.params.suggestion}"</h2><br></br>
        <p>Showing {this.props.match.params.total} results</p><br></br>
        <div className = "rectangle">
        <p className="showa1"> Filter according to design collections </p>
        <p className="showa2">Show only Antaran Co-design</p>
        <p className="showa3">Show only Artisan Self Design</p>
        <p className="showa4">Show Both</p>
       </div>
      </form>
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  console.log("User : ");
  console.log(user);
  return { user };
}

const ConnectedDetailSuggestions = connect(mapStateToProps)(DetailSuggestions);
export default ConnectedDetailSuggestions;
