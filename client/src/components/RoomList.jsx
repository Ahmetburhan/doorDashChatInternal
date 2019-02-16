import React from 'react';
import moment from 'moment';
import request from 'superagent';


class RoomList extends React.Component {
  constructor() {
    super();

    this.state = {
      inputText: '',
      roomId: 0,
      messages: "",
      selectedRoomId: 0
    };
  }

  handleChangeRoom = (room) => {
    this.setState({ selectedRoomId: room }, () => {
      request
        .get(`http://localhost:8080/api/rooms/${room}/messages`).then(res => {
          if (res.ok) {
            console.log("handleChangeRoom",res.body,room)
            this.props.updateMessages(room, res.body)
          } else {
            console.log('We found nothing')
          }
        })
    })
  }

  render() {
    console.log("props here", this.props)
    console.log("messages", this.state.messages)
    const user = this.props.username;
    console.log("aaaaaa", user)
    console.log("bbbbbb", this.state.selectedRoomId)

    let userName = user[0].toUpperCase() + user.slice(1, user.length);
    let rooms = this.props.rooms;
    return (
      <div>
        <div id="user">{userName}
          <h6 class="timer">Logged in {moment().startOf('hour').fromNow()}</h6></div>
        <div>
          {rooms.map(room => (
            <div
              id="room"
              className={this.state.selectedRoomId === room.id ? 'active-room' : ''}
              onClick={() => this.handleChangeRoom(room.id)}>
              <a>{room.name}</a>
            </div>))}
        </div>
      </div>
    )
  }
}

export default RoomList;
