import React, { Component } from 'react'
import ReactCircleModal from 'react-circle-modal'
import uploadBtn from "../../images/upload.png";
import axios from 'axios';
import Loader from 'react-loader-spinner';
import firebase from "firebase";

// Required for side-effects
require("firebase/firestore");

// Setting Firebase
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAMrpDyNKZGKEUJ8Qv-KUvpzxcSxV4bQ8M",
    authDomain: "qigatask.firebaseapp.com",
    projectId: "qigatask",
    storageBucket: "qigatask.appspot.com",
  });
} else {
  firebase.app(); // if already initialized, use that one
}
var storage = firebase.storage();

// Function for uuid creation
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        // eslint-disable-next-line 
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

export default class SharePostModal extends Component {

    constructor(props){
        super(props)
        this.state = {
            selectedImg: "",
            loading:0
        }
    }

    descListener = (event) => {
        this.desc = event.target.value
    }

    sharePost = () => {
      /*  */
        if(this.file){
            this.setState({
              loading: 1
            })

            let storageRef = storage.ref().child("posts").child(uuidv4())

            storageRef.put(this.file).then((snapshot)=> {
                snapshot.ref.getDownloadURL().then((url)=>{
                    this.setState({
                        selectedImg: url
                    })

                    let bundle = {
                        userName: "Emre Akın",
                        userId: uuidv4(),
                        timestamp: null,
                        photoUrl: url,
                        postId: uuidv4()
                    }

                    axios.post("http://localhost:8080/api/posts/new", bundle).then((response)=>  {
                        alert("Başarılı");
                        this.setState({
                          loading: 0
                        })
                        window.location.reload();
                        
                    }).catch((err)=> {
                        // alert("Bir hata meydana geldi: "+ err)
                    })
                })
            })
        }
    }

    photoInputHandler = (event) => {
        this.file = event.target.files[0]
    }

    render() {
      let button
      if(this.state.loading===0){
        button = <button className="sharePostShareButton" onClick={this.sharePost} >Share</button>
      }else{
        button = <Loader type="Grid" color="#2fb3e1" width="40px" height="40px"/>
      }
        return (
            <ReactCircleModal
              backgroundColor="#2fb3e1"
              toogleComponent={onClick => (
                <img src={uploadBtn} id="btn-upload" onClick={onClick} />
              )}
              // Optional fields and their default values
              offsetX={0}
              offsetY={0}
            >
              {(onClick) => (
                <div style={{ backgroundColor: '#fff', padding: '1em', textAlign:'center', borderRadius:"5px", width:"50%", margin:"auto"}}>
                  <div >
                    <div className="sharePostCard">
                        <div className="sharePostText">Share Post</div>
                        <div className="sharePostInputs">
                            <input type="file" placeholder="Photo" className="shareFileInput" onChange={this.photoInputHandler}/>
                            <br/>
                            <input type="text" placeholder="Description" className="shareTextInput" onChange={this.descListener}/>
                        </div>
                        <div className="sharePostImgDiv">
                            <img src={this.state.selectedImg} className="sharePostImg" width="150px" height="150px" alt=""/>
                        </div>
                        <div style={{textAlign:'center'}}>
                          {button}
                            {/*<button className="sharePostShareButton" onClick={this.sharePost} >Share</button>
                            <Loader type="Grid" color="#2fb3e1" width="40px" height="40px"/>*/}
                        </div>
                    </div>
                  </div>
                  <button onClick={onClick} >
                    Close
                  </button>
                </div>
              )}
            </ReactCircleModal>
          )
    }
}
