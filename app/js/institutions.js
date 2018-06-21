$(document).ready(function(){
    $('.collapsible').collapsible();
    $('select').material_select();
    //Loading Districts
    $.get(SERVER+DISTRICTS, function(data, status){
        console.log("Data: " + data + "\nStatus: " + status);

        var jsonData = $.parseJSON(data);
        var $options="";
        $(jsonData).each(function (index, o) {    
              $options =$options+ "<option value='"+o.district+"'>"+o.district+"</option>";
        });
        $('#districts').append($options);
        $("#districts").material_select();
    });

});
      