import { useEffect, useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db, auuth } from "../App"

const PostComments = (props) => {
    const [newMessage, setNewMessage] = useState("")
    const messagesRef = collection(db, "comments")
    const { room } = props
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("New Message Uploaded")
        console.log(newMessage)
        if (newMessage === ""){
            return;
        }else{
            await addDoc(messagesRef,{
                text : newMessage,
                createdAt : serverTimestamp(),
                user : auuth.currentUser.displayName,
                room: room,
            })
            setNewMessage("")
        }
    }

useEffect(() => {
    console.log(newMessage)
    
}, [newMessage])
    return (
        <>
            <form onSubmit={handleSubmit} className="new-comment-form">
                <input 
                    className="new-comment-input"
                    placeholder="Comment here"
                    onChange={(e) => {
                        setNewMessage(e.target.value)
                    }}
                    value={newMessage}
                />
                <button type="submit" className="send-button">Post</button>
            </form>
        </>
    )
}
export default PostComments