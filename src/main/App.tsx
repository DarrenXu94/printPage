import * as React from "react";
import Downloader from "./Downloader";
// routing, etc.

export default class App extends React.Component {
  public render() {
    return (
      <div className="">
        <h1>Hello world!</h1>
        <Downloader />
      </div>
    );
  }
}
