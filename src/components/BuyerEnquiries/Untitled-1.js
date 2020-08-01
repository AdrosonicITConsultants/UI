
this.state.visiblecardmoq || this.state.getEnquiryMoq[0].openEnquiriesResponse.isMoqSend!= null ? 
( ( this.state.getMoqs.map((data) => (
   
    <>
       <>  

       <Row noGutters={true} >  
       {/* <Col sm={1}></Col>                                         */}
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
</>
    ) ) 
    ))
    : 
//moq cards ends
//moq ends

