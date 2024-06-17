import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import CommentSection from "./Components/CommentSection";
import Title from "./Components/Title";
import PostComments from "./Components/PostComment";
import SignIn from "./Components/SignIn";
import { firebaseConfig } from "./constants/credentials";
import { useEffect, useState } from "react";
import { getFirestore } from 'firebase/firestore'

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auuth = getAuth(app)

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [room, setRoom] = useState("")

  //functions
  const getRoomId = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].url.includes("youtube.com/watch")) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => {
            const titleElement = document.querySelector(
              "h1.style-scope.ytd-watch-metadata>yt-formatted-string.style-scope.ytd-watch-metadata"
            );
            return titleElement ? titleElement.innerText : "";
          },
        }).then(([result]) => {
          setRoom(result.result || "");
        });
      }else if(tabs[0].url.includes("netflix.com/watch")){
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
              const titleElement = document.querySelector(
                "div.medium.default-ltr-cache-m1ta4i>h4"
              );
              return titleElement ? titleElement.innerText : "";
            },
          }).then(([result]) => {
            setRoom(result.result || "");
          });
      }
    });
  }
  useEffect(()=>{
    getRoomId()
  },[])

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    chrome.tabs.onUpdated.addListener( (tabId, info, tab)=>{
      getRoomId()
  })
  chrome.tabs.onActivated.addListener((a)=>{
    getRoomId()
  })
    return (
      <>
        <Title room = {room}/>
        <CommentSection room = {room}/>
        <PostComments room = {room}/>
        <button onClick={() => {auth.signOut()}}>Escape The Matrix</button>
      </>
    );
  }
  return <SignIn/>;
}

export default App;
