import React from "react";
import './app.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="page-header">
          <div className="header-top d-flex justify-content-end">
            <button className="btn btn-primary">Reload</button>
          </div>
          <nav className="navbar navbar-expand-lg">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <button className="nav-link active btn btn-link">All coins</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link">Selected</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link">To Do</button>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <div className="content">
          <div className="tab">
            <table className="coin-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Coin name</th>
                  <th>Ticker</th>
                  <th>Price</th>
                  <th>24h change</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <button className="btn btn-secondary">Add to favorites</button>
                  </td>
                  <td>
                    Bitcoin
                  </td>
                  <td>
                    BTC
                  </td>
                  <td>
                    43000.00
                  </td>
                  <td>
                    +1500.00
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="pagination">
              <button className="btn btn-primary">Prev</button>
              <button className="btn btn-primary">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;