import React, { Component } from 'react'
import ReactDOM from "react-dom";
import ReactToPdf from "react-to-pdf";
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./Buyermyorder.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import moment from 'moment';
import Footer from '../footer/footer';
import Moment from 'react-moment';


export class CRaccepted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getChangeRequestItemTable: [],
            getChangeRequestForArtisan: [],
            counter: 0,
            getCRDate: "",
        };
      }

  getDate = (date) => {
    var date = date.split("T");
    return date[0];
  }

  componentDidMount() {

    TTCEapi.getChangeRequestItemTable().then((response)=>{
      if(response.data.valid)
      {
          console.log(response.data.data);
          this.setState({
              getChangeRequestItemTable: response.data.data
          })
      }
    });

    TTCEapi.getChangeRequestForArtisan(parseInt(this.props.enquiryCode)).then((response)=>{
      if(response.data.valid)
      {
        console.log(response.data.data);
        this.setState({
            getChangeRequestForArtisan: response.data.data.changeRequestItemList,
            getCRDate: response.data.data.changeRequest
        })

        var array = this.state.getChangeRequestForArtisan;
        var count = 0;
        for(var i = 0; i < array.length; i ++) {
          if(array[i].requestStatus === 1) {
            count = count + 1;
          }
        }

        this.setState({
          counter: count,
        })
      }
    })
  }

      render(){
        return(
            
<React.Fragment>
  {this.props.changeRequestStatus === 2 ?
  <h3 className="CRAcceptedh3">Change Request has been rejected.</h3>
  : 
  <h3 className="CRAcceptedh3">Change Request has been accepted.<br/>
    PI has been revised and is available in section on the left.</h3>
  }
    
    <p className="crp">
       <span>Change request raised <b style={{color:"lightgrey",marginLeft:"10px"}}>
       <Moment format="DD-MM-YYYY">
          {this.state.getCRDate.createdOn ? this.state.getCRDate.createdOn : "12/12/2020"}
       </Moment> 
         </b></span><br/>
        {this.props.changeRequestStatus === 2 ?
        <span>Change request rejected <b style={{color:"green",marginLeft:"10px"}}>
          <Moment format="DD-MM-YYYY">
          {this.state.getCRDate.modifiedOn ? this.state.getCRDate.modifiedOn : "12/12/2020"}
       </Moment> 
          </b></span> :
        <span>Change request accepted <b style={{color:"green",marginLeft:"10px"}}>
          <Moment format="DD-MM-YYYY">
          {this.state.getCRDate.modifiedOn ? this.state.getCRDate.modifiedOn : "12/12/2020"}
       </Moment> 
          </b></span>
        }
    </p>
  <div className="craccbox">
  <h3 className="CRAcceptedh3">Change Request Details</h3>

  {this.state.getChangeRequestForArtisan ? this.state.getChangeRequestForArtisan.map((data) => [
    this.state.getChangeRequestItemTable ? this.state.getChangeRequestItemTable.map((item) => [
    data.requestItemsId === item.id ?
      <Row noGutters={true} className="innerboxcr">
      <Col className="col-xs-1"></Col>
          <Col className="col-xs-5">
          <p className="Crh">{item.item}</p>
          <p className="changereqcolor marginminus">{data.requestText}</p>
          </Col>
          <Col className="col-xs-3"></Col>
          {data.requestStatus === 1 ?
          <Col className="col-xs-3">
            <b style={{color:"green"}}>Accepted</b> 
            <p> <img src={logos.acceptgreen} className="acceptrejimh"/></p>
          </Col>
          :
          <>
          <Col className="col-xs-3">
            <b style={{color:"red"}}>Rejected</b> 
            <p> <img src={logos.sadred} className="acceptrejimh"/></p>
          </Col>
          </>
          }
      </Row>
      : null
    ]) : null
  ]) : null
    }
    

<p style={{textAlign:"center"}}>Artisan has accepted <b style={{color:"green"}}>
  {this.state.counter}</b> out of <b style={{color:"green"}}>
  {this.state.getChangeRequestForArtisan.length}</b> requests</p>
  </div>

</React.Fragment>
        )
    }
    
}
function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(CRaccepted);
export default connectedLoginPage;