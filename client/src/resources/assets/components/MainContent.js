// import React, { Component } from 'react';
// import BannerImage from './propose/BannerImage';
// import MemoryPost from './memory/MemoryPost';
// import DialogueChat from './memory/DialogueChat';
// import RecentChat from './propose/RecentChat';
// import axios from 'axios';

// class MainContent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       leftUser: [],
//       rightUser: [],
//       proposeList: {},
//       memory: [],
//       userName: [],
//     }
//   }

//   componentDidMount() {
//     axios.get('/api/propose/details?id=1')
//     .then(propose => {
//       this.getUsers(propose.data.data.sender, propose.data.data.receiver);
//       this.setState({ proposeList: propose.data.data });
//     })
//   }

//   getUsers = (sender, receiver) => {
//     const p1 = axios.get("/api/user/details?username=" + sender);
//     const p2 = axios.get("/api/user/details?username=" + receiver);
//     Promise.all([p1, p2])
//     .then(([u1, u2]) => {
//       const currentUser = window.getLoginUser();
//       this.setState({
//         leftUser: (currentUser === u1.data.data.username) ? u1.data.data : u2.data.data,
//         rightUser: (currentUser !== u1.data.data.username) ? u1.data.data : u2.data.data,
//       });
//     });
//   }

  
//   render() {
//     return (
//       <div id="main">
//         <div className="main__container">
//           <div className="main__container-top w-960 mg-auto">
//             <BannerImage mes={this.state.proposeList} sender={this.state.leftUser} receiver={this.state.rightUser}/>
//             <RecentChat mes={this.state.proposeList} sender={this.state.leftUser} receiver={this.state.rightUser}/>
//           </div>
//           <div className="main__container-center w-960 mg-auto">
//             <MemoryPost sender={this.state.leftUser} receiver={this.state.rightUser}/>
//             <DialogueChat sender={this.state.leftUser} receiver={this.state.rightUser}/>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default MainContent;