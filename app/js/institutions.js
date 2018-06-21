$(document).ready(function(){
    $('.collapsible').collapsible();
    $('select').material_select();
    
    //Loading Districts
    $.get(SERVER+DISTRICTS, function(data, status){
        var jsonData = $.parseJSON(data);
        var $options="";
        $(jsonData).each(function (index, o) {    
              $options =$options+ "<option value='"+o.district+"'>"+o.district+"</option>";
        });
        $('#districtsRegisteredSchools').append($options);
        $("#districtsRegisteredSchools").material_select();
    });
    //Listen to change in district and load mandals accordingly
    $(document).on('change','#districtsRegisteredSchools', function(){
        //GET SELECTED DISTRICT NAME
        var district = $('#districtsRegisteredSchools').find(":selected").val();
        console.log(district);
        $.get(SERVER+MANDALS+district,function(data,status){
            console.log(data);
            var jsonData = $.parseJSON(data);
            var $options="";
            $(jsonData).each(function (index, o) {    
                $options =$options+ "<option value='"+o.mandal+"'>"+o.mandal+"</option>";
            });
            $('#mandalsRegisteredSchools').empty();
            $('#mandalsRegisteredSchools').append($options);
            $('#mandalsRegisteredSchools').material_select();
        });
   })

   $('.collapsible #getDataRegisteredSchools').on('click', function(e) {
        e.stopPropagation();
        console.log('getData');
        $.get(SERVER+REGISTERED_SCHOOLS,function(data,status){
            var jsonData = $.parseJSON(data);
            console.log(jsonData);
            //EMPTY BEFORE LOADING DATA OUTSIDE LOOP
            $('#registeredSchools').empty();
            $(jsonData).each(function(index,o){
                var row= $('<tr />');               
                // ADD TABLE ROW ELEMENT     
                $('#registeredSchools').append(row);
                row.append($("<td>"+o.district+"</td>"));
                row.append($("<td>"+o.mandal+"</td>"));
                row.append($("<td>"+o.village+"</td>"));
                row.append($("<td>"+o.school_name+"</td>"));
                row.append($("<td>"+o.total_number_of_students+"</td>"));
            });    
        });    
  });
  $('.collapsible #printRegisteredSchools').on('click',function(e){
    e.stopPropagation();
    console.log('Print'); 
    var printDiv="registeredSchoolsCard";
    printData(printDiv);
    });
    function printData(printDivId){
        var divToPrint=document.getElementById(printDivId);
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
        newWin.document.writeFooter("Designed and Developed By")
        newWin.print();
        newWin.close();
    }
/*  $(document).on('click','#getDataRegisteredSchools', function(){
       console.log("getData CLikc");
        //var district = $('#districtsRegisteredSchools').find(":selected").val();
        //var mandal = $('#mandalsRegisteredSchools').find(":selected").val();
        //if(district==""&&mandal==""){
            $.get(SERVER+REGISTERED_SCHOOLS,function(data,status){
                var jsonData = $.parseJSON(data);
                console.log(jsonData);
                //EMPTY BEFORE LOADING DATA OUTSIDE LOOP
                $('#registeredSchools').empty();
                $(jsonData).each(function(index,o){
                    var row= $('<tr />');               
                    // ADD TABLE ROW ELEMENT     
                    $('#registeredSchools').append(row);
                    row.append($("<td>"+o.district+"</td>"));
                    row.append($("<td>"+o.mandal+"</td>"));
                    row.append($("<td>"+o.village+"</td>"));
                    row.append($("<td>"+o.school_name+"</td>"));
                    row.append($("<td>"+o.total_number_of_students+"</td>"));
                });    
            });
        //}
   });
*/
});
      