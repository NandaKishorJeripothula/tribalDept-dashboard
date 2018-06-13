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
