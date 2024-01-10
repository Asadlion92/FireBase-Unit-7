import React, {useState, useEffect} from 'react'
import './Likes.css'
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import { auth } from './../../config/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from './../../config/firebaseConfig';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

function Likes({articleId}) {

    //get user data
    const [user] = useAuthState(auth)

    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)

    useEffect(() => {
        //did the user like this article?
        //need to get hold of the likes collection
        const likesRef = collection(db, "likes")

        //Checking if the user is logged in
        if (user) {
            const q = query(
                likesRef, 
                where("articleId", "==", articleId),
                where("userId", "==", user.uid)
                );

            //looking for a matching document
            getDocs(q, likesRef).then(res => {
                if(res.size > 0) {
                    setIsLiked(true)
                }
            })
        }
    }, [user])

    useEffect(() => {
        const likesRef = collection(db, "likes")
        //now find like count
        //make query to count the likes of this article
        const q2 = query(likesRef, where("articleId", "==", articleId))

        //Look for a matching document
        getDocs(q2, likesRef)
        .then(res => {
            setLikeCount(res.size)
        })
        .catch(err => console.log(err))

    }, [isLiked])

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

    const handleUnlike = () => {
        console.log("UserId", user.uid)
        console.log("ArticleId", articleId)
        if (user) {
            //need to find document with this articleId and userId
            //to get its document id
            const likesRef = collection(db, "likes");

            //set up query to find id of the record to delete
            const q = query(
                likesRef, 
                where("articleId", "==", articleId),
                where("userId", "==", user.uid)
                );
            
                //Get a match
                getDocs(q, likesRef).then(res => {
                    console.log(res.size) //res.size tells us how many articles we got back
                    const likedId = res.docs[0].id;

                    //now delete this doc from likes collection
                    deleteDoc(doc(db, "likes", likedId))
                    .then(res => setIsLiked(false))
                    .catch(err => console.log(err))
                })
        }
    }


  return (
    <div>
        {isLiked? <FaHeart onClick={handleUnlike} /> : <FaRegHeart onClick={handleLike} />}
        <span>{likeCount}</span>
    </div>
  )
}

export default Likes