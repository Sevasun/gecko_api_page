import React, { Component } from "react";
import './tabs.css';

export default class Tabs extends Component {
  state = {
    activeTab: null,
  }

  tabs = [
    {id: 'tab-1', value: 'All coins', active: null},
    {id: 'tab-2', value: 'Favorites', active: null},
    {id: 'tab-3', value: 'To do', active: null}
  ];

  componentDidMount() {
    this.setActive();
  }

  setActive = (id) => {
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

  onTabClick = (id) => {
    this.setActive(id);
  }

  render() {
    const { activeTab } = this.state;
    const renderTabs = this.tabs.map((tab) => {
      const active = activeTab === tab.id ? 'active' : null;
      return (
        <li className="nav-item" key={tab.id}>
          <button className={`nav-link btn btn-link ${active}`} onClick={() => { this.onTabClick(tab.id) }}>
            { tab.value }
          </button>
        </li>
      );
    });

    return (
      <ul className="navbar-nav me-auto mb-2">
        { renderTabs }
      </ul>
    );
  }
};

