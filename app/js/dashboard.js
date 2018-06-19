var arrCount = new Array();
var arrMonths = new Array();
var date= new Date;
var month= date.getMonth();
var year = date.getFullYear();
   
document.addEventListener('DOMContentLoaded', function() {
    var studentToStaffRatio;
    //Total Number of Schools Tag
    fetch(SERVER+TOTAL_SCHOOLS_COUNT)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        document.getElementById('totalNumberOfSchools').innerText=data[0].total_schools_count;
    });
    //Total Number Of Students
    fetch(SERVER+TOTAL_STUDENTS_COUNT)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        document.getElementById('totalNumberOfStudents').innerText=data[0].total_students_count;
        studentToStaffRatio=data[0].total_students_count;

    });
    
    //Total Number Of Staff
    fetch(SERVER+TOTAL_STAFF_COUNT)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        document.getElementById('totalNumberOfStaff').innerText=data[0].total_staff_count;
        //TO DO
        studentToStaffRatio = studentToStaffRatio / data[0].total_staff_count;
        console.log(studentToStaffRatio);

    });

    //STUDENTS TO STAFF RATIO
    document.getElementById('studenToStaffRaio').innerHTML=studentToStaffRatio;

    //Total Number Of ATWOs
    fetch(SERVER+TOTAL_ATWOS_COUNT)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        document.getElementById('totalNumberOfATWOs').innerText=data[0].total_ATWOs_count;
        
    });

    //Total Number Of DTWOs
    fetch(SERVER+TOTAL_DTWOS_COUNT)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        document.getElementById('totalNumberOfDTWOs').innerText=data[0].total_DTWOs_count;
        
    }); 
    //TODO

    //For total number of Schools verified in last 6 months
    for(i=6; i>0;i--){
        if(month==0){
            //Since the GetMonth Return 0-11 we correct it to 1-12 to get right data from server
            var Amonth= month+1;
            getTotalNumberOfSchoolsVerifiedYearMonth(year,Amonth);        
            month=11;
            year=year-1;
        }
        else
        {
            var Amonth= month+1;
            getTotalNumberOfSchoolsVerifiedYearMonth(year,Amonth);   
            month--;   
        }
    }
    console.log(arrCount);
    console.log(arrMonths);
    //footer JS
    var footer= document.getElementById("footer");
    footer.innerHTML=
        `<div class="container-fluid" style="background:#eee;>
        <nav class="float-left">
          <ul>
            <li>
              <a href="#Developers">
                DESIGNED AND DEVELOPED BY
              </a>
            </li>
            <li>
              <a href="mailto:j.kishor.bd@gmail.com">
                Nanda Kishor Jeripothula
              </a>
            </li>
            <li>
              <a href="mailto:krishnakathala@gmail.com">
                Krishna Chaitanya Rao Kathala
              </a>
            </li>
            <li>
              <a href="#Developers">
                LINK EXTRA HERE
              </a>
            </li>
            <li>
              <a href="#">
                SOMEEXTRA content
              </a>
            </li>
          </ul>
        </nav>
        <div class="copyright float-right">
          &copy;
          <script>
            document.write(new Date().getFullYear())
          </script>, In <i class="fa fa-handshake-o"></i> with Government Of Telangana,
          <a href="twd.telangana.gov.in" target="_blank">Telangana Welfare Department</a> 
        </div>
      </div>`;   

});
  function getTotalNumberOfSchoolsVerifiedYearMonth(Ryear,Rmonth){
    arrMonths.push(Rmonth);
    Rmonth=Rmonth.toString();
    Rmonth=Rmonth.padStart(2,'0');
    fetch(SERVER+TOTAL_NUMBER_OF_SCHOOLS_VERIFIED_YEAR_MONTH+'/'+Ryear+'/'+Rmonth)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        arrCount.push(data[0].total_num_of_schools_verified);
        
    });
}