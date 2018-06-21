$(document).ready(function(){
    $('.collapsible').collapsible();
    $('select').formSelect();
    //Loading Districts
    $.get(SERVER+DISTRICTS, function(data, status){
        console.log("Data: " + data + "\nStatus: " + status);

        var jsonData = $.parseJSON(data);
        var $options="";
        $(jsonData).each(function (index, o) {    
              $options =$options+ "<option value='"+o.district+"'>"+o.district+"</option>";
        });
        $('#districts').empty();
        $('#districts').append($options);
        $("#districts").material_select();
    });

});
      