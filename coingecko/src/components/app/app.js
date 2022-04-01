import React, { Component } from "react";
import GeckoApi from "../../modules/gecko";
import './app.css';
import Table from "../table/table";
import Tabs from "../tabs";
import Reload from "../reload";
import Popup from "../popup";
import Pagination from "../pagination";

export default class App extends Component {
  api = new GeckoApi();

  state = {
    activeTab: null,
    coins: null,
    popupOpen: false,
    options: {
      ids: [],
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 50,
      page: 1,
      sparkline: "false",
      price_change_percentage: "24h"
    }
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.options !== prevState.options) {
      this.updateCoinList(this.state.options);
    }
  };

  updateCoinList = (options = {}) => {
    this.setState({
      coins: null
    });

    const idList = options.ids === this.state.options.ids ? options.ids.join(', ') : null;

    const newOptions = { ...this.state.options, ...options, ids: idList };

    this.api.coinsList(newOptions).then((array) => {
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

    if (!this.state.options.ids.length) {
      console.log('Sorry, you doesnt select any favorite coins');
    }
    this.updateCoinList(this.state.options);
  };

  onFavoriteClick = (id) => {
    const { ids } = this.state.options;
    let newIds;
    const idx = ids.indexOf(id);

    if (idx === -1) {
      newIds = [...ids, id];
    } else {
      newIds = [...ids.slice(0, idx), ...ids.slice(idx + 1)];
    }

    const options = {...this.state.options, ids: newIds};
  
    this.setState({
      options: options
    })
  };

  openPopup = (id) => {
    this.setState({
      popupOpen: id
    });
  };

  closePopup = () => {
    this.setState({
      popupOpen: null
    })
  };

  onClickPrev = () => {
    if (+this.state.options.page > 1) {
      this.setState((prevState) => {
        const options = {...prevState.options, page: prevState.options.page - 1};
        return {
          options: options
        }
      });
    }
  };

  onClickNext = () => {
    this.setState((prevState) => {
      const options = {...prevState.options, page: prevState.options.page + 1};
      return {
        options: options
      }
    });
  };

  onQuantitySelect = (value) => {
    const options = {...this.state.options, per_page: +value};

    this.setState({
      options: options
    });
  }

  render() {
    const popup = this.state.popupOpen ? <Popup id={ this.state.popupOpen } closePopup={this.closePopup} /> : null;

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
                  <Table coins={ this.state.coins } 
                          onFavorite={ this.onFavoriteClick } 
                          onCoinClick={ this.openPopup } />
                  <Pagination onClickPrev={this.onClickPrev} 
                              onClickNext={this.onClickNext} 
                              onSelect={this.onQuantitySelect}
                              currentOptions={this.state.options} />
                </div>
              </div>
            </div>
          </div>
        </div>
        { popup }
      </div>
    );
  }
}