
import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./Artisianmyorder.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Moment from 'react-moment';
// import { Footer } from 'rsuite';
import Footer from "../footer/footer";
import { PreviewChangedPI } from './PreviewChangedPI';

export class PIchange extends Component {
    constructor() {
        super();
        // this.backPI = this.backPI.bind(this);
        //  this.proformaDetailsbtn = this.proformaDetailsbtn.bind(this);
         this.handleChange = this.handleChange.bind(this);
        this.handlePiEdit= this.handlePiEdit.bind(this);
        this.state = {
            
            showValidationPi:false,
            isPidetail:true,
            getPi:[],
            getCurrencySigns:[],
            dataload : false,
            ImageUrl:TTCEapi.ImageUrl+'Product/',
            cgst:0,
            sgst:0,
            hsn:0,
            quantity:0,
            dod:"",
            rpu:"",
            preview: false,
            enquiryId: 0,
            piSend:0,
            currency:4,
            enquiryCode:"",
            expectedDateOfDelivery:"",   
            preview: false,  
        }
    }


    revisedPI(){
        var regex = /[1-9]|\./
        if(regex.test(this.state.quantity) &&  this.state.dod && regex.test(this.state.rpu) && regex.test(this.state.hsncode)){
            if(document.getElementById('agree').checked){
                let params = queryString.parse(this.props.location.search);
                console.log(params);
                TTCEapi.revisedPI(
                    params.code,
                    this.state.cgst,
                    this.state.dod ,
                    this.state.hsncode,
                    this.state.rpu,
                    this.state.quantity,
                    this.state.sgst,

                 
                   ).then((response)=>
                   {
                       if(response.data.valid){
                        this.state.preview = true;   
                        this.setState({  
                        // preview: true,
                        savePi : response.data,
                        isPidetail:!this.state.isPidetail,
                        showValidationPi: false,
                      
                    },()=>{
                    // console.log(this.preview);
                   
                    });
                    customToast.success("PI Details saved successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                    //   browserHistory.push("/Preview");
              }  });
        
            }
            else{
                customToast.error("Please agree to T&C", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
            }
           
            }
         

      else{
        this.setState({
            showValidationPi: true,
           
        //   message : "Invalid PAN Number"
      });
      
      }
    } 
    
    ToggleDelete22 = (id) => {
        document.getElementById('id09'+ id).style.display='block';
    }

    ToggleDeleteClose22 = (id) => {
    document.getElementById('id09'+ id).style.display='none';
    } 

    
    handlePiEdit(){
        
        this.setState({
            isPidetail:!this.state.isPidetail
            
        },()=>{
            // this.checkSave();
        });
        
    
    }

    handleChange(e) {
        const { name, value } = e.target;
        console.log(value);
        this.setState({ [name]: value,showValidationMoq: false }, () => {
        //   console.log(this.state.moq);
        });
    }

    componentDidMount(){
         
        TTCEapi.getCurrencySigns().then((response)=>{
            this.setState({getCurrencySigns : response.data.data},()=>{
                console.log(this.state.getCurrencySigns);
           
            });
        });
    }
    render() {
        return (
            <React.Fragment>

    {this.state.piSend==1?    
    null
        :
        <>  {this.state.isPidetail ? <img
            src={logos.apedit}
            className="aoctick"
            style={{"cursor":"pointer" ,
                "position" : "absolute"}}
            onClick={this.handlePiEdit}
    ></img> : 
    null} </>
    }
    <Row noGutters={true}>
        <Col style={{textAlign:"center"}} className="playfair">
            <h3 className="postchangereq">Post Change Request Process</h3>
        <h1>Update the pro forma invoice</h1>
        <p className="crpigreennote">
            You have <strong>2</strong> days remaining to update your invoice after change request.</p>
        </Col>
        </Row>
        
    <Row noGutters={true} className="PIcolmt BdImgCol">
    <Col sm={6} >
        <label>Quantity</label>
        <br/>
    <input 
    className="PIinput"
        type="number"
        disabled={this.state.isPidetail}
        value={this.state.quantity }
        name="quantity"
        onChange={this.handleChange}
        />
    </Col>
    <Col sm={6}>
    <label >Rate per unit(or metre)</label>
    <br/>
        <select name="cars" id="cars" 
        className={this.state.isPidetail ? 
            "rssymboldis":"rssymbol"}
        disabled={this.state.isPidetail}
        value={this.state.currency}
        onChange={this.handleChange}>
         
             {this.state.getCurrencySigns.map(
            (data) => (
             <option
             key={data.id}
             currency={data.sign}
             value= {data.id}
                 >
             {data.sign}
             </option>
        )
        )}
        </select>
    {/* </span> */}
    <input type="number"  className="PIinput rsinputboxwidth"
    disabled={this.state.isPidetail}
    value={this.state.rpu }
    name="rpu"
    onChange={this.handleChange} />
    </Col>
    </Row>
    <Row noGutters={true} className="PIcol2mt BdImgCol">
    <Col sm={6}>
    <label>Expected date of delivery</label>
    <br/>
    <input className="PIinput" type="date"
    disabled={this.state.isPidetail}
    value={this.state.dod }
    name="dod"
    onChange={this.handleChange}/>
    
    </Col>
    <Col sm={6}>
    <label>HSN Code</label>
    <br/>
    <input className="PIinput" type="number"
    disabled={this.state.isPidetail}
    value={this.state.hsncode }
    name="hsncode"
    onChange={this.handleChange}/>
    </Col>
    </Row>
 
    <Row noGutters={true} className="PIcol2mt BdImgCol">
        <Col sm={12}>
        <input type="checkbox" name="checkbox" value="check" id="agree"
        
        style={{marginRight:"5px"}} 
        /> 
            Agree to <a
                style={{ cursor: "pointer", fontSize: "15px" }}
                onClick={() => {
                alert("clicked");
                }}
            >
                terms & condition
            </a>
    
        </Col>
        </Row>
        <p className="text-center">
    {this.state.showValidationPi ? (
    <span className="bg-danger">All fields are Mandatory</span>
    ) : (
    <br />
    )}
    </p>
    <Row noGutters={true}>
    <Col sm={12} className="text-center crpinote">
        The pro forma will be updated according to the changes in fields, <br/>
        the same shall be intimated to the buyer. 
        </Col></Row>
    <Row noGutters={true}>
    <Col sm={12} className="text-center">
    
    <button className="previewandpi" onClick={() => this.revisedPI()}>
    <img src={logos.PIbtnicon} className="PIbuttonicon"></img>Preview & send PI</button>
    </Col>
    
    </Row>
    
    <PreviewChangedPI 
    //  bp={this.backPI}
     enquiryId={this.state.enquiryId}
    //  enquiryCode={this.state.getEnquiryMoq[0].openEnquiriesResponse.enquiryCode}
     expectedDateOfDelivery={this.state.dod}
     hsn={this.state.hsncode}
     rpu={this.state.rpu}
     quantity={this.state.quantity}
     sgst={this.state.sgst}
     cgst={this.state.cgst}
     piSend={this.state.piSend}
     />
   
                </React.Fragment>
                )
                }



}



