var classStudentTotalCount=0;
var totalStudentCount=0;
var ChartArrCount = new Array();
var ChartArrMonths = new Array();
var arrCount = new Array();
var arrMonths = new Array();
var date= new Date;
var month= date.getMonth();
var year = date.getFullYear();
var arrClasses= new Array();
var arrClassesStudentsCount= new Array();   
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
        totalStudentCount=data[0].total_students_count;
        console.log(totalStudentCount);
        document.getElementById('totalStudentCount').innerText=totalStudentCount;

    });
    //for classess bvs students count chart
    fetch(SERVER+CLASSES_STUDENTS_COUNT)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        //todo
       for(var i=0;i<10;i++){
         arrClasses.push(data[i].class);
         arrClassesStudentsCount.push(data[i].studentsCount);
         classStudentTotalCount = classStudentTotalCount + data[i].studentsCount;

       }
       document.getElementById('classWiseTotalStudentsCount').innerText=classStudentTotalCount;
       document.getElementById('studentCountVariance').innerText=totalStudentCount-classStudentTotalCount;
       console.log(classStudentTotalCount);
       console.log(totalStudentCount-classStudentTotalCount);
    });


    document.getElementById('studentCountVariance').innerText=totalStudentCount-classStudentTotalCount;
    
    
    
    //Total Number Of Staff
    fetch(SERVER+TOTAL_STAFF_COUNT)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        document.getElementById('totalNumberOfStaff').innerText=data[0].total_staff_count;
        //TO DO
        studentToStaffRatio = studentToStaffRatio / data[0].total_staff_count;
        studentToStaffRatio= Math.round(studentToStaffRatio);
        //STUDENTS TO STAFF RATIO
        document.getElementById('studenToStaffRaio').innerHTML='<strong>'+studentToStaffRatio+'</strong>';
        document.getElementById('studenToStaffRaio').classList.add("active")
    });

    
    

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
    //footer JS
    /*
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
          &copy;`
      var footerbuttom=`In <i class="fa fa-handshake-o"></i> with Government Of Telangana,
          <a href="twd.telangana.gov.in" target="_blank">Telangana Welfare Department</a> 
        </div>
      </div>`;   
      footer.appendChild(document.write(new Date().getFullYear());
      footer.appendChild(footerbuttom);*/



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

window.onscroll = function() {sideBarSticker()};
var sideBar = document.getElementById("sideBar");
//var sticky = sideBar.offsetTop; its value is 95 but for smooth effect direct value is instead of var 
function sideBarSticker() {

  if (window.pageYOffset >=95 ) {
    sideBar.classList.add("sticky");
  } else {
    sideBar.classList.remove("sticky");
  }
}

function charts(MarrCount,MarrMonths){
    var config = {
        type: 'line',
        data: {
          labels: MarrMonths,
          datasets: [{
            backgroundColor: 'rgb(255,255,255)',
            borderColor: 'rgb(255,255,255)',
            pointBackgroundColor:'rgb(255,255,255)',
            pointBorderColor:'rgb(255,255,255)',
            data: MarrCount,
            fill: false,
          }]
        },
        options: {
          responsive: true,
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Month'
              }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    steps: 5,
                    stepValue: 100,
                    max: 500,
                },                
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value'
              }
            }]
          }
        }
      };
    

    var ctx = document.getElementById('chartJSLINE').getContext('2d');
  window.myLine = new Chart(ctx, config);
}