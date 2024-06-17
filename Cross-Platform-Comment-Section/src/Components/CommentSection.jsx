import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
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
        <div>
            {comments.map((comment) => 
            <div className="comment-bubble" key={comment.id}>
                <span className="commenter">{comment.user}</span>
                {comment.text}
            </div>
            )}
        </div>
    )
}
export default CommentSection