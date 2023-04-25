import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Allblogs from './Allblogs'
import Home from './Home'
import { useGetblogbycategoryMutation } from '../services/post'
import Card from './Card'

const Navbar = () => {
    let [catblogs, setCatblogs] = useState([])
    let[catblog, responseinfo] = useGetblogbycategoryMutation()
    useEffect(()=>{

    }, [catblogs])
    
  return (
    <div>
       
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">BlogsPoint</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">All Blogs</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" onClick={()=>{
                    setCatblogs([])
                }} to="/home">Home</Link>
                </li>
               
               
            </ul>
            <form className="d-flex" onSubmit={async (e)=>{
                e.preventDefault()
                let dataa = new FormData(e.currentTarget)
                let adata = {
                    category:dataa.get("category")
                }
                // console.log(adata)
                await catblog(adata) 
                console.log(responseinfo)
                setCatblogs(responseinfo.data) 
                console.log(catblogs)
                if(responseinfo.isLoading)
                return <div>
                    Loading...
                </div>
               
            }}>
                {/* <input className="form-control me-2" type="search" name='search' placeholder="Search" aria-label="Search" /> */}
                <select className='me-2' name="category">
                    <option>food</option>
                    <option>education</option>
                    <option>business</option>
                    <option>positions</option>
                </select>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
        </nav>
        {
            Array.isArray(catblogs)  &&
            <div>
                {
                    catblogs.map((blogg, i)=>{
                        return <Card key={i} name={blogg.name} title={blogg.title} 
                        description={blogg.description} category={blogg.category} time={blogg.time} />

                    })
                }
                <hr/>
                <hr style={{color:"red"}}/>
                <hr/>
            </div>
           
        }
        <Routes>
            <Route path="/" element={<Allblogs/>} />
            <Route path="/home" element={<Home/>} />
        </Routes>
    </div>

  )
}

export default Navbar