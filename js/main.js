$(document).ready(function() {
  
 var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";


 $('form').submit(function (evt) {
    
    var $submitButton = $('#submit');
    var $searchField = $('#search');
    evt.preventDefault();
    $searchField.prop("disabled",true);
    $submitButton.attr("disabled", true).val("searching....");
    
    var selection = $searchField.val();
    
    var flickrData = 
    	{
        	tags: selection,
        	format: "json"
      	}

    var flickerCallBack = 
	  function(data){
      var photoHTML = '';
      if (data.items.length > 0) {
        $.each(data.items,function(i,photo) {
          photoHTML += '<li>';
          photoHTML += '<a href="' + photo.link + '">';
          photoHTML += '<img src="' + photo.media.m + '"></a></li>';
        }); // end each
      } else {
        photoHTML = "<p>No photos found that match: " + selection + ".</p>"
      }
      $('#photos').html(photoHTML);
      $searchField.prop("disabled", false);
      $submitButton.attr("disabled", false).val("Search");
    }

    //$('#photos').html('');

    $.getJSON(flickerAPI, flickrData, flickerCallBack); // end getJSON

  }); // end submit

}); // end ready 