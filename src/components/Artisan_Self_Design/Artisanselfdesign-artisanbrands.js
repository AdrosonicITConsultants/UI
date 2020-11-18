import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import './ArtisanselfDesign.css';
import TTCEapi from '../../services/API/TTCEapi';
import Footer from "../footer/footer";
import ArtisanCard from './ArtisanCard';
import BuyersProductDetails from '../Buyer-ProductDetails/Buyer-ProductDetails';

 class ArtistSelfDesignBrands extends Component {
      constructor(props){
      super(props);
      this.state = {
        clicked : false,
        cluster :[],
        filterArtisian:[],
        visible:6,
        clusterid : -1,
        datafiltered:[],
      }
      this.loadMore = this.loadMore.bind(this);
    }
  
    loadMore() {
      this.setState((prev) => {
        return {visible: prev.visible + 6};
      });
    }
  
      handleCluster(e) {
      var index = e.target.selectedIndex;
      var optionElement = e.target.childNodes[index];
      var option =  optionElement.getAttribute('clusterid');
       this.setState({ [e.target.name]: e.target.value,clusterid:option }, ()=> {
           
      });
    }
    componentDidMount(){
   
      TTCEapi.getClusters().then((response)=>{
       this.setState({cluster : response.data.data},()=>{
       });
   });
   TTCEapi.getFilteredArtisans().then((response)=>{
    this.setState({filterArtisian : response.data.data},()=>{
    });
});
   }
  
    render () {
    
      return (
     
        <React.Fragment>
       <Row noGutters="true">
         
         <Col sm={{size:"12"}}>
         <select  className="SelectCategory"  onChange={(e) => this.handleCluster(e)}>
        <option key = '0' clusterid = '-1' selected > All Cluster</option>
      {this.state.cluster.map((data) => <option key =  {data.id} clusterid={data.id} value={data.desc}>{data.desc}</option>)}
                 </select>  
        </Col>

       </Row>
<Row noGutters="true">
    {this.state.cluster ?
this.state.filterArtisian.map((data,index) => {
 
   if (this.state.clusterid==data.clusterId )
  return (
    <ArtisanCard
    key={index}
    companyName={data.companyName}
    firstName={data.firstName}
    logo={data.logo}
    profilePic={data.profilePic}
    artisanId={data.artisanId}
    />
 
  );
   
 })

:null}


{this.state.cluster? this.state.filterArtisian.map((data,index) => {
 if(this.state.clusterid==-1)
 return(
    <ArtisanCard
    key={index}
    companyName={data.companyName}
    firstName={data.firstName}
    logo={data.logo}
    profilePic={data.profilePic}
    artisanId={data.artisanId}
    />
 )
}):null
}


</Row>
    
        </React.Fragment>
      );
    }
  
  
  
    }
export default ArtistSelfDesignBrands;