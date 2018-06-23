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
const REGISTERED_SCHOOLS_DISTRICT_MANDAL='/api/totalSchoolsData/';


///api/totalVerifiedSchoolsDistrictMandalYearMonthStartDateEndDate/:year/:month/:startDate/:endDate
const VERIFIED_SCHOOLS_YEAR_MONTH_DAY_DAY='/api/totalVerifiedSchoolsDistrictYearMonthStartDateEndDate/';
// /api/totalVerifiedSchoolsDistrictYearMonthStartDateEndDate/:district/:year/:month/:startDate/:endDate
const VERIFIED_SCHOOLS_DISTRICT_YEAR_MONTH_DAY_DAY='/api/totalVerifiedSchoolsDistrictYearMonthStartDateEndDate/';
// /api/totalVerifiedSchoolsDistrictYearMonthStartDateEndDate/:district/:mandal/:year/:month/:startDate/:endDate
const VERIFIED_SCHOOLS_DISTRICT_MANDAL_YEAR_MONTH_DAY_DAY='/api/totalVerifiedSchoolsDistrictYearMonthStartDateEndDate/';

///api/totalNotVerifiedSchoolsDistrictMandalYearMonthStartDateEndDate/:year/:month/:startDate/:endDate
const NOT_VERIFIED_SCHOOLS_YEAR_MONTH_DAY_DAY='/api/totalNotVerifiedSchoolsDistrictYearMonthStartDateEndDate/';
// /api/totalNotVerifiedSchoolsDistrictYearMonthStartDateEndDate/:district/:year/:month/:startDate/:endDate
const NOT_VERIFIED_SCHOOLS_DISTRICT_YEAR_MONTH_DAY_DAY='/api/totalNotVerifiedSchoolsDistrictYearMonthStartDateEndDate/';
// /api/totalNotVerifiedSchoolsDistrictYearMonthStartDateEndDate/:district/:mandal/:year/:month/:startDate/:endDate
const NOT_VERIFIED_SCHOOLS_DISTRICT_MANDAL_YEAR_MONTH_DAY_DAY='/api/totalNotVerifiedSchoolsDistrictYearMonthStartDateEndDate/';
