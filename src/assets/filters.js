$(document).on('click', function(event) {
    if (!$(event.target).closest('.dropdown').length) {
     $('.option-list, .search-box').hide();
    }
  });
  $('.select').click(function(event) {
    //$('.option-list, .search-box').hide();
    $(this).closest('.dropdown').find('.option-list, .search-box').toggle(); 
    $('.option-list a').click(function(){
      var select = $(this).text();
      $(this).closest('.dropdown').children('.select').text(select);
      $('.option-list, .search-box').hide();
    });
  });
  //Search
  $('.seach-control').keyup(function(){
   var val = $(this).val().toLowerCase();
   var list =  $(this).closest('.dropdown').find('li')
    list.each(function()
     {
       var text = $(this).text().toLowerCase();
       if(text.indexOf(val)==-1)
         {
           $(this).hide();
         }
       else
         {
             $(this).show();
         }
         
     })
  });s