$(document).ready(function() {

    $('.sourceOverlay').tooltip();
    $('.formResultDiv').hide().prop('disabled', true);

    linkifyComment();
    
    bindCommentLinks();

    applyLanguage();

    bindLanguageSelectorLinks();    

    $('.publishButton').click(function(){

        //get the text from the comment field
        var commentText = $.trim($('.commentTextArea').val());

        //we dont want to deal with empty text
        if (commentText.length == 0) {

            $('.formResultDiv').show();
            //alert('Üres szöveget nem lehet publikálni.\nYou cannot publish empty text.');
            return;
        }
        $('.formResultDiv').hide();

        var editedCommentId = $('.publishButton').attr('data-editedCommentId');

        if ( editedCommentId != undefined) {

            //edit mode
            editExistingComment(commentText, editedCommentId);
        } else {

            //new mode
            createNewComment(commentText);
        }
    });
	
});

function bindCommentLinks () {
    
    $('.modifyLink').unbind('click');
    $('.deleteLink').unbind('click');

    $('.modifyLink').each(function(index, element){
        
        $(this).click( function () {
            
            $('.commentTextArea').val( $(this).attr('data-commentMessage'));
            $('.publishButton').attr('data-editedCommentId', $(this).attr('data-commentId'));
        });
    });

    $('.deleteLink').each(function(index, element){
        $(this).click( function() {
           
            deleteComment($(this).attr('data-commentId'));
            $(this).parent().remove();
        });
    });

}

function bindLanguageSelectorLinks() {
    
    $('.english').unbind();
    $('.hungarian').unbind();

    $('.english').click( function() {

        $('.english').toggleClass('boldText');
        $('.hungarian').toggleClass('boldText');

        $.cookie('siteLanguage', 'EN', { expires: 3650, path: '/' }); 

        applyLanguage();

    });

    $('.hungarian').click( function() {

        $('.english').toggleClass('boldText');
        $('.hungarian').toggleClass('boldText');

        $.cookie('siteLanguage', 'HU', { expires: 3650, path: '/' }); 

        applyLanguage();

    });    

}

function applyLanguage() {

    //load the language from cookie
    // $.cookie('the_cookie', 'the_value', { expires: 3650, path: '/' });
    var siteLanguage = $.cookie('siteLanguage');

    if (siteLanguage == 'EN') {
        translatePageToEnglish();
        $('.english').addClass('boldText');
        $('.hungarian').removeClass('boldText');

    } else {
        translatePageToHungarian();
        $('.hungarian').addClass('boldText');
        $('.english').removeClass('boldText');
    }
}

function translatePageToEnglish() {

    $('*').each(function(index, item){

        var englishText = $(this).attr('data-en');

        if (englishText)
            $(this).html(englishText);
    });
}

function translatePageToHungarian() {

    $('*').each(function(index, item){

        var hungarianText = $(this).attr('data-hu');

        if (hungarianText)
            $(this).html(hungarianText);
    });

}

function createNewComment(commentText) {

    //disable button and textfield
    $('.commentTextArea').prop('disabled', true);

    //show loading indicator
    var l = Ladda.create($('.publishButton')[0]);
    l.start();

    //construct the post data
    var postData = {
        comment : commentText            
    };

    //post the data to the server
    $.post('/comment',postData, function(result) {

        if (result.error == null) {

            //everything ok, lets get the rendered comment
            $.get('/comment?id='+result.comment._id, function(renderedComment){

                $('.singleComment').first().before(renderedComment);
                $('.commentTextArea').val(''); // clear the field


                //linkify
                linkifyComment();
                
                //rebind links
                bindCommentLinks();

            });

        } else {
            $('.formResultDiv').html('Error during save, please try later.').show();                
        }
        
        $('.commentTextArea').prop('disabled', false);
        l.stop();
    });
}

function editExistingComment(commentText, commentId) {

    //disable button and textfield
    $('.commentTextArea').prop('disabled', true);

    //show loading indicator
    var l = Ladda.create($('.publishButton')[0]);
    l.start();

    //construct the post data
    var postData = {
        comment : commentText,
        commentId : commentId          
    };

    $.ajax({
       url: '/comment',
       type: 'PUT',
       data: postData,
       success: function(response) {
            
            window.location.replace('/');
       },
       error: function(request, text, errorText) {

            $('.formResultDiv').html('Error during save, please try later.').show();    
            $('.commentTextArea').prop('disabled', false);
            l.stop();            
       }
    });
}

function deleteComment(commentId) {

    //disable button and textfield
    $('.commentTextArea').prop('disabled', true);
    $('.publishButton').prop('disabled', true);

    //construct the post data
    var postData = {
        commentId : commentId          
    };

    $.ajax({
       url: '/comment',
       type: 'DELETE',
       data: postData,
       success: function(response) {
            
            $('.commentTextArea').prop('disabled', false);
            $('.publishButton').prop('disabled', false);
       },
       error: function(request, text, errorText) {

            $('.formResultDiv').html('Error during delete, refresh the page and please try it later.').show();    
            $('.commentTextArea').prop('disabled', false);
            $('.publishButton').prop('disabled', false);

       }
    });
}

function linkifyComment() {
    $('.singleComment').each( function(index, item){
        $(this).find('p').linkify({target: "_blank"});
    });    
}