import React, { useState } from 'react'
import './AddArticle.css'
import { storage, db, auth } from '../../config/firebaseConfig'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import {v4} from 'uuid'


function AddArticle() {
        //get user data
        const [user] = useAuthState(auth)
        // console.log(user)

        //create array for categories
        const categories = ["Health", "Food", "Travel", "Technology"]

        //create state for user data
        const [formData, setFormData] = useState({
            title: "",
            summary: "",
            paragraphOne: "",
            paragraphTwo: "",
            paragraphThree: "",
            category: "",
            image: "",
        })

        const handleSubmit = (e) => {
            e.preventDefault()
            console.log('add', formData)
            //upload image to bucket storage
            //create reference for image
            const imageRef = ref(storage, `images/${formData.image.name + v4()}`)
            //now upload the image
            uploadBytes(imageRef, formData.image)
            .then(res => {
                console.log(res.ref)
                //get url from this ref
                getDownloadURL(res.ref)
                .then(
                    url => {
                        console.log("url is", url)
                        //now I have the user data and the url for image
                        //add document to collection
                        //create a reference to the collection
                        const articleRef = collection(db, 'articles')
                        //use addDoc to add to document
                        addDoc(articleRef, {
                            title: formData.title,
                            summary: formData.summary,
                            paragraphOne: formData.paragraphOne,
                            paragraphTwo: formData.paragraphTwo,
                            paragraphThree: formData.paragraphThree,
                            imageUrl: url,
                            createdBy: user.displayName,
                            userId: user.uid,
                            createdAt: Timestamp.now().toDate()
                        })
                    })
            })
            .then(
                res => {
                    alert('article saved!')
                }
            )
            .catch(err => {
                console.log(err)
            })
        }

  return (
    <form className="add-article-form" onSubmit={handleSubmit}>
        <h2>Create Article</h2>
        <div className="input-group">
            <label htmlFor="title">Title</label>
            <input type="text"  id="title"
                    placeholder="Maximum 100 characters"
                    maxLength="100"
                    onChange={(e)=>setFormData(
                        {...formData, title: e.target.value}
                    )}
                    />
        </div> 
        <div className="input-group">        
            <label htmlFor="summary">Summary</label>
            <textarea id="summary"
                    placeholder="Maximum 120 characters"
                    maxLength="120"
                    onChange={(e)=>setFormData(
                        {...formData, summary: e.target.value}
                    )} />
        </div>    
        <div className="input-group">
            <label htmlFor="paragraphOne">Paragraph One</label>
            <textarea id="paragraphOne" 
                        placeholder="Maximum 650 characters"
                        maxLength="650"
                        onChange={(e)=>setFormData(
                        {...formData, paragraphOne: e.target.value}
                    )} />
        </div>
        <div className="input-group">
            <label htmlFor="paragraphTwo">Paragraph Two</label>
            <textarea id="paragraphTwo"
                        placeholder="Maximum 650 characters"
                        maxLength="650"
                        onChange={(e)=>setFormData(
                        {...formData, paragraphTwo: e.target.value}
                    )} />
        </div>
        <div className="input-group">
            <label htmlFor="paragraphThree">Paragraph Three</label>
            <textarea id="paragraphThree" 
                        placeholder="Maximum 650 characters"
                        maxLength="650"
                        onChange={(e)=>setFormData(
                        {...formData, paragraphThree: e.target.value}
                    )} />
        </div>
        <div className="input-group">
            <label htmlFor="category">Category</label>
            <select id="category" onChange={(e)=>setFormData(
                        {...formData, category: e.target.value}
                    )}>
                <option value="">Select</option>
                {
                    categories.map((item, index)=>
                    <option key={index} value={item}>{item}</option>)
                }
            </select>
        </div>
        <div className="input-group">
            <label>Upload Image</label>
            <input type="file" name="image" accept="image/*" 
                onChange={(e)=>setFormData(
                        {...formData, image: e.target.files[0]}
                    )}>
            </input>
        </div>
        <button type="submit">Submit</button>
    </form>
  )
}

export default AddArticle