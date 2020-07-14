import React from "react";
import { css } from "glamor";

function CloseButton({ closeToast, type, ariaLabel }) {
  const styles = css({
    color: "#000",
    fontWeight: "bold",
    fontSize: "18px",
    background: "transparent",
    outline: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    opacity: "0.7",
    transition: ".3s ease",
    alignSelf: "flex-start",
    ":hover, :focus": {
      opacity: 1,
    },
  });
  return (
    <button
      {...styles}
      type="button"
      onClick={closeToast}
      aria-label={ariaLabel}
    >
      ✖
    </button>
  );
}

export default CloseButton;
