

var _modal = $('.modal');
var _input = $('.form__input');
var _submit = $('.form__submit');

_submit.addClass('form__submit_state_disabled');

$('#button').on( 'click', function(){
    showOrderModal();
});

$('.modal__close').on('click', function(){
    ModalClose(_modal);
});
$(window).on('click', function(e){
    if ($(e.target).is(_modal)) {
        ModalClose(_modal);
    }
});
_input.on('input', function(){
    var key=true;
    _input.each(function(){
        if ($(this).val() == ''){
            key = false
        }
    });
    if (key){
        _submit.removeClass('form__submit_state_disabled');
    }
    else {
        _submit.addClass('form__submit_state_disabled');
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
    $('.form__submit').on ('click', function(){
        if ($(this).hasClass('form__submit_state_disabled') === false){
            sendAjaxModal(request);
        }
        else {
            console.log('Поля пустые, цо кликаешь?');
        }
    });
    ModalOpen($('.modal_type_order'));
}

function sendAjaxModal(request){
    $.ajax({
        url: locationPath + contextPath + "/mail/" + request,
        type:'get',
        data: $('.form.modal__form').serialize(),
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
