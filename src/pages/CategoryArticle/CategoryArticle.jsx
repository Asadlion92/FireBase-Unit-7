import React, { useState } from 'react'
import { db } from '../../config/firebaseConfig'
import {getDocs, collection, query, where } from 'firebase/firestore'
import './CategoryArticle.css'
import { useParams } from 'react-router-dom'
import ArticleCard from '../../components/ArticleCard/ArticleCard'

function CategoryArticle() {
  //show articles from a certain category
  //what category? In the url
  const {categoryName} = useParams();

  //create state to hold articles
  const [articles, setArticles] = useState([])

  //get documents for this category when the page loads
  React.useEffect(
    ()=> {
        //create reference to articles collection
        const articleRef = collection(db, 'articles')

        //set up query to filter documents
        //sort and then get the first 5
        const q = query(articleRef, 
            where("category", "==", categoryName))


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
            setArticles(articles)
        })
        .catch(err => console.log(err))
    }, [categoryName] //run anytime category changes
)

  return (
    <div className='category-articles'>
      {

        articles.map(item=><ArticleCard key={item.id} article = {item} />)

        //articles.map((item, index)=><p key={index}>{item?.title}</p>)
        }
    </div>
  )
}

export default CategoryArticle