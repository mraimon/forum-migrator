import React from "react";
import axios from "axios";
import "./App.css";

const baseURL = "http://localhost:49160";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { SQL: "", result: "" };
    this.getCategories = this.getCategories.bind(this);
    this.migrateCategories = this.migrateCategories.bind(this);
  }

  getCategories() {
    axios.get(`${baseURL}/categories`).then((response) => {
      this.setState({
        SQL: response.data,
      });
    });
  }

  migrateCategories(sql) {
    axios
      .post(`${baseURL}/categories`, {
        query: sql,
      })
      .then((response) => {
        this.setState({
          SQL: "",
          result: "Categories migrated!!!",
        });
      });
  }

  render() {
    return (
      <div className="app">
        <header className="App-header">
          <img src="https://i.pinimg.com/originals/dc/0e/4a/dc0e4aa8eb29f303f3ad68eb2dccece2.gif" />
          Migrate your forum!
          <img src="https://gifdanceparty.com/dancers/dancer_lshark.gif" />
        </header>
        <marquee behavior="alternate" direction="right">
          This is special for Marek
        </marquee>
        <div>
          This is the tool to help you to migrate from borda.ru to your own
          PhpBB forum. To use it, you need to provide your database connection
          information.
        </div>
        <div className="actions">
          <button onClick={this.getCategories} className="action-button">
            Get Categories
          </button>
          <button className="action-button">Get Users</button>
          <button className="action-button">Get Topics</button>
          <button className="action-button">Get Topics Posts</button>
          <button className="action-button">Get Admins</button>
        </div>
        {this.state.result.length > 0 && (
          <div class="success">{this.state.result}</div>
        )}
        {this.state.SQL.length > 0 && (
          <div>
            <div className="query">{this.state.SQL}</div>
            <button
              className="migrate-button"
              onClick={() => this.migrateCategories(this.state.SQL)}
            >
              Migrate categories
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
