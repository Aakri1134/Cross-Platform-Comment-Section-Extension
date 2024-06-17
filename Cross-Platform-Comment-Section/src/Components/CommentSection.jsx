import { collection, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../App"
import { where } from "firebase/firestore"

const CommentSection = (props) => {
    const { room } = props
    const [comments, setComments] = useState([])

    useEffect(()=>{
        let messagesRef = collection(db, "comments")
        let queryMessage = query(messagesRef, where("room", "==", room))
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
            {comments.map((comment) => <h1>{comment.text}</h1>)}
        </div>
    )
}
export default CommentSection