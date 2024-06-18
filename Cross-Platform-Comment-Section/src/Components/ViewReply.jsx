import { useEffect, useState } from "react"
import { collection, query, where, orderBy } from "firebase/firestore"
import { db } from "../App"
import { onSnapshot } from "firebase/firestore"
import Reply from "./Reply"


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
                <div className=" border-b-2 border-sky-300/[.55] hover:shadow-md pr-2 pl-2 pb-1 " key={comment.id}>
                    <p>{comment.id}</p>
                    <p className="font-mono font-bold text-wrap text-slate-900 pt-2 pl-1 pr-1 ">{comment.user + ": "}</p>
                    <p className="text-wrap pl-2 pb-1 pr-1 leading-4 font-semibold text-gray-500">{comment.text}</p>
                    <Reply name = {comment.user} userId = {comment.id} room = {room} isReply ={address}/>
                </div>
            )}
        </div>
    )
} 
export default ViewReply