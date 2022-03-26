import React, { Component } from "react";
import GeckoApi from "../../modules/gecko";
import './app.css';
import Table from "../table/table";
import Tabs from "../tabs";
import Reload from "../reload";

export default class App extends Component {
  api = new GeckoApi();

  state = {
    activeTab: null,
    coins: null,
    ids: []
  }

  tabs = [
    {id: 'tab-1', value: 'All coins', fn: (id) => this.setDefaultTab(id)},
    {id: 'tab-2', value: 'Favorites', fn: (id) => this.setFavoriteTab(id)},
    {id: 'tab-3', value: 'To do', fn: null}
  ];

  componentDidMount() {
    this.setActiveTab();
    this.updateCoinList();
  }

  componentDidUpdate() {
    
  };

  updateCoinList = (ids) => {
    const idList = ids && ids.length ? ids.join(', ') : null;

    this.api.coinsList(idList).then((array) => {
      this.setState({
        coins: array
      })
    });
  }

  onReload = () => {
    const { activeTab } = this.state;
    this.tabs.map((tab) => {
      if (tab.id === activeTab) {
        tab.fn(tab.id);
      }
    });
  };

  setActiveTab = (id) => {
    if (!id) {
      this.setState({
        activeTab: this.tabs[0].id
      });
      return;
    }

    this.setState({
      activeTab: id
    });
  };

  setDefaultTab = (id) => {
    this.setActiveTab(id);
    this.updateCoinList();
  }

  setFavoriteTab = (id) => {
    this.setActiveTab(id);

    if (!this.state.ids.length) {
      console.log('Sorry, you doesnt select any favorite coins');
    }
    this.updateCoinList(this.state.ids);
  };

  onFavoriteClick = (id) => {
    const { ids } = this.state;
    let newIds;
    const idx = ids.indexOf(id);

    if (idx === -1) {
      newIds = [...ids, id];
    } else {
      newIds = [...ids.slice(0, idx), ...ids.slice(idx + 1)];
    }
    this.setState({
      ids: newIds
    })
  }

  render() {
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
                <Tabs tabs={ this.tabs } activeTab={ this.state.activeTab } />
              </div>
            </nav>
          </header>
          <div className="row">
            <div className="col-12">
              <div className="content">
                <div className="tab">
                  <Table coins={ this.state.coins } onFavorite={ this.onFavoriteClick } />
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