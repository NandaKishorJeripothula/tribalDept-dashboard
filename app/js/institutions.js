$(document).ready(function(){
    $('.collapsible').collapsible();
    $('select').material_select();
    
    //Registered Institutions
    {
        //Loading Districts
        $.get(SERVER+DISTRICTS, function(data, status){
            var jsonData = $.parseJSON(data);
            var $options="";
            $(jsonData).each(function (index, o) {    
                $options =$options+ "<option value='"+o.district+"'>"+o.district+"</option>";
            });
            $('#districtsRegisteredInstitutions').append($options);
            $("#districtsRegisteredInstitutions").material_select();
        });
        //Listen to change in district and load mandals accordingly
        $(document).on('change','#districtsRegisteredInstitutions', function(){
                //GET SELECTED DISTRICT NAME
                var district = $('#districtsRegisteredInstitutions').find(":selected").val();
                $.get(SERVER+MANDALS+district,function(data,status){
                    var jsonData = $.parseJSON(data);
                    var $options="";
                    $(jsonData).each(function (index, o) {    
                        $options =$options+ "<option value='"+o.mandal+"'>"+o.mandal+"</option>";
                    });
                    $('#mandalsRegisteredInstitutions').empty();
                    //ADD NULL OPTION AGAIN 
                    $('#mandalsRegisteredInstitutions').append($('<option value="null" disabled selected>Choose Mandal</option>'));
                    $('#mandalsRegisteredInstitutions').append($options);
                    $('#mandalsRegisteredInstitutions').material_select();
                });
        })
            
        $('.collapsible #getDataRegisteredInstitutions').on('click', function(e) {
                    e.stopPropagation();
                    var district= $("#districtsRegisteredInstitutions").find(":selected").val();
                    var mandal= $("#mandalsRegisteredInstitutions").find(":selected").val();
                    //IF NONE SELECTED RETRIEVE ALL
                    if(district=="null" && mandal=="null"){
                        //renderTable(Stirng:"#id Of div",API_URL)
                        renderTable("#registeredInstitutions",SERVER+REGISTERED_SCHOOLS);
                    }else if(district!=null && mandal=="null"){   
                        //renderTable(Stirng:"#id Of div",API_URL)
                        renderTable("#registeredInstitutions",SERVER+REGISTERED_SCHOOLS_DISTRICT+district);
                    }else if(district!="null" && mandal!="null"){
                        //renderTable(Stirng:"#id Of div",API_URL)
                        renderTable("#registeredInstitutions",SERVER+REGISTERED_SCHOOLS_DISTRICT_MANDAL+district+'/'+mandal);
                    };
        });
        //ON PRINT BUTTON > ACTIONS 
        $('.collapsible #printRegisteredInstitutions').on('click',function(e){
            e.stopPropagation();
            //PRINT FUNCTION IS JS FUNTION NOT JQUERY SO DONT ADD #
            var printDiv="registeredInstitutionsCard";
            printData(printDiv);
        });
        
    }// Registered Schools

    //Verified Institutions
    {
        //Loading Districts
        $.get(SERVER+DISTRICTS, function(data, status){
            var jsonData = $.parseJSON(data);
            var $options="";
            $(jsonData).each(function (index, o) {    
                $options =$options+ "<option value='"+o.district+"'>"+o.district+"</option>";
            });
            $('#districtsVerifiedInstitutions').append($options);
            $("#districtsVerifiedInstitutions").material_select();
        });
        //Listen to change in district and load mandals accordingly
        $(document).on('change','#districtsVerifiedInstitutions', function(){
                //GET SELECTED DISTRICT NAME
                var district = $('#districtsVerifiedInstitutions').find(":selected").val();
                $.get(SERVER+MANDALS+district,function(data,status){
                    var jsonData = $.parseJSON(data);
                    var $options="";
                    $(jsonData).each(function (index, o) {    
                        $options =$options+ "<option value='"+o.mandal+"'>"+o.mandal+"</option>";
                    });
                    $('#mandalsVerifiedInstitutions').empty();
                    //ADD NULL OPTION AGAIN 
                    $('#mandalsVerifiedInstitutions').append($('<option value="null" disabled selected>Choose Mandal</option>'));
                    $('#mandalsVerifiedInstitutions').append($options);
                    $('#mandalsVerifiedInstitutions').material_select();
                });
        });
        
        //Year Coloumn
        {
        //Years Present -1 , present and present +1
        var date= new Date();
        var $pastYear= date.getFullYear()-1;
        $options="";
        for(var i=0;i<3;i++,$pastYear++){
            $options =$options+ "<option value='"+$pastYear+"'>"+$pastYear+"</option>";
        }
        $('#yearVerifiedInstitutions').append($options);
        $("#yearVerifiedInstitutions").material_select();
        }
                
        $('.collapsible #getDataVerifiedInstitutions').on('click', function(e) {
                    e.stopPropagation();
                    var district= $("#districtsVerifiedInstitutions").find(":selected").val();
                    var mandal= $("#mandalsVerifiedInstitutions").find(":selected").val();
                    var year=$("#yearVerifiedInstitutions").find(":selected").val();
                    var month=$("#monthVerifiedInstitutions").find(":selected").val();
                    var startDate=$("#startDateVerifiedInstitutions").find(":selected").val();
                    var endDate=$("#endDateVerifiedInstitutions").find(":selected").val();
                    
                    //IF NONE SELECTED RETRIEVE ALL
                    if(district=="null" && mandal=="null" && year!="null" && month!="null" && startDate!="null" && endDate!="null"){   
                        //renderTable(Stirng:"#id Of div",API_URL)
                        renderTable("#verifiedInstitutions",SERVER+VERIFIED_SCHOOLS_YEAR_MONTH_DAY_DAY+year+"/"+month+"/"+startDate+"/"+endDate);
                    }else if(district!="null" && mandal=="null" && year!="null" && month!="null" && startDate!="null" && endDate!="null"){   
                        //renderTable(Stirng:"#id Of div",API_URL)
                        renderTable("#verifiedInstitutions",SERVER+VERIFIED_SCHOOLS_DISTRICT_YEAR_MONTH_DAY_DAY+district+"/"+year+"/"+month+"/"+startDate+"/"+endDate);
                    }else if(district!="null" && mandal!="null" && year!="null" && month!="null" && startDate!="null" && endDate!="null"){
                        //renderTable(Stirng:"#id Of div",API_URL)
                        renderTable("#verifiedInstitutions",SERVER+VERIFIED_SCHOOLS_DISTRICT_MANDAL_YEAR_MONTH_DAY_DAY+district+"/"+mandal+"/"+year+"/"+month+"/"+startDate+"/"+endDate);
                    };
        });
        //ON PRINT BUTTON > ACTIONS 
        $('.collapsible #printVerifiedInstitutions').on('click',function(e){
            e.stopPropagation();
            //PRINT FUNCTION IS JS FUNTION NOT JQUERY SO DONT ADD #
            var printDiv="verifiedInstitutionsCard";
            printData(printDiv);
        });
        
    }// Verified Schools

    //NOT Verified Institutions
    {
        //Loading Districts
        $.get(SERVER+DISTRICTS, function(data, status){
            var jsonData = $.parseJSON(data);
            var $options="";
            $(jsonData).each(function (index, o) {    
                $options =$options+ "<option value='"+o.district+"'>"+o.district+"</option>";
            });
            $('#districtsNotVerifiedInstitutions').append($options);
            $("#districtsNotVerifiedInstitutions").material_select();
        });
        //Listen to change in district and load mandals accordingly
        $(document).on('change','#districtsNotVerifiedInstitutions', function(){
                //GET SELECTED DISTRICT NAME
                var district = $('#districtsNotVerifiedInstitutions').find(":selected").val();
                $.get(SERVER+MANDALS+district,function(data,status){
                    var jsonData = $.parseJSON(data);
                    var $options="";
                    $(jsonData).each(function (index, o) {    
                        $options =$options+ "<option value='"+o.mandal+"'>"+o.mandal+"</option>";
                    });
                    $('#mandalsNotVerifiedInstitutions').empty();
                    //ADD NULL OPTION AGAIN 
                    $('#mandalsNotVerifiedInstitutions').append($('<option value="null" disabled selected>Choose Mandal</option>'));
                    $('#mandalsNotVerifiedInstitutions').append($options);
                    $('#mandalsNotVerifiedInstitutions').material_select();
                });
        });
        
        //Year Coloumn
        {
        //Years Present -1 , present and present +1
        var date= new Date();
        var $pastYear= date.getFullYear()-1;
        $options="";
        for(var i=0;i<3;i++,$pastYear++){
            $options =$options+ "<option value='"+$pastYear+"'>"+$pastYear+"</option>";
        }
        $('#yearNotVerifiedInstitutions').append($options);
        $("#yearNotVerifiedInstitutions").material_select();
        }
                
        $('.collapsible #getDataNotVerifiedInstitutions').on('click', function(e) {
                    e.stopPropagation();
                    var district= $("#districtsNotVerifiedInstitutions").find(":selected").val();
                    var mandal= $("#mandalsNotVerifiedInstitutions").find(":selected").val();
                    var year=$("#yearNotVerifiedInstitutions").find(":selected").val();
                    var month=$("#monthNotVerifiedInstitutions").find(":selected").val();
                    var startDate=$("#startDateNotVerifiedInstitutions").find(":selected").val();
                    var endDate=$("#endDateNotVerifiedInstitutions").find(":selected").val();
                    
                    //IF NONE SELECTED RETRIEVE ALL
                    if(district=="null" && mandal=="null" && year!="null" && month!="null" && startDate!="null" && endDate!="null"){   
                        //renderTable(Stirng:"#id Of div",API_URL)
                        renderTable("#notVerifiedInstitutions",SERVER+NOT_VERIFIED_SCHOOLS_YEAR_MONTH_DAY_DAY+year+"/"+month+"/"+startDate+"/"+endDate);
                    }else if(district!="null" && mandal=="null" && year!="null" && month!="null" && startDate!="null" && endDate!="null"){   
                        //renderTable(Stirng:"#id Of div",API_URL)
                        renderTable("#notVerifiedInstitutions",SERVER+NOT_VERIFIED_SCHOOLS_DISTRICT_YEAR_MONTH_DAY_DAY+district+"/"+year+"/"+month+"/"+startDate+"/"+endDate);
                    }else if(district!="null" && mandal!="null" && year!="null" && month!="null" && startDate!="null" && endDate!="null"){
                        //renderTable(Stirng:"#id Of div",API_URL)
                        renderTable("#notVerifiedInstitutions",SERVER+NOT_VERIFIED_SCHOOLS_DISTRICT_MANDAL_YEAR_MONTH_DAY_DAY+district+"/"+mandal+"/"+year+"/"+month+"/"+startDate+"/"+endDate);
                    };
        });
        //ON PRINT BUTTON > ACTIONS 
        $('.collapsible #printNotVerifiedInstitutions').on('click',function(e){
            e.stopPropagation();
            //PRINT FUNCTION IS JS FUNTION NOT JQUERY SO DONT ADD #
            var printDiv="notVerifiedInstitutionsCard";
            printData(printDiv);
        });
        
    }//NOT Verified Schools

    //FOR RENDERING JSON DATA TO TABLES
    function renderTable(divId,api){
    $.get(api,function(data,status){
        var jsonData = $.parseJSON(data);
        //EMPTY BEFORE LOADING DATA OUTSIDE LOOP
        $(divId).empty();
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
    });    

    }//renderTable 

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
      