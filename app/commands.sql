--
--To get the total num of schools verified on a particular month of the particular year
--
select count(distinct institution_id) from inspection_submissionreport where year(created_on)='2018' and month(created_on)='03';

--
--To get the total NOT_VERIFIED schools on a particular month of the particular year
--
select id, name from inspection_institution where id NOT IN ( select distinct institution_id from inspection_submissionreport where year(created_on)='2018' and month(created_on)='03' );


--
--To get the total NOT_VERIFIED schools on a particular month of the particular year
--
select id, name from inspection_institution where id NOT IN ( select distinct institution_id from inspection_submissionreport where year(created_on)='2018' and month(created_on)='03' );

--
--To get the FULL-DETAILS total NOT_VERIFIED schools on a particular month of the particular year
--
SELECT DISTINCT api_district.name AS District, api_mandal.name AS Mandal, api_village.name AS Village, inspection_institution.name AS Institution_Name, inspection_institution.institute_code AS Institution_Code, inspection_institution.total_students AS Total_No_Students FROM api_district, api_revenuedivision, api_mandal, api_village, inspection_institution WHERE inspection_institution.id NOT IN ( SELECT DISTINCT inspection_submissionreport.institution_id from inspection_submissionreport WHERE year(inspection_submissionreport.created_on)='2018' AND month(inspection_submissionreport.created_on)='03' ) AND inspection_institution.village_id=api_village.id AND inspection_institution.mandal_id=api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id;


--
--To get the FULL-DETAILS total NOT_VERIFIED schools on a particular month of the particular year ORDERED BY DISTRICT
--
SELECT DISTINCT `api_district`.`name` AS District, `api_mandal`.`name` AS Mandal, `api_village`.`name` AS Village, `inspection_institution`.`name` AS Institution_Name, `inspection_institution`.`institute_code` AS Institution_Code, `inspection_institution`.`total_students` AS Total_No_Students FROM `api_district`, `api_revenuedivision`, `api_mandal`, `api_village`, `inspection_institution` WHERE `inspection_institution`.`id` NOT IN ( SELECT DISTINCT `inspection_submissionreport`.`institution_id` from `inspection_submissionreport` WHERE year(`inspection_submissionreport`.`created_on`)='2018' AND month(`inspection_submissionreport`.`created_on`)='03' ) AND`inspection_institution`.`village_id`=`api_village`.`id` AND `inspection_institution`.`mandal_id`=`api_mandal`.`id` AND `api_mandal`.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id= api_district.id  
ORDER BY `District` ASC;



--
-- To get the Summissionreports in certain range of dates
--
SELECT * from inspection_submissionreport WHERE DATE_FORMAT(DATE(inspection_submissionreport.created_on), '%Y-%m-%d') BETWEEN '2018-03-01' AND '2018-03-05';



--
-- To get the details of officer, design and school in particular region of date
--
SELECT inspection_submissionreport.officer AS officer_name, inspection_submissionreport.designation, inspection_submissionreport.id AS report_id, inspection_submissionreport.submitted_on AS submission_date,  inspection_institution.name FROM inspection_submissionreport, inspection_institution WHERE inspection_submissionreport.institution_id= inspection_institution.id AND month(inspection_submissionreport.created_on)='01' AND DATE_FORMAT(DATE(inspection_submissionreport.created_on), '%Y-%m-%d') BETWEEN '2018-01-01' AND '2018-01-05' ORDER BY inspection_submissionreport.officer ASC;


--
-- count of reports of each officer with district mapping
--
SELECT COUNT(inspection_submissionreport.id) as reports_submitted , inspection_submissionreport.officer as name, api_district.name as district 
FROM inspection_submissionreport, inspection_institution,api_mandal, api_revenuedivision, api_district
WHERE inspection_submissionreport.institution_id=inspection_institution.id AND inspection_institution.mandal_id= api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id=api_district.id
GROUP BY inspection_submissionreport.officer;

--
-- Count of reports of each officer with district mapping and particular region selection
--

SELECT COUNT(inspection_submissionreport.id) as reports_submitted , inspection_submissionreport.officer as name, api_district.name as district 
FROM inspection_submissionreport, inspection_institution,api_mandal, api_revenuedivision, api_district
WHERE inspection_submissionreport.institution_id=inspection_institution.id AND inspection_institution.mandal_id= api_mandal.id AND api_mandal.revenuedivision_id= api_revenuedivision.id AND api_revenuedivision.district_id=api_district.id
AND month(inspection_submissionreport.created_on)='01' AND DATE_FORMAT(DATE(inspection_submissionreport.created_on), '%Y-%m-%d') BETWEEN '2018-01-01' AND '2018-01-05' 
GROUP BY inspection_submissionreport.officer ORDER BY district;


--
-- List of ATWO DTWO Officer not submitted any reports in a certain / particular region
--
SELECT DISTINCT api_user.name, api_user.designation, api_user.phone_number, api_user.email from api_user WHERE api_user.name NOT IN ( SELECT inspection_submissionreport.officer FROM inspection_submissionreport WHERE month(inspection_submissionreport.created_on)='01' AND DATE_FORMAT(DATE(inspection_submissionreport.created_on), '%Y-%m-%d') BETWEEN '2018-01-01' AND '2018-01-05') AND api_user.designation='ATWO' OR 'DTWO'