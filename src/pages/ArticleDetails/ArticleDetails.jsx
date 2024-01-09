import React, {useEffect, useState} from 'react'
import './ArticleDetails.css'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'
import Likes from '../../components/Likes/Likes'

function ArticleDetails() {

    const {articleId} = useParams()

    const [article, setArticle] = useState({})

    useEffect(()=>{
        //set up reference to single document
        const docRef = doc(db, "articles", articleId)
        getDoc(docRef)
            .then(res => {
            console.log(res.data())
            setArticle(res.data())
            })
            .catch(err => console.log(err))
    }, [])

  return (
    <div className='details-container'>
        <h1>{article?.title}</h1>
        <h2>{article?.summary}</h2>
        <div className="details-info-container">
            <p><span className="article-span">Category: </span>{article?.category?.toUpperCase()}</p>
            <p><span className="article-span">Author: </span>{article?.createdBy?.toUpperCase()}</p>
            <p><span className="article-span published">Published: </span>{article?.createdAt?.toDate().toDateString()}</p>
            <Likes articleId = {articleId} />
        </div>
        <div className="details content">
            <img src={article?.imageUrl} className="details-img" />
            <p className="article-description">{article.paragraphOne}</p>
            <p className="article-description">{article.paragraphTwo}</p>
            <p className="article-description">{article.paragraphThree}</p>
        </div>
    </div>
  )
}

export default ArticleDetails