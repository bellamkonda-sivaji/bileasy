const express=require('express');
const res = require('express/lib/response');

const app=express()
const pool=require("./db")
const port=process.env.PORT || 3000

app.use(express.json());



app.get('/',async(req,res)=>{
    function value(hello){
        res.send(hello)
    }

    value(hello="Welcome To Bileasy")
})

//all employers list in bileasy
app.get("/bileasy/all/employees_list",async(req,res)=>{
    try{
    const data=await pool.query(

        "SELECT * FROM bileasy"
    )

    res.json(data.rows)
    console.log(data.rows)
    }
    catch(error){
        console.log(error.message)
        res.send(error.message)
    }
})

//all departments and codes in bileasy

app.get("/bileasy/all/department_list",async(req,res)=>{
    try{
    const data=await pool.query(

        "SELECT * FROM department_table"
    )

    res.json(data.rows)
    console.log(data.rows)
    }
    catch(error){
        console.log(error.message)
        res.send(error.message)
    }
})

//get specific employer details
app.get("/bileasy/employees_list/:employerId/",async(req,res)=>{
    const {employerId}=req.params
    
    try{
    const data=await pool.query(

        "SELECT * FROM bileasy WHERE employer_id = ($1)",
        [employerId]
    )

    res.json(data.rows)
    console.log(data.rows)
    }
    catch(error){
        console.log(error.message)
        res.send(error.message)
    }
})

//send details to employer table

app.post("/bileasy/send_data",async(req,res)=>{
const {employerName,employerAge,employerGender,departmentId}=req.body;
try{
const data=await pool.query(
    

    "INSERT INTO bileasy (employer_name,employer_age,employer_gender,department_id) VALUES ($1,$2,$3,$4) RETURNING *",
    [employerName,employerAge,employerGender,departmentId]
   
)
    res.send("Data Inserted successfully"
    )
    
}
    catch(error){
        console.log(error.message)
        res.send(error.message)
    }

})

//send data to department table

app.post("/department/send_data",async(req,res)=>{
    const {departmentName,departmentId}=req.body;
    try{
        const data=await pool.query(
            "INSERT INTO department_table (department_name,department_id) VALUES($1,$2) RETURNING *",
            [departmentName,departmentId]
        )
        res.send({departmentName,departmentId})
    }
    catch(error){
        res.send(error.message)
    }
})

//Get count of each department employees

app.get("/employees/count/each_department",async(req,res)=>{
    try{
        const data=await pool.query(

            "SELECT department_name,bileasy.department_id,COUNT(department_name) AS Total_Employers FROM bileasy INNER JOIN department_table ON bileasy.department_id = department_table.department_id GROUP BY employer_name,department_table.department_name,bileasy.department_id "
        )
        res.send(data.rows)
    }
    catch(error){
        res.send(error.message)
    }
})

//Get count of specific department employers 

app.get("/employees/count/each_department/:departmentId/",async(req,res)=>{
    const {departmentId}=req.params
    
    try{
        const data=await pool.query(

            "SELECT department_name,bileasy.department_id,COUNT(department_name) AS Total_Employers FROM bileasy INNER JOIN department_table ON bileasy.department_id = department_table.department_id WHERE bileasy.department_id=($1) GROUP BY employer_name,department_table.department_name,bileasy.department_id ",
            [departmentId]
        )
        if(data===undefined){
            res.send("Please select correct id")
        }
        else{
        res.send(data.rows)
    }
}
    catch(error){
        res.send(error.message)
    }
})

//Time of employee joining in department with name

app.get("/bileasy/details/date_of_joining",async(req,res)=>{
    try{
        const data=await pool.query(
            "SELECT employer_name,bileasy.department_id,department_name,department_table.joined_at FROM bileasy INNER JOIN department_table ON department_table.department_id = bileasy.department_id"
        )
        res.send(data.rows)
    }
    catch(error){
        res.send(error.message)

    }

})





app.listen(port,()=>{
    console.log('Server running at '+ port)
})

module.export=  app