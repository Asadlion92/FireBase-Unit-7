import React, {useState, useEffect} from 'react'
import './Comments.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../config/firebaseConfig'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore'

function Comments({articleId}) {

    const [user] = useAuthState(auth)
    const [newComment, setNewComment] = useState('')
    const [comments, setComments] = useState([])

    useEffect(() => {
        const commentsRef = collection(db, "comments")

        //get the comments
        // getDocs(commentsRef).then((res) => {
        //     //convert to array
        //     const commentsArr = res.docs.map((item) => ({
        //         id: item.id,
        //         ...item.data(),
        //     }))
        //     setComments(commentsArr)
        // })

        const q = query(commentsRef, where("articleId", "==", articleId))
        
        onSnapshot(q, (snapshot) => {
            //convert to array
            const commentsArr = snapshot.docs.map((item) => ({
                id: item.id,
                ...item.data(),
            }))
            setComments(commentsArr)
        })

    }, [])

    const addNewComment = (e) => {
        e.preventDefault();
        console.log(newComment)

        //Need to make a new document in the comments collection
        //including the newComment, the articleId, and the userId
        //create a reference to the comments collection
        //will create the collection if doesn't exist
        const commentsRef = collection(db, "comments")

        //adding a document with this articleId and userId
        addDoc(commentsRef, {
            userId: user?.uid, //we got the user from the user variable above
            articleId: articleId, //we got this from passing it into the props above in Comments
            content: newComment,
            username: user?.displayName // we can get this from the user
        }).then(res => {
            alert("Comment added")
            setNewComment("") //After the comment is created, we set the comment back to an empty string
        }).catch(err => console.log(err))
    }
  
    const deleteComment = (id) => {
        console.log(id)
        
        //delete the particular document
        deleteDoc(doc(db, "comments", id))
        .then(res => {alert("Comment deleted")})
        .catch(err => console.log(err))
    }

    return (
    <div>
    <div className="comments-container">
        {//Below we map the comments into seperate divs after creating them
            comments.map(item => <div key={item.id} className='comment'>
                <p><span>{item.username}</span>{item.content}</p>
                {
                    //Each comment has a uid
                    //Compare to see if the user can delete the comment
                    user?.uid === item.userId && <button onClick={()=>deleteComment(item.id)}>Delete</button>
                }
            </div>)
        }
    </div>
        {user?
            <form onSubmit={addNewComment}>
                <input 
                    type="text" 
                    placeholder='Add comment'
                    onChange={(e)=> setNewComment(e.target.value)}
                    value={newComment}
                     />
            </form>
            :
            <p>Please login to comment</p>
        }
    </div>
  )
}

export default Comments