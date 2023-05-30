import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Forum.css";

class Forum extends React.Component {
  componentDidMount() {
    const savedChat = localStorage.getItem("chat");
    if (savedChat) {
      document.querySelector(".forum-box .inner").innerHTML = savedChat;
    }
  }

  updateChatStorage = (chat) => {
    const savedChat = localStorage.getItem("chat");
    const newChat = savedChat ? savedChat + chat : chat;
    localStorage.setItem("chat", newChat);
  };

  handleWhoSubmit = () => {
    let msg = document.getElementById("messageWho").value;
    let who = document.getElementById("who").value;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    if (msg !== "" && who !== "") {
      let chat = `<p className="message" style="background: #dde0e5; padding: 5px 5px;"><b>${who} <span style="color: grey; font-size: 12px; font-style: italic;">at ${formattedDate}</span></b><br>${msg}</p>`;
      document.querySelector(".forum-box .inner").innerHTML += chat;
      document.getElementById("messageWho").value = "";
      document.querySelector(".forum-box .inner").scrollTop = document.querySelector(
        ".forum-box .inner"
      ).scrollHeight;

      this.updateChatStorage(chat);
    }
  };

  handleWhoKeyUp = (key) => {
    if (key.keyCode === 13) {
      let msg = document.getElementById("messageWho").value;
      let who = document.getElementById("who").value;
      if (msg !== "" && who !== "") {
        let chat = `<p className="message" style="background: #dde0e5; padding: 5px 5px;"><b>${who}</b><br>${msg}</p>`;
        document.querySelector(".forum-box .inner").innerHTML += chat;
        document.getElementById("messageWho").value = "";
        document.querySelector(
          ".forum-box .inner"
        ).scrollTop = document.querySelector(".forum-box .inner").scrollHeight;

        this.updateChatStorage(chat);
      }
    }
  };

  render() {
    return (
      <div className="forum-bg">
        <div className="container">
          <h2 className="forum-title">We're happy to hear more about your opinion!</h2>
          <div className="forum-box">
            <div className="inner"></div>
          </div>
          <div id="msg">
            <div className="input-box row">
              <hr />
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="who"
                    placeholder="Insert your name here"
                    aria-label="Insert name here"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Discussion</label>
                  <textarea
                    className="form-control"
                    id="messageWho"
                    rows="3"
                    placeholder="Tell us everything you got to say here.."
                  />
                </div>
                <div className="mb-3 d-grid gap-2 col-3 mx-auto">
                  <button
                    type="submit"
                    id="btnWho"
                    className="btn btn-primary"
                    onClick={this.handleWhoSubmit}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Forum;
