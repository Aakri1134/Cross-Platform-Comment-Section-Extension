import { useEffect, useState } from "react"
import { collection, query, where, orderBy } from "firebase/firestore"
import { db } from "../App"
import { onSnapshot } from "firebase/firestore"
import Reply from "./Reply"
import ReplyBubble from "./ReplyBubble"


const ViewReply = (props) => {
    const {comment, room} = props
    const [replies, setReplies] = useState([])
    const [isReplying, setIsReplying] = useState(false)
    let address = `comments/${comment.id}/replies`
    

    useEffect(()=>{
        let addresss = `comments/${comment.id}/replies`
        let messagesRef = collection(db, addresss)
        let queryMessage = query(messagesRef, 
            where("room", "==", room),
            orderBy("createdAt"))
        const unsuscribe = onSnapshot(queryMessage, (snapshot) => {
            let reps = []
            snapshot.forEach((doc) => {
                reps.push({...doc.data(), id: doc.id})
            })
            setReplies(reps)
        })
        return () => unsuscribe()
    },[room])

    return(
        <div  className=" flex-1 overflow-x-hidden mt-1 mb-3 ml-4 no-scrollbar">
            {replies.map((comment) =>
                <ReplyBubble comment = {comment} address = {address} room = {room}/>
            )}
        </div>
    )
} 
export default ViewReply