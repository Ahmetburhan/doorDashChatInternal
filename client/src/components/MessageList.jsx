import React from 'react';
import request from 'superagent';


class MessageList extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      inputText: '',
      roomId: 0,
      messages: "",
    };
  }
  componentDidMount(){
   
  }
 
  handleChange(event) {
    // console.log("target value", event.target.value)
    this.setState({ inputText: event.target.value });
    
  }

  handleClick = (e) => {
    e.preventDefault();

    request
      .post(`http://localhost:8080/api/rooms/${this.props.selectedRoomId}/messages`)
      .send({
        name: this.props.username,
        message: this.state.inputText,
      })
      .then(res => {
        if (res.ok) {
          // console.log(res.body)
          this.setState({
            rooms: res.body,
          })
          request
            .get(`http://localhost:8080/api/rooms/${this.props.selectedRoomId}/messages`).then(res => {
              if (res.ok) {
                console.log("messages updates",res.body)
                console.log(res.body[0])
                this.setState({
                  messages: res.body,
                })
              } else {
                console.log('We found nothing')
              }
            })
         
  
        } else {
          console.log('We found nothing')
        }
      })
      .catch(err => {
        this.setState({
          loading: false
        })
      })
    
      
    
  }

  render() {
    // console.log("aaaaahaaatimeeee",this.props)
    let messages = this.state.messages || this.props.messages ;

    console.log("here is messages", messages)
    return (
      <div className="App-header">
        <div className="msgContainer">

        {messages.map(message => (<div><p className="speech-bubble"> {message.message} </p>
          <a id="chatAuthor">{message.name}</a></div>
         ))}
        <div> You typed {this.state.inputText} </div>
        </div>
          <div id="chatbox">
        <input onChange={this.handleChange} class="form-control form-control-lg" type="text" placeholder="Type a message..." value={this.state.inputText} />
        <button type="button" class="btn btn-link btn-lg" onClick={this.handleClick} > Send </button>
      </div>
      </div>
    )
  }
}

export default MessageList;
