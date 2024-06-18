import { useEffect, useState } from "react"
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore"
import { db, auuth } from "../App"

const Reply = (props) => {
    const { name, userId, room, isReply } = props
    console.log("userId == ")
    console.log(userId)
    console.log(typeof(userId))
    const [newMessage, setNewMessage] = useState(`@${name}  `)
    const address = isReply? isReply : `comments/${userId}/replies`
    const messagesRef = collection(db, address )

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
                replyTo: userId
            })

            setNewMessage("")
        }
    }



    return(
        <div className=" flex-none bg-orange-400 h-3">
            <form onSubmit={handleSubmit} className="flex flex-row justify-between pl-4">
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
export default Reply