import React, { useEffect, useState } from 'react'
import { useGetAllBlogQuery, useSortedblogMutation } from '../services/post'
import Card from './Card'

const Allblogs = () => {
    let[blogs, setBlogs] = useState([])
    let {data, isLoading} = useGetAllBlogQuery()
    let[sortedblog, responsesort] = useSortedblogMutation()

    useEffect(()=>{
      setBlogs(data)

    },[blogs])

    console.log("all",blogs)
  
    if(isLoading) return <div> Loading ... </div>

  return (
    <div className='mt-3'>
      <button onClick={async(e)=>{
        e.preventDefault()
        await sortedblog()
        
        responsesort.isSuccess && setBlogs(responsesort.data)
        // console.log("sorted",responsesort.data)
        
      }}>Sort by Date</button>
        {
            Array.isArray(blogs) && blogs.map((blog, i)=>{
                return <>
                <Card key={i} name={blog.name} title={blog.title} description={blog.description} category={blog.category} time={blog.time} />
                
                </>
            })
        }
        
    </div>
  )
}

export default Allblogs