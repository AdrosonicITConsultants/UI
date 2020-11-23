import React, { Component } from "react";
import "./navbar.css";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import logos from "../../assets";
import "./suggestions.css";
import * as Actions from "../../redux/action/action";
import TTCEapi from "../../services/API/TTCEapi";

var languages = [];
// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = async (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  const response = await TTCEapi.getBuyerSuggestions(value);
  if (response.data.data == null) {
    languages = [];
  } else {
    languages = response.data.data.slice(0,10);
  }
  if (languages.length == 0) {
    languages = [{ suggestion: "No Suggestion Found", inputVal: value }];
    return languages;
  } else {
    languages.unshift({ suggestion: "Suggestions", inputVal: value })
    return inputLength === 0
      ? []
      : languages.filter((lang) => lang["suggestion"]);
  }
};

const getSuggestionValue = (suggestion) => {
  if(suggestion.suggestionType == undefined)
  {

  }
  else if (suggestion.suggestionType == "Global") {
    return `${suggestion.suggestion}`;
  } else {
    return `${suggestion.suggestion} in ${suggestion.suggestionType}`;
  }
};

// Use your imagination to render suggestions.

{
  /* <a href={"./detailSuggestions?params="+suggestion.suggestion+"&id="suggestion.suggestionTypeId}><div className="custom-suggestion-row">{suggestion.suggestion} in {suggestion.suggestionType}</div></a> */
}
class BuyerSuggestions extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: [],
    };
  }
  renderSuggestion = (suggestion) => {
    if(suggestion.suggestion == "Suggestions"){
      return (
          <div
            style={{
              fontSize: "27px",
              paddingLeft: "1rem" ,
              paddingTop: "1rem",
            }}
          >
            {"Suggestions"}
          </div>
      );
    } else if (suggestion.suggestion == "No Suggestion Found") {
      return (
        <div>
          <div
            style={{
              fontSize: "27px",
              paddingLeft: "3rem",
              paddingTop: "1rem",
            }}
          >
            {"Suggestions"}
          </div>

          <div
            style={{
              marginLeft: "4rem",
              paddingTop: "1rem",
              paddingBottom: "3rem",
              color: "darkgray",
              fontSize: "large",
            }}
          >
            No Results Found. Try Checking Your Spelling.
          </div>
        </div>
      );
    }
    var tempDisplay = suggestion.suggestion;
    var input = this.state.value;
    tempDisplay = tempDisplay.toLowerCase();
    input = input.toLowerCase();
    var startIndex = tempDisplay.indexOf(input);
    var endIndex = startIndex + input.length;
    var startingThinString =
      startIndex != 0 ? tempDisplay.substring(0, startIndex) : "";
    var boldString = tempDisplay.substring(startIndex, endIndex);
    var endingThinString =
      endIndex != tempDisplay.length
        ? tempDisplay.substring(endIndex, tempDisplay.length)
        : "";

        if (suggestion.suggestionDetail == "1") {
          return (
            <a
              href={`/detailSuggestions?search=${encodeURIComponent(suggestion.suggestion)}&type=${suggestion.suggestionTypeId}`}
            >
              <div className="custom-suggestion-row">
                {" "}
                {startingThinString}
                <b>{boldString}</b>
                {endingThinString} in <b>{suggestion.suggestionDetail}</b>
              </div>
            </a>
          );
        }
        if (suggestion.plainSuggestion == "1") {
          return (
            <a
              style={{ color: "black" }}
              href={`/detailSuggestions?search=${encodeURIComponent(suggestion.suggestion)}&type=${suggestion.suggestionTypeId}`}
            >
              <div className="custom-suggestion-row">
                {startingThinString}
                <b>{boldString}</b>
                {endingThinString}
              </div>
            </a>
          );
        } else {
          return (
            <a
              style={{ color: "black" }}
              href={`/detailSuggestions?search=${encodeURIComponent(suggestion.suggestion)}&type=${suggestion.suggestionTypeId}`}
            >
              <div className="custom-suggestion-row">
                {startingThinString}
                <b>{boldString}</b>
                {endingThinString} in <b>{suggestion.suggestionType}</b>
              </div>
            </a>
          );
          
        }
        
  };
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };
  onSuggestionsFetchRequested = async ({ value }) => {
    // console.log("Calling key pressing function");
    this.setState({
      suggestions: await getSuggestions(value),
    });
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };
  closesearch = () => {
    this.props.cs();
  }
  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Search products, codes, product type, weaves, category",
      value,
      onChange: this.onChange,
      onKeyPress: (e) => {
        if (e.charCode == 13) {
      
          if(this.state.value!="")
          {
          window.location.href = `/detailSuggestions?search=${encodeURIComponent(this.state.value)}&type=5`;
          }
        }
        else{
        }
      },
    };

    const renderInputComponent = (inputProps) => (
      <div>
        <div className="searchbarNav inner-addon left-addon">
          <img
            src={logos.searchlogo}
            className="searchIconinTextbox glyphicon"
          ></img>
          <img
              className="searchbarNav inner-addon right-addon"
              style={{ width: "15px", left: "90%", top: "3rem" }}
              src={logos.closelogo}
              onClick={()=>{this.closesearch()}}
            ></img>
          <input
            style={{
              border: "none",
              marginLeft: "18px",
              width: "-webkit-fill-available",
              height: "-webkit-fill-available",
              fontSize: "20px",
              padding:" 3px 0px 7px 73px",
              height: "66px"

            }}
            {...inputProps}
          ></input>
          
        </div>
      </div>
    );
    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          renderInputComponent={renderInputComponent}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return { user };
}

const BuyerConnectedSuggestions = connect(mapStateToProps)(BuyerSuggestions);
export default BuyerConnectedSuggestions;
