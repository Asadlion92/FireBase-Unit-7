import React, { useState } from 'react'
import './Banner.css'
import { db } from '../../config/firebaseConfig'
import {getDocs, collection, query, orderBy, limit } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

function Banner() {

    let navigate = useNavigate()

    //Create state for main article and other articles
    const [mainArticle, setMainArticle] = useState('')
    const [otherArticles, setOtherArticles] = useState([])


    //When this page loads, get top 5 articles from db and display
    React.useEffect(
        ()=> {
            //create reference to articles collection
            const articleRef = collection(db, 'articles')

            //set up query to filter documents
            //sort and then get the first 5
            const q = query(articleRef, 
                orderBy("createdAt", "asc"), limit(7))


            //get documents from this collection
            getDocs(q, articleRef)
            .then( res => {
                // console.log(res.docs[0].data())
                const articles = res.docs.map(item => (
                    {id:item.id,
                    ...item.data()
                }
                ))
                console.log(articles)
                //I have data, what do I do with it?
                //put first one in mainArticle
                setMainArticle(articles[0])
                //put the rest in otherArticles
                setOtherArticles(articles.splice(1))
            })
            .catch(err => console.log(err))
        }, [] //run once when page loads
    )


  return (
    <div className='banner-container'>
        <div className='main-article-container' 
            onClick={()=>navigate(`/article/${mainArticle?.id}`)}
            style={{backgroundImage:`url(${mainArticle?.imageUrl})`}}>
            <div className='banner-info'>
                <h2>{mainArticle?.title}</h2>
                <small>{mainArticle?.createdAt?.toDate().toDateString()}</small>
            </div>
        </div>
        <div className='other-articles-container'>
            {
                otherArticles?.map((item, index)=>
                <div className='other-article-item' key={index} 
                    onClick={()=>navigate(`/article/${item?.id}`)}
                    style={{backgroundImage:`url(${item?.imageUrl})`}}>
                    <div className='banner-info'>
                        <h3>{item?.title}</h3>
                        <small>{item?.createdAt?.toDate().toDateString()}</small>
                    </div>
                </div>
                )
            }
        </div>
    </div>
  )
}

export default Banner