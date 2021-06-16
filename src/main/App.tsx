import * as React from "react";
import Downloader from "./Downloader";
import HTML2PDF from "./HTML2PDF";
// routing, etc.

export default class App extends React.Component {
  public render() {
    return (
      <div className="">
        <h1>Hello world!</h1>
        {/* <HTML2PDF /> */}
        <Downloader />
      </div>
    );
  }
}
