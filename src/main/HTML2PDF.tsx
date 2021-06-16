import React from "react";
import html2pdf from "html2pdf.js";

export default function HTML2PDF() {
  const onClick = (e) => {
    console.log("Reached");
    var element = document.getElementById("content");
    // const res = html2pdf(element);
    // console.log({ res });
    var worker = html2pdf().from(element).save();
    console.log({ worker });
  };

  return (
    <div>
      <button onClick={onClick}>HTML 2 PDF</button>
    </div>
  );
}
