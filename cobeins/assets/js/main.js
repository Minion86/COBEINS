(function ($) {

    "use strict";

    /* 
     CounterUp
     ========================================================================== */
    $('.counter').counterUp({
        time: 500
    });

    /* 
     MixitUp
     ========================================================================== */
    $('#portfolio').mixItUp();

    /* 
     Clients Sponsor 
     ========================================================================== */
    var owl = $("#clients-scroller");
    owl.owlCarousel({
        items: 5,
        itemsTablet: 3,
        margin: 90,
        stagePadding: 90,
        smartSpeed: 450,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [980, 3],
        itemsTablet: [768, 3],
        itemsTablet: [767, 2],
        itemsTabletSmall: [480, 2],
        itemsMobile: [479, 1],
    });

    /* Partners Carousel 
     ========================================================*/
    if ($('.logo-carousel').length) {
        $('.logo-carousel').owlCarousel({
            navigation: false,
            autoPlay: true,
            slideSpeed: 1000,
            stopOnHover: true,
            margin: 30,
            items: 4,
            stagePadding: 90,
            smartSpeed: 450,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [980, 3],
            itemsTablet: [768, 2],
            itemsTabletSmall: [480, 2],
            itemsMobile: [479, 1],

            slideSpeed: 300,
        });
    }



    /* Testimonials Carousel 
     ========================================================*/
    var owl = $("#testimonials");
    owl.owlCarousel({
        navigation: false,
        autoPlay: true,
        slideSpeed: 1000,
        stopOnHover: true,
        autoPlay: true,
        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [980, 2],
        itemsTablet: [768, 1],
        itemsTablet: [767, 1],
        itemsTabletSmall: [480, 1],
        itemsMobile: [479, 1],
    });

    /* 
     Touch Owl Carousel
     ========================================================================== */
    var owl = $(".touch-slider");
    owl.owlCarousel({
        navigation: false,
        pagination: true,
        slideSpeed: 1000,
        stopOnHover: true,
        autoPlay: true,
        items: 1,
        itemsDesktopSmall: [1024, 1],
        itemsTablet: [600, 1],
        itemsMobile: [479, 1]
    });

    $('.touch-slider').find('.owl-prev').html('<i class="lni-chevron-left"></i>');
    $('.touch-slider').find('.owl-next').html('<i class="lni-chevron-right"></i>');

    /* 
     Sticky Nav
     ========================================================================== */
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 200) {
            $('.header-top-area').addClass('menu-bg');
        } else {
            $('.header-top-area').removeClass('menu-bg');
        }
    });

    /* 
     VIDEO POP-UP
     ========================================================================== */
//    $('.video-popup').magnificPopup({
//        disableOn: 700,
//        type: 'iframe',
//        mainClass: 'mfp-fade',
//        removalDelay: 160,
//        preloader: false,
//        fixedContentPos: false,
//    });

    /* 
     Back Top Link
     ========================================================================== */
    var offset = 200;
    var duration = 500;
    $(window).scroll(function () {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(400);
        } else {
            $('.back-to-top').fadeOut(400);
        }
    });

    $('.back-to-top').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    })

    /* 
     One Page Navigation & wow js
     ========================================================================== */
    //Initiat WOW JS
    new WOW().init();

    // one page navigation 
    $('.main-navigation').onePageNav({
        currentClass: 'active'
    });

    $(window).on('load', function () {

        $('body').scrollspy({
            target: '.navbar-collapse',
            offset: 195
        });

        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 200) {
                $('.fixed-top').addClass('menu-bg');
            } else {
                $('.fixed-top').removeClass('menu-bg');
            }
        });

    });
    /* Nivo Lightbox
     ========================================================*/
//    $('.lightbox').nivoLightbox({
//        effect: 'fadeScale',
//        keyboardNav: true,
//    });


    /* stellar js
     ========================================================*/
    $.stellar({
        horizontalScrolling: false,
        verticalOffset: 30,
        responsive: false
    });

    /* 
     Page Loader
     ========================================================================== */
    $(window).on('load', function () {
        "use strict";
        $('#loader').fadeOut();
    });



}(jQuery));

var ajax_request;
$(document).ready(function () {

    $("#EnviaMail").validator().on("submit", function (event) {

        // everything looks good!
        event.preventDefault();
        var params = $("#EnviaMail").serialize();
        var button = $('#EnviaMail button[type="submit"]');
        dump(button);
       
        callAjax(params, button);
        return false;
    
    });

    function formError() {
        $("#EnviaMail").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

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
            $('#loader').fadeIn();
            if (!empty(button)) {
                button.css({'pointer-events': 'none'});
            }
        } else {
            dump('done loading');
            $('#loader').fadeOut();
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
                $('#name').val("");
                $('#email').val("");
                $('#telefono').val("");
                $('#ciudad').val("");
                $('#mensaje').val("");
                 console.log(JSON.stringify(data));
                if (data.code == 1) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Gracias!',
                        html: '<p class="lead">Nuestros asesores se pondrán en contacto con usted.</p>'
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


});

function division_seguros()
{
    Swal.fire({
        icon: 'info',
        title: 'División Seguros',
        html: ' <p style="text-align: center;"><strong>Investigadores privados especialistas en investigación de seguros</strong></p>' +
                '<ul>' +
                '<li style="text-align: justify;"><strong>Antecedentes Fraudulentos:</strong> Investigación de antecedentes, historia, estilo de vida, integridad.</li>' +
                '<li style="text-align: justify;"><strong>Estudios sobre falsos siniestros y accidentes</strong>: Por parte de beneficiarios inescrupulosos. Cada año, las aseguradoras se enfrentan a miles de siniestros fraudulentos.</li>' +
                '<li style="text-align: justify;"><strong>Inspecciones oculares y documentales</strong>: La inspección ocular no puede sustituir a la prueba documental por lo que ofrecemos los dos servicios en conjunto.</li>' +
                '<li style="text-align: justify;"><strong>Recopilación de información</strong></li>' +
                '<li style="text-align: justify;"><strong>Peritajes generales</strong></li>' +
                '<li style="text-align: justify;"><strong>Fraude sobre pólizas de vida</strong>: Las compañías de seguros reciben semanalmente cientos de siniestros fraudulentos para las coberturas de <a href="http://www.arpem.com/seguros/s_lpn/coberturas/rco/rco_p.html">Responsabilidad Civil</a>, por daños materiales y responsabilidad civil por daños corporales.</li>' +
                '</ul>'
    });
}

function division_laboral()
{
    Swal.fire({
        icon: 'info',
        title: 'División Laboral',
        html: ' <p style="text-align: center;"><strong>Detectives privados especialistas en materia de investigación laboral</strong></p>' +
                '<ul>' +
                '<li><strong>Duplicidad de empleo:</strong> Obtenemos pruebas que demuestren que un trabajador desempeña otra actividad laboral del mismo sector que su empresa empleadora, por cuenta ajena o propia.</li>' +
                '<li><strong>Rotura de Sigilos Empresariales</strong></li>' +
                '<li><strong>Antecedentes Laborales:</strong> Revisión de antecedentes, y según el cargo o trabajo, se realizará una investigación más exhaustiva.</li>' +
                '<li><strong>Confirmación de trabajo desleal o ilícito</strong>: Actos de competencia desleal y obtención ilícita de información que podría ser perjudicial.</li>' +
                '<li><strong>Detección de mentiras con técnica Kinésica</strong>: Poderoso método científico de detección de mentiras, aplicado en entrevistas de forma personal.</li>' +
                '</ul>'
    });
}

function localizacion_personas()
{
    Swal.fire({
        icon: 'info',
        title: 'Localización de Personas',
        html: ' <p style="text-align: center;"><strong>Detectives e investigadores especialistas en localización de personas</strong></p>' +
                '<ul>' +
                '<li style="text-align: justify;"><strong>Ubicación de personas desaparecidas:</strong> Con amplia experiencia hemos localizado a personas desaparecidas en Ecuador.</li>' +
                '<li style="text-align: justify;"><strong>Ubicación y capturas</strong>: De delincuentes y personas en general.</li>' +
                '<li style="text-align: justify;"><strong>Ubicación de morosos y deudores:</strong> Si tiene problemas en cobrar, somos su solución.</li>' +
                '<li style="text-align: justify;"><strong>Investigación de productos falsificados:</strong> Si un producto pirata está afectando a su empresa, nosotros realizamos la investigación y reunimos las pruebas necesarias para desenmascarar a los falsificadores.</li>' +
                '</ul>'
    });
}

function division_financiera()
{
    Swal.fire({
        icon: 'info',
        title: 'División Financiera',
        html: ' <p style="text-align: center;"><strong>Detectives privados especialistas en investigación financiera</strong></p>' +
                '<ul>' +
                '<li style="text-align: justify;"><strong>Informes de solvencia “confidencial”:</strong> Ayuda a conocer la fiabilidad de cualquier persona.</li>' +
                '<li style="text-align: justify;"><strong>Recopilación de datos para embargos</strong>: Para diferentes fines. Reduce los costes y aumenta los beneficios.</li>' +
                '<li style="text-align: justify;"><strong>Robos Sistemáticos y Vigilancia:</strong> A través de una de las cámaras de video vigilancia del robo sistemático se determina y es una fiel prueba de este hecho.</li>' +
                '</ul>'
    });
}

function division_tecnologia()
{
    Swal.fire({
        icon: 'info',
        title: 'División Tecnología',
        html: ' <p style="text-align: center;"><strong>Tenemos y trabajamos con lo mejor de la tecnología para detectives privados en Ecuador</strong></p>' +
                '<ul>' +
                '<li style="text-align: justify;"><strong>Contra espionaje Industrial y Comercial: </strong>Fuga de información interna o externa de la organización, evitando consecuencias económicas, legales, imagen pública dañada y otras. Este servicio le facilitará las pruebas y la información necesaria para que puedan tomar las decisiones de manera oportuna.</li>' +
                '<li style="text-align: justify;"><strong>Seguridad Integral</strong>: En la actualidad ha tomado posición en niveles organizacionales según el tipo de comercio.</li>' +
                '<li style="text-align: justify;"><strong>Cámaras Ocultas y Visibles</strong>: Vigilancia con tecnología audiovisual de punta.</li>' +
                '<li style="text-align: justify;"><strong>Evaluaciones de mentiras con técnica Kinésica:</strong> para detectar mentiras y engaño mediante el lenguaje verbal y no verbal.</li>' +
                '<li style="text-align: justify;"><strong>Fotografías y Grabadoras Telefónicas</strong>: Con lo mejor de la tecnología se convierten en pruebas irrefutables.</li>' +
                '<li style="text-align: justify;"><strong>Filmaciones investigativas</strong>: Para ser mostradas como pruebas de diferentes hechos.</li>' +
                '</ul>'
    });
}

function division_infidelidades()
{
    Swal.fire({
        icon: 'info',
        title: 'Infidelidades y Familia',
        html: ' <p style="text-align: center;"><strong>Servicio de detectives privados para investigación de personas</strong></p>' +
                '<ul>' +
                '<li style="text-align: justify;"><strong>Actividades diarias de los cónyuges, infidelidades de parejas:</strong> ¿Sospecha que su pareja le es infiel? Podemos ayudarlo a resolver su problema. Resultados de nuestro trabajo de seguimiento e investigación de infidelidad suelen provocar alivio (en muy pocos casos) y también enojo y mucha desilusión. Sin embargo, es importante tener presente que todo ocurre por alguna razón y que merece la pena conocer la causa.</li>' +
                '<li style="text-align: justify;"><strong>Seguimiento vigilancia</strong>: Operaciones de seguimiento personal y móvil son conducidas por investigadores.</li>' +
                '<li style="text-align: justify;"><strong>Observación de trato a menores</strong>: Vigilancia y seguimiento infantil a través de un proceso activo que vela por que se realice esta observación y se coordine adecuadamente por seguridad de los menores.</li>' +
                '<li style="text-align: justify;"><strong>Hábitos y actividades peligrosas:</strong> Seguimiento de malos hábitos que podrían afectar la integridad de las personas y su familia.</li>' +
                '</ul>'
    });
}

