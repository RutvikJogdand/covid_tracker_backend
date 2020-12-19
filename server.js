const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require('cors')
// Data:
const adminData = require("./admin_data")
const employeesData = require("./employees_data")
// Models:
const Admins = require("./models/admin_model")
const EmployeesTrack = require("./models/employees_modal")
// Routes:
const adminLoginRoute = require("./routes/admin_routes")
const getAllEmployeesRoute = require("./routes/employee_routes")
const makeEmpCovidPositiveRoute = require("./routes/employee_routes")
const makeEmpCovidNegativeRoute = require("./routes/employee_routes")

dotenv.config()

const app = express()

app.use( cors() )
app.use( express.json() )


// Admin routes:
app.use("/api/admin-login/",adminLoginRoute)
// Employee routes:
app.use("/api/get-all/",getAllEmployeesRoute)
app.use("/api/mark-covid-positive/",makeEmpCovidPositiveRoute)
app.use("/api/make-covid-negative/",makeEmpCovidNegativeRoute)

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, db) => {
    if (err) throw err;

    if(EmployeesTrack.collection.countDocuments(function (err, count) {
        if (!err && count === 0) {
            // It's empty
            EmployeesTrack.insertMany(employeesData).then(()=>{ 
            console.log("Data inserted")  // Success 
        }).catch((error)=>{ 
            console.log(error)      // Failure 
        }); 
        }
    }));
    
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('Server is running up at port 5000')
    
})
