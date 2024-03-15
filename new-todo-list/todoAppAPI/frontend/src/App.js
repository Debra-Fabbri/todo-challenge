import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todoList:[],
      activeItem:{
        id:null, 
        title:'',
        completed:false,
      },
      editing:false,
      searchDate: '', // Nuevo estado para la fecha de búsqueda
      searchContent: '', // Nuevo estado para el contenido de búsqueda
    }
    this.fetchTasks = this.fetchTasks.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.getCookie = this.getCookie.bind(this)
    this.startEdit = this.startEdit.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.strikeUnstrike = this.strikeUnstrike.bind(this)
  };

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  componentWillMount(){
    this.fetchTasks()
  }

  fetchTasks(){
    console.log('Fetching...')

    let url = 'http://127.0.0.1:8000/api/task-list/';
    // Agrega los parámetros de búsqueda si están definidos
    if (this.state.searchDate || this.state.searchContent) {
      url += `?date=${this.state.searchDate}&content=${this.state.searchContent}`;
    }

    fetch(url)
    .then(response => response.json())
    .then(data => 
      this.setState({
        todoList: data
      })
    );
  }

  handleChange(e){
    const { name, value } = e.target;
    this.setState({
      activeItem: {
        ...this.state.activeItem,
        [name]: value
      }
    });
  }

  handleSearchChange(e){
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    this.fetchTasks();
  }

  handleSearchSubmit(e){
    e.preventDefault();
    this.fetchTasks();
  }

  startEdit(task){
    this.setState({
      activeItem: task,
      editing: true,
    });
  }

  deleteItem(task){
    var csrftoken = this.getCookie('csrftoken');

    fetch(`http://127.0.0.1:8000/api/task-delete/${task.id}/`, {
      method:'DELETE',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken': csrftoken,
      },
    }).then((response) => {
      this.fetchTasks();
    });
  }

  strikeUnstrike(task){
    task.completed = !task.completed;
    var csrftoken = this.getCookie('csrftoken');
    var url = `http://127.0.0.1:8000/api/task-update/${task.id}/`;

    fetch(url, {
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({'completed': task.completed, 'title': task.title})
    }).then(() => {
      this.fetchTasks();
    });
  }

  render(){
    var tasks = this.state.todoList;
    var self = this;
    return(
      <div className="container">
        <div id="task-container">
          <div id="form-wrapper">
            <form onSubmit={this.handleSubmit} id="form">
              <div className="flex-wrapper">
                <div style={{flex: 6}}>
                  <input onChange={this.handleChange} className="form-control" id="title" type="text" name="title" value={this.state.activeItem.title} placeholder="Add task.." />
                </div>
                <div style={{flex: 1}}>
                  <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                </div>
              </div>
            </form>
          </div>
          <div id="search-wrapper">
            <form onSubmit={this.handleSearchSubmit} id="search-form">
              <div className="flex-wrapper">
                <div style={{flex: 3}}>
                  <input onChange={this.handleSearchChange} className="form-control" id="searchDate" type="date" name="searchDate" value={this.state.searchDate} placeholder="Search by Date" />
                </div>
                <div style={{flex: 3}}>
                  <input onChange={this.handleSearchChange} className="form-control" id="searchContent" type="text" name="searchContent" value={this.state.searchContent} placeholder="Search by Content" />
                </div>
                <div style={{flex: 1}}>
                  <input id="search-submit" className="btn btn-primary" type="submit" name="Search" value="Search" />
                </div>
              </div>
            </form>
          </div>
          <div id="list-wrapper">         
            {tasks.map(function(task, index){
              return(
                <div key={index} className="task-wrapper flex-wrapper">
                  <div onClick={() => self.strikeUnstrike(task)} style={{flex:7}}>
                    {task.completed == false ? (
                      <span>{task.title}</span>
                    ) : (
                      <strike>{task.title}</strike>
                    )}
                  </div>
                  <div style={{flex:1}}>
                    <button onClick={() => self.startEdit(task)} className="btn btn-sm btn-outline-info">Edit</button>
                  </div>
                  <div style={{flex:1}}>
                    <button onClick={() => self.deleteItem(task)} className="btn btn-sm btn-outline-dark delete">-</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
