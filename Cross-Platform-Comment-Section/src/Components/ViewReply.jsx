import { useEffect, useState } from "react"
import { collection, query, where, orderBy } from "firebase/firestore"
import { db } from "../App"
import { onSnapshot } from "firebase/firestore"
import Reply from "./Reply"
import ReplyBubble from "./ReplyBubble"
import Loading from "./Loading"


const ViewReply = (props) => {
    const {comment, room} = props
    const [replies, setReplies] = useState([])
    const [isReplying, setIsReplying] = useState(false)
    const [loading, setLoading] = useState(true)
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
            setLoading(false)
        })
        return () => unsuscribe()
    },[room])
    
    if (loading) {
        return (
          <div className="flex flex-col h-20 w-full justify-center items-center bg-gray-50 dark:bg-gray-900">
            <Loading />
          </div>
        );
      }

    return(
        <div  className=" flex-1 overflow-x-hidden mt-1 mb-3 ml-4 no-scrollbar">
            {replies.map((comment) =>
                <ReplyBubble comment = {comment} address = {address} room = {room}/>
            )}
        </div>
    )
} 
export default ViewReply