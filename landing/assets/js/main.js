$(function () {
    "use strict";
    var nav_offset_top = $('header').height() + 50;
    /*-------------------------------------------------------------------------------
     Navbar 
     -------------------------------------------------------------------------------*/

    //* Navbar Fixed  
    function navbarFixed() {
        if ($('.header_area').length) {
            $(window).scroll(function () {
                var scroll = $(window).scrollTop();
                if (scroll >= nav_offset_top) {
                    $(".header_area").addClass("navbar_fixed");
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                }
            });
        }
        ;
    }
    ;
    navbarFixed();
    /*-------------------------------------------------------------------------------
     featured slider
     -------------------------------------------------------------------------------*/

});
var ajax_request;
$(document).ready(function () {

    $('.error').hide();
    $("#tipo").change(function () {
        $("label#select_error_tipo").hide();
        $("label#select_error_plan").hide();
        var tipo = $(this).children("option:selected").val();


        $('#plan').html("");
        if (tipo == '---')
        {
            $('#plan').html("");
        }
        if (tipo == 'Diseño Web')
        {
            $('#plan').append('<option value="---">---</option>');
            $('#plan').append('<option value="Plan Web Económica">Plan Web Económica</option>');
            $('#plan').append('<option value="Plan Web Premium">Plan Web Premium</option>');
            $('#plan').append('<option value="Plan Web Platinum">Plan Web Platinum</option>');

        } else if (tipo == 'Tiendas Virtuales')
        {
            $('#plan').append('<option value="---">---</option>');
            $('#plan').append('<option value="Plan Tienda Bronce">Plan Tienda Bronce</option>');
            $('#plan').append('<option value="Plan Tienda Plata">Plan Tienda Plata</option>');
            $('#plan').append('<option value="Plan Tienda Oro">Plan Tienda Oro</option>');
        }

    });
    $("#plan").change(function () {
        $("label#select_error_plan").hide();
    });
    if ($('.logo-carousel').length) {
        $('.logo-carousel').owlCarousel({
            loop: false,
            margin: 30,
            items: 2,
            nav: false,
            dots: false,
            responsiveClass: true,
            slideSpeed: 300,
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                590: {
                    items: 2
                },
                1000: {
                    items: 2
                },
                1200: {
                    items: 2
                }
            }
        });
    }

    $("#economicoPlanWeb").on("click", function () {
        gtag('event', '<clic botón>', {'event_category': '<contacto>',
            'event_label': '<Etiqueta>',
            'value': '<Valor>'});
    });
    $("#premiumPlanWeb").on("click", function () {
        gtag('event', '<clic botón>', {'event_category': '<contacto>', 'event_label': '<Etiqueta>', 'value': '<Valor>'});
    });
    $("#platinumPlanWeb").on("click", function () {
        gtag('event', '<clic botón>', {'event_category': '<contacto>', 'event_label': '<Etiqueta>', 'value': '<Valor>'});
    });
    $("#broncePlanTienda").on("click", function () {
        gtag('event', '<clic botón>', {'event_category': '<contacto>', 'event_label': '<Etiqueta>', 'value': '<Valor>'});
    });
    $("#plataPlanTienda").on("click", function () {
        gtag('event', '<clic botón>', {'event_category': '<contacto>', 'event_label': '<Etiqueta>', 'value': '<Valor>'});
    });
    $("#oroPlanTienda").on("click", function () {
        gtag('event', '<clic botón>', {'event_category': '<contacto>', 'event_label': '<Etiqueta>', 'value': '<Valor>'});
    });


    $.validate({
        form: '#EnviaMail',
        onError: function () {
        },
        onSuccess: function () {
            $('.error').hide();
            if ($("select[name=tipo]").val() == '---') {
                $("label#select_error_tipo").show(); // show Warning 
                $("select#tipo").focus(); // Focus the select box      
                return false;
            }

            if ($("select[name=plan]").val() == '---') {
                $("label#select_error_plan").show(); // show Warning 
                $("select#plan").focus(); // Focus the select box      
                return false;
            }
            var params = $("#EnviaMail").serialize();
            var button = $('#EnviaMail button[type="submit"]');
            dump(button);
            callAjax(params, button);
            return false;
        }
    });

    $.validate({
        form: '#EnviaMailCurso',
        onError: function () {
        },
        onSuccess: function () {

            var params = $("#EnviaMailCurso").serialize();
            var button = $('#EnviaMailCurso button[type="submit"]');
            dump(button);
            callAjaxCurso(params, button);
            return false;
        }
    });

    function dump(data)
    {
        console.debug(data);
    }

    function empty(data)
    {
        //if (typeof data == "undefined" || data==null || data=="" ) { 
        if (typeof data == "undefined" || data == null || data == "" || data == "null" || data == "undefined") {
            return true;
        }
        return false;
    }



    function busy(e, button)
    {
        if (e) {
            $('body').css('cursor', 'wait');
        } else
            $('body').css('cursor', 'auto');
        if (e) {
            dump('busy loading');
            /*NProgress.set(0.0);		
             NProgress.inc(); */
            $(".main-preloader").show();
            if (!empty(button)) {
                button.css({'pointer-events': 'none'});
            }
        } else {
            dump('done loading');
            $(".main-preloader").hide();
            //NProgress.done();    	
            if (!empty(button)) {
                button.css({'pointer-events': 'auto'});
            }
        }
    }

    function callAjax(params, button)
    {
        ajax_request = $.ajax({
            url: 'EnviarCorreoAjax.php',
            data: params,
            type: 'post',
            //async: false,
            dataType: 'json',
            timeout: 6000,
            beforeSend: function () {
                dump("before=>");
                dump(ajax_request);
                if (ajax_request != null) {
                    ajax_request.abort();
                    dump("ajax abort");
                    busy(false, button);
                } else {
                    busy(true, button);
                }
            },
            complete: function (data) {
                ajax_request = (function () {
                    return;
                })();
                dump('Completed');
                dump(ajax_request);
                busy(false, button);
            },
            success: function (data) {
                dump(data);
                $('#nombre').val("")
                $('#mail').val("")
                $('#whatsapp').val("")
                $('#plan').val("---")
                if (data.code == 1) {
                    gtag('event', 'conversion', {'send_to': 'AW-809986230/WDmpCKLKiKsBELbRnYID'});
                    Swal.fire({
                        icon: 'success',
                        title: 'Gracias!',
                        html: '<p class="lead">Nuestros asesores se pondrán en contacto usted.</p>' +
                                '<hr>' +
                                '<p>' +
                                'Tiene alguna duda o sugerencia? <a href="https://marketingdigitalquito.com">Contáctenos</a>' +
                                '</p>'
                    });
                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        html: '<p>' + data.msg + '</p>',
                    });
                }
            },
            error: function (request, error) {

            }
        });
    }

    function callAjaxCurso(params, button)
    {
        ajax_request = $.ajax({
            url: 'EnviarCorreoAjaxCurso.php',
            data: params,
            type: 'post',
            //async: false,
            dataType: 'json',
            timeout: 6000,
            beforeSend: function () {
                dump("before=>");
                dump(ajax_request);
                if (ajax_request != null) {
                    ajax_request.abort();
                    dump("ajax abort");
                    busy(false, button);
                } else {
                    busy(true, button);
                }
            },
            complete: function (data) {
                ajax_request = (function () {
                    return;
                })();
                dump('Completed');
                dump(ajax_request);
                busy(false, button);
            },
            success: function (data) {
                dump(data);
                $('#nombre').val("")
                $('#mail').val("")
                $('#whatsapp').val("")
                $('#mensaje').val("")
                if (data.code == 1) {
                    gtag('event', 'conversion', {'send_to': 'AW-809986230/WDmpCKLKiKsBELbRnYID'});
                    Swal.fire({
                        icon: 'success',
                        title: 'Gracias!',
                        html: '<p class="lead">Nuestros asesores se pondrán en contacto usted.</p>' +
                                '<hr>' +
                                '<p>' +
                                'Tiene alguna duda o sugerencia? <a href="https://marketingdigitalquito.com">Contáctenos</a>' +
                                '</p>'
                    });
                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        html: '<p>' + data.msg + '</p>',
                    });
                }
            },
            error: function (request, error) {

            }
        });
    }




}
);


