var express = require('express');
var path= require('path');
var api = express.Router();

//mysql imports
var mysql = require('mysql');
//database config file import
var dbconfig = require('../config/database');

//connecting to the mysql 
var connection = mysql.createConnection(dbconfig.connection);
//connecting to the specific database
connection.query('USE ' + dbconfig.database);

//Middle ware that is specific to this router
api.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


// Define the home page route
api.get('/api', function(req, res) {
  res.send('API routers');
});

// Define the about route
api.get('/about', function(req, res) {
  res.send('About us');
});

//APIs 
api.get('/api/totalSchoolsData', function(req, res) {
    connection.query(`SELECT 
    DISTINCT 
    api_district.name as district,
    api_mandal.name as mandal,
    api_village.name as village, 
    inspection_institution.name school_name,
    inspection_institution.institute_code as code ,
    inspection_institution.total_students as total
    FROM 
    api_district, 
    api_revenuedivision,
    api_mandal,
    api_village,
    inspection_institution 
    WHERE 
    inspection_institution.village_id=api_village.id
    AND api_village.mandal_id=api_mandal.id
    AND inspection_institution.mandal_id=api_mandal.id 
    AND api_mandal.revenuedivision_id=api_revenuedivision.id 
    AND api_revenuedivision.district_id= api_district.id
    ORDER BY api_district.name`
    , function(err, rows){
        if(err){
            res.send(err);
            console.log(err);
        }
        else{
            res.send(JSON.stringify(rows))
        }
    });
  });
  
  api.get('/api/totalStudentsCount',function(req,res){
    connection.query('SELECT SUM(total_students) as total_students_count FROM inspection_institution',function(err,rows){
        if(err){
            res.send(err);
        }
        else{
        res.send(JSON.stringify(rows));
        }
    })
  });


module.exports = api;