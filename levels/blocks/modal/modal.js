
var _modal = $('.modal');

$('#button').on( 'click', function(){
    ModalOpen($('.modal_type_order'));
});
$('.modal__close').on('click', function(){
    ModalClose(_modal);
});
$(window).on('click', function(e){
    if ($(e.target).is(_modal)) {
        ModalClose(_modal);
    }
});

function ModalOpen(modal){
    modal.removeClass('modal_display_none');
    modal.addClass('modal_display_block');
}
function ModalClose(modal){
    modal.removeClass('modal_display_block');
    modal.addClass('modal_display_none');
}

function showOrderModal(_id){
    var contentId = $('#contentId');
    var request = 'requestProduct';
    if(!_id) {
        _id = 0;
        request = 'requestCallback';
    }
    contentId.attr('value', _id);
    contentId.val(_id);
    $('.modal__form').on ('submit', function(){
        sendAjaxModal();
    });
    ModalOpen();
}

function sendAjaxModal(){
    $.ajax({
        url: ''/*locationPath + contextPath + "/mail/" + request*/,
        type:'get',
        data: $("#mod-form").serialize(),
        complete: function() {
            ModalClose(_modal);
            ModalOpen($('.modal_type_success'));

        },
        error: function() {
            ModalClose(_modal);
            ModalOpen($('.modal_type_error'));

        }
    });
}
