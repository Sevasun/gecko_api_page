import React, { Component } from "react";
import './app.css';
import Table from "../table/table";
import Tabs from "../tabs";
import Reload from "../reload";

export default class App extends Component {
  state = {
    reload: false
  }

  componentDidUpdate() {
    if (this.state.reload) {
      this.setState({
        reload: false
      })
    }
  }

  onReload = () => {
    this.setState({
      reload: true
    })
  }

  render() {
    const reloadKey = this.state.reload ? true : null;

    return (
      <div className="App">
        <div className="container">
          <header className="page-header">
            <Reload onReload={ this.onReload } />
            <nav className="navbar navbar-expand-lg">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <Tabs />
              </div>
            </nav>
          </header>
          <div className="row">
            <div className="col-12">
              <div className="content">
                <div className="tab">
                  <Table reload={reloadKey} />
                  <div className="pagination d-flex justify-content-between my-3">
                    <button className="btn btn-primary">Prev</button>
                    <button className="btn btn-primary">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}