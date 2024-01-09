import React, {useState} from 'react'
import './Likes.css'
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import { auth } from './../../config/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from './../../config/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

function Likes({articleId}) {

    //get user data
    const [user] = useAuthState(auth)

    const [isLiked, setIsLiked] = useState(false)

    const handleLike = () => {
        if(user) {
            const likesRef = collection(db, "likes")

            addDoc(likesRef, {
                userId: user?.uid,
                articleId: articleId
            }).then(res => setIsLiked(true))
            .catch(err => console.log(err))
        }
    }


  return (
    <div>{isLiked? <FaHeart /> : <FaRegHeart onClick={handleLike} />}</div>
  )
}

export default Likes