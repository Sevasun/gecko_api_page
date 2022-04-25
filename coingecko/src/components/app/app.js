import React, { Component } from "react";
import GeckoApi from "../../modules/gecko";
import './app.css';
import Table from "../table/table";
import Tabs from "../tabs";
import Reload from "../reload";
import Popup from "../popup";
import Pagination from "../pagination";
import TabContent from "../tab-content";
import ErrorMessage from "../error-message/error-message";
import Select from "../select";
import SearchForm from "../search-form";
import { selectAutoReloadTiming } from "../../modules/helpers/data";
import { FavoriteProvider } from "../context/context";
import { CoinTableHead, CoinTableRow } from "../coin-table-rows";
import { StepnTableHead, StepnTableRow } from "../stepn-table-rows";

export default class App extends Component {
  api = new GeckoApi();

  state = {
    activeTab: null,
    error: null,
    coins: null,
    popupOpen: false,
    reloadTime: null,
    ids: [],
    options: {
      ids: null,
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 10,
      page: 1,
      sparkline: "false",
      price_change_percentage: "24h"
    }
  }

  tabs = [
    {id: 'tab-1', value: 'All coins', fn: (id) => this.setDefaultTab(id)},
    {id: 'tab-2', value: 'Favorites', fn: (id) => this.setFavoriteTab(id)},
    {id: 'tab-3', value: 'StepN', fn: (id) => this.setStepnTab(id)}
  ];

  componentDidMount() {
    this.setActiveTab();
    this.updateCoinList();
    this.autoReload = this.state.reloadTime ? setInterval(this.onReload, this.state.reloadTime) : null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.options !== prevState.options) {
      this.updateCoinList(this.state.options);
      clearInterval(this.autoReload);
      this.autoReload = this.state.reloadTime ? setInterval(this.onReload, +this.state.reloadTime) : null;
    }
    if (this.state.reloadTime !== prevState.reloadTime) {
      clearInterval(this.autoReload);
      this.autoReload = this.state.reloadTime ? setInterval(this.onReload, +this.state.reloadTime) : null;
    }
  };

  componentWillUnmount() {
    clearInterval(this.autoReload);
  }

  updateCoinList = (options = {}, ids) => {
    this.setState({
      coins: null
    });

    const idList = ids && ids.length ? ids.join(', ') : null;

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
      activeTab: id,
      error: null
    });
  };

  setDefaultTab = (id) => {
    this.setActiveTab(id);
    this.updateCoinList();
  }

  setFavoriteTab = (id) => {
    this.setActiveTab(id);

    if (!this.state.ids.length) {
      this.setState({
        error: true
      });
      return;
    }

    this.updateCoinList(this.state.options, this.state.ids);
  };

  setStepnTab = (id) => {
    const options = {...this.state.options, ids: ['solana', 'stepn', 'green-satoshi-token']};
    
    this.setActiveTab(id);
    
    this.updateCoinList(options, ['solana', 'stepn', 'green-satoshi-token']);
  }

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

  onSetReloadTime = (value) => {
    this.setState({
      reloadTime: value > 0 ? value : null
    });
  };

  render() {
    const tableHead = this.state.activeTab === 'tab-3' ? <StepnTableHead /> : <CoinTableHead />;
    const tableBody = this.state.activeTab === 'tab-3' 
                                                ? <StepnTableRow coins={ this.state.coins } /> 
                                                : <CoinTableRow 
                                                    coins={ this.state.coins } 
                                                    favorites={this.state.ids}
                                                    onFavorite={ this.onFavoriteClick } 
                                                    onCoinClick={ this.openPopup }
                                                  />;
    const popup = this.state.popupOpen 
                  ? <Popup id={ this.state.popupOpen } 
                            closePopup={ this.closePopup }
                            getCoinInfo={ this.api.getCoinInfo } /> 
                  : null;
    const tabContent = !this.state.error 
                        ? (
                          <FavoriteProvider value={ this.onFavoriteClick }>
                            <TabContent>
                              <Table coins={ this.state.coins } 
                                      head={tableHead}>
                                { tableBody }
                              </Table>

                              <Pagination onClickPrev={this.onClickPrev} 
                                          onClickNext={this.onClickNext} 
                                          onSelect={this.onQuantitySelect}
                                          currentOptions={this.state.options} />
                            </TabContent>
                          </FavoriteProvider>
                        )
                        : <ErrorMessage title='Sorry' message='You did not select any favorite coin' /> ;

    return (
      <div className="App">
        <div className="container">
          <header className="page-header">
            <div className="header-top d-flex justify-content-between align-items-center my-3">
              <Select label="Auto Reload" defaultValue='0' 
                                            options={ selectAutoReloadTiming } 
                                            onSelect={ this.onSetReloadTime } />
              <SearchForm onItemClick={this.openPopup} 
                          popup={this.state.popupOpen}
                          searchCoin={this.api.searchCoin} />
              <Reload onReload={ this.onReload } />
            </div>
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
              { tabContent }
            </div>
          </div>
        </div>
        { popup }
      </div>
    );
  }
}