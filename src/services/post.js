import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
    reducerPath : 'blogApi',
    baseQuery : fetchBaseQuery({
        baseUrl: "https://blogback-ten.vercel.app/"
    }),

    endpoints : (builder)=>({
        getAllBlog : builder.query({
            query:()=>({
                url:"allblog",
                method : "GET"
            })
        }),
        getblogbycategory : builder.mutation({
            query:(category)=>{
                console.log("category from",category)
                return {
                    url:`category`,
                    method:"POST",
                    body:category
                }
            }
        }),
        deleteBlog : builder.mutation({
            query: (deletedata)=>{
                console.log("deletedata",deletedata)
                return {
                    url:"deleteblog",
                    method:"DELETE",
                    body:deletedata
                }
            }
        }),
        createblog : builder.mutation({
            query: (createblogdata)=>{
                console.log("createblogdata",createblogdata)
                return {
                    url:"createblog",
                    method:"POST",
                    body:createblogdata
                }
            }
        }),
        updateblog : builder.mutation({
            query: (updateblogdata)=>{
                console.log("updateblogdata",updateblogdata)
                return {
                    url:"updateblog",
                    method:"PUT",
                    body:updateblogdata
                }
            }
        }),
        sortedblog : builder.mutation({
            query: ()=>{
                return {
                    url:"sortedblog",
                    method:"POST",
                }
            }
        }),
        userregister : builder.mutation({
            query : (registerdata)=>{
                return {
                    url: "register",
                    method:"POST",
                    body:registerdata
                }
            }
        }),
        userlogin : builder.mutation({
            query: (user)=>{
                console.log("user",user)
                return {
                    url:"login",
                    method:"POST",
                    body:{
                        "name":user.name,
                        "password":user.password
                    }
                }
            }
        })
    })
})

export const { useGetblogbycategoryMutation , useSortedblogMutation, useUpdateblogMutation, useUserregisterMutation , useGetblogbynameQuery, useGetAllBlogQuery, useDeleteBlogMutation, useUserloginMutation, useCreateblogMutation } = blogApi