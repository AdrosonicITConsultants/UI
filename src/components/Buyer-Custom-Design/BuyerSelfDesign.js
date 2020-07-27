import React, { Component } from "react";
import ImageEditorTTCE from "../../shared/ImageEditorTTCE";
import ImageUpload from "../../shared/ImageUpload";
import NavbarComponent from "../navbar/navbar";
import Footer from "../footer/footer";
import "../landingpage/landingpage.css";
import { Row, Col, Container, Label, Button } from "reactstrap";
import logos from "../../assets";
import ReactModal from "react-modal";
import TTCEapi from "../../services/API/TTCEapi";
import { memoryHistory, browserHistory } from "../../helpers/history";
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const customStyles3 = {
  content: {
    top: "33%",
    left: "41%",
    right: "38%",
    bottom: "31%",
  },
};

const initialState = {
  selectedFile1: {},
  selectedFile2: {},
  selectedFile3: {},
  modal1: false,
  modal2: false,
  modal3: false,
  showGSM: false,
  GSMName: "",
  weight: "",
  description: "",
  clusterdata: [],
  product_care_id: [],
  isBasicComplete: false,
  isImageUploadComplete: false,
  productCategories: [],
  productTypes: [],
  productTypeName : "",
  weaves: [],
  reedCounts: [],
  yarns: [],
  countOfYarn1: [],
  countOfYarn2: [],
  countOfYarn3: [],
  dyes: [],
  widths: "",
  lengths: "",
  relatedProduct: [],
  savedrelatedProduct:[],
  SaveDisabled:false
};

export default class BuyerSelfDesign extends Component {
                 constructor(props) {
                   super(props);
                   this.myRefAddPhoto = React.createRef();  
                   this.basicDetails = React.createRef();
                   this.basicDetailsComplete = React.createRef();  
                   this.WeavesComplete = React.createRef();  
                   this.description = React.createRef();  
                   this.warpweftComplete = React.createRef(); 
                   this.reedcountComplete = React.createRef(); 
                   this.dimensionsComplete = React.createRef(); 
                   this.fileUploader1 = React.createRef(); 
                   this.fileUploader2 = React.createRef(); 
                   this.fileUploader3 = React.createRef();
                   this.GSMNameComplete = React.createRef();

                   this.state = initialState;
                 }

                 onAddingItem = (i) => (event) => {
                   let { weaves } = this.state;
                   weaves[i].isChecked = !weaves[i].isChecked;
                   this.setState({
                     weaves: [...weaves],
                   });
                 };

                 componentDidMount() {
                   console.log("did mount");
                   console.log(this.state);
                   if (localStorage.getItem('ProductUploadData') != null) {
                     let response = JSON.parse(localStorage.getItem("ProductUploadData"))
                     this.setState(
                       {
                         productCategories:
                           response.productCategories,
                         weaves: response.weaves.map((e) => {
                           return { ...e, isChecked: false };
                         }),
                         reedCounts: response.reedCounts,
                         yarns: response.yarns,
                         dyes: response.dyes,
                       },
                       () => {

                       }
                     );
                    
                   }
                   else {
                     TTCEapi.getProductUploadData().then((response) => {
                       debugger;
                       this.setState(
                         {
                           productCategories:
                             response.data.data.productCategories,
                           weaves: response.data.data.weaves.map((e) => {
                             return { ...e, isChecked: false };
                           }),
                           reedCounts: response.data.data.reedCounts,
                           yarns: response.data.data.yarns,
                           dyes: response.data.data.dyes,
                         },
                         () => {

                         }
                       );
                     });  
                   }
                                   
                 }

                 handleproductCategories(e) {
                   // console.log(e.target.id);
                   debugger;
                   var index = e.target.selectedIndex;
                   var optionElement = e.target.childNodes[index];
                   var option = parseInt(optionElement.getAttribute("id"));
                   console.log(option);
                    if(optionElement.innerHTML == "Fabric"){
                      this.setState({ showGSM: true});
                    }
                    else{
                      this.setState({ showGSM: false });

                    }
                    if (option == -1){

                      this.setState(
                        {
                          productTypes: [],
                          relatedProduct: [],
                          savedrelatedProduct: [],
                          widths: [],
                          lengths: [],
                          productType: -1,
                          productTypeName: "",
                          [e.target.name]: parseInt(option),
                        

                        },
                        () => {
                          
                        }
                      );
                    }
                    else {
                      this.setState({ [e.target.name]: parseInt(option) }, () => {
                        console.log(this.state);
                        debugger;

                        this.state.productCategories.filter((item) => {
                          if (item.id == this.state.productCategorie) {
                            this.setState(
                              {
                                productTypes: item.productTypes,
                                relatedProduct: [],
                                savedrelatedProduct: [],
                                widths: [],
                                lengths: [],
                                productType: "",
                                productTypeName: "",
                              },
                              () => {
                              
                              }
                            );
                          }
                        });
                      });
                    }
  
                 }

                 handleReedCounts(e) {
                   debugger;
                   var index = e.target.selectedIndex;
                   var optionElement = e.target.childNodes[index];
                   var option = optionElement.getAttribute("id");
                   console.log(option);
                   this.setState({ [e.target.name]: parseInt(option) }, () => {
                     console.log(this.state);
                   });
                 }

                 handleproductTypes(e) {
                   debugger;
                   var index = e.target.selectedIndex;
                   var optionElement = e.target.childNodes[index];
                   var option = optionElement.getAttribute("id");
                   console.log(option);
                   this.setState(
                     {
                       [e.target.name]: parseInt(option),
                       [e.target.name + "Name"]: optionElement.innerHTML,
                       productTypeName: optionElement.innerText,
                     },
                     () => {
                     
                  
                       this.state.productTypes.filter((item) => {
                  
                         if (item.id == this.state.productType) {
                           if (item.relatedProductType.length != 0) {
                             this.setState(
                               {
                                 lengths: item.productLengths,
                                 widths: item.productWidths,
                                 length: "",
                                 width: "",
                                 relatedProduct: item.relatedProductType,
                                 savedrelatedProduct: item.relatedProductType.map(
                                   (e) => ({
                                     productTypeId: e.id,
                                   })
                                 ),
                               },
                               () => {
                                 console.log(this.state);
                               }
                             );
                           } else {
                             this.setState(
                               {
                                 lengths: item.productLengths,
                                 widths: item.productWidths,
                                 length : "",
                                 width: "",
                                 relatedProduct: [],
                                 savedrelatedProduct: [],
                               },
                               () => {
                                   console.log(this.state);
                               }
                             );
                           }
                         }
                       });
                     }
                   );
                 }

                 handleyarns(e, stateNumber) {
                   debugger;
                   var index = e.target.selectedIndex;
                   var optionElement = e.target.childNodes[index];
                   var option = parseInt(optionElement.getAttribute("id"));
                   console.log(option);       
                   if (option != -1)
                   {
                    
                      this.setState({ [e.target.name]: option }, () => {
                        console.log(this.state);
                        debugger;
                        this.setState(
                          {
                            ["countOfYarn" + stateNumber]: this.state.yarns.find((eID) => eID.id == this.state["yarn" + stateNumber]).yarnType.manual                        
                              ? []
                              : this.state.yarns.find((eID) => eID.id == this.state["yarn" + stateNumber]).yarnType.yarnCounts,
                                ["yarnCount" + stateNumber] : ""
                          },
                          () => {}
                        );
                      });
                   }
                   else {
                      this.setState(
                        {
                          [e.target.name]: option ,
                          ["countOfYarn" + stateNumber]: []
                        },
                        () => {}
                      );
                   }
                    
                 }

                 handleDropdown(e) {
                   debugger;
                   var index = e.target.selectedIndex;
                   var optionElement = e.target.childNodes[index];
                   var option = optionElement.getAttribute("id");
                   console.log(option);
                   this.setState({ [e.target.name]: parseInt(option) }, () => {
                     console.log(this.state);
                   });
                 }

                 handleDropdownCountOfYarn(e)
                  {
                    debugger;
                    var index = e.target.selectedIndex;
                    var optionElement = e.target.childNodes[index];
                    var option = optionElement.getAttribute("id");
                    console.log(option);
                    this.setState({ [e.target.name]: option }, () => {
                      console.log(this.state);
                    });
                  }

                 handleChange(e) {
                   if (e.target.id == "productCode" || e.target.id ==  "description"){
                     this.setState({ [e.target.name]: e.target.value });
                   }
                  else if (e.target.id =="productName"){
                     var stripped = e.target.value.replace(/[^A-Z0-9\sg]+/i, '')
                     e.target.value = stripped;
                     this.setState({ [e.target.name]: e.target.value });
                   }
                   else {
                     var stripped = e.target.value.replace(/[^A-Z0-9]+/i, '');
                     e.target.value = stripped;
                     this.setState({ [e.target.name]: e.target.value });
                   }                
                 }

                 //#region Image processing
                 resetImage(num) {
                   if (num == 3) {
                     this.setState({
                       selectedFile: [],
                       ["imagePreviewUrl" + num]: null,
                     });
                   } else if (num == 1) {
                     this.setState({
                       selectedFile: [],
                       ["imagePreviewUrl" + num]: this.state[
                         "imagePreviewUrl" + (num + 1)
                       ],
                       ["imagePreviewUrl" + (num + 1)]: this.state[
                         "imagePreviewUrl" + (num + 2)
                       ],
                       ["imagePreviewUrl" + (num + 2)]: null,
                     }, () =>{
                          if(this.state.imagePreviewUrl1 == null){
                            this.setState({
                              isImageUploadComplete:false
                            })
                          }

                     });
                   } else {
                     this.setState({
                       selectedFile: [],
                       ["imagePreviewUrl" + num]: this.state[
                         "imagePreviewUrl" + (num + 1)
                       ],
                       ["imagePreviewUrl" + (num + 1)]: null,
                     });
                   }
                 }

                  fileChangedHandler = (event, num) => {
                   let filename = event.target.files[0];

                   debugger;

                 
                     if (filename != undefined) {
                      //  filename.name = filename.name.replace(/\s/g, '');
  if (filename.size / 1024 / 1024 > 1) {    
      customToast.error("Please upload product Image below 1MB.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true,
      });
     return ;
  }
                       if (/[^0-9a-zA-Z\-\_\.\(\)\sg]/.test(filename.name)) {
    customToast.error("Image name contains special characters.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: true,
    });
    return;
  }
    this.setState({
      ["selectedFile" + num]: event.target.files[0],
    });
                       let reader = new FileReader();

                       reader.onloadend = () => {
                         let imagebytes = reader.result;
                         this.setState(
                           {
                             ["selectedFile" + num]: {
                               filename,
                               imagebytes,
                             },
                             ["imagePreviewUrl" + num]: imagebytes,
                             isImageUploadComplete: true,
                           },
                           () => {
                             console.log(this.state);
                           }
                         );
                       };
                       if (event.target.files[0]) {
                         reader.readAsDataURL(event.target.files[0]);
                       }
                     }
                 };

                  dataURLtoFile(dataurl, filename) {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

                 GenerateImage = (num) => {
                   //  debugger;
                   if (
                     num == 1 ||
                     this.state["imagePreviewUrl" + (num - 1)] != null
                   ) {
                     let $imagePreview = (
                       <img
                         onClick={() => {
                           this["fileUploader" + num].click();
                         }}
                         className="productImageDefault"
                         src={logos.addphoto}
                       ></img>
                     );
                     if (this.state["imagePreviewUrl" + num]) {
                       $imagePreview = (
                         <div className="image-container img_wrp">
                           <img
                             className="productImage"
                             onClick={() => {
                               this["fileUploader" + num].click();
                             }}
                             src={this.state["imagePreviewUrl" + num]}
                             alt="icon"
                             width="200"
                           />{" "}
                           <div className="imageEdit text-center col-sm-12 col-md-12 col-lg-12 col-12">
                             <img
                               className="productImageEdit "
                               onClick={() => {
                                 this.setState({
                                   ["modal" + num]: true,
                                 });
                               }}
                               src={logos.featheredit}
                             ></img>


                             <img
                               className="productImageDelete"
                               onClick={() => {
                                 this.resetImage(num);
                               }}
                               src={logos.materialdeleteforever}
                             ></img>
                           </div>
                           <Row className="ImageEditor">
                             <ReactModal
                               isOpen={this.state["modal" + num]}
                               contentLabel="Minimal Modal Example"
                               className="Modal"
                               style={customStyles3}
                               // onRequestClose={this.handleCloseWrongPasswordModal}
                             >
                               <ImageEditorTTCE
                                 aI={this.state["imagePreviewUrl" + num]}
                                 updateImage={(data) =>
                                   this.setState({
                                     ["imagePreviewUrl" + num]: data,
                                     ["modal" + num]: false,
                                   })
                                 }
                                 cancelUpdate={() =>
                                   this.setState({
                                     ["modal" + num]: false,
                                   })
                                 }
                               ></ImageEditorTTCE>
                             </ReactModal>
                           </Row>
                         </div>
                       );
                     } else {
                       $imagePreview = (
                         <img
                           onClick={() => {
                             this["fileUploader" + num].click();
                           }}
                           className="productImageDefault"
                           src={logos.addphoto}
                         ></img>
                       );
                     }

                     return $imagePreview;
                   }
                 };
                 //#endregion

                 handlesavedrelatedProductDropdown = (e, id) =>{
 
 var index = e.target.selectedIndex;
 var optionElement = e.target.childNodes[index];
 var option = optionElement.getAttribute("id");
 console.log(option);
 debugger;

 let relatedProductTemp = this.state.savedrelatedProduct.find(
   (e) => e.productTypeId == id
 );
relatedProductTemp[e.target.name] = option;

 this.setState({ savedrelatedProduct: [...this.state.savedrelatedProduct] }, () => {
   console.log(this.state);
 });


// let relatedProduct = [];
// relatedProduct.Length  .e.target;
 
//  this.setState({ [e.target.name]: parseInt(option) }, () => {
//    console.log(this.state);
//  });
                 }


                 Save = () => {                
                   let productData = {};
                    // productData.careIds = [];
                    productData.weaveIds = [];
                      let file2, file3;



                  if(!this.state.isImageUploadComplete){
                    customToast.error("Please upload product Image.", {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: true,
                    });
                        
                         this.myRefAddPhoto.current.scrollIntoView({
                           behavior: "smooth",
                           block: "center",
                           inline: "center",
                         });
                      
                    return ;
                  }
              let file1 = this.dataURLtoFile(
                this.state.imagePreviewUrl1,
                this.state.selectedFile1.filename.name
              );

              if(this.state.imagePreviewUrl2 != undefined){
              file2 =  this.dataURLtoFile(
                  this.state.imagePreviewUrl2,
                  this.state.selectedFile2.filename.name
                );
              }

                if (this.state.imagePreviewUrl3 != undefined) {
                  file3 = this.dataURLtoFile(
                    this.state.imagePreviewUrl3,
                    this.state.selectedFile3.filename.name
                  );
                }
                   

                        let node = this.basicDetailsComplete.current;
                        if(node.getAttribute("class") == "inComplete"){
                          customToast.error("Please complete basic details.", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: true,
                          });                        
                           node.scrollIntoView({
                             behavior: "smooth",
                             block: "center",
                             inline: "center",
                           });
                          return;
                        }

                          


                              this.state.weaves.filter((item) => {
                                if (item.isChecked) {
                                  productData.weaveIds.push(item.id);
                                }
                              });                                

                              if (productData.weaveIds.length == 0){
                                customToast.error(
                                  "Please Add Weaves type of the Product.",
                                  {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: true,
                                  }
                                );
                                 this.WeavesComplete.current.scrollIntoView({
                                   behavior: "smooth",
                                   block: "center",
                                   inline: "center",
                                 });
                               ;
                                return;
                              }


                              productData.warpDyeId = this.state.dye1;
                              productData.warpYarnCount = this.state.yarnCount1;
                              productData.warpYarnId = this.state.yarn1;

                              productData.weftDyeId = this.state.dye2;
                              productData.weftYarnCount = this.state.yarnCount2;
                              productData.weftYarnId = this.state.yarn2;

                              productData.extraWeftDyeId = this.state.dye3;
                              productData.extraWeftYarnCount = this.state.yarnCount3;
                              productData.extraWeftYarnId = this.state.yarn3;



                              if (
                                productData.warpDyeId == undefined ||
                                productData.warpDyeId == -1 ||
                                productData.warpYarnId == undefined ||
                                productData.warpYarnId == -1 ||
                                productData.weftDyeId == undefined ||
                                productData.weftDyeId == -1 ||
                                productData.weftYarnId == undefined ||
                                productData.weftYarnId == -1 ||
                                productData.warpYarnCount == undefined ||
                                productData.warpYarnCount == -1 ||
                                productData.warpYarnCount == "" ||
                                productData.weftYarnCount == undefined ||
                                productData.weftYarnCount == -1 ||
                                productData.weftYarnCount == ""
                              ) {
                                customToast.error(
                                  "Please enter details of Warp & Weft.",
                                  {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: true,
                                  }
                                );
                                this.warpweftComplete.current.scrollIntoView({
                                  behavior: "smooth",
                                  block: "center",
                                  inline: "center",
                                });
                                return;
                              }

                             

                              if (
                                this.state.reedCount == undefined ||
                                this.state.reedCount == -1
                              ) {
                                customToast.error(
                                  "Please enter the reed count",
                                  {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: true,
                                  }
                                );
                                this.reedcountComplete.current.scrollIntoView({
                                  behavior: "smooth",
                                  block: "center",
                                  inline: "center",
                                });
                                return;
                              }



                              node =this.dimensionsComplete.current
                              let relatedDimension = false;
                              this.state.savedrelatedProduct.map((item) => {
                                if(item.length == undefined || item.length == -1 || item.width == undefined || item.width == -1 ){
                                  relatedDimension = true;
                                }
                              });

                              if (
                                this.state.width == "" ||
                                this.state.width == undefined ||
                                   relatedDimension ||
                                this.state.length == "" ||
                                this.state.length == undefined
                              ) {
                                customToast.error(
                                  "Please select dimensions.",
                                  {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: true,
                                  }
                                );
                                node.scrollIntoView({
                                  behavior: "smooth",
                                  block: "center",
                                  inline: "center",
                                });
                                return;
                              }

                              

                                node = this.GSMNameComplete.current;
                                ;
                                if (this.state.GSMName == "" && this.state.showGSM) {
                                  customToast.error("Please enter description of the Product.", {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: true,
                                  });
                                  node.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center",
                                    inline: "center",
                                  });
                                  return;

                                  return;
                                }



                node = this.description.current;
                if (node.getAttribute("class") == "inComplete") {
                  customToast.error("Please enter description of the Product.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });

                  return;
                }



 
 
                   this.setState({
                     SaveDisabled: true
                   }, ()=>{                   
                   })

                    

                    productData.productCategoryId = this.state.productCategorie;
                    productData.productTypeId = this.state.productType;
                    productData.productSpec = this.state.description;
                    productData.gsm = this.state.GSMName;
                    productData.width = this.state.width;
                    productData.length = this.state.length;
                    productData.reedCountId = this.state.reedCount;
                    this.state.weaves.filter((item) => {
                      if (item.isChecked) {
                        productData.weaveIds.push(item.id);
                      }
                    });  

                    TTCEapi.buyerpUploadDesign(file1, file2, file3, productData).then((response) => {
                    if (response.data.valid) {
                      customToast.success("Product added successfully!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                      document.getElementById('id02').style.display='none';
                      this.Cancel();
                      this.setState({
                        SaveDisabled: false
                      })
                    } else {
                      customToast.error(response.data.errorMessage, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                      this.setState({
                        SaveDisabled: false
                      })
                    }

                      });

                    

                    console.log(productData);
                 };

                 ToggleSave = () => {
                  document.getElementById('id02').style.display='block';
                 }

                 ToggleSaveClose = () => {
                  document.getElementById('id02').style.display='none';
                 }

                 Cancel = () => {
                   debugger;
                 
                   browserHistory.push("./home")
                 };

                 ResetAll = () => {
                    window.location.reload(false);                  

                 };

                 render() {
                   return (
                     <React.Fragment>
                       <NavbarComponent></NavbarComponent>
                       <Container>
                         <Row noGutters={true}>
                           <div className="artistLanding">
                             {/* //#region Add Image */}
                             <Row noGutters={true}>
                               <Row noGutters={true}>
                                 <Col
                                   sm={{ size: "1" }}
                                   xs={{ size: "1" }}
                                   md={{ size: "1" }}
                                   className="col-1 "
                                 ></Col>{" "}
                                 <Col
                                   sm={{ size: "11" }}
                                   xs={{ size: "11" }}
                                   md={{ size: "11" }}
                                   className="col-11"
                                 >
                                   <h1 className="mainheading">
                                     Add a new product
                                   </h1>
                                 </Col>
                               </Row>
                               <Row noGutters={true}>
                                 <Col
                                   className="tet-center"
                                   sm={{ size: "1" }}
                                   xs={{ size: "1" }}
                                   md={{ size: "1" }}
                                   className="col-1 "
                                 ></Col>{" "}
                                 <Col
                                   sm={{ size: "11" }}
                                   xs={{ size: "11" }}
                                   md={{ size: "11" }}
                                   className="col-11"
                                 >
                                   {this.state.imagePreviewUrl1 ? (
                                     <div
                                       id="addPhoto"
                                       className="Complete"
                                     ></div>
                                   ) : (
                                     <div
                                       id="addPhoto"
                                       ref={this.myRefAddPhoto}
                                       className="inComplete"
                                     ></div>
                                   )}

                                   <h4 className="subHeading">Add photos</h4>
                                   <h6 className="subHeading_1">
                                     Add upto 3 photos for product
                                   </h6>
                                 </Col>
                               </Row>
                               <Row noGutters={true} className="mt30">
                                 <Col
                                   sm={{ size: "2" }}
                                   xs={{ size: "2" }}
                                   md={{ size: "2" }}
                                   className="col-2 "
                                 ></Col>
                                 <Col
                                   sm={{ size: "8" }}
                                   xs={{ size: "8" }}
                                   md={{ size: "8" }}
                                   className="col-8"
                                 >
                                   <Row noGutters={true}>
                                     <Col
                                       sm={{ size: "4" }}
                                       xs={{ size: "4" }}
                                       md={{ size: "4" }}
                                       className="col-4 text-center"
                                     >
                                       {" "}
                                       <div>
                                         <div className="col-xs-12">
                                           {this.GenerateImage(1)}
                                           <input
                                             accept="image/png, image/jpeg"
                                             onChange={(event) =>
                                               this.fileChangedHandler(
                                                 event,
                                                 "1"
                                               )
                                             }
                                             type="file"
                                             //  ref={this.fileUploader1}
                                             ref={(input) =>
                                               (this.fileUploader1 = input)
                                             }
                                             style={{ display: "none" }}
                                           ></input>
                                         </div>
                                       </div>
                                     </Col>
                                     <Col
                                       sm={{ size: "4" }}
                                       xs={{ size: "4" }}
                                       md={{ size: "4" }}
                                       className="col-4 text-center"
                                     >
                                       {" "}
                                       <div>
                                         {this.GenerateImage(2)}

                                         <input
                                           accept="image/png, image/jpeg"
                                           onChange={(event) =>
                                             this.fileChangedHandler(event, "2")
                                           }
                                           type="file"
                                           //  ref={this.fileUploader2}
                                           ref={(input) =>
                                             (this.fileUploader2 = input)
                                           }
                                           style={{ display: "none" }}
                                         ></input>
                                       </div>
                                     </Col>
                                     <Col
                                       sm={{ size: "4" }}
                                       xs={{ size: "4" }}
                                       md={{ size: "4" }}
                                       className="col-4 text-center"
                                     >
                                       {" "}
                                       <div>
                                         {this.GenerateImage(3)}

                                         <input
                                           accept="image/png, image/jpeg"
                                           onChange={(event) =>
                                             this.fileChangedHandler(event, "3")
                                           }
                                           type="file"
                                           //  ref={this.fileUploader3}
                                           ref={(input) =>
                                             (this.fileUploader3 = input)
                                           }
                                           style={{ display: "none" }}
                                         ></input>
                                       </div>
                                     </Col>
                                   </Row>
                                 </Col>
                                 <Col
                                   sm={{ size: "2" }}
                                   xs={{ size: "2" }}
                                   md={{ size: "2" }}
                                   className="col-2 "
                                 ></Col>
                               </Row>
                               <Row noGutters={true} className="text-center">
                                 <Col
                                   sm={{ size: "12" }}
                                   xs={{ size: "12" }}
                                   md={{ size: "12" }}
                                   className="col-12 text-center"
                                 >
                                   <div className="hrlineforAddProduct"></div>
                                 </Col>
                                 {/* <Button> next</Button> */}
                               </Row>
                             </Row>
                             {/* //#endregion Add Image */}

                             {/* //#region Product details */}
                             <Row noGutters={true} className="mt60">
                               <Row noGutters={true}>
                                 <Col
                                   className="text-center"
                                   sm={{ size: "1" }}
                                   xs={{ size: "1" }}
                                   md={{ size: "1" }}
                                   className="col-1 "
                                 ></Col>{" "}
                                 <Col
                                   sm={{ size: "11" }}
                                   xs={{ size: "11" }}
                                   md={{ size: "11" }}
                                   className="col-11"
                                 >
                                   {
                                   this.state.productCategorie === undefined ||
                                   this.state.productType === undefined ||
                                   this.state.productCategorie == -1 ||
                                   this.state.productType == "" ||
                                   this.state.productType == -1 ? (
                                     <div
                                         ref={this.basicDetailsComplete}
                                       id="basicDetails"
                                       className="inComplete"
                                     ></div>
                                   ) : (
                                     <div
                                         ref={this.basicDetailsComplete}

                                       id="basicDetails"
                                       className="Complete"
                                     ></div>
                                   )}

                                   <h4 className="subHeading">Basic details</h4>
                                   <h6 className="subHeading_1">
                                     Add general details for the product
                                   </h6>
                                 </Col>
                               </Row>

                               {/* <Row noGutters={true}>
                                 <Col
                                   sm={{ size: "2" }}
                                   xs={{ size: "2" }}
                                   md={{ size: "2" }}
                                   className="col-2 "
                                 ></Col>{" "}
                                 <Col
                                   sm={{ size: "8" }}
                                   xs={{ size: "8" }}
                                   md={{ size: "8" }}
                                   className="col-8"
                                 >
                                   <Row noGutters={true}>
                                     <Col
                                       sm={{ size: "6" }}
                                       xs={{ size: "6" }}
                                       md={{ size: "6" }}
                                       className="col-6 text-center mt30 "
                                     >
                                       <span
                                         ref={this.basicDetails}
                                         className="text-right font13"
                                       >
                                         Name of the product (40 characters)
                                       </span>
                                     </Col>{" "}
                                     <Col
                                       sm={{ size: "6" }}
                                       xs={{ size: "6" }}
                                       md={{ size: "6" }}
                                       className="col-6 text-left"
                                     ></Col>{" "}
                                   </Row>
                                   <Row noGutters={true}>
                                     <Col
                                       sm={{ size: "6" }}
                                       xs={{ size: "6" }}
                                       md={{ size: "6" }}
                                       className="col-6 text-right "
                                     >
                                       <input
                                         type="text"
                                         id="productName"
                                         className=" ProductTextBox"
                                         name="productName"                                maxLength="40"        
                                         onChange={(e) => this.handleChange(e)}
                                       />
                                     </Col>{" "}
                                     <Col
                                       sm={{ size: "6" }}
                                       xs={{ size: "6" }}
                                       md={{ size: "6" }}
                                       className="col-6 text-left"
                                     >
                                       <input
                                         type="text"
                                         id="productCode"
                                         placeholder="Product Code (Eg. NAG09_89)"
                                         className="ProductTextBox"
                                         name="productCode"
                                         maxLength="20"
                                         onChange={(e) => this.handleChange(e)}
                                       />
                                     </Col>{" "}
                                   </Row>
                                 </Col>
                                 <Col
                                   sm={{ size: "2" }}
                                   xs={{ size: "2" }}
                                   md={{ size: "2" }}
                                   className="col-2 "
                                 ></Col>{" "}
                               </Row> */}
                               <Row noGutters={true}>
                                 <Col
                                   sm={{ size: "2" }}
                                   xs={{ size: "2" }}
                                   md={{ size: "2" }}
                                   className="col-2 "
                                 ></Col>{" "}
                                 <Col
                                   sm={{ size: "8" }}
                                   xs={{ size: "8" }}
                                   md={{ size: "8" }}
                                   className="col-8"
                                 >
                                   <Row noGutters={true}>
                                     <Col
                                       sm={{ size: "6" }}
                                       xs={{ size: "6" }}
                                       md={{ size: "6" }}
                                       className="col-6 text-right"
                                     >
                                       <select
                                         id="productCategorie"
                                         className="productDropdown"
                                         name="productCategorie"
                                         value={this.state.productCategorie}
                                         onChange={(e) =>
                                           this.handleproductCategories(e)
                                         }
                                       >
                                         <option
                                           key="0"
                                           id="-1"
                                           value="Select product category"
                                         >
                                           Select product category
                                         </option>
                                         {this.state.productCategories.map(
                                           (item) => (
                                             <option
                                               key={item.productDesc}
                                               id={item.id}
                                               value={item.id}
                                             >
                                               {item.productDesc}
                                             </option>
                                           )
                                         )}
                                       </select>
                                     </Col>{" "}
                                     <Col
                                       sm={{ size: "6" }}
                                       xs={{ size: "6" }}
                                       md={{ size: "6" }}
                                       className="col-6 "
                                     >
                                       <select
                                         id="productType"
                                         className="productDropdown"
                                         name="productType"
                                         value={this.state.productType}
                                         onChange={(e) =>
                                           this.handleproductTypes(e)
                                         }
                                       >
                                         <option
                                           key="0"
                                           id="-1"
                                           value="Select Cluster"
                                         >
                                           Product type
                                         </option>
                                         {this.state.productTypes.map(
                                           (item) => (
                                             <option
                                               key={item.id}
                                               id={item.id}
                                               value={item.id}
                                             >
                                               {item.productDesc}
                                             </option>
                                           )
                                         )}
                                       </select>
                                     </Col>{" "}
                                   </Row>
                                 </Col>
                                 <Col
                                   sm={{ size: "2" }}
                                   xs={{ size: "2" }}
                                   md={{ size: "2" }}
                                   className="col-2 "
                                 ></Col>{" "}
                               </Row>
                               <Row noGutters={true} className="text-center">
                                 <Col
                                   sm={{ size: "12" }}
                                   xs={{ size: "12" }}
                                   md={{ size: "12" }}
                                   className="col-12 text-center"
                                 >
                                   <div className="hrlineforAddProduct"></div>
                                 </Col>
                                 {/* <Button> next</Button> */}
                               </Row>
                             </Row>
                             {/* //#endregion Product details */}

                             {/* //#region Product specificcaions */}
                             <Row noGutters={true} className="mt60">
                               <Row noGutters={true}>
                                 <Col
                                   className="text-center"
                                   sm={{ size: "1" }}
                                   xs={{ size: "1" }}
                                   md={{ size: "1" }}
                                   className="col-1 "
                                 ></Col>{" "}
                                 <Col
                                   sm={{ size: "11" }}
                                   xs={{ size: "11" }}
                                   md={{ size: "11" }}
                                   className="col-11"
                                 >
                                   <div className="inComplete"></div>

                                   <h4 className="subHeading">
                                     Specifications
                                   </h4>
                                   <h6 className="subHeading_1">
                                     Add detailed specifications for the product
                                   </h6>
                                 </Col>
                               </Row>
                               <Row noGutters={true} className="mt15">
                                 <Col
                                   sm={{ size: "1" }}
                                   xs={{ size: "1" }}
                                   md={{ size: "1" }}
                                   className="col-1 text-right "
                                 ></Col>{" "}
                                 <Col
                                   sm={{ size: "10" }}
                                   xs={{ size: "10" }}
                                   md={{ size: "10" }}
                                   className="col-10 ml30"
                                 >
                                   <div className="SubTopic "></div>{" "}
                                   <h5 className="subHeading2">
                                     Add weaves type
                                   </h5>
                                   <h6 className="subHeading_2">
                                     Select the weave type used for the product
                                   </h6>
                                 </Col>
                               </Row>
                               <Row noGutters={true} className="mt15">
                                 <Col
                                   sm={{ size: "12" }}
                                   xs={{ size: "12" }}
                                   md={{ size: "12" }}
                                   className="col-12 text-center"
                                 >
                                   <label
                                     ref={this.WeavesComplete}
                                     className="weaveselection"
                                   >
                                     You can select multiple weave types
                                   </label>
                                 </Col>
                               </Row>
                               <Row noGutters={true} className="">
                                 <Col
                                   sm={{ size: "3" }}
                                   xs={{ size: "3" }}
                                   md={{ size: "3" }}
                                   className="col-12 text-center"
                                 ></Col>
                                 <Col
                                   sm={{ size: "8" }}
                                   xs={{ size: "8" }}
                                   md={{ size: "8" }}
                                   className="col-12 text-center"
                                 >
                                   <Row>
                                     {this.state.weaves.map((product, i) => {
                                       return (
                                         <Col
                                           key={i + 1}
                                           sm={{ size: "6" }}
                                           xs={{ size: "6" }}
                                           md={{ size: "6" }}
                                           className="col-12"
                                         >
                                           <div className="weaveselectionCheckbox">
                                             <label className="checkbox col-sm-2 col-md-2 text-left">
                                               <input
                                                 type="checkbox"
                                                 value={product.id}
                                                 checked={
                                                   product.isChecked
                                                     ? product.isChecked
                                                     : false
                                                 }
                                                 onChange={this.onAddingItem(i)}
                                               />{" "}
                                               <span> {product.weaveDesc}</span>
                                             </label>
                                             {/* <label className="col-sm-10 col-md-10 text-left"></label> */}
                                           </div>
                                         </Col>
                                       );
                                     })}
                                   </Row>
                                 </Col>
                               </Row>
                               <Row noGutters={true} className="mt30">
                                 <Col
                                   sm={{ size: "1" }}
                                   xs={{ size: "1" }}
                                   md={{ size: "1" }}
                                   className="col-1 text-right "
                                 ></Col>{" "}
                                 <Col
                                   sm={{ size: "10" }}
                                   xs={{ size: "10" }}
                                   md={{ size: "10" }}
                                   className="col-10 ml30"
                                 >
                                   <div className="SubTopic "></div>{" "}
                                   <h5 className="subHeading2">
                                     Enter details of Warp, Weft & Yarn
                                   </h5>
                                   <h6 className="subHeading_2">
                                     Select the yarn for WARP, WEFT & EXTRA WEFT
                                   </h6>
                                 </Col>
                               </Row>
                               <Row noGutters={true} className="mt15">
                                 <Col
                                   sm={{ size: "12" }}
                                   xs={{ size: "12" }}
                                   md={{ size: "12" }}
                                   className="col-1 text-center "
                                 >
                                   <span className="warpweftheader">
                                     WARP X WEFT X EXTRA WEFT
                                   </span>
                                 </Col>{" "}
                               </Row>

                               <Row noGutters={true} className="mt30">
                                 <Col
                                   sm={{ size: "12" }}
                                   xs={{ size: "12" }}
                                   md={{ size: "12" }}
                                   className="col-1 text-center "
                                 >
                                   <img
                                     className="warpweftImage"
                                     src={logos.warpweft}
                                   ></img>
                                 </Col>{" "}
                               </Row>

                               <Row className="Plr60 mt30 mlrow">
                                 <Col
                                   sm={{ size: "6" }}
                                   xs={{ size: "6" }}
                                   md={{ size: "4" }}
                                   className="col-4 text-center vrlineforAddProduct "
                                 >
                                   <div
                                     ref={this.warpweftComplete}
                                     className="detailsWdiv"
                                   >
                                     <div className="detailWtextHeader">
                                       <label className="col-sm-2 col-md-2 col-lg-2 col-4">
                                         Warp{" "}
                                       </label>
                                       <img
                                         className="detailWtextHeaderImage col-sm-4 col-md-4 col-lg-4 col-12"
                                         src={logos.warpicon}
                                       ></img>
                                     </div>
                                     <div className="detailWtext">
                                       <select
                                         id="yarn1"
                                         className="productDropdown"
                                         name="yarn1"
                                         value={this.state.yarn1}
                                         onChange={(e) =>
                                           this.handleyarns(e, 1)
                                         }
                                       >
                                         <option
                                           key="0"
                                           id="-1"
                                           value="Select Cluster"
                                         >
                                           Select the yarn for warp
                                         </option>
                                         {this.state.yarns.map((item) => (
                                           <option
                                             key={item.id}
                                             id={item.id}
                                             value={item.id}
                                           >
                                             {item.yarnDesc}
                                           </option>
                                         ))}
                                       </select>
                                     </div>
                                     <div className="detailWtext">
                                       {this.state.countOfYarn1.length == 0 ? (
                                         <input
                                           type="text"
                                           id="yarnCount1"
                                           className=" yarnProductTextBox"
                                           name="yarnCount1"
                                           placeholder="Enter the count of yarn"
                                           onChange={(e) =>
                                             this.handleChange(e)
                                           }
                                         />
                                       ) : (
                                         <select
                                           id="yarnCount1"
                                           className="productDropdown"
                                           name="yarnCount1"
                                           value={this.state.yarnCount1}
                                           onChange={(e) =>
                                             this.handleDropdownCountOfYarn(e)
                                           }
                                         >
                                           <option
                                             key="0"
                                             id="-1"
                                             value="Select the count of yarn"
                                           >
                                             Select the count of yarn
                                           </option>
                                           {this.state.countOfYarn1.map(
                                             (item) => (
                                               <option
                                                 key={item.id}
                                                 id={item.count}
                                                 value={item.count}
                                               >
                                                 {item.count}
                                               </option>
                                             )
                                           )}
                                         </select>
                                       )}
                                     </div>
                                     <div className="detailWtext">
                                       <select
                                         id="dye1"
                                         className="productDropdown"
                                         name="dye1"
                                         value={this.state.dye1}
                                         onChange={(e) =>
                                           this.handleDropdown(e)
                                         }
                                       >
                                         <option
                                           key="0"
                                           id="-1"
                                           value="Dye used"
                                         >
                                           Select Dye used
                                         </option>
                                         {this.state.dyes.map((item) => (
                                           <option
                                             key={item.id}
                                             id={item.id}
                                             value={item.id}
                                           >
                                             {item.dyeDesc}
                                           </option>
                                         ))}
                                       </select>
                                     </div>
                                   </div>
                                 </Col>
                                 <Col
                                   sm={{ size: "6" }}
                                   xs={{ size: "6" }}
                                   md={{ size: "4" }}
                                   className="col-4 text-center vrlineforAddProduct "
                                 >
                                   <div className="detailsWdiv">
                                     <div className="detailWtextHeader">
                                       <label className="col-sm-2 col-md-2 col-lg-2 col-4">
                                         Weft{" "}
                                       </label>
                                       <img
                                         className="detailWtextHeaderImageWeft col-sm-4 col-md-4 col-lg-4 col-12"
                                         src={logos.wefticon}
                                       ></img>
                                     </div>
                                     <div className="detailWtext">
                                       <select
                                         id="yarn2"
                                         className="productDropdown"
                                         name="yarn2"
                                         value={this.state.yarn2}
                                         onChange={(e) =>
                                           this.handleyarns(e, 2)
                                         }
                                       >
                                         <option
                                           key="0"
                                           id="-1"
                                           value="Select Cluster"
                                         >
                                           Select the yarn for warp
                                         </option>
                                         {this.state.yarns.map((item) => (
                                           <option
                                             key={item.id}
                                             id={item.id}
                                             value={item.id}
                                           >
                                             {item.yarnDesc}
                                           </option>
                                         ))}
                                       </select>
                                     </div>
                                     <div className="detailWtext">
                                       {this.state.countOfYarn2.length == 0 ? (
                                         <input
                                           type="text"
                                           id="yarnCount2"
                                           className=" yarnProductTextBox"
                                           name="yarnCount2"
                                           placeholder="Enter the count of yarn"
                                           onChange={(e) =>
                                             this.handleChange(e)
                                           }
                                         />
                                       ) : (
                                         <select
                                           id="yarnCount2"
                                           className="productDropdown"
                                           name="yarnCount2"
                                           value={this.state.yarnCount2}
                                           onChange={(e) =>
                                             this.handleDropdownCountOfYarn(e)
                                           }
                                         >
                                           <option
                                             key="0"
                                             id="-1"
                                             value="Select the count of yarn"
                                           >
                                             Select the count of yarn
                                           </option>
                                           {this.state.countOfYarn2.map(
                                             (item) => (
                                               <option
                                                 key={item.id}
                                                 id={item.count}
                                                 value={item.count}
                                               >
                                                 {item.count}
                                               </option>
                                             )
                                           )}
                                         </select>
                                       )}
                                     </div>
                                     <div className="detailWtext">
                                       <select
                                         id="dye2"
                                         className="productDropdown"
                                         name="dye2"
                                         value={this.state.dye2}
                                         onChange={(e) =>
                                           this.handleDropdown(e)
                                         }
                                       >
                                         <option
                                           key="0"
                                           id="-1"
                                           value="Dye used"
                                         >
                                           Select Dye used
                                         </option>
                                         {this.state.dyes.map((item) => (
                                           <option
                                             key={item.id}
                                             id={item.id}
                                             value={item.id}
                                           >
                                             {item.dyeDesc}
                                           </option>
                                         ))}
                                       </select>
                                     </div>
                                     {/* <div className="vrlineforAddProduct"></div> */}
                                   </div>
                                 </Col>
                                 <Col
                                   sm={{ size: "6" }}
                                   xs={{ size: "6" }}
                                   md={{ size: "4" }}
                                   className="col-4 text-center "
                                 >
                                   <div className="detailsWdiv">
                                     <div className="detailWtextHeader">
                                       <label className="col-sm-9 col-md-9 col-lg-9 col-9 text-left">
                                         Extra Weft{" "}
                                         <strong className="extraweftOptional">
                                           (Optional)
                                         </strong>{" "}
                                       </label>
                                       <img
                                         className="detailWtextHeaderImage col-sm-4 col-md-4 col-lg-4 col-12"
                                         src={logos.extraWefticon}
                                       ></img>
                                     </div>
                                     <div className="detailWtext">
                                       <select
                                         id="yarn3"
                                         className="productDropdown"
                                         name="yarn3"
                                         value={this.state.yarn3}
                                         onChange={(e) =>
                                           this.handleyarns(e, 3)
                                         }
                                       >
                                         <option
                                           key="0"
                                           id="-1"
                                           value="Select Cluster"
                                         >
                                           Select the yarn for warp
                                         </option>
                                         {this.state.yarns.map((item) => (
                                           <option
                                             key={item.id}
                                             id={item.id}
                                             value={item.id}
                                           >
                                             {item.yarnDesc}
                                           </option>
                                         ))}
                                       </select>
                                     </div>
                                     <div className="detailWtext">
                                       {this.state.countOfYarn3.length == 0 ? (
                                         <input
                                           type="text"
                                           id="yarnCount3"
                                           className=" yarnProductTextBox"
                                           name="yarnCount3"
                                           placeholder="Enter the count of yarn"
                                           onChange={(e) =>
                                             this.handleChange(e)
                                           }
                                         />
                                       ) : (
                                         <select
                                           id="yarnCount3"
                                           className="productDropdown"
                                           name="yarnCount3"
                                           value={this.state.yarnCount3}
                                           onChange={(e) =>
                                             this.handleDropdownCountOfYarn(e)
                                           }
                                         >
                                           <option
                                             key="0"
                                             id="-1"
                                             value="Select the count of yarn"
                                           >
                                             Select the count of yarn
                                           </option>
                                           {this.state.countOfYarn3.map(
                                             (item) => (
                                               <option
                                                 key={item.id}
                                                 id={item.count}
                                                 value={item.count}
                                               >
                                                 {item.count}
                                               </option>
                                             )
                                           )}
                                         </select>
                                       )}
                                     </div>
                                     <div className="detailWtext">
                                       <select
                                         id="dye3"
                                         className="productDropdown"
                                         name="dye3"
                                         value={this.state.dye3}
                                         onChange={(e) =>
                                           this.handleDropdown(e)
                                         }
                                       >
                                         <option
                                           key="0"
                                           id="-1"
                                           value="Dye used"
                                         >
                                           Select Dye used
                                         </option>
                                         {this.state.dyes.map((item) => (
                                           <option
                                             key={item.id}
                                             id={item.id}
                                             value={item.id}
                                           >
                                             {item.dyeDesc}
                                           </option>
                                         ))}
                                       </select>
                                     </div>
                                   </div>
                                 </Col>
                               </Row>

                               <Row noGutters={true} className="mt100">
                                 <Col
                                   sm={{ size: "1" }}
                                   xs={{ size: "1" }}
                                   md={{ size: "1" }}
                                   className="col-1 text-right "
                                 ></Col>{" "}
                                 <Col
                                   sm={{ size: "3" }}
                                   xs={{ size: "3" }}
                                   md={{ size: "3" }}
                                   className="col-3 ml30"
                                 >
                                   <div
                                     ref={this.reedcountComplete}
                                     className="SubTopic "
                                   ></div>{" "}
                                   <h5 className="subHeading2">
                                     Enter the reed count
                                   </h5>
                                   <h6 className="subHeading_2">
                                     What is the reed count for the yarn
                                   </h6>
                                 </Col>
                                 <Col
                                   sm={{ size: "6" }}
                                   xs={{ size: "6" }}
                                   md={{ size: "6" }}
                                   className="col-6 ml30"
                                 >
                                   <img
                                     className="reedcountImg"
                                     src={logos.reedcount}
                                   ></img>
                                 </Col>
                               </Row>
                               <Row noGutters={true} className="mt30">
                                 <Col
                                   sm={{ size: "4" }}
                                   xs={{ size: "4" }}
                                   md={{ size: "4" }}
                                   className="col-12 text-center"
                                 ></Col>
                                 <Col
                                   sm={{ size: "4" }}
                                   xs={{ size: "4" }}
                                   md={{ size: "4" }}
                                   className="col-12 text-center"
                                 >
                                   <select
                                     id="reedCount"
                                     className="productDropdown"
                                     name="reedCount"
                                     value={this.state.reedCount}
                                     onChange={(e) => this.handleReedCounts(e)}
                                   >
                                     <option
                                       key="0"
                                       id="-1"
                                       value="Select the reed count"
                                     >
                                       Select the reed count
                                     </option>
                                     {this.state.reedCounts.map((item) => (
                                       <option
                                         key={item.id}
                                         id={item.id}
                                         value={item.id}
                                       >
                                         {item.count}
                                       </option>
                                     ))}
                                   </select>
                                 </Col>{" "}
                                 <Col
                                   sm={{ size: "4" }}
                                   xs={{ size: "4" }}
                                   md={{ size: "4" }}
                                   className="col-12 text-center"
                                 ></Col>
                               </Row>

                               <Row noGutters={true} className="mt100">
                                 <Col
                                   sm={{ size: "1" }}
                                   xs={{ size: "1" }}
                                   md={{ size: "1" }}
                                   className="col-1 text-right "
                                 ></Col>{" "}
                                 <Col
                                   sm={{ size: "3" }}
                                   xs={{ size: "3" }}
                                   md={{ size: "3" }}
                                   className="col-3 ml30"
                                 >
                                   <div
                                     ref={this.dimensionsComplete}
                                     className="SubTopic "
                                   ></div>{" "}
                                   <h5 className="subHeading2">
                                     Enter the dimensions
                                   </h5>
                                   <h6 className="subHeading_2">
                                     Enter the length and width for the product
                                   </h6>
                                 </Col>
                                 <Col
                                   sm={{ size: "6" }}
                                   xs={{ size: "6" }}
                                   md={{ size: "6" }}
                                   className="col-6 ml30"
                                 >
                                   <img
                                     className="dimensionsImg"
                                     src={logos.dimensions}
                                   ></img>
                                 </Col>
                               </Row>
                               <Row noGutters={true} className="mt30">
                                 <Col
                                   sm={{ size: "4" }}
                                   xs={{ size: "4" }}
                                   md={{ size: "4" }}
                                   className="col-12 text-center"
                                 ></Col>
                                 <Col
                                   sm={{ size: "4" }}
                                   xs={{ size: "4" }}
                                   md={{ size: "4" }}
                                   className="col-12 text-center"
                                 >
                                   <label className="productDropdown">
                                     {this.state.productTypeName
                                       ? this.state.productTypeName
                                       : ""}
                                   </label>
                                 </Col>{" "}
                                 <Col
                                   sm={{ size: "4" }}
                                   xs={{ size: "4" }}
                                   md={{ size: "4" }}
                                   className="col-12 text-center"
                                 ></Col>
                               </Row>

                               {this.state.lengths.length != 0 &&
                               this.state.widths.length != 0 ? (
                                 <>
                                   <Row>
                                     <div className="col-md-3 text-right"></div>
                                     <div className="col-md-2 text-left">
                                       <span className="productDimensionHeading">
                                         {" "}
                                         {this.state.productTypes.find(
                                           (e) => e.id == this.state.productType
                                         )
                                           ? this.state.productTypes.find(
                                               (e) =>
                                                 e.id == this.state.productType
                                             ).productDesc
                                           : ""}
                                       </span>
                                     </div>
                                     <div className="col-md-7 text-center"></div>
                                   </Row>

                                   <Row>
                                     <Col
                                       sm={{ size: "6" }}
                                       xs={{ size: "6" }}
                                       md={{ size: "6" }}
                                       className="col-6 text-right"
                                     >
                                       {" "}
                                       <select
                                         id="length"
                                         className="productDropdown"
                                         name="length"
                                         value={this.state.length}
                                         onChange={(e) =>
                                           this.handleDropdownCountOfYarn(e)
                                         }
                                       >
                                         <option
                                           key="0"
                                           id="-1"
                                           value=" Select the length"
                                         >
                                           Select the length
                                         </option>
                                         {this.state.lengths.map((item) => (
                                           <option
                                             key={item.id}
                                             id={item.length}
                                             value={item.length}
                                           >
                                             {item.length}
                                           </option>
                                         ))}
                                       </select>
                                     </Col>

                                     <Col
                                       sm={{ size: "6" }}
                                       xs={{ size: "6" }}
                                       md={{ size: "6" }}
                                       className="col-12 text-left"
                                     >
                                       {" "}
                                       <span className="xicondimension">X</span>
                                       <select
                                         id="width"
                                         className="productDropdown"
                                         name="width"
                                         value={this.state.width}
                                         onChange={(e) =>
                                           this.handleDropdownCountOfYarn(e)
                                         }
                                       >
                                         <option
                                           key="0"
                                           id="-1"
                                           value="Select the Width"
                                         >
                                           Select the Width
                                         </option>
                                         {this.state.widths.map((item) => (
                                           <option
                                             key={item.id}
                                             id={item.width}
                                             value={item.width}
                                           >
                                             {item.width}
                                           </option>
                                         ))}
                                       </select>
                                     </Col>
                                   </Row>
                                 </>
                               ) : (
                                 <>
                                   <Row>
                                     <div className="col-md-3 text-right"></div>
                                     <div className="col-md-2 text-left">
                                       <span className="productDimensionHeading">
                                         {" "}
                                         {this.state.productTypeName}
                                       </span>
                                     </div>
                                     <div className="col-md-7 text-center"></div>
                                   </Row>

                                   <Row>
                                     <Col
                                       sm={{ size: "6" }}
                                       xs={{ size: "6" }}
                                       md={{ size: "6" }}
                                       className="col-12 text-right"
                                     >
                                       <input
                                         type="text"
                                         id="length"
                                         className="  ProductTextBox"
                                         name="length"
                                         placeholder="Enter length"
                                         onChange={(e) => this.handleChange(e)}
                                       />
                                     </Col>
                                     <Col
                                       sm={{ size: "6" }}
                                       xs={{ size: "6" }}
                                       md={{ size: "6" }}
                                       className="col-12 text-left"
                                     >
                                       {" "}
                                       <span className="xicondimension">X</span>
                                       <input
                                         type="text"
                                         id="width"
                                         className="  ProductTextBox"
                                         name="width"
                                         placeholder="Enter width"
                                         onChange={(e) => this.handleChange(e)}
                                       />
                                     </Col>
                                   </Row>
                                 </>
                               )}

                               {this.state.relatedProduct.length != 0 ? (
                                 <>
                                   {this.state.relatedProduct.map(
                                     (relatedItem) => {
                                       return (
                                         <>
                                           <Row>
                                             <div className="col-md-3 text-right"></div>

                                             <div className="col-md-2 text-left">
                                               <span className="productDimensionHeading">
                                                 {relatedItem.productDesc}
                                               </span>
                                             </div>
                                             <div className="col-md-7 text-left"></div>
                                           </Row>

                                           <Row key={relatedItem.id}>
                                             <Col
                                               sm={{ size: "6" }}
                                               xs={{ size: "6" }}
                                               md={{ size: "6" }}
                                               className="col-6 text-right"
                                             >
                                               {" "}
                                               <select
                                                 id="length"
                                                 className="productDropdown"
                                                 name="length"
                                                 value={
                                                   this.state.savedrelatedProduct.find(
                                                     (e) =>
                                                       e.productTypeId ==
                                                       relatedItem.id
                                                   ).length
                                                 }
                                                 onChange={(e) =>
                                                   this.handlesavedrelatedProductDropdown(
                                                     e,
                                                     relatedItem.id
                                                   )
                                                 }
                                               >
                                                 <option
                                                   key="0"
                                                   id="-1"
                                                   value=" Select the Length"
                                                 >
                                                   Select the Length
                                                 </option>
                                                 {relatedItem.productLengths.map(
                                                   (item) => (
                                                     <option
                                                       key={item.id}
                                                       id={item.length}
                                                       value={item.length}
                                                     >
                                                       {item.length}
                                                     </option>
                                                   )
                                                 )}
                                               </select>
                                             </Col>

                                             <Col
                                               sm={{ size: "5" }}
                                               xs={{ size: "5" }}
                                               md={{ size: "5" }}
                                               className="col-12 text-left"
                                             >
                                               {" "}
                                               <span className="xicondimension">
                                                 X
                                               </span>
                                               <select
                                                 id="width"
                                                 className="productDropdown"
                                                 name="width"
                                                 value={
                                                   this.state.savedrelatedProduct.find(
                                                     (e) =>
                                                       e.productTypeId ==
                                                       relatedItem.id
                                                   ).width
                                                 }
                                                 onChange={(e) =>
                                                   this.handlesavedrelatedProductDropdown(
                                                     e,
                                                     relatedItem.id
                                                   )
                                                 }
                                               >
                                                 <option
                                                   key="0"
                                                   id="-1"
                                                   value="Select the Width"
                                                 >
                                                   Select the Width
                                                 </option>
                                                 {relatedItem.productWidths.map(
                                                   (item) => (
                                                     <option
                                                       key={item.id}
                                                       id={item.width}
                                                       value={item.width}
                                                     >
                                                       {item.width}
                                                     </option>
                                                   )
                                                 )}
                                               </select>
                                             </Col>
                                           </Row>
                                         </>
                                       );
                                     }
                                   )}
                                 </>
                               ) : null}

                               <Row noGutters={true} className="text-center">
                                 <Col
                                   sm={{ size: "12" }}
                                   xs={{ size: "12" }}
                                   md={{ size: "12" }}
                                   className="col-12 text-center"
                                 >
                                   <div className="hrlineforAddProduct"></div>
                                 </Col>
                                 {/* <Button> next</Button> */}
                               </Row>
                             </Row>
                             {/* //#endregion Product specificcaions */}

                          
                             {this.state.showGSM ? (
                               <>
                                 {/* //#region Enter GSM (Gram per Square Metre) */}
                                 <Row noGutters={true} className="mt60">
                                   <Row noGutters={true}>
                                     <Col
                                       className="text-center"
                                       sm={{ size: "1" }}
                                       xs={{ size: "1" }}
                                       md={{ size: "1" }}
                                       className="col-1 "
                                     ></Col>{" "}
                                     <Col
                                       sm={{ size: "11" }}
                                       xs={{ size: "11" }}
                                       md={{ size: "11" }}
                                       className="col-11"
                                     >
                                       {this.state.GSMName == "" ? (
                                         <div
                                           ref={this.GSMNameComplete}
                                           id="GSMNameComplete"
                                           className="inComplete"
                                         ></div>
                                       ) : (
                                         <div
                                           ref={this.GSMNameComplete}
                                           id="GSMNameComplete"
                                           className="Complete"
                                         ></div>
                                       )}

                                       <h4 className="subHeading">
                                         Enter GSM (Gram per Square Metre)
                                       </h4>
                                       <h6 className="subHeading_1">
                                         Fill in the GSM value for the product
                                       </h6>
                                     </Col>
                                   </Row>
                                   <Row className="mt30">
                                     <Col
                                       sm={{ size: "12" }}
                                       xs={{ size: "12" }}
                                       md={{ size: "12" }}
                                       className="col-12 text-center"
                                     >
                                       <span className="ml-160 text-right font13">
                                         GSM value for the fabric
                                       </span>
                                     </Col>
                                   </Row>
                                   <Row className="">
                                     <Col
                                       sm={{ size: "12" }}
                                       xs={{ size: "12" }}
                                       md={{ size: "12" }}
                                       className="col-12 text-center"
                                     >
                                       <input
                                         type="text"
                                         id="GSMName"
                                         className=" ProductTextBox"
                                         name="GSMName"
                                         maxLength="10"
                                         onChange={(e) => this.handleChange(e)}
                                       />
                                     </Col>
                                   </Row>
                                   <Row noGutters={true} className="text-center">
                                     <Col
                                       sm={{ size: "12" }}
                                       xs={{ size: "12" }}
                                       md={{ size: "12" }}
                                       className="col-12 text-center"
                                     >
                                       <div className="hrlineforAddProduct"></div>
                                     </Col>
                                     {/* <Button> next</Button> */}
                                   </Row>
                                 </Row>
                                 {/* //#endregion Enter GSM (Gram per Square Metre) */}
                               </>
                             ) : null}

                          

                             {/* //#region Describe the product */}
                             <Row noGutters={true} className="mt60">
                               <Row noGutters={true}>
                                 <Col
                                   className="text-center"
                                   sm={{ size: "1" }}
                                   xs={{ size: "1" }}
                                   md={{ size: "1" }}
                                   className="col-1 "
                                 ></Col>{" "}
                                 <Col
                                   sm={{ size: "11" }}
                                   xs={{ size: "11" }}
                                   md={{ size: "11" }}
                                   className="col-11"
                                 >
                                   {this.state.description == "" ? (
                                     <div
                                       id="description"
                                       className="inComplete"
                                       ref={this.description}
                                     ></div>
                                   ) : (
                                     <div
                                       id="description"
                                       className="Complete"
                                       ref={this.description}
                                     ></div>
                                   )}

                                   <h4 className="subHeading">
                                     Describe the product
                                   </h4>
                                   <h6 className="subHeading_1">
                                     Describe your product in 500 characters
                                   </h6>
                                 </Col>
                               </Row>
                               <Row className="mt30">
                                 <Col
                                   sm={{ size: "9" }}
                                   xs={{ size: "9" }}
                                   md={{ size: "9" }}
                                   className="col-12 text-center"
                                 >
                                   <span className="ml-160 font13">
                                     Description of product
                                   </span>
                                 </Col>
                               </Row>
                               <Row className="">
                                 <Col
                                   sm={{ size: "12" }}
                                   xs={{ size: "12" }}
                                   md={{ size: "12" }}
                                   className="col-12 text-center"
                                 >
                                   <textarea
                                     maxLength="500"
                                     type="text"
                                     id="description"
                                     className=" productTextArea"
                                     name="description"
                                     onChange={(e) => this.handleChange(e)}
                                   />
                                 </Col>
                               </Row>
                             </Row>
                             {/* //#endregion Describe the product*/}
                             <Row className="washAndCareDiv mt30">
                               <Col
                                 sm={{ size: "2" }}
                                 xs={{ size: "2" }}
                                 md={{ size: "2" }}
                                 className="col-2"
                               ></Col>
                               <Col
                                 sm={{ size: "8" }}
                                 xs={{ size: "8" }}
                                 md={{ size: "8" }}
                                 className="col-2"
                               >
                                 <Row>
                                   <Col
                                     sm={{ size: "4" }}
                                     xs={{ size: "4" }}
                                     md={{ size: "4" }}
                                     className="col-4 text-right "
                                   >
                                     <button
                                       onClick={this.Cancel}
                                       className="cancelBtnProduct"
                                     >
                                       Cancel
                                     </button>
                                   </Col>
                                   <Col
                                     sm={{ size: "4" }}
                                     xs={{ size: "4" }}
                                     md={{ size: "4" }}
                                     className="col-4 text-center "
                                   >
                                     <button
                                       onClick={this.ResetAll}
                                       className="resetBtnProduct"
                                     >
                                       Reset All
                                     </button>
                                   </Col>
                                   <Col
                                     sm={{ size: "4" }}
                                     xs={{ size: "4" }}
                                     md={{ size: "4" }}
                                     className="col-4 text-left "
                                   >
                                    <div class="w3-container">
                                     <button
                                       onClick={this.Save}
                                       onClick={this.ToggleSave}
                                       className="saveBtnProduct"
                                       disabled={this.state.SaveDisabled}
                                     >
                                       Save
                                     </button>
                                     <div id="id02" class="w3-modal">
                                      <div class="w3-modal-content w3-animate-top modalBoxSize">
                                        <div class="w3-container">
                                          <h3 className="deleteModalHeader">Are you sure you want to save ?</h3>
                                          <p className="deleteModalPara">You can keep the changes or can go back to update.</p>
                                          <div className="deleteModalButtonOuterDiv">
                                            <span onClick={this.ToggleSaveClose} className="deleteModalCancelButton">Cancel</span>
                                            <span onClick={this.Save} className="saveModalOkayButton">Save</span>
                                          </div>
                                        </div>
                                      </div>
                                     </div>
                                    </div>
                                   </Col>
                                 </Row>
                               </Col>
                               <Col
                                 sm={{ size: "2" }}
                                 xs={{ size: "2" }}
                                 md={{ size: "2" }}
                                 className="col-2"
                               ></Col>
                             </Row>
                             <div className="hrlineforAddProduct"></div>
                             <Row noGutters={true} className="text-center">
                               <Col
                                 sm={{ size: "12" }}
                                 xs={{ size: "12" }}
                                 md={{ size: "12" }}
                                 className="col-12 text-center"
                               >
                                 <div className="mt30"></div>
                               </Col>
                               {/* <Button> next</Button> */}
                             </Row>
                           </div>
                         </Row>

                       </Container>
                       <Footer></Footer>

                     </React.Fragment>
                   );
                 }
               }
