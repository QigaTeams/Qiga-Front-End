import React, { Component } from "react";
import axios from "axios";
import "../../css/global.css";
import "../../css/posts.css";
import pp from "../../images/pp_1.png"

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postDatas: [],
      tags: []
    };
  }

  componentDidMount = () => {
    /* Getting post datas from api */
    let data;
    axios
      .get("http://localhost:8080/api/posts")
      .then((resp) => {
        data = resp.data;
        this.setState({
          postDatas: data,
        });
      })
      .catch((err) => {
        alert(err);
      });
    /* Getting all the users that sign upped from api */
    let users;
    axios
      .get("http://localhost:8080/api/auth/users")
      .then((resp) => {
        users = resp.data;
        this.setState({
          usersData: users,
        });
        console.log(users);
      })
      .catch((err) => {
        alert(err);
      });

    /* Getting all the tags from api */
    let tags;
    axios
      .get("http://localhost:8080/api/tags/")
      .then((resp) => {
        tags = resp.data;
        this.setState({
          tags: tags,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  render() {
    if(this.state.usersData && this.state.tags){
      return (
        <div class="posts-wrapper">
          {this.state.postDatas.map((data) => {
            return (
              <div key={data.photoUrl}>
                <div class="user-info-wrapper">
                  <img
                    src={
                      pp
                    }
                    id="pp-post"
                    alt="Profile Image"
                    style={{ borderRadius: "5px" }}
                  />
                  <p id="status-user-name" class="status">
                    {data.userName}
                  </p>
                </div>
                <div class="post-image">
                  <img src={data.photoUrl} id="post-image" alt="Post Image" 
                  onClick = { () => {
                    /* Filtering the tag list by postId of selected post */
                    let filteredTagList = []
                    for (let index = 0; index < this.state.tags.length; index++) {
                      if(this.state.tags[index].postId === data.postId){
                        filteredTagList.push(this.state.tags[index])
                      }
                    }
                    let text = ""
                    for (let index = 0; index < filteredTagList.length; index++) {
                      text = text + " " + filteredTagList[index].userName
                    }
                    text = text + " tagged in this post"
                    if(filteredTagList.length === 0){
                      text = "No one tagged in this photo."
                    }
                    alert(text)
                  }}
                  />
                </div>
                <div class="options-wrapper">
                  <div class="actions">
                    <ul class="action-icons">
                      <li class="action-icon">
                        <i class="far fa-heart"></i>
                      </li>
                      <li class="action-icon">
                        <i class="far fa-comment"></i>
                      </li>
                      <li class="action-icon">
                        <i class="fas fa-share"></i>
                      </li>
                      <li class="action-icon">
                        <i class="far fa-bookmark"></i>
                      </li>
                    </ul>
                  </div>
                  <div class="texts">
                    <p id="option-user-name" class="status">
                      User Name
                    </p>
                    <p id="description">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s
                    </p>
                  </div>
                  <div className="comment-wrapper">
                    <input
                      type="text"
                      list="usernames"
                      id="comment-input"
                      placeholder="Tag a Friends"
                    />
                    <datalist id="usernames">
                      {
                      this.state.usersData.map((data)=> {
                        return (<option value={"@" + data.userName} ></option>)
                      })}
                    </datalist>
                    <button onClick={function() {
                      /* Controlling the input and posting tag request if input isn't empty */
                      let input = document.getElementById("comment-input");
                      const value = input.value;
                      if(value.charAt(0) !== "" ){
                        let bundle = {
                          userId: "randomuuid",
                          userName: input.value,
                          postId: data.postId
                        }
                        /* Posting tag to api */
                        axios.post("http://localhost:8080/api/tags/save", bundle).then((response)=> {
                          alert(`${value} Ki??isi g??nderine Etiketlendi!`)
                          window.location.reload();
                        }).catch((err)=>{
                            alert("Bir hata meydana geldi: "+err)
                        })
                      }
                      else{
                        alert("Bo?? B??rakma")
                      }
                    }} id="tag-button">
                      <i class="fas fa-chevron-right" id="tag-send-button"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }else{
      return (
        <div class="posts-wrapper">
          {this.state.postDatas.map((data) => {
            return (
              <div key={data.photoUrl}>
                <div class="user-info-wrapper">
                  <img
                    src={
                      pp
                    }
                    id="pp-post"
                    alt="Profile Image"
                    style={{ borderRadius: "100px" }}
                  />
                  <p id="status-user-name" class="status">
                    {data.userName}
                  </p>
                </div>
                <div class="post-image">
                  <img src={data.photoUrl} id="post-image" alt="Post Image" />
                </div>
                <div class="options-wrapper">
                  <div class="actions">
                    <ul class="action-icons">
                      <li class="action-icon">
                        <i class="far fa-heart"></i>
                      </li>
                      <li class="action-icon">
                        <i class="far fa-comment"></i>
                      </li>
                      <li class="action-icon">
                        <i class="fas fa-share"></i>
                      </li>
                      <li class="action-icon">
                        <i class="far fa-bookmark"></i>
                      </li>
                    </ul>
                  </div>
                  <div class="texts">
                    <p id="option-user-name" class="status">
                      User Name
                    </p>
                    <p id="description">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s
                    </p>
                  </div>
                  <div className="comment-wrapper">
                    <input
                      type="text"
                      list="usernames"
                      id="comment-input"
                      placeholder="Tag a Friends"
                    />
                    
                    <button onClick={this.addTag} id="tag-button">
                      <i class="fas fa-chevron-right" id="tag-send-button"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    
  }
}
