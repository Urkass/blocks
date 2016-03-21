_button = $('#button');
_modal = $('.modal');
_modalError = $('.modal_type_error')[0];
_modalOrder = $('.modal_type_order')[0];
_modalSuccess = $('.modal_type_success')[0];
_close = $('.modal__close');
_form = $('.modal__form'); //массив форм 0 - форма главная, 1 - успех, 2 - неудача

_button.on( 'click', ModalOpen);
_close.on('click', ModalClose);
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
    var request = 'requestProduct';
    if(!_id) {
        _id = 0;
        request = 'requestCallback';
    }
    $('#id-input').value = _id;
    $('#id-input').val(_id);
    _form.on ('submit', function(){
        sendAjaxModal();
    });
    ModalOpen();
};

function sendAjaxModal(){
    $.ajax({
        url: locationPath + contextPath + "/mail/" + request,
        type:'get',
        data: $("#mod-form").serialize(),
        complete: function(){
            console.log('SUCCESS');
            showSuccessModal();
        }
    });
};
