//Загрузка документа
$(document).ready(function () {

    //Для кроссбраузерных плейсхолдеров
    var $inputFields = $('.placeholder input[type="text"], .placeholder textarea');

    $inputFields.each(function () {
        if ($(this).val() != '') $(this).css({backgroundColor: '#fff'});
    });
    $inputFields.blur(function () {
        if ($(this).val() == '') $(this).css({backgroundColor: 'transparent'});
    });
    $inputFields.focus(function () {
        $(this).css({backgroundColor: '#fff'});
    });
    $inputFields.change(function () {
        if ($(this).val() != '') $(this).css({backgroundColor: '#fff'});
    });
    $inputFields.mouseover(function () {
        if ($(this).val() != '') $(this).css({backgroundColor: '#fff'});
    });

    $('input[name="phone"]').mask("+7 (999) 999-9999");

    $('.catalog__diff span').click(function() {
        var $el = $(this);
        if ($el.parent().hasClass('active')) {
            $el.parent().removeClass('active');
            $el.text('Нажмите для просмотра комплектации:');
        } else {
            $el.parent().addClass('active');
            $el.text('Нажмите для скрытия комплектации:');
        }
    });

    $('.feedbacks__more').click(function() {
        var $el = $(this);
        $el.addClass('active').hide();
    });

    $modalOverlay = $('.modal-overlay');
    $modalWindow = $('.modal-window');
    $openModal = $('.open-modal');
    $body = $('body');
    $html = $('html');

    $modalOverlay.hide();
    $modalWindow.hide();
    $modalWindow.click(function (e) {
        e.stopPropagation();
    });

    $openModal.click(function (e) {
        e.preventDefault();
        var $el = $(this);
        var $win = $($el.attr('href'));

        if ($el.attr('data-theme')) {
            $win.find('form input[name="theme"]').val($el.attr('data-theme'));
        }

        openModal($win);
    });

    $modalOverlay.click(function () {
        closeModal();
    });

    $('.faq__item-quest').click(function () {
        $(this).toggleClass('active');
    });

    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map("map", {
                center: [55.849974276815686,37.67301599999998],
                zoom: 16
            }),
            myPlacemark = new ymaps.Placemark([55.849974276815686,37.67001599999998], {
                // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
                balloonContentHeader: "Наш адрес: ",
                balloonContentBody: "г. Москва, ул. Енисейская дом 1, строение 1",
                balloonContentFooter: "тел: 8-495-654-54-55",
            });
        myMap.behaviors.disable("scrollZoom");
        myMap.geoObjects
            .add(myPlacemark);
    }
});



var $modalOverlay;
var $modalWindow;
var $openModal;
var $body;
var $html;

var closeModal = function () {
    $modalWindow.css({'display': 'none'});
    $modalOverlay.css({'display': 'none'}).children().appendTo($body);
    $html.css({'overflow': 'auto', 'width': 'auto'})
};
var openModal = function ($el) {
    $el.appendTo($modalOverlay).css({'display': 'block'});
    $html.css({'overflow': 'hidden', 'width': $html.outerWidth()});
    $modalOverlay.css({'overflow-y': 'scroll', 'display': 'block'});
};

//Отправка
function sendForm(elem) {
    var form = $(elem);
    var uri = form.attr('action');
    var str = "";
    var error = 0;
    form.find('.rfield').each(function () {
        var input = $(this);
        if (input.val().length == 0) {
            error++;
            input.addClass('invalid');
        }
        else {
            input.removeClass('invalid');
        }
    });
    if (error == 0) {
        form.find('input[type="text"], input[type="hidden"], select,  textarea').each(function () {
            var input = $(this);
            str += input.attr('name') + '=' + input.val() + '&';
        });
        var Data = str.substring(0, str.length - 1);
        $.ajax({
            url: uri,
            async: true,
            type: 'POST',
            data: Data,
            processData: false,
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'HTML',
            success: function (data, textStatus, xhr) {
                if (data.length > 0) {
                    form.find('input[type="text"], textarea').each(function () {
                        var input = $(this);
                        input.val('').removeClass('invalid').removeAttr('style');
                    });
                    if (form.hasClass('advise__form')) {
                        var win = window.open('tor.torrent', '_blank');
                        win.focus();
                    }
                    closeModal();
                    openModal($('#msg'));
                    setTimeout(function () {
                        closeModal()
                    }, 2000);
                } else {
                    alert('Ваша заявка не принята! Возможно вы не заполнили все поля!');
                }
            },
            dataFilter: function (data, dataType) {
                return data;
            }
        });
    }
}
