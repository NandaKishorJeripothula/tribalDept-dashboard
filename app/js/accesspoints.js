const SERVER= 'http://localhost:8080';
//const SERVER= 'http://192.168.0.4:8080';

const TOTAL_SCHOOLS_COUNT= '/api/totalSchoolsCount';
const TOTAL_SCHOOLS_DATA= '/api/totalSchoolsData';
const TOTAL_STUDENTS_COUNT='/api/totalStudentsCount';
const TOTAL_STAFF_COUNT='/api/totalStaffCount'; 
const TOTAL_ATWOS_COUNT='/api/totalATWOsCount';
const TOTAL_DTWOS_COUNT='/api/totalDTWOsCount';

// /api/totalNumberOfSchoolsVerifiedInYearMonth/:year/:month
const TOTAL_NUMBER_OF_SCHOOLS_VERIFIED_YEAR_MONTH= '/api/totalNumberOfSchoolsVerifiedInYearMonth';
//LOAD Districts for Drilling down
const DISTRICTS='/api/districts';
//LOAD MANDALS ACCORDING TO DISTRICT
// /api/districts/:district
const MANDALS='/api/districts/';

//REGISTERED SCHOOLS
const REGISTERED_SCHOOLS='/api/totalSchoolsData';
//REGISTERED SCHOOLS FILTER_DISTRICT
// /api/totalSchoolsData/:district
const REGISTERED_SCHOOLS_DISTRICT='/api/totalSchoolsData/';
//REGISTERED SCHOOLS FILTER_DISTRICT_MANDAL
// /api/totalSchoolsData/:district/:mandal
REGISTERED_SCHOOLS_DISTRICT_MANDAL='/api/totalSchoolsData/';