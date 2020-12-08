import React, { useState, useEffect } from "react";
// import "./HomePage.css";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import Button from "react-bootstrap/Button";
import "./ImageEditorTTCE.css";
import ReactModal from "react-modal";
const icona = require("tui-image-editor/dist/svg/icon-a.svg");
const iconb = require("tui-image-editor/dist/svg/icon-b.svg");
const iconc = require("tui-image-editor/dist/svg/icon-c.svg");
const icond = require("tui-image-editor/dist/svg/icon-d.svg");


var customTheme = {
  "common.bi.image":
    "https://uicdn.toast.com/toastui/img/tui-image-editor-bi.png",
  "common.bisize.width": "251px",
  "common.bisize.height": "21px",
  "common.backgroundImage": "none",
  // "common.backgroundColor": "#1e1e1e",
  "common.backgroundColor": "#ffffff",
  "common.border": "0px",

  // header
  "header.backgroundImage": "none",
  "header.backgroundColor": "transparent",
  "header.border": "0px",
  // "header.display": "none",

  // load button
  "loadButton.backgroundColor": "#fff",
  "loadButton.border": "1px solid #ddd",
  "loadButton.color": "#222",
  "loadButton.fontFamily": "NotoSans, sans-serif",
  "loadButton.fontSize": "12px",

  // download button
  "downloadButton.backgroundColor": "#fdba3b",
  "downloadButton.border": "1px solid #fdba3b",
  "downloadButton.color": "#fff",
  "downloadButton.fontFamily": "NotoSans, sans-serif",
  "downloadButton.fontSize": "12px",

  //downloaddisplay none
  "downloadButton.display": "none",

  // icons default
  "menu.normalIcon.color": "#8a8a8a",
  "menu.activeIcon.color": "#555555",
  "menu.disabledIcon.color": "#434343",
  "menu.hoverIcon.color": "#e9e9e9",
  "submenu.normalIcon.color": "#8a8a8a",
  "submenu.activeIcon.color": "#e9e9e9",
  "submenu.partition.display": "none",
  "submenu:li:first-child.display": "none",

  "menu.iconSize.width": "24px",
  "menu.iconSize.height": "24px",
  "submenu.iconSize.width": "32px",
  "submenu.iconSize.height": "32px",

  // submenu primary color
  "submenu.backgroundColor": "#1e1e1e",
  "submenu.partition.color": "#858585",

  // submenu labels
  "submenu.normalLabel.color": "#858585",
  "submenu.normalLabel.fontWeight": "lighter",
  "submenu.activeLabel.color": "#fff",
  "submenu.activeLabel.fontWeight": "lighter",

  // checkbox style
  "checkbox.border": "1px solid #ccc",
  "checkbox.backgroundColor": "#fff",

  // rango style
  "range.pointer.color": "#fff",
  "range.bar.color": "#666",
  "range.subbar.color": "#d1d1d1",

  "range.disabledPointer.color": "#414141",
  "range.disabledBar.color": "#282828",
  "range.disabledSubbar.color": "#414141",

  "range.value.color": "#fff",
  "range.value.fontWeight": "lighter",
  "range.value.fontSize": "11px",
  "range.value.border": "1px solid #353535",
  "range.value.backgroundColor": "#151515",
  "range.title.color": "#fff",
  "range.title.fontWeight": "lighter",

  // colorpicker style
  "colorpicker.button.border": "1px solid #1e1e1e",
  "colorpicker.title.color": "#fff",
};


// const download = require("downloadjs");
const myTheme = {
  "menu.backgroundColor": "white",
  "common.backgroundColor": "#151515",
  "downloadButton.backgroundColor": "white",
  "downloadButton.borderColor": "white",
  "downloadButton.color": "black",
  "menu.normalIcon.path": icond,
  "menu.activeIcon.path": iconb,
  "menu.disabledIcon.path": icona,
  "menu.hoverIcon.path": iconc,
};
function ImageEditorTTCE(props) {
  
  const [imageSrc, setImageSrc] = useState("");
  let imageEditor = React.createRef();
 
  const cancelUpdate = () =>{
      props.cancelUpdate();
  }
  const saveImageToDisk = () => {
    
    const imageEditorInst = imageEditor.current.imageEditorInst;
    const data = imageEditorInst.toDataURL();
    
    if (data) {
                const mimeType = data.split(";")[0];
                const extension = data.split(";")[0].split("/")[1];
                 props.updateImage(data);
                // this.setState({ preview });
                //   download(data, `image.${extension}`, mimeType);
              }
  };
  return (
    <div style={{ boxShadow: "1px 4px 9px" }}>
      <form
        style={{
          background: "rgb(242,245,246)",
          padding: "1rem",
        }}
      >
        <div className="form-group"></div>
        <div className="home-page">
          <div className="text-center"></div>
          <ImageEditor
            includeUI={{
              loadImage: {
                path: props.aI,
                name: "image",
              },
              theme: customTheme,
              // menu: ["crop", "flip", "rotate", "draw", "shape", "text", "filter"],
              menu: ["crop", "flip", "rotate", "filter"],
              initMenu: "",
              uiSize: {
                height: `calc(100vh - 160px)`,
                // width: `calc(50vw - 160px)`,
              },
              imageSize: {
                oldWidth: 100,
                oldHeight: 100,
                newWidth: 700,
                newHeight: 700,
              },
              menuBarPosition: "bottom",
            }}
            cssMaxHeight={window.innerHeight}
            cssMaxWidth={window.innerWidth}
            selectionStyle={{
              cornerSize: 20,
              rotatingPointOffset: 70,
            }}
            usageStatistics={true}
            ref={imageEditor}
          />
          <Button className="saveBtn" onClick={saveImageToDisk}>
            Save
          </Button>
          <Button className="saveBtn cancelbtn" onClick={cancelUpdate}>
            Cancel
          </Button>
          {/* <img src={this.state.preview} alt="Preview" /> */}
        </div>
      </form>
    </div>
  );
}
export default ImageEditorTTCE;
