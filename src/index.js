import {BrowserRouter} from 'react-router-dom';
import * as ReactDOM from "react-dom";
import * as React from "react";
import {Switch, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Main/>
      </div>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/roster' component={Roster}/>
          <Route path='/schedule' component={Schedule}/>
        </Switch>
      </main>
    );
  }
}

class Roster extends React.Component {
  render() {
    return (
      <div>
        <h2>This is a roster page!</h2>
        <Switch>
          <Route exact path='/roster' component={FullRoster}/>
          <Route path='/roster/:number' component={Player}/>
        </Switch>
      </div>
    );
  }
}

class Player extends React.Component {
  render() {
    const player = PlayerAPI.get(
      parseInt(this.props.match.params.number, 10)
    );

    if (!player) {
      return <div>Sorry, but the player was not found</div>
    }

    return (
      <div>
        <h1>{player.name} (#{player.number})</h1>
        <h2>{player.position}</h2>
      </div>
    )
  }
}

class FullRoster extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {
            PlayerAPI.all().map(p => (
              <li key={p.number}>
                <Link to={`/roster/${p.number}`}>{p.name}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

class Schedule extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>6/5 @ Спартак</li>
          <li>6/8 vs Зенит</li>
          <li>6/14 @ Рубин</li>
        </ul>
      </div>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Добро пожаловать на наш сайт!</h1>
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/roster'>Roster</Link></li>
            <li><Link to='/schedule'>Schedule</Link></li>
            <li><Link to={{pathname: '/roster/7'}}>Player #7</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

const PlayerAPI = {
  players: [
    { number: 1, name: "Ben Blocker", position: "G" },
    { number: 2, name: "Dave Defender", position: "D" },
    { number: 3, name: "Sam Sweeper", position: "D" },
    { number: 4, name: "Matt Midfielder", position: "M" },
    { number: 5, name: "William Winger", position: "M" },
    { number: 6, name: "Fillipe Forward", position: "F" }
  ],
  all: function() { return this.players},
  get: function(id) {
    const isPlayer = p => p.number === id
    return this.players.find(isPlayer)
  }
}

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root'));