
window.onscroll = function() {sideBarSticker()};
var sideBar = document.getElementById("sideMenu");
//var sticky = sideBar.offsetTop; its value is 95 but for smooth effect direct value is instead of var 
function sideBarSticker() {

  if (window.pageYOffset >=95 ) {
    sideBar.classList.add("sticky");
  } else {
    sideBar.classList.remove("sticky");
  }
}
 
document.addEventListener('DOMContentLoaded', function() {
    //HEADER A.K.A Banner
    {document.getElementById('header').innerHTML=
    `
    <div class="extra_wrapper hide-on-med-and-down" >
        <nav class="grey-text text-darken-2" style="background: orangered;">
                <div class="container-fluid">
                    <div class="nav-wrapper">
                        <div class="left hide-on-med-and-down">
                            <img src="/media/cm.png" alt="CM" class="circle responsive-img" alt="LOGO" style="width:70px;">
                            <h6>
                                <small>K. Chandra Sekhar Rao , &nbsp;&nbsp;&nbsp;&nbsp; Hon'ble Cheif Minister of Telangana</small>
                            </h6>
                        </div>  
                        <div class="right hide-on-med-and-down  text-right">
                            <img src="/media/minister.jpg" alt="MINISTER" class="circle responsive-img" alt="LOGO" style="width:70px;height: auto;">
                            <h6>
                                <small>
                                    Azmeera Chandulal ,&nbsp;&nbsp;&nbsp;&nbsp; Hon'ble Minister of Tribal Welfare Telangana
                                </small>
                            </h6>
                        </div>
                        <div class="navbar-brand center brand-logo">
                            <img src="/media/loginBanner.png" class="" style="width: 280px;">
                            <h3 class="black-text text-lighten-2 hide-on-med-and-down">Tribal Welfare Educational Institutions Inspection App</h4>
                        </div>
                    </div>

                </div>
            </nav>
            </div>
    `;
    }
    //SIDE MENU
    {document.getElementById('sideMenu').innerHTML=`
            <div class="sidebar" id="sideBar" data-color="purple" data-background-color="white" data-image="media/sidebar.jpg">
            <!--
                Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"
        
                Tip 2: you can also add an image using data-image tag
            -->
            <div class="logo">
                <a href="/dashboard" class="simple-text logo-normal">
                <img src="/media/logo.png" alt="Dept Logo">
                Tribal Welfare
                </a>
            </div>
            <div class="sidebar-wrapper">
                <ul class="nav">
                <li class="nav-item" id="dashboard">
                    <a class="nav-link" href="/dashboard">
                    <i class="material-icons">dashboard</i>
                    <p>Dashboard</p>
                    </a>
                </li>
                <li class="nav-item " id="institutions">
                    <a class="nav-link" href="/institutions">
                    <i class="material-icons">account_balance</i>
                    <p>Institutions</p>
                    </a>
                </li>
                <li class="nav-item " id="map">
                    <a class="nav-link" href="/map">
                    <i class="material-icons">location_ons</i>
                    <p>Map</p>
                    </a>
                </li>
                <li class="nav-item " id="officers">
                    <a class="nav-link" href="/officers">
                    <i class="material-icons">how_to_reg</i>
                    <p>Officers</p>
                    </a>
                </li>
                <li class="nav-item " id="staff">
                    <a class="nav-link" href="/staff">
                    <i class="material-icons">people</i>
                    <p>Staff</p>
                    </a>
                </li>
                <li class="nav-item " id="provision">
                    <a class="nav-link" href="/provision">
                    <i class="material-icons">widgets</i>
                    <p>Provision</p>
                    </a>
                </li>
                <li class="nav-item " id="medical">
                    <a class="nav-link" href="/medical">
                    <i class="material-icons">favorite</i>
                    <p>Medical</p>
                    </a>
                </li>
                
                <li class="nav-item " id="infrastructure"  >
                    <a class="nav-link" href="/infrastructure">
                        <i class="material-icons">build</i>
                        <p>Infrastructure</p>
                    </a>
                </li>
                <li class="nav-item active-pro " id="aboutus ">
                        <a class="nav-link" href="/aboutus">
                            <i class="material-icons">ac_unit</i>
                            <p>About Us</p>
                        </a>
                    </li>
                </ul>
            </div>
            </div>
    `;
    }
    //Code to set the Side Menu Nav Item ACTIVE
    {
    if(window.location.href.match(/institutions/g)){
        document.getElementById('institutions').classList.add("active");
    }else if(window.location.href.match(/map/g)){
        document.getElementById('map').classList.add("active");
    }else if(window.location.href.match(/officers/g)){
        document.getElementById('officers').classList.add("active");
    }else if(window.location.href.match(/staff/g)){
        document.getElementById('staff').classList.add("active");
    }else if(window.location.href.match(/provision/g)){
        document.getElementById('provision').classList.add("active");
    }else if(window.location.href.match(/medical/g)){
        document.getElementById('medical').classList.add("active");
    }else if(window.location.href.match(/infrastructure/g)){
        document.getElementById('infrastructure').classList.add("active");
    }else if(window.location.href.match(/aboutus/g)){
        document.getElementById('aboutus').classList.add("active");
    }
    }
    //Main Panel
    {
    //Main Panel
    document.getElementById('mainPanel').innerHTML=`
    <div>
    <!-- Navbar -->
            <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div class="container-fluid">
                <div class="navbar-wrapper">
                    <a class="navbar-brand " id="miniNavBar"></a>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="navbar-toggler-icon icon-bar"></span>
                    <span class="navbar-toggler-icon icon-bar"></span>
                    <span class="navbar-toggler-icon icon-bar"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end">
                    <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="material-icons">person</i>
                        <span class="notification">4</span>
                        <p class="d-lg-none d-md-block">
                            User Profile
                        </p>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="#">Id:<%= user.id %>
                        <a class="dropdown-item" href="#">UserName:<%= user.username %></a>
                        <a class="dropdown-item" href="#">Password:<%= user.password %></a></a>
                        <a class="dropdown-item" href="/logout">Logout</a>
                        </div>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
            <!-- End Navbar -->
            <div class="content">
                <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="card card-stats">
                        <div class="card-header card-header-warning card-header-icon">
                        <div class="card-icon">
                            <i class="material-icons">account_balance</i>
                        </div>
                        <p class="card-category">Schools</p>
                        <h3 class="card-title" id='totalNumberOfSchools'>
                        </h3>
                        </div>
                        <div class="card-footer">
                        <div class="stats">
                            <i class="material-icons text-danger">check_circle</i>
                            <a href="#pablo">Total Number of Schools</a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="card card-stats">
                        <div class="card-header card-header-success card-header-icon">
                        <div class="card-icon">
                            <i class="material-icons">people</i>
                        </div>
                        <p class="card-category">Students / Staff</p>
                        <h6 class="card-title">
                            <small>
                            <small>
                                <span id='totalNumberOfStudents'></span>/
                                <span id='totalNumberOfStaff'></span>
                            </small>
                            </small>
                        </h6>
                        </div>
                        <div class="card-footer" style="height: 30px !important;">
                        <div class="stats">
                            <i class="material-icons">compare_arrows</i> Students to Staff Ratio &nbsp;&nbsp;
                            <h5 id="studenToStaffRaio">
                            </h5>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="card card-stats">
                        <div class="card-header card-header-danger card-header-icon">
                        <div class="card-icon">
                            <i class="material-icons">how_to_reg</i>
                        </div>
                        <p class="card-category">ATWOs</p>
                        <h3 class="card-title" id='totalNumberOfATWOs'></h3>
                        </div>
                        <div class="card-footer">
                        <div class="stats">
                            <i class="material-icons">contacts</i> Number Of ATWOs 
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="card card-stats">
                        <div class="card-header card-header-info card-header-icon">
                        <div class="card-icon">
                            <i class="material-icons">record_voice_over</i>
                        </div>
                        <p class="card-category">DTWOs</p>
                        <h3 class="card-title" id='totalNumberOfDTWOs'></h3>
                        </div>
                        <div class="card-footer">
                        <div class="stats">
                            <i class="material-icons">contacts</i> Number of DTWOs
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                    <div class="card card-chart">
                        <div class="card-header card-header-success">
                        <div class="ct-chart" id="dailySalesChart"></div>
                        </div>
                        <div class="card-body">
                        <h4 class="card-title">jfdhgsdhkfghklfs</h4>
                        <p class="card-category">
                            <span class="text-success"><i class="fa fa-long-arrow-up"></i> 55% </span> increase in today sales.</p>
                        </div>
                        <div class="card-footer">
                        <div class="stats">
                            <i class="material-icons">access_time</i> updated 4 minutes ago
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-4">
                    <div class="card card-chart">
                        <div class="card-header card-header-warning">
                        <div class="ct-chart" id="websiteViewsChart"></div>
                        </div>
                        <div class="card-body">
                        <h4 class="card-title">hjfgadshfjkass</h4>
                        <p class="card-category">Last Campaign Performance</p>
                        </div>
                        <div class="card-footer">
                        <div class="stats">
                            <i class="material-icons">access_time</i> campaign sent 2 days ago
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-4">
                    <div class="card card-chart">
                        <div class="card-header card-header-danger">
                        <div class="ct-chart" id="completedTasksChart"></div>
                        </div>
                        <div class="card-body">
                        <h4 class="card-title">dhdfsgds</h4>
                        <p class="card-category">Last Campaign Performance</p>
                        </div>
                        <div class="card-footer">
                        <div class="stats">
                            <i class="material-icons">access_time</i> campaign sent 2 days ago
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <!--Chart.js Charts STARTS Here-->
                <div class="row">
                    <canvas class="ct-chart" id="chartJSLINE"></canvas>
                    <div class="col-md-4">
                    <div class="card card-chart">
                        <div class="card-header card-header-success">
                        <canvas class="ct-chart" id="chartJSLINE"></canvas>
                        </div>
                        <div class="card-body">
                        <h4 class="card-title">chartJSLINE</h4>
                        <p class="card-category">
                            <span class="text-success"><i class="fa fa-long-arrow-up"></i> 55% </span> increase in today sales.</p>
                        </div>
                        <div class="card-footer">
                        <div class="stats">
                            <i class="material-icons">access_time</i> updated 4 minutes ago
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-4">
                    <div class="card card-chart">
                        <div class="card-header card-header-warning">
                        <div class="ct-chart" id="websiteViewsChart"></div>
                        </div>
                        <div class="card-body">
                        <h4 class="card-title my-cool-point"></h4>
                        <p class="card-category">Last Campaign Performance</p>
                        </div>
                        <div class="card-footer">
                        <div class="stats">
                            <i class="material-icons">access_time</i> campaign sent 2 days ago
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-4">
                    <div class="card card-chart">
                        <div class="card-header card-header-danger">
                        <div class="ct-chart" id="completedTasksChart"></div>
                        </div>
                        <div class="card-body">
                        <h4 class="card-title">dhdfsgds</h4>
                        <p class="card-category">Last Campaign Performance</p>
                        </div>
                        <div class="card-footer">
                        <div class="stats">
                            <i class="material-icons">access_time</i> campaign sent 2 days ago
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <!--Chart.js Charts ENDS Here-->
                
                <div class="row">
                    <div class="col-lg-6 col-md-12">
                    <div class="card">
                        <div class="card-header card-header-tabs card-header-primary">
                        <div class="nav-tabs-navigation">
                            <div class="nav-tabs-wrapper">
                            <span class="nav-tabs-title">Tasks:</span>
                            <ul class="nav nav-tabs" data-tabs="tabs">
                                <li class="nav-item">
                                <a class="nav-link active" href="#profile" data-toggle="tab">
                                    <i class="material-icons">bug_report</i> Bugs
                                    <div class="ripple-container"></div>
                                </a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" href="#messages" data-toggle="tab">
                                    <i class="material-icons">code</i> Website
                                    <div class="ripple-container"></div>
                                </a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" href="#settings" data-toggle="tab">
                                    <i class="material-icons">cloud</i> Server
                                    <div class="ripple-container"></div>
                                </a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </div>
                        <div class="card-body">
                        <div class="tab-content">
                            <div class="tab-pane active" id="profile">
                            <table class="table">
                                <tbody>
                                <tr>
                                    <td>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                        <input class="form-check-input" type="checkbox" value="" checked>
                                        <span class="form-check-sign">
                                            <span class="check"></span>
                                        </span>
                                        </label>
                                    </div>
                                    </td>
                                    <td>Sign contract for "What are conference organizers afraid of?"</td>
                                    <td class="td-actions text-right">
                                    <button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-link btn-sm">
                                        <i class="material-icons">edit</i>
                                    </button>
                                    <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-sm">
                                        <i class="material-icons">close</i>
                                    </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                        <input class="form-check-input" type="checkbox" value="">
                                        <span class="form-check-sign">
                                            <span class="check"></span>
                                        </span>
                                        </label>
                                    </div>
                                    </td>
                                    <td>Lines From Great Russian Literature? Or E-mails From My Boss?</td>
                                    <td class="td-actions text-right">
                                    <button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-link btn-sm">
                                        <i class="material-icons">edit</i>
                                    </button>
                                    <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-sm">
                                        <i class="material-icons">close</i>
                                    </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                        <input class="form-check-input" type="checkbox" value="">
                                        <span class="form-check-sign">
                                            <span class="check"></span>
                                        </span>
                                        </label>
                                    </div>
                                    </td>
                                    <td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit
                                    </td>
                                    <td class="td-actions text-right">
                                    <button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-link btn-sm">
                                        <i class="material-icons">edit</i>
                                    </button>
                                    <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-sm">
                                        <i class="material-icons">close</i>
                                    </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                        <input class="form-check-input" type="checkbox" value="" checked>
                                        <span class="form-check-sign">
                                            <span class="check"></span>
                                        </span>
                                        </label>
                                    </div>
                                    </td>
                                    <td>Create 4 Invisible User Experiences you Never Knew About</td>
                                    <td class="td-actions text-right">
                                    <button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-link btn-sm">
                                        <i class="material-icons">edit</i>
                                    </button>
                                    <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-sm">
                                        <i class="material-icons">close</i>
                                    </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                            <div class="tab-pane" id="messages">
                            <table class="table">
                                <tbody>
                                <tr>
                                    <td>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                        <input class="form-check-input" type="checkbox" value="" checked>
                                        <span class="form-check-sign">
                                            <span class="check"></span>
                                        </span>
                                        </label>
                                    </div>
                                    </td>
                                    <td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit
                                    </td>
                                    <td class="td-actions text-right">
                                    <button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-link btn-sm">
                                        <i class="material-icons">edit</i>
                                    </button>
                                    <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-sm">
                                        <i class="material-icons">close</i>
                                    </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                        <input class="form-check-input" type="checkbox" value="">
                                        <span class="form-check-sign">
                                            <span class="check"></span>
                                        </span>
                                        </label>
                                    </div>
                                    </td>
                                    <td>Sign contract for "What are conference organizers afraid of?"</td>
                                    <td class="td-actions text-right">
                                    <button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-link btn-sm">
                                        <i class="material-icons">edit</i>
                                    </button>
                                    <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-sm">
                                        <i class="material-icons">close</i>
                                    </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                            <div class="tab-pane" id="settings">
                            <table class="table">
                                <tbody>
                                <tr>
                                    <td>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                        <input class="form-check-input" type="checkbox" value="">
                                        <span class="form-check-sign">
                                            <span class="check"></span>
                                        </span>
                                        </label>
                                    </div>
                                    </td>
                                    <td>Lines From Great Russian Literature? Or E-mails From My Boss?</td>
                                    <td class="td-actions text-right">
                                    <button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-link btn-sm">
                                        <i class="material-icons">edit</i>
                                    </button>
                                    <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-sm">
                                        <i class="material-icons">close</i>
                                    </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                        <input class="form-check-input" type="checkbox" value="" checked>
                                        <span class="form-check-sign">
                                            <span class="check"></span>
                                        </span>
                                        </label>
                                    </div>
                                    </td>
                                    <td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit
                                    </td>
                                    <td class="td-actions text-right">
                                    <button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-link btn-sm">
                                        <i class="material-icons">edit</i>
                                    </button>
                                    <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-sm">
                                        <i class="material-icons">close</i>
                                    </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                        <input class="form-check-input" type="checkbox" value="" checked>
                                        <span class="form-check-sign">
                                            <span class="check"></span>
                                        </span>
                                        </label>
                                    </div>
                                    </td>
                                    <td>Sign contract for "What are conference organizers afraid of?"</td>
                                    <td class="td-actions text-right">
                                    <button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-link btn-sm">
                                        <i class="material-icons">edit</i>
                                    </button>
                                    <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-sm">
                                        <i class="material-icons">close</i>
                                    </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-lg-6 col-md-12">
                    <div class="card">
                        <div class="card-header card-header-warning">
                        <h4 class="card-title">Employees Stats</h4>
                        <p class="card-category">New employees on 15th September, 2016</p>
                        </div>
                        <div class="card-body table-responsive">
                        <table class="table table-hover">
                            <thead class="text-warning">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Salary</th>
                            <th>Country</th>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Dakota Rice</td>
                                <td>$36,738</td>
                                <td>Niger</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Minerva Hooper</td>
                                <td>$23,789</td>
                                <td>Curaçao</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Sage Rodriguez</td>
                                <td>$56,142</td>
                                <td>Netherlands</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Philip Chaney</td>
                                <td>$38,735</td>
                                <td>Korea, South</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <footer class="footer">
                <div class="container-fluid">
                    <nav class="float-left black-text navbar navbar-expand-lg navbar-transparent">
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
                    </div>
            </footer>
    </div>`;
    }
    
    document.getElementById('miniNavBar').innerText=document.title;
    //Footer JS
    {
    var footerContentA=`
    <div class="container-fluid">
        <nav class="float-left black-text navbar navbar-expand-lg navbar-transparent">
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
        `;
    var footerContentC=`, In <i class="fa fa-handshake-o"></i> with Government Of Telangana,
        <a href="twd.telangana.gov.in" target="_blank">Telangana Welfare Department</a> 
        </div>
    </div>
    `
    var date=new Date();
    var footerContentB=date.getFullYear();

    var footerContent=footerContentA+footerContentB+footerContentC;
    if(document.getElementById('mainPanel')) document.getElementById('footer_JS').innerHTML=footerContent;
    }
    //CODE TO SET THE MINI NAV BAR ( NAV CONTAINING LOGOUT BUTTON  )
    {

    }
    document.getElementById('miniNavBar').innerText=document.title;

});