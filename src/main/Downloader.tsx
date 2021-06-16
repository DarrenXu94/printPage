import React, { useEffect } from "react";
import { Previewer, registerHandlers, Handler } from "pagedjs";

export interface DownloaderProps {}

function createToc(config) {
  console.log("Create toc");
  const content = config.content;
  const tocElement = config.tocElement;
  const titleElements = config.titleElements;

  let tocElementDiv = content.querySelector(tocElement);
  let tocUl = document.createElement("ul");
  tocUl.id = "list-toc-generated";
  tocElementDiv.appendChild(tocUl);

  // add class to all title elements
  let tocElementNbr = 0;
  for (var i = 0; i < titleElements.length; i++) {
    let titleHierarchy = i + 1;
    let titleElement = content.querySelectorAll(titleElements[i]);

    titleElement.forEach(function (element) {
      // add classes to the element
      element.classList.add("title-element");
      element.setAttribute("data-title-level", titleHierarchy);

      // add id if doesn't exist
      tocElementNbr++;
      let idElement = element.id;
      if (idElement == "") {
        element.id = "title-element-" + tocElementNbr;
      }
      let newIdElement = element.id;
    });
  }

  // create toc list
  let tocElements = content.querySelectorAll(".title-element");

  for (var i = 0; i < tocElements.length; i++) {
    let tocElement = tocElements[i];

    let tocNewLi = document.createElement("li");

    // Add class for the hierarcy of toc
    tocNewLi.classList.add("toc-element");
    tocNewLi.classList.add(
      "toc-element-level-" + tocElement.dataset.titleLevel
    );

    // Keep class of title elements
    let classTocElement = tocElement.classList;
    for (var n = 0; n < classTocElement.length; n++) {
      if (classTocElement[n] != "title-element") {
        tocNewLi.classList.add(classTocElement[n]);
      }
    }

    // Create the element
    tocNewLi.innerHTML =
      '<a href="#' + tocElement.id + '">' + tocElement.innerHTML + "</a>";
    tocUl.appendChild(tocNewLi);
  }
}

class handlers extends Handler {
  constructor(chunker, polisher, caller) {
    super(chunker, polisher, caller);
  }

  beforeParsed(content) {
    console.log("Created toc");
    createToc({
      content: content,
      tocElement: "#my-toc-content",
      titleElements: ["h2", "h3"],
    });
  }
}

let paged = new Previewer();
let flow = paged.preview().then((flow) => {
  console.log("Rendered", flow.total, "pages.");
});

registerHandlers(handlers);

const content = `<div
id="mw-content-text"
lang="en"
dir="ltr"
className="mw-content-ltr"
>
<h2 id="Pre-digital_era" className="keep-class">
  Pre-digital era
</h2>
<h3>Manual typesetting</h3>
<p>
  During much of the{" "}
  <a href="/wiki/Letterpress_printing" title="Letterpress printing">
    letterpress era
  </a>
  , movable type was composed by hand for each{" "}
  <a href="/wiki/Page_(paper)" title="Page (paper)">
    page
  </a>
  . Cast metal{" "}
  <i>
    <a href="/wiki/Sort_(typesetting)" title="Sort (typesetting)">
      sorts
    </a>
  </i>{" "}
  were composed into words, then lines, then paragraphs, then pages of
  text and tightly bound together to make up a <i>form</i>, with all
  letter faces exactly the same "height to paper", creating an even
  surface of type. The form was placed in a press, inked, and an
  impression made on paper.
</p>
</div>`;

export default function Downloader() {
  const createMarkup = () => {
    return {
      __html: content,
    };
  };
  return (
    <div id="content" className="mw-body" role="main">
      <h1 id="firstHeading" className="firstHeading" lang="en">
        Typesetting
      </h1>
      <div id="bodyContent" className="mw-body-content">
        <div id="siteSub" className="noprint">
          From Wikipedia, the free encyclopedia
        </div>

        <div id="table-of-content">
          <h1>Table of content</h1>
          <nav id="my-toc-content"></nav>
        </div>
        <div dangerouslySetInnerHTML={createMarkup()} />

        {/* <div
          id="mw-content-text"
          lang="en"
          dir="ltr"
          className="mw-content-ltr"
        >
          <h2 id="Pre-digital_era" className="keep-class">
            Pre-digital era
          </h2>
          <h3>Manual typesetting</h3>
          <p>
            During much of the{" "}
            <a href="/wiki/Letterpress_printing" title="Letterpress printing">
              letterpress era
            </a>
            , movable type was composed by hand for each{" "}
            <a href="/wiki/Page_(paper)" title="Page (paper)">
              page
            </a>
            . Cast metal{" "}
            <i>
              <a href="/wiki/Sort_(typesetting)" title="Sort (typesetting)">
                sorts
              </a>
            </i>{" "}
            were composed into words, then lines, then paragraphs, then pages of
            text and tightly bound together to make up a <i>form</i>, with all
            letter faces exactly the same "height to paper", creating an even
            surface of type. The form was placed in a press, inked, and an
            impression made on paper.
          </p>
        </div> */}
      </div>
    </div>
  );
}
