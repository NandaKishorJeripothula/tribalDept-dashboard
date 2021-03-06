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

    //FOR RENDERING JSON DATA TO TABLES
    function renderTable(divId,api){
    $.get(api,function(data,status){
        var jsonData = $.parseJSON(data);
        //EMPTY BEFORE LOADING DATA OUTSIDE LOOP
        $(divId).empty();
        console.log(jsonData.length);
        // WHEN NO RECORDS FOUND
        if(jsonData.length==0){
            console.log("no data");
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
            console.log($(divId));
        }    
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
      