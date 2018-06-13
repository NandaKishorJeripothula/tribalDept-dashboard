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
    connection.query(`
    SELECT 
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

  api.get('/api/totalNumberOfSchoolsVerifiedInYearMonth/:year/:month',function(req,res){
      var year= req.params.year;
      var month= req.params.month;
      connection.query('select count(distinct institution_id) as total_num_of_schools_verified from inspection_submissionreport where year(created_on)=? and month(created_on)=?',[year,month],function(err,rows){
        if(err){
            res.send(err);
        }else{
            res.send(JSON.stringify(rows));
        }
    });

  });

  api.get('/api/fullDetailsOfTheSchoolsNotVerifiedInYearMonth/:year/:month',function(req,res){
    var year= req.params.year;
    var month= req.params.month;
    connection.query('SELECT DISTINCT api_district.name AS district, api_mandal.name AS mandal, api_village.name AS village, inspection_institution.name AS institution_name, inspection_institution.institute_code AS institution_code, inspection_institution.total_students AS total_no_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id NOT IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE year(inspection_submissionreport.created_on)=? AND month(inspection_submissionreport.created_on)=? ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id',[year,month],function(err,rows){
      if(err){
          res.send(err);
      }else{
          res.send(JSON.stringify(rows));
      }
    });
  });

  
  api.get('/api/fullDetailsOfTheSchoolsNotVerifiedInYearMonth/:year/:month/:district',function(req,res){
    var year= req.params.year;
    var month= req.params.month;
    var district= req.params.district;
    connection.query('SELECT DISTINCT api_district.name AS district, api_mandal.name AS mandal, api_village.name AS village, inspection_institution.name AS institution_name, inspection_institution.institute_code AS institution_code, inspection_institution.total_students AS total_no_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id NOT IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE year(inspection_submissionreport.created_on)=? AND month(inspection_submissionreport.created_on)=? ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id AND api_district.name= ?',[year,month,district],function(err,rows){
      if(err){
          res.send(err);
      }else{
          res.send(JSON.stringify(rows));
      }
    });
  });

  api.get('/api/fullDetailsOfTheSchoolsNotVerifiedInYearMonth/:year/:month/:district/:mandal',function(req,res){
    var year= req.params.year;
    var month= req.params.month;
    var district= req.params.district;
    var mandal= req.params.mandal;
    connection.query('SELECT DISTINCT api_district.name AS district, api_mandal.name AS mandal, api_village.name AS village, inspection_institution.name AS institution_name, inspection_institution.institute_code AS institution_code, inspection_institution.total_students AS total_no_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id NOT IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE year(inspection_submissionreport.created_on)=? AND month(inspection_submissionreport.created_on)=? ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id AND api_district.name= ? AND api_mandal.name=?',[year,month,district,mandal],function(err,rows){
      if(err){
          res.send(err);
      }else{
          res.send(JSON.stringify(rows));
      }
    });
  });

  //FOR DROPDOWN PURPOSE RETRIVAL OF DISTRICTS
  api.get('/api/districts',function(req,res){
      connection.query('SELECT DISTINCT api_district.name as district FROM api_district',function(err,rows){
          if(err){
              res.send(err);
          }else{
              res.send(JSON.stringify(rows));
          }
      });
  });
  //FOR DROPDOWN PURPOSE MANDAL RETRIVAL BASED ON DISTRICT INPUT
  api.get('/api/districts/:district',function(req,res){
      var district= req.params.district;
      connection.query('SELECT DISTINCT api_mandal.name as mandals from api_mandal, api_district, api_revenuedivision where api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id=api_district.id AND api_district.name= ?',[district],function(err,rows){
          if(err){
              res.send(err);
          }else{
              res.send(JSON.stringify(rows));
          }
      });
  });

module.exports = api;