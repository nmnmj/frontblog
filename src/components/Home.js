import React, { useEffect, useState } from 'react'
import {  useCreateblogMutation, useDeleteBlogMutation, useUpdateblogMutation, useUserloginMutation, useUserregisterMutation } from '../services/post'

const Home = () => {
    let [blogs, setBlogs] = useState([])
    let[islogin, setLogin] = useState(false)
    let[description,setDescription]=useState('')
   
    let [userlogin, responseInfo]= useUserloginMutation()
    let[ newblog, responseinfo ] = useCreateblogMutation()
    let[deleteblog, responsein] = useDeleteBlogMutation()
    let[updateblog, responseup] = useUpdateblogMutation()
    let[userregister, responsereg] = useUserregisterMutation()    
    
    useEffect(()=>{                    
        responseInfo.isSuccess && setBlogs(responseInfo.data)
        responseinfo.isSuccess && setBlogs(responseinfo.data)
        responsein.isSuccess && setBlogs(responsein.data)
        responseup.isSuccess && console.log("f",responseup.isSuccess)
        responseup.isSuccess && console.log("f",responseup.data) && setBlogs(responseup.data)
        // console.log("l",responseup.isSuccess)
        
        // console.log("blogs",blogs)
    }, [responseInfo.isSuccess, responseinfo.isSuccess, responsein.isSuccess, responseup.data])

    const formsubmit = async (e)=>{
        e.preventDefault()
        console.log("first")
        let dataa = new FormData(e.currentTarget)
        let adata = {
            name:dataa.get("name"),
            password:dataa.get("password"),
        }
        // console.log(adata)
        await userlogin(adata)
        !responseInfo.isSuccess && setLogin(true)
        !responseInfo.isSuccess ? localStorage.setItem("name", adata.name) : localStorage.setItem("name",'')
    }
    const registersubmit = async (e)=>{
        e.preventDefault()
        let dataa = new FormData(e.currentTarget)
        let adata = {
            name:dataa.get("name"),
            email:dataa.get("email"),
            password:dataa.get("password"),
        }
        await userregister(adata)
    }
    if(responsereg.isLoading) return <div>
        Registering...
    </div>

    let addblog = async (e) =>{
        e.preventDefault()
        let dataa = new FormData(e.currentTarget)
        let adata = {
            name:dataa.get("name"),
            title:dataa.get("title"),
            description: dataa.get("description"),
            category:dataa.get("category")
        }
        await newblog(adata)
        document.getElementById("addblog").reset()
    }    

    let handledelete = async (e) =>{
          e.preventDefault()
          let data = new FormData(e.currentTarget)
          let adata = {
              _id:data.get("_id")
          }
          await deleteblog(adata)
        //   console.log(responsein)
  
      }
      if(responsein.isLoading) return <div>
        Loading...
    </div>
     let handleupdate = async (e)=>{
        e.preventDefault()
        let data = new FormData(e.currentTarget)
        let adata = {
            name:data.get("name"),
            _id:data.get("_id"),
            description:data.get("description")
        }
        console.log(adata)
        await updateblog(adata) 
        document.getElementById("upd").reset()
    }
    if(responseup.isLoading) return <div>
        Updating...
    </div>
        // console.log(responseup.data)
    
  return (
    <div>
        {
            !islogin ?
            <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Login
            </button>
            <button type="button" className="btn btn-primary" style={{float:"right"}} data-bs-toggle="modal" data-bs-target="#exampleModalr">
            Register
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Login</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                    <form onSubmit={formsubmit}>
                <div className="modal-body">
                        <input type="text" name="name" placeholder='enter name*' required />
                        <input type="text" name="password" placeholder='enter password*' required/>
                </div>
                <div className="modal-footer">
                    <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Login</button>
                </div>
                    </form>
                </div>
            </div>
            </div>
            {/* register */}
            <div className="modal fade" id="exampleModalr" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabelr">Register</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                    <form onSubmit={registersubmit}>
                <div className="modal-body">
                        <input type="text" name="name" placeholder='enter name*' required />
                        <input type="email" name="email" placeholder='enter email*' required />
                        <input type="text" name="password" placeholder='enter password*' required/>
                </div>
                <div className="modal-footer">
                    <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Register</button>
                </div>
                    </form>
                </div>
            </div>
            </div>

            </div>
            :
            <>

            {  
                blogs.map((blog, i)=>{
                    return <div key={i}>

                        <form onSubmit={handledelete} style={{float:"right"}}>
                            <button className='btn btn-danger' type="submit">Delete</button>
                            <input type="text" name="_id" value={blog._id} hidden readOnly/>
                        </form>
                        <div>
                            <div className="card">
                                <h5 className="card-header text-center">
                                    <span style={{float:"left", fontSize:"14px"}}>Category:- </span>
                                
                                    <span style={{float:"left", fontSize:"14px"}} readOnly >{blog.category}</span>
                                    <u> 
                                    <span type="text" name="title" readOnly >{blog.title}</span>
                                    </u>
                                    <span style={{float:"right", fontSize:"16px"}} readOnly>By:- {blog.name}</span>
                                </h5>
                                <div className="card-body">
                                    <form id='upd' onSubmit={handleupdate}>
                                        <h3>{blog.description}</h3>
                                        <input type="text" name="_id" value={blog._id} hidden  />
                                        <input type="text" name="name" value={blog.name} hidden  />
                                        <input className='form-control' type="text" name="description" value={description}
                                            onChange={(e)=>{
                                                setDescription(e.target.value)
                                            }}
                                        />
                                        <button className='btn btn-info' type="submit">Update</button>
                                    </form>
                            
                                    <span style={{float:"right", fontSize:"12px"}}>Posted :- {blog.time}</span>
                            
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>

                    
                })
            }
            <form id="addblog" onSubmit={addblog}>
                <h3 style={{textAlign:"center"}}>
                    <u>
                    Add New Blog
                    </u>
                    </h3>
                <input type="text" name="title" placeholder='Title*' required />
                <textarea rows="5" className='form-control' name="description" placeholder='description'></textarea>
                Category :- <select name="category" className='mt-2'>
                    <option>food</option>
                    <option>education</option>
                    <option>business</option>
                    <option>position</option>
                </select>
                <input type="text" name="name" value={localStorage.getItem("name")} hidden /> <br />
                <button className='btn btn-primary mt-3' type="submit">Add Blog</button>
            </form>
            </>
        }
        {
            islogin && 
            <button className='btn btn-danger mt-5' onClick={()=>{
                localStorage.setItem("name",'')
                console.log(localStorage.getItem("name"))
                localStorage.setItem("name",'') ==  "" ? setLogin(true) : setLogin(false)
                console.log(islogin)

            }}>Logout</button>
        }

       
    </div>
  )
}

export default Home