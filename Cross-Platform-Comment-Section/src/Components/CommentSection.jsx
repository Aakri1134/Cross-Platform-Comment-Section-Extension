import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState, useRef } from "react"
import { db } from "../App"
import { where } from "firebase/firestore"

const CommentSection = (props) => {
    const { room } = props
    const [comments, setComments] = useState([])

    useEffect(()=>{
        let messagesRef = collection(db, "comments")
        let queryMessage = query(messagesRef, 
            where("room", "==", room),
            orderBy("createdAt"))
        const unsuscribe = onSnapshot(queryMessage, (snapshot) => {
            let comms = []
            snapshot.forEach((doc) => {
                comms.push({...doc.data(), id: doc.i})
            })
            setComments(comms)
        })
        return () => unsuscribe()
    },[room])
    return (
        <div  className=" flex-1 overflow-y-auto overflow-x-hidden mt-3 mb-3 no-scrollbar">
            {comments.map((comment) => 
            <div className=" border-b-2 border-sky-300/[.55] hover:shadow-md pr-2 pl-2 pb-1 " key={comment.id}>
                <p className="font-mono font-bold text-wrap text-slate-900 pt-2 pl-1 pr-1 ">{comment.user + ": "}</p>
                <p className="text-wrap pl-2 pb-1 pr-1 leading-4 font-semibold text-gray-500">{comment.text}</p>
            </div>
            )}
        </div>
    )
}
export default CommentSection