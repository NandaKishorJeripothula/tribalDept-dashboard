#  API Documentaion

### End point 
```
/api/totalSchoolsData

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
    ORDER BY api_district.name

{
        "district": "ADILABAD",
        "mandal": "BELA",
        "village": "BELA",
        "school_name": "Govt AHS Boys Bela",
        "code": "-501707.0",
        "total": 265
}
```

### End Point
```
/api/totalStudentsCount

SELECT SUM(total_students) as total_students_count FROM inspection_institution

[{
    "total_students_count":111552
}]
```

### End Point
```
/api/totalNumberOfSchoolsVerifiedInYearMonth/:year/:month

/api/totalNumberOfSchoolsVerifiedInMonthYear/2018/03

select count(distinct institution_id) as total_num_of_schools_verified from inspection_submissionreport where year(created_on)=? and month(created_on)=?

[{
"total_num_of_schools_verified":110
}]
```


### End Point
```
/api/fullDetailsOfTheSchoolsNotVerifiedInYearMonth/:year/:month

/api/fullDetailsOfTheSchoolsNotVerifiedInYearMonth/2018/03

SELECT DISTINCT api_district.name AS district, api_mandal.name AS mandal, api_village.name AS village, inspection_institution.name AS institution_name, inspection_institution.institute_code AS institution_code, inspection_institution.total_students AS total_no_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id NOT IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE year(inspection_submissionreport.created_on)=? AND month(inspection_submissionreport.created_on)=? ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id'

 {
        "district": "ADILABAD",
        "mandal": "ADILABAD",
        "village": "CHINCHUGHAT",
        "institution_name": "Govt AHS CHINCHUGHAT",
        "institution_code": "-302908.0",
        "total_no_students": 163
    }
```


### End Point
```
/api/fullDetailsOfTheSchoolsNotVerifiedInYearMonth/:year/:month/:district

/api/fullDetailsOfTheSchoolsNotVerifiedInYearMonth/2018/03/ADILABAD

SELECT DISTINCT api_district.name AS district, api_mandal.name AS mandal, api_village.name AS village, inspection_institution.name AS institution_name, inspection_institution.institute_code AS institution_code, inspection_institution.total_students AS total_no_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id NOT IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE year(inspection_submissionreport.created_on)=? AND month(inspection_submissionreport.created_on)=? ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id AND api_district.name= ?
 {
        "district": "ADILABAD",
        "mandal": "ADILABAD",
        "village": "CHINCHUGHAT",
        "institution_name": "Govt AHS CHINCHUGHAT",
        "institution_code": "-302908.0",
        "total_no_students": 163
    }
```


### End Point
```
/api/fullDetailsOfTheSchoolsNotVerifiedInYearMonth/:year/:month/:district/:mandal

/api/fullDetailsOfTheSchoolsNotVerifiedInYearMonth/2018/03/ADILABAD/ADILABAD

SELECT DISTINCT api_district.name AS district, api_mandal.name AS mandal, api_village.name AS village, inspection_institution.name AS institution_name, inspection_institution.institute_code AS institution_code, inspection_institution.total_students AS total_no_students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id NOT IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE year(inspection_submissionreport.created_on)=? AND month(inspection_submissionreport.created_on)=? ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id AND api_district.name= ? AND api_mandal.name=?

 {
        "district": "ADILABAD",
        "mandal": "ADILABAD",
        "village": "CHINCHUGHAT",
        "institution_name": "Govt AHS CHINCHUGHAT",
        "institution_code": "-302908.0",
        "total_no_students": 163
    }
```

### End Point
```
/api/districts

SELECT DISTINCT api_district.name as district FROM api_district

    {
        "district": "ADILABAD"
    },
    {
        "district": "NAGARKURNOOL"
    },
    {
        "district": "SANGAREDDY"
    }
```

### End Point
```
/api/districts/:district

/api/districts/ADILABAD

SELECT DISTINCT api_mandal.name as mandals from api_mandal, api_district, api_revenuedivision where api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id=api_district.id AND api_district.name= ?

{
        "mandals": "ADILABAD"
    },
    {
        "mandals": "ADILABAD (URBAN)"
    },
    {
        "mandals": "BAZARHATHNOOR"
    },
```