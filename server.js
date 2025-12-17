const express = require('express')
const cors = require('cors')

// Created application
const app = express()


app.use(cors({origin : ['http://localhost:3000','http://localhost:5173']}))


const users = [
    {id:1,name :'Nitesh',isOnlineStudent : false},
    {id:2,name :'Vivek',isOnlineStudent : true},
    {id:3,name :'Trupti',isOnlineStudent : false},
    {id:4,name :'Sameer',isOnlineStudent : false},
    {id:5,name :'Venkat',isOnlineStudent : true},
    {id:6,name:'sameer',isOnlineStudent : true}

]

// Get request
app.get('/',(req,res)=>{
    console.log('calling root get')
    res.send(`Hey Congraths!, you successfully created your own server`)
})


// Get request with another route
app.get('/users',(req,res)=>{
    res.json({data : ['nitesh','surya','sri hari','sameer'],message : "OK"})
})

// Route params
app.get('/getUserById/:id',(req,res)=>{
    const id = req.params.id

    if(!Number(id)){
        res.json({user:{},message : "Please send valid id"})
    }

    const user = users.find((user)=>user.id === Number(id))

    if(!user){
        res.json({user : {},message : "No user exists with given id"})
    }

    res.json({user , message : 'ok'})


})

// Send html 
app.get('/getHtml',(req,res)=>{
    res.send(`<div> <h1> Hey this is your html </h1> </div>`)
})


// Query Params
app.get('/getUsersByName',(req,res)=>{
    console.log(req.query.name,'console reqest')

    res.send('Api in progress')
})

// Convert string into boolean
function convertStringToBoolean(string){
    if(string === "false"){
        return false
    }else if(string === 'true') {
        return  true
    }else{
        return ''
    }
}

// Get user by name and onlineStatus
app.get('/getUsersByNameAndIsOnlineStudent',(req,res)=>{
    const name = req.query.name
    const isOnlineStudent = convertStringToBoolean(req.query.isOnlineStudent)


    if(!name ){
        res.json({users : [],message : 'Pass valid name'})
    }


    if(typeof isOnlineStudent !== 'boolean'){
        res.json({users:[],message : "Pass valid online status"})
    }

    
    // Name and status both are valid
    const filteredUsers = users.filter((user)=>user.name.toLowerCase() == name.toLowerCase() && user.isOnlineStudent === isOnlineStudent)

    if(filteredUsers.length){
        res.json({users : filteredUsers ,message : "ok"})
    }else{
        res.json({users : [], message : "No user found with this name and online student status"})
    }


})


app.listen(4000, ()=>console.log('Port running on 4000'))