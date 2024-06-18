import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState, useRef } from "react"
import { db } from "../App"
import { where } from "firebase/firestore"
import Comment from "./Comment"

const CommentSection = (props) => {
    const { room } = props
    const [comments, setComments] = useState([])

    useEffect(()=>{
        let messagesRef = collection(db, "comments")
        let queryMessage = query(messagesRef, 
            where("room", "==", room),
            orderBy("createdAt", "desc"))
        const unsuscribe = onSnapshot(queryMessage, (snapshot) => {
            let comms = []
            snapshot.forEach((doc) => {
                comms.push({...doc.data(), id: doc.id})
            })
            setComments(comms)
        })
        return () => unsuscribe()
    },[room])
    return (
        <div  className=" flex-1 overflow-y-auto overflow-x-hidden mt-3 mb-3 no-scrollbar">
            {comments.map((comment) => {
                console.log(comment)
                console.log("in Comment Sectio")
                return (<Comment comment = {comment} room = {room}/>)}
            )}
        </div>
    )
}
export default CommentSection