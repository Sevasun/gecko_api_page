import React from "react";
import './tabs.css';

const Tabs = (props) => {
  const { activeTab, tabs } = props;
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
};

export default Tabs;