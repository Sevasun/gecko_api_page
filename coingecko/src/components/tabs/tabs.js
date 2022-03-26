import React, { Component } from "react";
import './tabs.css';

export default class Tabs extends Component {
  render() {
    const { activeTab, tabs } = this.props;
    const renderTabs = tabs.map((tab) => {
      const active = activeTab === tab.id ? 'active' : null;
      return (
        <li className="nav-item" key={tab.id}>
          <button className={`nav-link btn btn-link ${active}`} onClick={() => { tab.fn(tab.id) }}>
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

