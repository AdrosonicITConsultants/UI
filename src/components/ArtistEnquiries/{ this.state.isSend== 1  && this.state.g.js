{ this.state.isSend== 1  && this.state.getMoq.accepted== true
    ?
<>

    {this.state.preview === false ?
    <>
 
 {this.state.getPi.isSend==1?    
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
       {/* <input className="PIinput" type="number"/> */}
     {/* <span 
     className={this.state.isPidetail ? "rssymboldis":"rssymbol"}
     disabled={this.state.isPidetail}> */}
         <select name="cars" id="cars" 
         className={this.state.isPidetail ? "rssymboldis":"rssymbol"}
         disabled={this.state.isPidetail}>
            <option value="volvo">₹</option>
            <option value="saab">$</option>
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
   <Col sm={6}>
   <label>CGST %</label>
   <br/>
       <input className="PIinput" type="number"
       disabled={this.state.isPidetail}
       value={this.state.cgst }
       name="cgst"
       onChange={this.handleChange}/>

   </Col>
   <Col sm={6}>
   <label>SGST %</label>
   <br/>
       <input className="PIinput" type="number"
       disabled={this.state.isPidetail}
       value={this.state.sgst }
       name="sgst"
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
   <Col sm={12} className="text-center">
       
        <button className="previewandpi" onClick={() => this.savePIDetails()}>
          <img src={logos.PIbtnicon} className="PIbuttonicon"></img>Preview & send PI</button>
   </Col>
  
</Row>
    </>
    :<>
<PreviewInvoice 
bp={this.backPI}
enquiryId={this.state.enquiryId}
enquiryCode={this.state.getEnquiryMoq[0].openEnquiriesResponse.enquiryCode}
expectedDateOfDelivery={this.state.dod}
hsn={this.state.hsncode}
rpu={this.state.rpu}
quantity={this.state.quantity}
sgst={this.state.sgst}
cgst={this.state.cgst}
piSend={this.state.piSend}
/>

</>}
<p className="marginBottompage"></p>
</>:
<>

    <Row>
    <br></br>
    <br></br>
    <br></br>   
    <Col className="col-xs-12 text-center font14">
   MOQ Details are Not submitted / accepted yet.
    </Col>
    </Row>
</>}
