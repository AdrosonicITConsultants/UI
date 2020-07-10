import React, { Component } from "react";
import "./navbar.css";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import logos from "../../assets";
import "./suggestions.css";
import * as Actions from "../../redux/action/action";

var languages = [];
// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = async (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      Accept: "application/json",
    },

    params: {
      str: value,
    },
  };
  console.log(config);
  const response = await axios.get(
    "http://101.53.153.96:8090/search/getSuggestions",
    config
  );
  console.log(response);
  if (response.data.data == null) {
    languages = [];
  } else {
    languages = response.data.data;
  }
  if (languages.length == 0) {
    languages = [{ suggestion: "No Suggestion Found", inputVal: value }];
    return languages;
  } else {
    return inputLength === 0
      ? []
      : languages.filter((lang) => lang["suggestion"]);
  }
};

const getSuggestionValue = (suggestion) => {
  console.log(suggestion.suggestion);
  if(suggestion.suggestionType == "Global"){
    return `${suggestion.suggestion}`;

  }else{
    return `${suggestion.suggestion} in ${suggestion.suggestionType}`;
  }
  
};

// Use your imagination to render suggestions.

const renderSuggestion = (suggestion) => {
  if (suggestion.suggestion == "No Suggestion Found") {
    return (
      <div className="showingnoresults">
        <h2>Your Search "{suggestion.inputVal}"Returned No Results</h2>
        <p> "0 Results found"</p>
        <p>
          {" "}
          "Please check your spelling. <br />
          Or try searching something like “saree”, “dupatta” etc."
        </p>
      </div>
      // return <a href={`/noSuggestions/${suggestion.inputVal}`}><div className="custom-suggestion-row">No Suggestions</div></a>
    );
  }
  if (suggestion.suggestionType == "Global") {
    return (
      <a
        href={`/detailSuggestions/${suggestion.suggestion}/${suggestion.suggestionType}/${languages.length}`}
      >
        <div className="custom-suggestion-row">{suggestion.suggestion}</div>
      </a>
    );
  } else {
    return (
      <a
        href={`/detailSuggestions/${suggestion.suggestion}/${suggestion.suggestionType}/${languages.length}`}
      >
        <div className="custom-suggestion-row">
          {suggestion.suggestion} in {suggestion.suggestionType}
        </div>
      </a>
    );
  }
};
{
  /* <a href={"./detailSuggestions?params="+suggestion.suggestion+"&id="suggestion.suggestionTypeId}><div className="custom-suggestion-row">{suggestion.suggestion} in {suggestion.suggestionType}</div></a> */
}
class Suggestions extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: [],
    };
  }
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };
  onSuggestionsFetchRequested = async ({ value }) => {
    this.setState({
      suggestions: await getSuggestions(value),
    });
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };
  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Search",
      value,
      onChange: this.onChange,
    };
    const renderInputComponent = (inputProps) => (
      <div>
        <div className="searchbarNav inner-addon left-addon">
          <img
            src={logos.searchlogo}
            className="searchIconinTextbox glyphicon"
          ></img>
        </div>
        <a href="./home">
          <img
            className="searchbarNav inner-addon right-addon"
            style={{ width: "15px", marginLeft: "90%", marginTop: "35px" }}
            src={logos.logouticon}
          ></img>
        </a>

        <input
          style={{
            border: "none",
            marginLeft: "18px",
            width: "-webkit-fill-available",
            height: "-webkit-fill-available",
          }}
          {...inputProps}
        />
      </div>
    );
    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          renderInputComponent={renderInputComponent}
          inputProps={inputProps}
        />
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

const ConnectedSuggestions = connect(mapStateToProps)(Suggestions);
export default ConnectedSuggestions;
