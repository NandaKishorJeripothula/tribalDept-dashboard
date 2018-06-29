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
api.get('/api/totalSchoolsCount',function(req,res){
    connection.query('SELECT COUNT(id) as total_schools_count FROM inspection_institution',function(err,rows){
        if(err){
            res.send(err);
        }
        else{
        res.send(JSON.stringify(rows));
        }
    })
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

  
  api.get('/api/totalStaffCount',function(req,res){
    connection.query('SELECT COUNT(id) as total_staff_count FROM `inspection_staff`',function(err,rows){
        if(err){
            res.send(err);
        }
        else{
        res.send(JSON.stringify(rows));
        }
    })
  });

  api.get('/api/totalATWOsCount',function(req,res){
    connection.query('SELECT COUNT(id) as total_ATWOs_count FROM api_user WHERE designation="ATWO" ',function(err,rows){
        if(err){
            res.send(err);
        }
        else{
        res.send(JSON.stringify(rows));
        }
    })
  });

  api.get('/api/totalDTWOsCount',function(req,res){
    connection.query('SELECT COUNT(id) as total_DTWOs_count FROM api_user WHERE designation="DTWO" ',function(err,rows){
        if(err){
            res.send(err);
        }
        else{
        res.send(JSON.stringify(rows));
        }
    })
  });

  
  api.get('/api/classesStudentsCount',function(req,res){
    connection.query('SELECT inspection_classes.standard as class, SUM(inspection_classes.total_students) as studentsCount FROM inspection_classes GROUP BY inspection_classes.standard ORDER BY cast(inspection_classes.standard as unsigned)',function(err,rows){
        if(err){
            res.send(err);
        }
        else{
        res.send(JSON.stringify(rows));
        }
    })
  });

api.get('/api/totalSchoolsData', function(req, res) {
    connection.query('SELECT DISTINCT api_district.name as district, api_mandal.name as mandal,api_village.name as village, inspection_institution.name school_name, inspection_institution.total_students as total_number_of_students FROM api_district, api_revenuedivision, api_mandal, api_village,inspection_institution WHERE inspection_institution.village_id=api_village.id AND api_village.mandal_id=api_mandal.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id=api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id ORDER BY api_district.name'
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
  api.get('/api/totalSchoolsData/:district', function(req, res) {
    var district= req.params.district; 
    connection.query(' SELECT DISTINCT api_district.name as district, api_mandal.name as mandal, api_village.name as village, inspection_institution.name school_name, inspection_institution.total_students as total_number_of_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.village_id=api_village.id AND api_village.mandal_id=api_mandal.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id=api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id AND api_district.name= ? ORDER BY api_district.name'
    ,[district], function(err, rows){
        if(err){
            res.send(err);
            console.log(err);
        }
        else{
            res.send(JSON.stringify(rows))
        }
    });
  });

  api.get('/api/totalSchoolsData/:district/:mandal', function(req, res) {
    var district= req.params.district; 
    var mandal= req.params.mandal; 
    connection.query('SELECT DISTINCT api_district.name as district, api_mandal.name as mandal, api_village.name as village, inspection_institution.name school_name, inspection_institution.total_students as total_number_of_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.village_id=api_village.id AND api_village.mandal_id=api_mandal.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id=api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id AND api_district.name= ? AND api_mandal.name=? ORDER BY api_district.name'
    ,[district,mandal], function(err, rows){
        if(err){
            res.send(err);
            console.log(err);
        }
        else{
            res.send(JSON.stringify(rows))
        }
    });
  });


api.get('/api/love',function(req,res){
    res.send("djfaskdj;fk")
});

  //Verified Schools
  api.get('/api/totalVerifiedSchoolsDistrictYearMonthStartDateEndDate/:year/:month/:startDate/:endDate',function(req,res){
    var year= req.params.year;
    var month= req.params.month;
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;
    var FROM=year+"-"+month+"-"+startDate;
    var TO=year+"-"+month+"-"+endDate;
    connection.query(`SELECT DISTINCT api_district.name AS district, api_mandal.name AS mandal, api_village.name AS village, inspection_institution.name AS school_name, inspection_institution.total_students AS total_number_of_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE DATE_FORMAT(DATE(inspection_submissionreport.created_on), '%Y-%m-%d') BETWEEN ? AND ? ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id ORDER BY District ASC
    `,[FROM,TO],function(err,rows){
        if(err){
            res.send(err);
        }else{
            res.send(JSON.stringify(rows));
        }
        });
    });
  api.get('/api/totalVerifiedSchoolsDistrictYearMonthStartDateEndDate/:district/:year/:month/:startDate/:endDate',function(req,res){
    var district= req.params.district;
    var year= req.params.year;
    var month= req.params.month;
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;
    var FROM=year+"-"+month+"-"+startDate;
    var TO=year+"-"+month+"-"+endDate;
    connection.query(`SELECT DISTINCT api_district.name AS district, api_mandal.name AS mandal, api_village.name AS village, inspection_institution.name AS school_name, inspection_institution.total_students AS total_number_of_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE DATE_FORMAT(DATE(inspection_submissionreport.created_on), '%Y-%m-%d') BETWEEN ? AND ? ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id AND api_district.name=?`
    ,[FROM,TO,district],function(err,rows){
        if(err){
            res.send(err);
        }else{
            res.send(JSON.stringify(rows));
        }
    });
    });


    api.get('/api/totalVerifiedSchoolsDistrictYearMonthStartDateEndDate/:district/:mandal/:year/:month/:startDate/:endDate',function(req,res){
        var district= req.params.district;
        var mandal= req.params.mandal;
        var year= req.params.year;
        var month= req.params.month;
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var FROM=year+"-"+month+"-"+startDate;
        var TO=year+"-"+month+"-"+endDate;
        connection.query(`SELECT DISTINCT api_district.name AS district, api_mandal.name AS mandal, api_village.name AS village, inspection_institution.name AS school_name, inspection_institution.total_students AS total_number_of_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE DATE_FORMAT(DATE(inspection_submissionreport.created_on), '%Y-%m-%d') BETWEEN ? AND ? ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id AND api_district.name=? AND api_mandal.name= ?`
        ,[FROM,TO,district,mandal],function(err,rows){
            if(err){
                res.send(err);
            }else{
                res.send(JSON.stringify(rows));
            }
        });

    });

    api.get('/api/totalVerifiedSchoolsYearMonth/:year/:month',function(req,res){
        var year= req.params.year;
        var month= req.params.month;
        connection.query(`SELECT DISTINCT api_district.name AS district, api_mandal.name AS mandal, api_village.name AS village, inspection_institution.name AS school_name, inspection_institution.total_students AS total_number_of_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE year(inspection_submissionreport.created_on)= ? AND month(inspection_submissionreport.created_on)=? ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id ORDER BY District ASC
        `,[year,month],function(err,rows){
            if(err){
                res.send(err);
            }else{
                res.send(JSON.stringify(rows));
            }
            });
        });
      api.get('/api/totalVerifiedSchoolsDistrictYearMonth/:district/:year/:month',function(req,res){
        var district= req.params.district;
        var year= req.params.year;
        var month= req.params.month;
        connection.query(`SELECT DISTINCT api_district.name AS district, api_mandal.name AS mandal, api_village.name AS village, inspection_institution.name AS school_name, inspection_institution.total_students AS total_number_of_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE year(inspection_submissionreport.created_on)= ? AND month(inspection_submissionreport.created_on)= ?  ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id AND api_district.name=?`
        ,[year,month,district],function(err,rows){
            if(err){
                res.send(err);
            }else{
                res.send(JSON.stringify(rows));
            }
        });
        });
    
        api.get('/api/totalVerifiedSchoolsDistrictMandalYearMonth/:district/:mandal/:year/:month',function(req,res){
            var district= req.params.district;
            var mandal= req.params.mandal;
            var year= req.params.year;
            var month= req.params.month;
            connection.query(`SELECT DISTINCT api_district.name AS district, api_mandal.name AS mandal, api_village.name AS village, inspection_institution.name AS school_name, inspection_institution.total_students AS total_number_of_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE year(inspection_submissionreport.created_on)= ? AND month(inspection_submissionreport.created_on)= ? ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id AND api_district.name=? AND api_mandal.name= ?`
            ,[year,month,district,mandal],function(err,rows){
                if(err){
                    res.send(err);
                }else{
                    res.send(JSON.stringify(rows));
                }
            });
    
        });
    

    //VERIFIED SCHOOLS END


// NOT Verified Schools
  api.get('/api/totalNotVerifiedSchoolsDistrictYearMonthStartDateEndDate/:year/:month/:startDate/:endDate',function(req,res){
    var year= req.params.year;
    var month= req.params.month;
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;
    var FROM=year+"-"+month+"-"+startDate;
    var TO=year+"-"+month+"-"+endDate;
    connection.query(`SELECT DISTINCT api_district.name AS district, api_mandal.name AS mandal, api_village.name AS village, inspection_institution.name AS school_name, inspection_institution.total_students AS total_number_of_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id NOT IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE DATE_FORMAT(DATE(inspection_submissionreport.created_on), '%Y-%m-%d') BETWEEN ? AND ? ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id ORDER BY District ASC
    `,[FROM,TO],function(err,rows){
        if(err){
            res.send(err);
        }else{
            res.send(JSON.stringify(rows));
        }
        });
    });
  api.get('/api/totalNotVerifiedSchoolsDistrictYearMonthStartDateEndDate/:district/:year/:month/:startDate/:endDate',function(req,res){
    var district= req.params.district;
    var year= req.params.year;
    var month= req.params.month;
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;
    var FROM=year+"-"+month+"-"+startDate;
    var TO=year+"-"+month+"-"+endDate;
    connection.query(`SELECT DISTINCT api_district.name AS district, api_mandal.name AS mandal, api_village.name AS village, inspection_institution.name AS school_name, inspection_institution.total_students AS total_number_of_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id NOT IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE DATE_FORMAT(DATE(inspection_submissionreport.created_on), '%Y-%m-%d') BETWEEN ? AND ? ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id AND api_district.name=?`
    ,[FROM,TO,district],function(err,rows){
        if(err){
            res.send(err);
        }else{
            res.send(JSON.stringify(rows));
        }
    });
    });

    api.get('/api/totalNotVerifiedSchoolsDistrictYearMonthStartDateEndDate/:district/:mandal/:year/:month/:startDate/:endDate',function(req,res){
        var district= req.params.district;
        var mandal= req.params.mandal;
        var year= req.params.year;
        var month= req.params.month;
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var FROM=year+"-"+month+"-"+startDate;
        var TO=year+"-"+month+"-"+endDate;
        connection.query(`SELECT DISTINCT api_district.name AS district, api_mandal.name AS mandal, api_village.name AS village, inspection_institution.name AS school_name, inspection_institution.total_students AS total_number_of_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id NOT IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE DATE_FORMAT(DATE(inspection_submissionreport.created_on), '%Y-%m-%d') BETWEEN ? AND ? ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id AND api_district.name=? AND api_mandal.name= ?`
        ,[FROM,TO,district,mandal],function(err,rows){
            if(err){
                res.send(err);
            }else{
                res.send(JSON.stringify(rows));
            }
        });

    });

    api.get('/api/totalNotVerifiedSchoolsYearMonth/:year/:month',function(req,res){
        var year= req.params.year;
        var month= req.params.month;
        connection.query(`SELECT DISTINCT api_district.name AS district, api_mandal.name AS mandal, api_village.name AS village, inspection_institution.name AS school_name, inspection_institution.total_students AS total_number_of_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id NOT IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE year(inspection_submissionreport.created_on)= ? AND month(inspection_submissionreport.created_on)=? ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id ORDER BY District ASC
        `,[year,month],function(err,rows){
            if(err){
                res.send(err);
            }else{
                res.send(JSON.stringify(rows));
            }
            });
        });
      api.get('/api/totalNotVerifiedSchoolsDistrictYearMonth/:district/:year/:month',function(req,res){
        var district= req.params.district;
        var year= req.params.year;
        var month= req.params.month;
        connection.query(`SELECT DISTINCT api_district.name AS district, api_mandal.name AS mandal, api_village.name AS village, inspection_institution.name AS school_name, inspection_institution.total_students AS total_number_of_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id NOT IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE year(inspection_submissionreport.created_on)= ? AND month(inspection_submissionreport.created_on)= ?  ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id AND api_district.name=?`
        ,[year,month,district],function(err,rows){
            if(err){
                res.send(err);
            }else{
                res.send(JSON.stringify(rows));
            }
        });
        });
    
        api.get('/api/totalNotVerifiedSchoolsDistrictMandalYearMonth/:district/:mandal/:year/:month',function(req,res){
            var district= req.params.district;
            var mandal= req.params.mandal;
            var year= req.params.year;
            var month= req.params.month;
            connection.query(`SELECT DISTINCT api_district.name AS district, api_mandal.name AS mandal, api_village.name AS village, inspection_institution.name AS school_name, inspection_institution.total_students AS total_number_of_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id NOT IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE year(inspection_submissionreport.created_on)= ? AND month(inspection_submissionreport.created_on)= ? ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id AND api_district.name=? AND api_mandal.name= ?`
            ,[year,month,district,mandal],function(err,rows){
                if(err){
                    res.send(err);
                }else{
                    res.send(JSON.stringify(rows));
                }
            });
    
        });
    


    //NOT VERIFIED SCHOOLS END

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

  //NUMBER OF REPORTS SUBMITTED
  api.get('/api/numberOfReportsSubmittedYearMonth/:year/:month',function(req,res){
    var year= req.params.year;
    var month= req.params.month;
    connection.query('SELECT api_district.name as district, inspection_submissionreport.officer as name, inspection_submissionreport.designation as designation, COUNT(inspection_submissionreport.id) as number_of_reports_submitted FROM inspection_submissionreport, inspection_institution,api_mandal, api_revenuedivision, api_district WHERE inspection_submissionreport.institution_id=inspection_institution.id AND inspection_institution.mandal_id= api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id=api_district.id AND year(inspection_submissionreport.created_on)=? AND month(inspection_submissionreport.created_on)=? GROUP BY inspection_submissionreport.officer ORDER BY district',[year,month],function(err,rows){
      if(err){
          res.send(err);
      }else{
          res.send(JSON.stringify(rows));
      }
    });
  });

  api.get('/api/numberOfReportsSubmittedYearMonthDayDay/:year/:month/:starDate/:endDate',function(req,res){
    var year= req.params.year;
    var month= req.params.month;
    var startDate= req.params.startDate;
    var endDate= req.params.endDate;
    var FROM=year+"-"+month+"-"+startDate;
    var TO=year+"-"+month+"-"+endDate;
    connection.query(`SELECT api_district.name as district, inspection_submissionreport.officer as name, inspection_submissionreport.designation as designation,COUNT(inspection_submissionreport.id) as number_of_reports_submitted FROM inspection_submissionreport, inspection_institution,api_mandal, api_revenuedivision, api_district WHERE inspection_submissionreport.institution_id=inspection_institution.id AND inspection_institution.mandal_id= api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id=api_district.id AND DATE_FORMAT(DATE(inspection_submissionreport.created_on), '%Y-%m-%d') BETWEEN ? AND ? GROUP BY inspection_submissionreport.officer ORDER BY district`,[FROM,TO],function(err,rows){
      if(err){
          res.send(err);
      }else{
          res.send(JSON.stringify(rows));
      }
    });
  });

    //FOR OFFICERS REPORTS NOT SUBMITTED 
  api.get('/api/officersReportsNotSubmittedYearMonth/:year/:month/',function(req,res){
    var year= req.params.year;
    var month= req.params.month;
    connection.query(`SELECT DISTINCT api_user.name, api_user.designation, api_user.phone_number, api_user.email from api_user WHERE api_user.name NOT IN ( SELECT inspection_submissionreport.officer FROM inspection_submissionreport WHERE year(inspection_submissionreport.created_on)=? AND month(inspection_submissionreport.created_on)=?) AND api_user.designation='ATWO' OR 'DTWO' ORDER BY api_user.name ASC` ,[year,month],function(err,rows){
      if(err){
          res.send(err);
      }else{
          res.send(JSON.stringify(rows));
      }
    });
  });

  api.get('/api/officersReportsNotSubmittedYearMonthDayDay/:year/:month/:starDate/:endDate',function(req,res){
    var year= req.params.year;
    var month= req.params.month;
    var startDate= req.params.startDate;
    var endDate= req.params.endDate;
    var FROM=year+"-"+month+"-"+startDate;
    var TO=year+"-"+month+"-"+endDate;
    connection.query(`SELECT DISTINCT api_user.name, api_user.designation, api_user.phone_number, api_user.email from api_user WHERE api_user.name NOT IN ( SELECT inspection_submissionreport.officer FROM inspection_submissionreport WHERE month(inspection_submissionreport.created_on)=? AND DATE_FORMAT(DATE(inspection_submissionreport.created_on), '%Y-%m-%d') BETWEEN ? AND ?) AND api_user.designation='ATWO' OR 'DTWO' ORDER BY api_user.name ASC`,[month,FROM,TO],function(err,rows){
      if(err){
          res.send(err);
      }else{
          res.send(JSON.stringify(rows));
      }
    });
  });

  //VIEW REPORTS OF OFFICERS
  api.get('/api/viewReportsOfOfficerYearMonthDistrict/:year/:month/:district',function(req,res){
    var year= req.params.year;
    var month= req.params.month;
    var district= req.params.district;
    connection.query(`SELECT api_district.name as district, inspection_submissionreport.officer as officer_name, inspection_submissionreport.designation as designation ,inspection_institution.name as institution_name, inspection_submissionreport.created_on as dateTime,  inspection_submissionreport.id as report_id FROM inspection_submissionreport, inspection_institution,api_village ,api_mandal , api_revenuedivision, api_district WHERE inspection_submissionreport.institution_id=inspection_institution.id AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id AND year(inspection_submissionreport.created_on)=? AND month(inspection_submissionreport.created_on)=? AND api_district.name=?`,[year,month,district],function(err,rows){
      if(err){
          res.send(err);
      }else{
          res.send(JSON.stringify(rows));
      }
    });
  });
  
  api.get('/api/viewReportsOfOfficerYearMonthOfficer/:year/:month/:officer',function(req,res){
    var year= req.params.year;
    var month= req.params.month;
    var officer= req.params.officer;
    connection.query(`SELECT api_district.name as district, inspection_submissionreport.officer as officer_name, inspection_submissionreport.designation as designation ,inspection_institution.name as institution_name, inspection_submissionreport.created_on as dateTime,  inspection_submissionreport.id as report_id FROM inspection_submissionreport, inspection_institution,api_village ,api_mandal , api_revenuedivision, api_district WHERE inspection_submissionreport.institution_id=inspection_institution.id AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id AND year(inspection_submissionreport.created_on)=? AND month(inspection_submissionreport.created_on)=? AND inspection_submissionreport.officer= ?`,[year,month,officer],function(err,rows){
      if(err){
          res.send(err);
      }else{
          res.send(JSON.stringify(rows));
      }
    });
  });
  
  api.get('/api/viewReportsOfOfficerYearMonthDayDayDistrict/:year/:month/:startDate/:endDate/:district',function(req,res){
    var year= req.params.year;
    var month= req.params.month;
    var startDate= req.params.startDate;
    var endDate= req.params.endDate;
    var district= req.params.district;
    var FROM=year+"-"+month+"-"+startDate;
    var TO=year+"-"+month+"-"+endDate;
    connection.query(`SELECT api_district.name as district, inspection_submissionreport.officer as officer_name, inspection_submissionreport.designation as designation ,inspection_institution.name as institution_name, inspection_submissionreport.created_on as dateTime,  inspection_submissionreport.id as report_id FROM inspection_submissionreport, inspection_institution,api_village ,api_mandal , api_revenuedivision, api_district WHERE inspection_submissionreport.institution_id=inspection_institution.id AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id AND DATE_FORMAT(DATE(inspection_submissionreport.created_on), '%Y-%m-%d') BETWEEN ? AND ? AND api_district.name=?`,[FROM,TO,district],function(err,rows){
      if(err){
          res.send(err);
      }else{
          res.send(JSON.stringify(rows));
      }
    });
  });

  api.get('/api/viewReportsOfOfficerYearMonthDayDayOfficer/:year/:month/:startDate/:endDate/:officer',function(req,res){
    var year= req.params.year;
    var month= req.params.month;
    var startDate= req.params.startDate;
    var endDate= req.params.endDate;
    var officer= req.params.officer;
    var FROM=year+"-"+month+"-"+startDate;
    var TO=year+"-"+month+"-"+endDate;
    connection.query(`SELECT api_district.name as district, inspection_submissionreport.officer as officer_name, inspection_submissionreport.designation as designation ,inspection_institution.name as institution_name, inspection_submissionreport.created_on as dateTime,  inspection_submissionreport.id as report_id FROM inspection_submissionreport, inspection_institution,api_village ,api_mandal , api_revenuedivision, api_district WHERE inspection_submissionreport.institution_id=inspection_institution.id AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id AND DATE_FORMAT(DATE(inspection_submissionreport.created_on), '%Y-%m-%d') BETWEEN ? AND ? AND inspection_submissionreport.officer= ?`,[FROM,TO,officer],function(err,rows){
      if(err){
          res.send(err);
      }else{
          res.send(JSON.stringify(rows));
      }
    });
  });



  //FOR DROPDOWN PURPOSE RETRIVAL OF officers
  api.get('/api/officers',function(req,res){
    connection.query(`SELECT DISTINCT api_user.name as officer FROM api_user WHERE api_user.designation='ATWO' OR api_user.designation='DTWO'`,function(err,rows){
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
      connection.query('SELECT DISTINCT api_mandal.name as mandal from api_mandal, api_district, api_revenuedivision where api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id=api_district.id AND api_district.name= ?',[district],function(err,rows){
          if(err){
              res.send(err);
          }else{
              res.send(JSON.stringify(rows));
          }
      });
  });

module.exports = api;