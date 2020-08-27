import React, { Component } from 'react'
import ReactDOM from "react-dom";
import ReactToPdf from "react-to-pdf";
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
// import "./Buyermyorder.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import moment from 'moment';
import Footer from '../footer/footer';



export class ArtisanChangeRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accepted:false,
            rejected:false,
            getChangeRequestForArtisan:[],
            getChangeRequestItemTable:[],
            getPi:[],
            dataload:false,
            selectedId:-1
        };
        this.AcceptChange = this.AcceptChange.bind(this);
        this.RejectChange = this.RejectChange.bind(this);
      }

      AcceptChange(e,id){
          this.setState({
              selectedId:id
          })
          if(e==0){
            this.setState({
                accepted:true,
                rejected:false
                
            })
          }
          else{
            this.setState({
                accepted:false,
                rejected:true
                
            })  
          }
        
      }
     RejectChange(){
        this.setState({
            rejected:true
        })
    }


componentDidMount(){
    TTCEapi.getChangeRequestItemTable().then((response)=>{
        if(response.data.valid)
        {
            console.log(response.data.data);
            this.setState({getChangeRequestItemTable:response.data.data},()=>{
                TTCEapi.getChangeRequestForArtisan(this.props.enquiryId).then((response)=>{
                    if(response.data.valid)
                    {
                        console.log(response.data.data);
                        this.setState({getChangeRequestForArtisan:response.data.data})
                    }
                })


            }
                
                
                )
        }
    })
    TTCEapi.getPi(this.props.enquiryId).then((response)=>{
        if(response.data.valid)
        {
            console.log(response.data.data);
            this.setState({getPi:response.data.data,
                dataload:true
            })
        }
    })
  
}

    render(){
    return(
            
<React.Fragment>
{this.state.dataload ?
<>

    <Row noGutters={true}>
            <Col className="col-xs-12 bold" style={{textAlign:"center"}}>
                <b>Please Note:</b> <br/>
                <p>Change request is only one time facility to buyer for their ongoing order with you.
                    <br/>Do consider with smile if able to accept the request.
                </p>
                <p style={{color:"orangered"}}>If you accept this change request, the buyer shall not be able to raise another change request.</p>
            </Col>
    </Row>
    <Row noGutters={true}>
        <Col className="col-xs-12" style={{textAlign:"center"}}>
        <button className="enqreqbtn mbcr" ><img src={logos.chatwhite} style={{marginRight:"10px"}}/>Go to this Enquiry chat</button>

        </Col>
    </Row>
    <div className="craccbox">
  <h3 className="CRAcceptedh3 " style={{color:"goldenrod"}}>Change Request Details</h3>
 
  {this.state.getChangeRequestForArtisan.map((item)=> 

  <>
<Row noGutters={true} className="innerboxcr">
<Col className="col-xs-1"></Col>
    <Col className="col-xs-6">
    <p className="Crh">
        {/* Motif Size */}
        {this.state.getChangeRequestItemTable[item.id-1].item}
        </p>
        {item.id==this.state.getChangeRequestItemTable[item.id-1].id
                    ?
                    item.id == 3 ? 
                    <p className="changereqcolor">
     <span><b style={{color:"darkgrey"}}>{this.state.getPi.quantity}--------------</b><b>{item.requestText}</b></span>
     </p>
                    :
                   
                    <p className="changereqcolor">
                    {item.requestText}
                    </p>
            :
            ""}
    <p className="changereqcolor marginminus">
       
    </p>
    </Col>
    <Col className="col-xs-2">
    <b style={{color:"green"}}>Accepted</b> 
       <p><button  className="buttoncssnone">
           {this.state.accepted?
                    this.state.selectedId==item.id
                    ?
                    
                       <img src={logos.acceptgreen} className="acceptrejimh" />
                       :
                       <img src={logos.happygrey} className="acceptrejimh" onClick={()=>{this.AcceptChange(0,item.id)}} />
                        :
                        <img src={logos.happygrey} className="acceptrejimh" onClick={()=>{this.AcceptChange(0,item.id)}} />

           }
           </button>
     </p>
    </Col>
   
    <Col className="col-xs-2">
    <b style={{color:"red"}}>Rejected</b> 
       <p><button className="buttoncssnone">
           {this.state.rejected?
             <img src={logos.sadred} className="acceptrejimh"/>
           :
           <img src={logos.sadgrey} className="acceptrejimh" 
           onClick={()=>{this.AcceptChange(1,item.id)}}
           />

    }
           </button> </p>
    </Col>
         
</Row>
  </>  

)}

<p style={{textAlign:"center"}}>Artisan has accepted <b style={{color:"green"}}>2</b> out of <b style={{color:"green"}}>3</b> requests</p>
<Row noGutters={true}>
      <Col className="col-xs-12" style={{textAlign:"center"}}>
      <button className="submitCRart">Submit</button>
      </Col>
  </Row>
  </div>

 
  </>
:
<>
</>}
</React.Fragment>
        )
    }
    
}
function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(ArtisanChangeRequest);
export default connectedLoginPage;