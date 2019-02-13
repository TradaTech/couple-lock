import React, { Component } from 'react';
import axios from 'axios';
import Promises from './Promises';


class SideBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      activeUserId: null,
      user: {},
      r_react: null,
      loginUser: window.getLoginUser(),
      acceptPromises: [],
      deniedPromises: [],
    }
  }

  componentDidMount(){
    const userLogin = window.getLoginUser();
    Promise.all([
      axios.get('/api/user/all'),
      axios.get(`/api/propose/list?username=${userLogin}`)
    ])
    .then(([res1, res2]) =>  {
      this.getUsers(res1.data.data, res2.data.data)
    });
  }

  extractUserInfo = (username, allUser) => {
    return allUser.find((u) => u.username === username);
  }

  getUsers = (allUser, listPropose) => {
    const userLogin = window.getLoginUser();
    const sidebarItems = {};

    listPropose.forEach((p, index) => {
      if (index === 0) {
        this.setState({ activeUserId: p.id });
      }
      if (p.sender === userLogin) {
        sidebarItems[p.receiver] = {
          proposeId: p.id,
          r_react: p.r_react
        }
      } else {
        sidebarItems[p.sender] = {
          proposeId: p.id,
          r_react: p.r_react
        }
      }
      this.setState({
        user: {
          sender: p.sender,
          receiver: p.receiver,
        },
      });
    });

    Object.keys(sidebarItems).forEach((key) => {
      sidebarItems[key].user = allUser.find(u => u.username === key);
    })
    this.setState({sidebarItems});
    this.getUserInfo();
  }

  getUserInfo = () => {
    const obj = this.state.sidebarItems;
    if(obj){
      const res = Object.keys(obj).map(function(key, index) {
        return { 
          proposeId: obj[key].proposeId,
          r_react: obj[key].r_react,
          avatar:  obj[key].user.avatar,
          username:  obj[key].user.username,
          displayName:  obj[key].user.displayName,
        }
      })
      this.setState({ data: res});
      this.getPromises();
    }
  }
  passingProposeId = pId =>{
    this.setState({ activeUserId : pId })
    this.props.proposeIdChanged(pId);
  }

  getPromises = () => {
    const {data} = this.state;
    const {loginUser} = this.state;
    const sender = this.state.user.sender;
    const receiver = this.state.user.receiver;
    data.forEach((key) => {
      if((loginUser === sender || loginUser === receiver) && key.r_react === 1){
        this.state.acceptPromises.push(key);
      }else if(!key.r_react || key.r_react === 2){
        this.state.deniedPromises.push(key);
      }
    })
  }

  render() {
    const {acceptPromises} = this.state;
    return (
      <div className="sidebar">
        <button type="button" className="btn_add_promise"><span className="icon-ic-add"></span>Add Promise</button>
        <h3 className="title title_promise">Accepted promise</h3>
        {
          acceptPromises.length > 0 && acceptPromises.map((item, index) =>{
            const {activeUserId} = this.state;
            const className = (activeUserId === item.proposeId) ? 'sidebar__item activeUser' : 'sidebar__item';
            return(
              <div className={ className } pid={item.proposeId}  key={index} onClick={() => this.passingProposeId(item.proposeId)}>
                <div className="sidebar__item__avatar"><img src={item.avatar} alt="" /></div>
                <div className="sidebar__item__detail">
                <div className="sidebar__item__detail__displayname">{item.displayName}</div>
                <div className="sidebar__item__detail__username">{item.username}</div>
                </div>
              </div>
            )
          })
        }
      <Promises user={this.state.user} deniedPromises={this.state.deniedPromises}/>
      </div>
    );
  }
}

export default SideBar;