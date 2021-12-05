import React, {useState} from 'react'
import './CSS/App.css'
import './CSS/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Components/Header'
import Footer from './Components/Footer.js'
import Graph from './Components/Graph'
import GraphList from './Components/Graphlist'
import Unauth from './Components/Unauth.js'
import Register from './Pages/Register'
import Login from './Pages/Login'
import { BrowserRouter as Router, Route} from "react-router-dom"

function App() {
  const [data, setData] = useState([])
  const [counter, setCounter] = useState(0)
  const ip = "localhost"

  if (localStorage.getItem('usrdata')) {
    if (data.length == 0 && JSON.parse(localStorage.getItem('usrdata')).length > 0) {
      console.log('update')
      setData(JSON.parse(localStorage.getItem('usrdata')))
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function createUser(login, password) {
    localStorage.setItem('token', 'tok')
    return('')
    fetch(`http://${ip}:3000/api/signup`, {
      method: "POST",
      body: JSON.stringify({login, password}),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then((result) => result.json().then(res => {console.log(res);checkUser(login, password)}))
    .catch((err) => err)
  }

  function checkUser(login, password) {
    localStorage.setItem('token', 'tok')
    return('')
    fetch(`http://${ip}:3000/api/login`, {
      method: "POST",
      body: JSON.stringify({login, password}),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then((result) => result.json().then(res => {
      let tok = res.token
      if (tok) {
        fetch(`http://${ip}:3000/getdata`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "authorization": tok
          }
        })
        .then((result) => result.json().then(res => {
          res.usrdata = JSON.parse(res.usrdata)
          localStorage.setItem('token', tok)
          localStorage.setItem('login', login)
          if (res.usrdata) {
            localStorage.setItem('usrdata', JSON.stringify(res.usrdata))
            setData(res.usrdata)
          }
        }))
        .catch((err) => console.log(err))
        window.location.replace('/');
      }
      else {
        alert('error')
      }
    }))
    .catch((err) => err)
  }
  
  function add_data(date, weight, index) {
    let tst = true
    let prom = data[index].grph
    for (let element in prom) {
      console.log(prom[element])
      if (prom[element].x == date) {
        console.log('name.used')
        prom[element] = {x: date, y: Number(weight)}
        tst = false
      }
    }
    if (tst) {
      prom.push({x: date, y: Number(weight)})
    }
    data[index].grph = prom
    fetch(`http://${ip}:3000/chngdata`, {
      method: "POST",
      body: JSON.stringify({usrdata: data}),
      headers: {
        "Content-type": "application/json",
        "authorization": localStorage.getItem('token')
      }
    })
    .then((result) => result.json().then(res => {
      console.log(res.result)
    }))
    .catch((err) => console.log(err))
    localStorage.setItem('usrdata', JSON.stringify(data))
    setData(data)
  }

  function unauth(event) {
    event.preventDefault()
    console.log('exit')
    localStorage.removeItem('token')
    localStorage.removeItem('usrdata')
    localStorage.removeItem('login')
    setCounter(counter + 1)
  }

  function domrerender() {
    console.log('render')
    setTimeout(() => setCounter(getRandomInt(1, 100)), 200)
  }

  function del(id) {
    data.splice(id, 1)
    localStorage.setItem('usrdata', JSON.stringify(data))
    fetch(`http://${ip}:3000/chngdata`, {
      method: "POST",
      body: JSON.stringify({usrdata: data}),
      headers: {
        "Content-type": "application/json",
        "authorization": localStorage.getItem('token')
      }
    })
    .then((result) => result.json().then(res => {
      console.log(res.result)
    }))
    .catch((err) => console.log(err))
    setData(data)
    setCounter(counter + 1)
  }

  function add_graph(name) {
    let tst = true
    for (let element in data) {
      console.log(data[element])
      if (data[element].name == name) {
        console.log('name.used')
        tst = false
      }
    }
    if (tst) {
      data.push({name: name, grph: []})
    }
    fetch(`http://${ip}:3000/chngdata`, {
      method: "POST",
      body: JSON.stringify({usrdata: data}),
      headers: {
        "Content-type": "application/json",
        "authorization": localStorage.getItem('token')
      }
    })
    .then((result) => result.json().then(res => {
      console.log(res.result)
    }))
    .catch((err) => console.log(err))
    localStorage.setItem('usrdata', JSON.stringify(data))
    setData(data)
  }


  return (
    <div>
      <Router>
        <Header unauth={unauth} />
        <Route exact path='/' render={ () => <>
          <div className="title">
            <p>Контролируйте свой вес</p>
            <p>И весной, и в дождь осенний!</p>
            <p>Не зависьте от "чудес":</p>
            <p>Их игнорит ожиренье!</p>
            <p></p>
            <p>Крайность здесь другая есть:</p>
            <p>Чтоб не быть худым скелетом,</p>
            <p>Контролируйте свой вес</p>
            <p>И зимой, и жарким летом!</p>
            <p></p>
            <p>Контролируйте свой вес!</p>
            <p>Чтоб спасти вас от мучений,</p>
            <p>Мы свое веб-приложенье</p>
            <p>Представляем прямо здесь!</p>
            <p className="sign">&copy; Масахико АМАНО</p>
          </div>
          <div className="how-it-works">
            <h2>Как это работает?</h2>
            <p>В общем, логинитесь, вносите данные веса и мониторите его динамику. Все гениальное - просто!</p>
          </div>
          <Footer />
        </> } />
        <Route exact path='/graph' render={ () => localStorage.getItem('token') ? <GraphList add_graph={add_graph} data={data} delete={del} /> : <Unauth />} />
        <Route exact path='/graph/:index' render={ (props) => localStorage.getItem('token') ? <Graph meta={props} add_data={add_data} data={data} /> : <Unauth />} />
        <Route exact path='/register' render={ () => <Register createUser={createUser} rer={domrerender} /> } />
        <Route exact path='/login' render={ () => <Login checkUser={checkUser} rer={domrerender} /> } />
      </Router>
    </div>
  );
  //<Graph data={data} />
}

export default App;

//<Graph add_data={add_data} data={data}/>
