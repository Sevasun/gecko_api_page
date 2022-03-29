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
    ids: [],
    popupOpen: false,
    page: 1
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
    if (this.state.ids !== prevState.ids || this.state.page !== prevState.page) {
      this.updateCoinList(this.state.ids, this.state.page);
    }
  };

  updateCoinList = (ids, page = null) => {
    const idList = ids && ids.length ? ids.join(', ') : null;

    const options = {
      ids: idList,
      page: page
    };

    this.api.coinsList(options).then((array) => {
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
    if (+this.state.page > 1) {
      this.setState((prevState) => {
        return {
          page: prevState.page - 1
        }
      });
    }
  };

  onClickNext = () => {
    this.setState((prevState) => {
      return {
        page: prevState.page + 1
      }
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
                  <Pagination onClickPrev={this.onClickPrev} onClickNext={this.onClickNext} currentPage={this.state.page} />
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