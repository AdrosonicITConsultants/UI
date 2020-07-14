import React, { Component } from "react";
import "./navbar.css";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import logos from "../../assets";
import "./suggestions.css";
import TTCEapi from "../../services/API/TTCEapi";
import { Container } from "reactstrap";

class ArtistDetailSuggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props.match.params.type);
    this.callapi = this.callapi.bind(this);
  }

  async callapi(searchQuery, searchTypes) {
    const response = await TTCEapi.showArtistSearchSuggestion(
      searchQuery,
      searchTypes
    );
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    console.log(response);
  }

  render() {
    this.callapi(
      this.props.match.params.suggestion,
      this.props.match.params.type
    );
    return (
      <Container>
      <div className="searchresults">
        <form>
          {/* <h1>Type {this.props.match.params.type}</h1> */}
          <h2>Results for "{this.props.match.params.suggestion}"</h2>
          <br></br>
          <p>Showing {this.props.match.params.total} results</p>
          <br></br>
          <div className="rectangle">
            <p className="showa1"> Filter according to design collections </p>
            <p className="showa2">Show only Antaran Co-design</p>
            <p className="showa3">Show only Artisan Self Design</p>
            <p className="showa4">Show Both</p>
          </div>
        </form>
      </div>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

const ArtistConnectedDetailSuggestions = connect(mapStateToProps)(ArtistDetailSuggestions);
export default ArtistConnectedDetailSuggestions;
