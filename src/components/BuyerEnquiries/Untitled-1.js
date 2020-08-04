this.state.getEnquiryMoq  ? ( ( this.state.getEnquiryMoq.map((data) => (  <>


    {data.openEnquiriesResponse.productType=="Custom Product"? <>
    <>
                                        <Col sm={10}>
                                        <h1 className="receivedmoqh1">Received MOQ</h1>
                                        {this.state.getMoqs ? ( ( this.state.getMoqs.map((data) => (
                                            
                                            <> 
                                        <> 
                                     
                                     <Row noGutters={true} style={{overflow:"auto"}}>
                                    <table className="MOqtable" style={{width:"100%",marginTop:"15px"}}>
                                        <tr className="borderleftblue rowmaxheight">
                                        <td className="recmoqcol1">
                                            <Row noGutters={true} >
                                              
                                                 <Col className="col-xs-12 " sm={12} md={4} >
                                                 {data.logo?
                                                <img className="Receivemoqbrandimg" src={TTCEapi.ImageUrl+'User/'+data.artisanId+'/CompanyDetails/Logo/'+data.logo}/>
                                                    :
                                                    <img className="BdImg profileImage" src={logos.Smile} />
                                                   }
                                                  
                                                </Col>

                                                <Col className="col-xs-12 colright" sm={12} md={8}>
                                          <p className="Artisianbrandh">Artisian Brand :<span style={{color:"cornflowerblue"}}> {data.brand}</span> </p>
                                                    <span className="regionmoq"> {data.clusterName}</span>
                                                </Col>
                                            </Row>
                                        </td>
                                        <td className="recmoqcol2">
                                        <Row noGutters={true}>
                                                 <Col className="col-xs-12 tdclasscss">
                                                    <p className="theading">MOQ</p>
                                                       {data.moq.moq}
                                                </Col>
                                            </Row>
                                        </td>
                                        <td>
                                        <Row noGutters={true}>
                                        <Col className="col-xs-12 tdclasscss">
                                        <p className="theading">Price/unit(or m)</p>
                                      
                                        {data.moq.ppu}
                                                </Col>
                                            </Row>
                                         </td>
                                        <td>
                                        <Row noGutters={true}>
                                        <Col className="col-xs-12 tdclasscss">
                                        <p className="theading">ETA Delivery</p>
                                        {data.moq.deliveryTimeId} Days
                                                </Col>
                                            </Row>
                                        </td>
                                        <td>
                                        <Row noGutters={true} onClick={() => this.readmoreNote()}>
                                        <Col className="col-xs-12 readmored" >

                                          <p className="recheading"  >Received
                                          <Moment format=" DD-MM-YYYY">
                                          {data.moq.createdOn}
                                            </Moment> :
                                          <Moment format=" h:mm a">
                                          {data.moq.createdOn}
                                            </Moment>
                                          </p>
                                        {this.state.readmore ? <>Collapse  <i class="fa fa-angle-up fa-lg" aria-hidden="true"></i> </>:
                                        <> Read More <i class="fa fa-angle-down fa-lg" aria-hidden="true"></i></>
                                        }
                                                       

                                                </Col>
                                            </Row>
                                        </td>
                                        {this.state.readmore?
                                        ""
                                        :
                                        <td>
                                        <Row noGutters={true}>
                                        <Col className="col-xs-12 tdclasscss">
                                       
                                        <i class="fa fa-minus-circle" aria-hidden="true" style={{color:"red"}}></i>
                                                </Col>
                                            </Row>
                                        </td>
                                        }
                                       
                                        <td className={this.state.readmore? "acceptmoqbtnlg":"acceptmoqbtn"} onClick={() => this.AcceptMoq(data.moq.id,data.artisanId)} >
                                        <Row noGutters={true} >
                                                 <Col className="col-xs-12 ">
                                                 <i class="fa fa-handshake-o accepticon" aria-hidden="true"></i>
                                             Accept
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                   
                                    </table>
                                    {/* -----------readmore-------------- */}
                                             {this.state.readmore ? 
                                           <>
                                              <div className="readmorediv">
                                              <p><b>Note from Artisan</b></p>
                                               This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                               This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                               This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                               This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                              </div>
                                              </>
                                             :null}
                                         {/* ----------------Accepting Readmore------------------    */}
                                         {this.state.acceptingmoq ? 
                                           <>
                                             <div 
                                             className={this.state.acceptingmoqtext?"acceptingloader" : "acceptedloader"}>
                                             <i class="fa fa-handshake-o accepticon" aria-hidden="true"></i>
                                            {this.state.acceptingmoqtext ?  "Accepting..." : "Accepted"} 
                                             </div>
                                              <div className="readmorediv">
                                              <p><b>Note from Artisan</b></p>
                                               This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                               This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                               This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                               This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                              </div>
                                              </>
                                             :null}
                                               {/* ----------------Accepting Readmore ends------------------    */}
                                          
                                      
                                    </Row>  
{/* visible */}
                    {this.state.visiblecardmoq || this.state.getEnquiryMoq[0].openEnquiriesResponse.isMoqSend!= null ?
                        <>
                                                                                    
                    <Row noGutters={true} >  
                    <Col sm={1}></Col>                                        
                <Col sm={10}>
                <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt">
                <Col sm={6} className="Moqh1 Moqbuyerh1">
                    Min Order Qnty:
                </Col>
                <Col sm={6} className="Moqh2 ">
                <input 
                id="moq"
                className="width200 alignbox" 
                type="number"
                disabled={this.state.isMoqdetail} 
                    value={data.moq.moq}
                    name="moq"
                    onChange={this.handleChange}/> 
                </Col>
                </Row>

                <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt2">
                <Col sm={6} className="Moqh1 Moqbuyerh1">
                Price/unit:
                </Col>
                <Col sm={6} className="Moqh2">
                {/* <i class="fa fa-inr" aria-hidden="true"></i>  */}
                <input 
                id="ppu"
                className="width200 alignbox2"
                type="text"
                disabled={this.state.isMoqdetail} 
                value={data.moq.ppu}
                name="ppu"
                onChange={this.handleChange}
                /> 

                </Col>
                </Row>

                <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt2">
                <Col sm={6} className="Moqh1 Moqbuyerh1">
                Estimated delivery date:
                </Col>
                <Col sm={6} className="Moqh2select">
                                    <select
                                    id="productCategorie"
                                    className="Moqh2selectheight" 
                                    name="deliveryDesc"
                                    value={data.moq.deliveryTimeId}
                                    disabled={this.state.isMoqdetail} 
                                    onChange={this.handleChange}
                                    style={{opacity:"1"}}
                                >
                                    <option
                                    key="0"
                                    deliveryDesc = '-1'
                                    value="Select"
                                    selected="true" disabled="disabled"
                                    >
                                    Select
                                    </option>
                                    {this.state.getMoqDeliveryTimes.map(
                                    (data) => (
                                        <option
                                        key={data.deliveryDesc}
                                        deliveryDesc={data.id}
                                        value= {data.id}
                                            >
                                        {data.deliveryDesc}
                                        </option>
                                    )
                                    )}
                                                        </select>
                                        </Col>
                                        </Row>

                                        <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt2">
                                        <Col sm={12} className="Moqh1 Moqbuyerh1">
                                        Additional Note:
                                        </Col>
                                        <p className="Moqh1p">
                                        <textarea id="additionalInfo " 
                                        name="additionalInfo"
                                        value={this.state.additionalInfo}
                                        disabled={this.state.isMoqdetail} 
                                        onChange={this.handleChange}
                                        className="width100p "></textarea>
                                        </p>

                                        </Row>
                                        </Col>    
                                        {/* <Col sm={1}></Col>   */}
                                        </Row>
                                                                                    
                                                 </>
                                            :null}

                                                    {/* visible end */}


                                      </>

                                      </>    ) ) 
                                            )): null
                                            }
                                        </Col>
                                            
                                            
                               
                                   </>
              
   
                </>:
                // not custom product start
                <>
                            {this.state.getMoqs ? ( ( this.state.getMoqs.map((data) => (
                                            
                                            <> 
                                                     {/* <Col sm={1}></Col> */}
                                        <Col sm={10}>
                                        <> 
                                      <h1 className="receivedmoqh1">Received MOQ</h1>
                                     <Row noGutters={true} style={{overflow:"auto"}}>
                                    <table className="MOqtable" style={{width:"100%"}}>
                                        <tr className="borderleftblue">
                                        <td >
                                            <Row noGutters={true}>
                                                 <Col className="col-xs-12 " sm={12} md={4} >
                                                 {data.logo?
                                                <img className="Receivemoqbrandimg" src={TTCEapi.ImageUrl+'User/'+data.artisanId+'/CompanyDetails/Logo/'+data.logo}/>
                                                    :
                                                    <img className="BdImg profileImage" src={logos.Smile} />
                                                   }
                                                    {/* <img src={logos.Fabric} className=""></img> */}
                                                </Col>

                                                <Col className="col-xs-12 colright" sm={12} md={8}>
                                          <p className="Artisianbrandh">Artisian Brand :<span style={{color:"cornflowerblue"}}> {data.brand}</span> </p>
                                                    <span className="regionmoq"> {data.clusterName}</span>
                                                </Col>
                                            </Row>
                                        </td>
                                        <td>
                                        <Row noGutters={true}>
                                                 <Col className="col-xs-12 tdclasscss">
                                                    <p className="theading">MOQ</p>
                                                       {data.moq.moq}
                                                </Col>
                                            </Row>
                                        </td>
                                        <td>
                                        <Row noGutters={true}>
                                        <Col className="col-xs-12 tdclasscss">
                                        <p className="theading">Price/unit(or m)</p>
                                        {/* <i class="fa fa-inr" aria-hidden="true"></i> */}
                                        {data.moq.ppu}
                                                </Col>
                                            </Row>
                                         </td>
                                        <td>
                                        <Row noGutters={true}>
                                        <Col className="col-xs-12 tdclasscss">
                                        <p className="theading">ETA Delivery</p>
                                        {data.moq.deliveryTimeId} Days
                                                </Col>
                                            </Row>
                                        </td>
                                        <td>
                                        <Row noGutters={true} onClick={() => this.readmoreNote()}>
                                        <Col className="col-xs-12 readmored" >

                                          <p className="recheading"  >Received
                                          <Moment format=" DD-MM-YYYY">
                                          {data.moq.createdOn}
                                            </Moment> :
                                          <Moment format=" h:mm a">
                                          {data.moq.createdOn}
                                            </Moment>
                                          </p>
                                        {this.state.readmore ? <>Collapse  <i class="fa fa-angle-up fa-lg" aria-hidden="true"></i> </>:
                                        <> Read More <i class="fa fa-angle-down fa-lg" aria-hidden="true"></i></>
                                        }
                                                       

                                                </Col>
                                            </Row>
                                        </td>
                                        {this.state.readmore?
                                        ""
                                        :
                                        <td>
                                        <Row noGutters={true}>
                                        <Col className="col-xs-12 tdclasscss">
                                       
                                        <i class="fa fa-minus-circle" aria-hidden="true" style={{color:"red"}}></i>
                                                </Col>
                                            </Row>
                                        </td>
                                        }
                                       
                                        <td className={this.state.readmore? "acceptmoqbtnlg":"acceptmoqbtn"} onClick={() => this.AcceptMoq(data.moq.id,data.artisanId)} >
                                        <Row noGutters={true} >
                                                 <Col className="col-xs-12 ">
                                                 <i class="fa fa-handshake-o accepticon" aria-hidden="true"></i>
                                             Accept
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                   
                                    </table>
                                    {/* -----------readmore-------------- */}
                                             {this.state.readmore ? 
                                              <div className="readmorediv">
                                              <p><b>Note from Artisan</b></p>
                                               This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                               This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                               This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                               This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                              </div>
                                             :null}
                                         
                                          
                                      
                                    </Row>  
                                      </>


                                        </Col>
                                            
                                             </> 
                                             


                                             
                                             ) ) 
                                            ))
                                            
                                    
                                            
                                            :  null
                                            } 
                                    {/* Not a custom product ends here */}

                                            </>

}
{/* ------------------------------------------------------------------------------------------------------------------------- */}

</>   
) ) 
)): 
null
// <>"MOQ Details are not finalised for this Custom Product yet".</>

                                    

                                      
                                  
