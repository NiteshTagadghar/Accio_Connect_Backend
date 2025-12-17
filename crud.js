const express = require('express')
const cors = require('cors')

const app = express()

const PORT = 3000
const domain = `http://localhost:${PORT}`

let students = [
    { id: 1, name: 'Divyansh', phoneNumber: 7704066235 },
    { id: 2, name: 'Vivek', phoneNumber: 9876543210 }
]


app.use(express.json())
app.use(cors())



app.use((req,res,next)=>{

    res.success = (statusCode,message, data=null)=>{
        res.status(statusCode).json({success : true,data : {data}, message})
    }

    res.err = (statusCode,message,data=null)=>{
        res.status(statusCode).json({
            success:false,
            data : {data},
            message
        })
    }

    next()
})

// Logging
app.use((req,res,next)=>{
    console.log(`Hey see you got a request for this api ${domain+req.path}`)
    next()
})


// Get all students
app.get('/students', (req, res,next) => {
    
    // Imaginary database calling
    try{
        const studentsFromDatabase = students

        if(!studentsFromDatabase){
            // Dont pass 500 pass appropriate status code
            next({statusCode : 500,message : 'No students in databse '})
            return
        }
        res.success(200,'ok',studentsFromDatabase)

    }catch(err){
        next({statusCode : 500,message : 'Error while fetching from databse'})
    }


    res.success(200,'ok',students)
})



// Get stduent by id - Implement error handling and pass appropriate status codes
app.get('/student/:id',(req,res)=>{
    const id = req.params.id

    const student = students.find((student)=>student.id === Number(id))

    res.success(200,'ok',student)

    // res.status(200).json({success : true,student})
})
 

// Api to create new record
app.post('/createNewStudent',(req,res,next)=>{
    console.log('calling api')
    const newStudentData = req.body

    try{
        students.push(newStudentData)
        res.success(201,'ok',students)
    }catch(err){
        next({statusCode : 500, message : err.message})
    }

    console.log(req.body,'req.body data')
})

// Update record using put
app.put('/updateStudent',(req,res,next)=>{
    const body = req.body

    try{
        
         students =  students.map((student)=>{
            if(student.id===Number(body.id)){
               return  body
            }
            return student
         })

         res.success(200,'ok',students)
        
        
    }catch(err){
        next({})
    }




})


// Api to delete record
app.delete('/deleteStudent/:id',(req,res,next)=>{
    const id = req.params.id

    try{

        students = students.filter((student)=>student.id!==Number(id))

        res.success(200,'ok',students)
    }catch(err){
        next({})
    }
})



app.use((err,req,res,next)=>{
    res.err(err.statusCode || 500, err.message || 'Internal Server Error')
})


function checkCode(){




// make sure is the questions is always an array
  const safeQuestions = Array.isArray(questions) ? questions : [];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {safeQuestions .map((item, idx) => (
        <div
          key={item.id || idx}
          className={`${item.isEditorEnabled ? "col-span-2" : ""}`}>
          {/* Label Section */}
          <div className="flex justify-between items-center mb-2">
            <label className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} block text-sm font-medium`}>
              {item.displayQuestion}
              {/* asterisk for required fields */}
              {!item.canSkip && !item.isLastForm && (
                <span className={`${darkMode ? 'text-gray-200 ml-1' : 'text-gray-700 ml-1'}`}>*</span>
              )}
            </label>
            
            
************************************************************************************************************************************************
*** FormContainer


function isFormNested() {
    //Check if the renderingArray is null,undefinrd , empty  or  check its an array
    if (!renderingArray || Array.isArray(renderingArray)) {
        // set its an not a nested array -  false
        setIsNested(false);
        return;
    }

    // Check if the renderingArray is a object then it's a  nested Structure
    if (typeof renderingArray === "object") {
        // Get all values from the object  and store them in the array
        const values = Object.values(renderingArray);

                // Check if values array is not empty
            const hasValues = values.length > 0;

            //  Check if every value is an array
            const everyValueIsArray = values.every(value => Array.isArray(value));

            // Check Both must be true
            const allValuesAreArrays = hasValues && everyValueIsArray;

     // if all values are  arrays ,then its nested Structure
        setIsNested(allValuesAreArrays);
    } else {
        // then its an array (NOt Nested Structure)
        setIsNested(false);
    }
}

 
            




}







app.listen(PORT, () => console.log(`Server running on port ${PORT} `))



// Questions to search and get answer 

// What status code to use when got empty array from collection while fetching all records
// If PUT method can add a new record then when to use POST & PUT
// Create api for patch method
// 
