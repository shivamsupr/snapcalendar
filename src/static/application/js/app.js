function SnapC() {

}

var snpC = new SnapC();
snpC.g = {};
snpC.g['CALENDAR'] = null;
snpC.g['MONTHS_LEFT_POS'] = null;

SnapC.prototype.ajax = function (options) {
    var defaults = {
        'method': 'POST',
        'dataType': 'json'
    };
    return $.ajax($.extend({}, defaults, options));
};

SnapC.prototype.isMobile = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

SnapC.prototype.initCalendarEvents = function () {
    var eventData = [];
    var eventListHtml = "";
    var $clndrCnt = $('#clndrCnt');
    var $dClndr = $('#dClndr');

    snpC._initControls($clndrCnt);
    snpC._initShowCalendar($clndrCnt);

    snpC.ajax({
        url: "https://sgdev.capitalmind.in/api/calendar",
        success: function (response) {
            response.map(function (data) {
                eventData.push({
                    date: data.dt,
                    title: data.event_type,
                    desc: data.event_description
                });
            });

            snpC.g['CALENDAR'] = $dClndr.clndr({
                template: $('.clndrTemplate', $dClndr).html(),
                events: eventData,
                forceSixRows: true,
                classes: {selected: "selected",},
                trackSelectedDate: true,
                clickEvents: {
                    click: function (target) {
                        eventListHtml = '<div class="cl-evnts--evnts__cnt--ttl eventLstngTtl">' + moment(target.date).format('MMMM Do') + '</div>';
                        for (var i = 0; i < target.events.length; i++) {
                            eventListHtml += '<div class="cl-evnts--evnts__cnt--itm evntItm">';
                            eventListHtml += '<div class="cl-evnts--evnts__cnt--nm evntItmNm">' + target.events[i].title + '</div>';
                            eventListHtml += '<div class="cl-evnts--evnts__cnt--dsc evntItmDsc">' + target.events[i].desc + '</div>';
                            eventListHtml += '</div>';
                        }
                        $(this.element).find('.evntLstng').html(eventListHtml);
                        snpC._initEventSearch($clndrCnt);
                    }
                }
            });

            snpC._initShowCalendar($clndrCnt);
            snpC._initEventSearch($clndrCnt);
        }
    });
};

SnapC.prototype._initControls = function ($scope_elem) {
    var $mnthLst = $('.mnthLst', $scope_elem);
    var $cntrlPrv = $('.cntrlPrv', $scope_elem);
    var $cntrlNxt = $('.cntrlNxt', $scope_elem);

    var current_year = moment().year();
    var current_month = moment().month();
    snpC._showMonthList($scope_elem, $mnthLst, current_month + 1, current_year);
    snpC._handleNavScroll($mnthLst);

    $cntrlPrv.on('click', function () {
        var $current_elem = $('.selected', $mnthLst);
        var month = $current_elem.data('month');

        if(month == 1) {
            --current_year;
            current_month = 11;
            snpC.g['CALENDAR'].previousYear();
            snpC.g['CALENDAR'].setMonth(current_month);
            snpC._showMonthList($scope_elem, $mnthLst, current_month + 1, current_year);
        } else {
            snpC.g['CALENDAR'].setMonth(month - 2);
            $current_elem.removeClass('selected').prev().addClass('selected');
        }

        snpC._handleNavScroll($mnthLst);
        snpC._initShowCalendar($scope_elem);
        snpC._initEventSearch($scope_elem);
    });

    $cntrlNxt.on('click', function () {
        var $current_elem = $('.selected', $mnthLst);
        var month = $current_elem.data('month');

        if(month == 12) {
            ++current_year;
            current_month = 0;
            snpC.g['CALENDAR'].nextYear();
            snpC.g['CALENDAR'].setMonth(current_month);
            snpC._showMonthList($scope_elem, $mnthLst, current_month + 1, current_year);
        } else {
            snpC.g['CALENDAR'].setMonth(month);
            $current_elem.removeClass('selected').next().addClass('selected');
        }

        snpC._handleNavScroll($mnthLst);
        snpC._initShowCalendar($scope_elem);
        snpC._initEventSearch($scope_elem);
    });
};

SnapC.prototype._showMonthList = function ($scope_elem, $mnthLst, current_month, current_year) {
    var html_content = "";
    var count = 0;
    var months = {};

    while (count < 12) {
        months[moment().month(count).format("M")] = moment().month(count).format("MMM");
        count++;
    }

    Object.keys(months).map(function (month) {
        var selected = (month == current_month ? " selected" : "");
        html_content += "<li class='hlst--itm cl-evnts--cntrls__lst--itm mnthLstItm" + selected + "' \
            data-month='" + month + "'><strong>" + months[month] + "</strong> " + current_year + "</li>";
    });
    $mnthLst.html(html_content);

    $('.mnthLstItm', $mnthLst).on('click', function () {
        var $self = $(this);
        var month = $self.data('month') - 1;

        $('.mnthLstItm').removeClass('selected');
        $self.addClass('selected');
        snpC.g['CALENDAR'].setMonth(month);

        snpC._initShowCalendar($scope_elem);
        snpC._initEventSearch($scope_elem);
    });
};

SnapC.prototype._handleNavScroll = function ($scope_elem) {
    if(snpC.isMobile()) {
        if(snpC.g['MONTHS_LEFT_POS'] == null) {
            snpC.g['MONTHS_LEFT_POS'] = {};
            $('.mnthLstItm', $scope_elem).each(function (i, elem) {
                var $elem = $(elem);
                snpC.g['MONTHS_LEFT_POS'][$elem.data('month')] = $elem.position().left;
            });
        }

        var month = $('.mnthLstItm.selected', $scope_elem).data('month');
        var left = snpC.g['MONTHS_LEFT_POS'][month];
        if(left < 800) {
            left = left - 120;
        }
        $('.mnthLst').scrollLeft(left);
    }
};

SnapC.prototype._initShowCalendar = function ($scope_elem) {
    $('.shwClndr', $scope_elem).on('click', function() {
        var $self = $(this);
        var $shwClndrIcn = $('.shwClndrIcn', $self);

        if($shwClndrIcn.hasClass('open')) {
            $shwClndrIcn.removeClass('open').html('▼');
        } else {
            $shwClndrIcn.addClass('open').html('▲');
        }

        $('.clndrBx').slideToggle();
    });
};

SnapC.prototype._initEventSearch = function ($scope_elem) {
    var $evntSlct = $('.evntSlct', $scope_elem);
    var $evntInpt = $('.evntInpt', $scope_elem);

    $evntSlct.val("");
    $evntSlct.on('change', function () {
        $evntInpt.val("");
        handleSearch($(this).val());
    });

    $evntInpt.val("");
    $evntInpt.on('keyup', function () {
        $evntSlct.val("");
        handleSearch($(this).val());
    });

    var handleSearch = function (text) {
        var $evntItm = $(".evntItm");
        var $evntItmNm = $(".evntItmNm");
        var $evntItmDsc = $(".evntItmDsc");

        $evntItmNm.css("text-decoration", "none").off();
        if(text == '') {
            $evntItm.removeClass('hide');
            $evntItmDsc.removeClass('hide');
        } else {
            $evntItm.addClass('hide');

            var $searched_elements = $(".evntItmNm:contains("+ text.toTitleCase() +")");
            var $parent = $searched_elements.parent();
            $('.evntItmDsc', $parent).addClass('hide');

            $parent.removeClass('hide');
            $searched_elements.css("text-decoration", "underline");

            $searched_elements.on('click', function () {
                var $evntItmDsc = $('.evntItmDsc', $(this).parent());
                $evntItmDsc.toggleClass('hide');
            });
        }
    }
};

$(document).ready(function () {
    snpC.initCalendarEvents();
});

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};