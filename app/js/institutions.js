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
        $('#districtsRegisteredInstitutions').append($options);
        $("#districtsRegisteredInstitutions").material_select();
    });
    //Listen to change in district and load mandals accordingly
    $(document).on('change','#districtsRegisteredInstitutions', function(){
        //GET SELECTED DISTRICT NAME
        var district = $('#districtsRegisteredInstitutions').find(":selected").val();
        console.log(district);
        $.get(SERVER+MANDALS+district,function(data,status){
            console.log(data);
            var jsonData = $.parseJSON(data);
            var $options="";
            $(jsonData).each(function (index, o) {    
                $options =$options+ "<option value='"+o.mandal+"'>"+o.mandal+"</option>";
            });
            $('#mandalsRegisteredInstitutions').empty();
            $('#mandalsRegisteredInstitutions').append($options);
            $('#mandalsRegisteredInstitutions').material_select();
        });
   })

   $('.collapsible #getDataRegisteredInstitutions').on('click', function(e) {
        e.stopPropagation();
        console.log('getData');
        $.get(SERVER+REGISTERED_SCHOOLS,function(data,status){
            var jsonData = $.parseJSON(data);
            console.log(jsonData);
            //EMPTY BEFORE LOADING DATA OUTSIDE LOOP
            $('#RegisteredInstitutions').empty();
            $(jsonData).each(function(index,o){
                var row= $('<tr />');               
                // ADD TABLE ROW ELEMENT     
                $('#registeredInstitutions').append(row);
                row.append($("<td>"+o.district+"</td>"));
                row.append($("<td>"+o.mandal+"</td>"));
                row.append($("<td>"+o.village+"</td>"));
                row.append($("<td>"+o.school_name+"</td>"));
                row.append($("<td>"+o.total_number_of_students+"</td>"));
            });    
        });    
  });
  $('.collapsible #printRegisteredInstitutions').on('click',function(e){
    e.stopPropagation();
    console.log('Print'); 
    var printDiv="registeredInstitutionsCard";
    printData(printDiv);
    });
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
/*  $(document).on('click','#getDataRegisteredInstitutions', function(){
       console.log("getData CLikc");
        //var district = $('#districtsRegisteredInstitutions').find(":selected").val();
        //var mandal = $('#mandalsRegisteredInstitutions').find(":selected").val();
        //if(district==""&&mandal==""){
            $.get(SERVER+REGISTERED_SCHOOLS,function(data,status){
                var jsonData = $.parseJSON(data);
                console.log(jsonData);
                //EMPTY BEFORE LOADING DATA OUTSIDE LOOP
                $('#RegisteredInstitutions').empty();
                $(jsonData).each(function(index,o){
                    var row= $('<tr />');               
                    // ADD TABLE ROW ELEMENT     
                    $('#RegisteredInstitutions').append(row);
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
      