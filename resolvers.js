import {quotes, users} from './fakedb.js'
import {randomBytes} from 'crypto'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

//import { isErrored } from 'stream'

const User = mongoose.model("User")
const Quote = mongoose.model("Quote")

const resolvers = {
    Query:{
        users: async()=> await User.find({}),
        user:async(_,{_id} )=>  await User.findOne({_id}),
        // users.find((user)=>{
        //    return user._id == args._id
        // }),
        quotes: async() => await Quote.find({}).populate("by", "_id, firstName"),
        iquote: async(_, {by})=> await Quote.find({by}), 
        // quotes.filter((q)=>{
        //     return q.by == args.by
        // })
        myprofile: async(_,args,{userId})=>{
            if(!userId) throw new Error("You must be logged in")
              
            return  await User.findOne({_id:userId})
            
        } 
    },
    User:{
        quotes:async(user)=> await Quote.find({by: user._id})
        // quotes.filter((q)=>{
        //    return q.by == user._id
        // }) 
    },
    Mutation: {
        signupUser: async(_, {userNew}) =>{
              const user =  await User.findOne({email: userNew.email})
              if(user){
                  throw new Error("User already exists with this email")
              }
              const hashedPassword= await bcrypt.hash(userNew.password,12)

              const newUser = new User({
                  ...userNew,
                  password:hashedPassword
              })

            return  await newUser.save()
        },
        signinUser: async(_, {userSignin}) =>{
            console.log("yessq")
           const user = await User.findOne({email:userSignin.email})
            if(!user){
                throw new Error("User doen't esist with that email")
            }
            console.log("yess2")
            const doMatch = await bcrypt.compare(userSignin.password, user.password)
            if(!doMatch){
                throw new Error("Email or password is invalid")
            }
            const token = jwt.sign({userId: user._id }, process.env.JWT_SECRET)
            return {token}
      },
      createQuote: async(_, {name}, {userId}) =>{
        //
           if(!userId) throw new Error("You must be logged in")
           const newQuote= new Quote({
               name,
               by: userId
           })
           await newQuote.save()
           return "Quote saved sucessfully"
      }


        // signupUserDummy:(_, {userNew})=>{
        //     const _id = randomBytes(5).toString("hex")
        //     users.push({
        //         _id,
        //         ...userNew
        //     })
        //      console.log(users)
        //     return users.find(user => user._id == _id)
        // }
    }
}


export default resolvers