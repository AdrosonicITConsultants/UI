import React, { Component } from "react";
import Modal from "react-modal";
import Wishlist from "../Awishlist/Wishlist";
import AlertRemoveItem from "../Awishlist/AlertRemoveItem";
import "./AlertModal.css"
    class Popup extends React.Component {
        constructor(props) {
        super(props);
        this.state = {
        
          popupHeader:"Looks like you don't have an account"
        };
      }
      
       refreshPage(){ 
        window.location.reload(); 
      }
      render() {
        var headerStyle = {
          color:'red',
          fontWeight:'bold',
          fontSize: 20
        }
        return (
          
          <div className='popup'>
            <div className='popup_inner'>
           <div style={headerStyle}>
           Hello
              </div>
              {/* <button onClick={this.props.closePopup} */}
              <button onClick={this.props.refreshPage}>close me</button>
            </div>
          </div>
        );
      }
    }
    export default class AlertModal extends React.Component {
      constructor() {
        super();
        this.state = {
          showPopup: false,
          header:"Welcome"
        };
      }
      togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
      }
     
      render() {
        return (
          <div>
            <h1>hihi</h1>
        
            <button onClick={this.togglePopup.bind(this)}>show popup</button>
           
            
            {this.state.showPopup ? 
              <Popup
                text='Popup window text'
                refreshPage={this.togglePopup.bind(this)}
              />
              : null
            }
          </div>
        );
      }
    };
    
    