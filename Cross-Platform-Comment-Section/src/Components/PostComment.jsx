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
                replyTo: ""
            })

            setNewMessage("")
        }
    }

    return (
        <div className=" flex-none h-3">
            <form onSubmit={handleSubmit} className="flex flex-row justify-between">
                <input 
                    className="flex-1"
                    placeholder="Comment here"
                    onChange={(e) => {
                        setNewMessage(e.target.value)
                    }}
                    value={newMessage}
                />
                <button type="submit" className="flex-none rounded-full border-2 w-7 border-red-400 ">Post</button>
            </form>
        </div>
    )
}
export default PostComments