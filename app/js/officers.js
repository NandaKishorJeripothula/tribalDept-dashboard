$(document).ready(function(){
    $('.collapsible').collapsible();
    $('select').material_select();
    //NUMBER OF REPORTS SUBMITTED
    {
            {
            //Years Present -1 , present and present +1
            var date= new Date();
            var $pastYear= date.getFullYear()-1;
            $options="";
            for(var i=0;i<2;i++,$pastYear++){
                $options =$options+ "<option value='"+$pastYear+"'>"+$pastYear+"</option>";
            }
            $('#yearNumberOfReportsSubmitted').append($options);
            $("#yearNumberOfReportsSubmitted").material_select();
            }
                    
            $('.collapsible #getDataNumberOfReportsSubmitted').on('click', function(e) {
                        
                        e.stopPropagation();
                        var year=$("#yearNumberOfReportsSubmitted").find(":selected").val();
                        var month=$("#monthNumberOfReportsSubmitted").find(":selected").val();
                        var startDate=$("#startDateNumberOfReportsSubmitted").find(":selected").val();
                        var endDate=$("#endDateNumberOfReportsSubmitted").find(":selected").val();
                        console.log("getdata"+year+month+startDate+endDate);
                        //IF NONE SELECTED RETRIEVE ALL
                        if(year!="null" && month!="null" && startDate=="null" && endDate=="null"){   
                            //renderTable(Stirng:"#id Of div",API_URL)
                            renderTableNumberOfReportsSubmitted("#numberOfReportsSubmitted",SERVER+NUMBER_OF_REPORTS_SUBMITTED_YEAR_MONTH+year+"/"+month);
                        }else if(year!="null" && month!="null" && startDate!="null" && endDate!="null"){   
                            //renderTable(Stirng:"#id Of div",API_URL)
                            renderTableNumberOfReportsSubmitted("#numberOfReportsSubmitted",SERVER+NUMBER_OF_REPORTS_SUBMITTED_YEAR_MONTH_DAY_DAY+year+"/"+month+"/"+startDate+"/"+endDate);
                        };
            });
            //ON PRINT BUTTON > ACTIONS 
            $('.collapsible #printNumberOfReportsSubmitted').on('click',function(e){
                e.stopPropagation();
                //PRINT FUNCTION IS JS FUNTION NOT JQUERY SO DONT ADD #
                var printDiv="numberOfReportsSubmittedCard";
                printData(printDiv);
            });
    }

    //Officers REPORTS SUBMITTED
    {
        {
        //Years Present -1 , present and present +1
        var date= new Date();
        var $pastYear= date.getFullYear()-1;
        $options="";
        for(var i=0;i<2;i++,$pastYear++){
            $options =$options+ "<option value='"+$pastYear+"'>"+$pastYear+"</option>";
        }
        $('#yearOfficersReportsNotSubmitted').append($options);
        $("#yearOfficersReportsNotSubmitted").material_select();
        }
                
        $('.collapsible #getDataOfficersReportsNotSubmitted').on('click', function(e) {
                    
                    e.stopPropagation();
                    var year=$("#yearOfficersReportsNotSubmitted").find(":selected").val();
                    var month=$("#monthOfficersReportsNotSubmitted").find(":selected").val();
                    var startDate=$("#startDateOfficersReportsNotSubmitted").find(":selected").val();
                    var endDate=$("#endDateOfficersReportsNotSubmitted").find(":selected").val();
                    console.log("getdata"+year+month+startDate+endDate);
                    //IF NONE SELECTED RETRIEVE ALL
                    if(year!="null" && month!="null" && startDate=="null" && endDate=="null"){   
                        //renderTable(Stirng:"#id Of div",API_URL)
                        renderTableOfficersReportsNotSubmitted("#officersReportsNotSubmitted",SERVER+OFFICERS_REPORTS_NOT_SUBMITTED_YEAR_MONTH+year+"/"+month);
                    }else if(year!="null" && month!="null" && startDate!="null" && endDate!="null"){   
                        //renderTable(Stirng:"#id Of div",API_URL)
                        renderTableOfficersReportsNotSubmitted("#officersReportsNotSubmitted",SERVER+OFFICERS_REPORTS_NOT_SUBMITTED_YEAR_MONTH_DAY_DAY+year+"/"+month+"/"+startDate+"/"+endDate);
                    };
        });
        //ON PRINT BUTTON > ACTIONS 
        $('.collapsible #printNumberOfReportsSubmitted').on('click',function(e){
            e.stopPropagation();
            //PRINT FUNCTION IS JS FUNTION NOT JQUERY SO DONT ADD #
            var printDiv="officersReportsNotSubmittedCard";
            printData(printDiv);
        });
    }

    //VEIW REPORTS OF OFFCIER
    {
        //Loading Districts
        $.get(SERVER+DISTRICTS, function(data, status){
            var jsonData = $.parseJSON(data);
            var $options="";
            $(jsonData).each(function (index, o) {    
                $options =$options+ "<option value='"+o.district+"'>"+o.district+"</option>";
            });
            $('#districtsViewReportsOfOfficer').append($options);
            $("#districtsViewReportsOfOfficer").material_select();
        });
        //Loading ATWO DTWO
        $.get(SERVER+OFFICERS, function(data, status){
            var jsonData = $.parseJSON(data);
            var $options="";
            $(jsonData).each(function (index, o) {    
                $options =$options+ "<option value='"+o.officer+"'>"+o.officer+"</option>";
            });
            $('#officersViewReportsOfOfficer').append($options);
            $("#officersViewReportsOfOfficer").material_select();
        });
        {
        //Years Present -1 , present and present +1
        var date= new Date();
        var $pastYear= date.getFullYear()-1;
        $options="";
        for(var i=0;i<2;i++,$pastYear++){
            $options =$options+ "<option value='"+$pastYear+"'>"+$pastYear+"</option>";
        }
        $('#yearViewReportsOfOfficer').append($options);
        $("#yearViewReportsOfOfficer").material_select();
        }
                
        $('.collapsible #getDataViewReportsOfOfficer').on('click', function(e) {
                    e.stopPropagation();
                    var year=$("#yearViewReportsOfOfficer").find(":selected").val();
                    var month=$("#monthViewReportsOfOfficer").find(":selected").val();
                    var startDate=$("#startDateViewReportsOfOfficer").find(":selected").val();
                    var endDate=$("#endDateViewReportsOfOfficer").find(":selected").val();
                    var district=$("#districtsViewReportsOfOfficer").find(":selected").val();
                    var officer=$("#officersViewReportsOfOfficer").find(":selected").val();
                    console.log("getdata"+year+month+startDate+endDate);
                    //IF NONE SELECTED RETRIEVE ALL
                    if(year!="null" && month!="null" && district!="null" && officer=="null" && startDate=="null" && endDate=="null"){   
                        //renderTable(Stirng:"#id Of div",API_URL)
                        renderTableViewReportsOfOfficer("#viewReportsOfOfficer",SERVER+VIEW_REPORTS_OF_OFFICER_YEAR_MONTH_DISTRICT+year+"/"+month+"/"+district);
                    }else if(year!="null" && month!="null" && district=="null" && officer!="null" && startDate=="null" && endDate=="null"){   
                        //renderTable(Stirng:"#id Of div",API_URL)
                        renderTableViewReportsOfOfficer("#viewReportsOfOfficer",SERVER+VIEW_REPORTS_OF_OFFICER_YEAR_MONTH_OFFICER+year+"/"+month+"/"+officer);
                    }else if(year!="null" && month!="null" && district!="null" && officer=="null" && startDate!="null" && endDate!="null"){   
                        //renderTable(Stirng:"#id Of div",API_URL)
                        renderTableViewReportsOfOfficer("#viewReportsOfOfficer",SERVER+VIEW_REPORTS_OF_OFFICER_YEAR_MONTH_DAY_DAY_DISTRICT+year+"/"+month+"/"+startDate+"/"+endDate+"/"+district);
                    }else if(year!="null" && month!="null" && district=="null" && officer!="null" && startDate!="null" && endDate!="null"){   
                        //renderTable(Stirng:"#id Of div",API_URL)
                        renderTableViewReportsOfOfficer("#viewReportsOfOfficer",SERVER+VIEW_REPORTS_OF_OFFICER_YEAR_MONTH_DAY_DAY_OFFICER+year+"/"+month+"/"+startDate+"/"+endDate+"/"+officer);
                    }else if(year!="null" && month!="null" && district!="null" && officer!="null" && startDate!="null" && endDate!="null"){   
                        
                        //EVEN DFF DISTRICT AND OFFICER SELECETD ALSO ONLY OFFICERS REPORTS GOT PRIORITIGED 
                        //renderTable(Stirng:"#id Of div",API_URL)
                        renderTableViewReportsOfOfficer("#viewReportsOfOfficer",SERVER+VIEW_REPORTS_OF_OFFICER_YEAR_MONTH_DAY_DAY_OFFICER+year+"/"+month+"/"+startDate+"/"+endDate+"/"+officer);
                    };
        });
        //ON PRINT BUTTON > ACTIONS 
        $('.collapsible #printViewReportsOfOfficer').on('click',function(e){
            e.stopPropagation();
            //PRINT FUNCTION IS JS FUNTION NOT JQUERY SO DONT ADD #
            var printDiv="viewReportsOfOfficerCard";
            printData(printDiv);
        });
    }
    //FOR RENDERING JSON DATA TO TABLES
    function renderTable(divId,api){
    $.get(api,function(data,status){
        console.log(data.length);
        var jsonData = $.parseJSON(data);
        //EMPTY BEFORE LOADING DATA OUTSIDE LOOP
        $(divId).empty();
        console.log(jsonData.length);
        // WHEN NO RECORDS FOUND
        if(jsonData.length==0){
            var NODATA="NO_DATA_AVAILABLE";
            for(var i=0;i<5;i++){
                var row= $('<tr/>');               
                // ADD TABLE ROW ELEMENT     
                $(divId).append(row);
                row.append($("<td>"+NODATA+"</td>"));
                row.append($("<td>"+NODATA+"</td>"));
                row.append($("<td>"+NODATA+"</td>"));
                row.append($("<td>"+NODATA+"</td>"));
                row.append($("<td>"+NODATA+"</td>"));
            }        
        }else{
            // WHEN RECORDS ARE FOUND
            $(jsonData).each(function(index,o){
                var row= $('<tr />');               
                // ADD TABLE ROW ELEMENT     
                $(divId).append(row);
                row.append($("<td>"+o.district+"</td>"));
                row.append($("<td>"+o.mandal+"</td>"));
                row.append($("<td>"+o.village+"</td>"));
                row.append($("<td>"+o.school_name+"</td>"));
                row.append($("<td>"+o.total_number_of_students+"</td>"));
            });
        }    
    });    

    }//renderTable 


    function renderTableNumberOfReportsSubmitted(divId,api){
        $.get(api,function(data,status){
            var jsonData = $.parseJSON(data);
            //EMPTY BEFORE LOADING DATA OUTSIDE LOOP
            $(divId).empty();
            console.log(jsonData.length);
            // WHEN NO RECORDS FOUND
            if(jsonData.length==0){
                var NODATA="NO_DATA_AVAILABLE";
                for(var i=0;i<4;i++){
                    var row= $('<tr/>');               
                    // ADD TABLE ROW ELEMENT     
                    $(divId).append(row);
                    row.append($("<td>"+NODATA+"</td>"));
                    row.append($("<td>"+NODATA+"</td>"));
                    row.append($("<td>"+NODATA+"</td>"));
                    row.append($("<td>"+NODATA+"</td>"));
                }        
            }else{
                // WHEN RECORDS ARE FOUND
                $(jsonData).each(function(index,o){
                    var row= $('<tr />');               
                    // ADD TABLE ROW ELEMENT     
                    $(divId).append(row);
                    row.append($("<td>"+o.district+"</td>"));
                    row.append($("<td>"+o.name+"</td>"));
                    row.append($("<td>"+o.designation+"</td>"));
                    row.append($("<td>"+o.number_of_reports_submitted+"</td>"));
                });
            }    
        });    
    
        }//renderTableNumberOfReportsSubmitted 
    function renderTableOfficersReportsNotSubmitted(divId,api){
        $.get(api,function(data,status){
            var jsonData = $.parseJSON(data);
            //EMPTY BEFORE LOADING DATA OUTSIDE LOOP
            $(divId).empty();
            console.log(jsonData.length);
            // WHEN NO RECORDS FOUND
            if(jsonData.length==0){
                var NODATA="NO_DATA_AVAILABLE";
                for(var i=0;i<4;i++){
                    var row= $('<tr/>');               
                    // ADD TABLE ROW ELEMENT     
                    $(divId).append(row);
                    row.append($("<td>"+NODATA+"</td>"));
                    row.append($("<td>"+NODATA+"</td>"));
                    row.append($("<td>"+NODATA+"</td>"));
                    row.append($("<td>"+NODATA+"</td>"));
                }        
            }else{
                // WHEN RECORDS ARE FOUND
                $(jsonData).each(function(index,o){
                    var row= $('<tr />');               
                    // ADD TABLE ROW ELEMENT     
                    $(divId).append(row);
                    row.append($("<td>"+o.name+"</td>"));
                    row.append($("<td>"+o.designation+"</td>"));
                    row.append($("<td>"+o.phone_number+"</td>"));
                    row.append($("<td>"+o.email+"</td>"));
                });
            }    
        });    
    
    }//renderTableOfficersReportsNotSubmitted 
    
        
    function renderTableViewReportsOfOfficer(divId,api){
        $.get(api,function(data,status){
            var jsonData = $.parseJSON(data);
            //EMPTY BEFORE LOADING DATA OUTSIDE LOOP
            $(divId).empty();
            console.log(jsonData.length);
            // WHEN NO RECORDS FOUND
            if(jsonData.length==0){
                var NODATA="NO_DATA_AVAILABLE";
                for(var i=0;i<4;i++){
                    var row= $('<tr/>');               
                    // ADD TABLE ROW ELEMENT     
                    $(divId).append(row);
                    row.append($("<td>"+NODATA+"</td>"));
                    row.append($("<td>"+NODATA+"</td>"));
                    row.append($("<td>"+NODATA+"</td>"));
                    row.append($("<td>"+NODATA+"</td>"));
                }        
            }else{
                // WHEN RECORDS ARE FOUND
                $(jsonData).each(function(index,o){
                    var row= $('<tr />');               
                    // ADD TABLE ROW ELEMENT     
                    $(divId).append(row);
                    row.append($("<td>"+o.district+"</td>"));
                    row.append($("<td>"+o.officer_name+"</td>"));
                    row.append($("<td>"+o.designation+"</td>"));
                    row.append($("<td>"+o.institution_name+"</td>"));
                    row.append($("<td>"+o.dateTime+"</td>"));
                    row.append($("<td><a href='http://119.226.159.123/tribalwelfare/inspection/inspectdata/"+o.report_id+"/getSubmitReport/'>See Report</a></td>"));
                });
            }    
        });    
    
    }//renderTableViewReportsOfOfficer 
    
    //PRINT FUNCTION    
    function printData(printDivId){
        var divToPrint=document.getElementById(printDivId);
        var footer=document.getElementById("footer_JS");
        var htmlToPrint = 
        `
        <style type="text/css">
        
        form { 
            display: none;
            }
        table {
            width: 100%;
            padding:5px;
            border: 1px solid #eeeeee;
            }
            
            th {
            display: flex;
            width: 100%;
            padding: 12px 8px;
            }
            
            tr {
            display: flex;
            width: 100%;
            padding: 12px 8px;
            }
            tr:nth-of-type(odd) {
            background: #eeeeee;
            }
            
            td,th {
            flex: 1 1 20%;
            }
            
            th {
            text-transform: uppercase;
            color:#fefefe;
            }
        </style>  
        `
        ;
        htmlToPrint += divToPrint.outerHTML;
        newWin= window.open("");
        newWin.document.write(htmlToPrint);
        newWin.print();
        newWin.close();
    }
    
});
      