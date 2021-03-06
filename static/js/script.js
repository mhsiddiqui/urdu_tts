/**
 * Created by mhassan on 8/30/17.
 */
$(document).ready(function () {

});

$('#play_sound').click(function () {

    var urdu_text_area = $('#urdu_text_area').val();
    $('.alert').hide();
    if (urdu_text_area == '') {
        $('#required-error').show()
    }
    else if (/[a-zA-Z]+/.test(urdu_text_area) == true) {
        $('#alphabet-error').show()
    }
    else {
        $('#loading-div').show();
        var settings = {
            "crossDomain": true,
            "url": "/nlp/tts/generate/voice/",
            "method": "POST",
            "data": {
                "text": urdu_text_area,
                "voice": $("input[name='voice_option']:checked").val()
            }
        };

        $.ajax(settings).done(function (response) {
            $('#output_div').empty().append(response);
            $('#loading-div').hide();
            $('#output_div').find('.generated_voice').get(0).play();
        });
    }
});

function play_evaluation_sound(sound_id) {
    var voice_option = sound_id + '_voice_option';
    var urdu_text_area = $('#text_' + sound_id).text();
    $('#loading_img_' + sound_id).show();
    var settings = {
        "crossDomain": true,
        "url": "/nlp/tts/generate/voice/",
        "method": "POST",
        "data": {
            "text": urdu_text_area,
            "voice": $("input[name='voice_option']:checked").val()
        }
    };

    $.ajax(settings).done(function (response) {
        var output_dev = $('#output_div_' + sound_id);
        output_dev.empty().append(response);
        $('#loading_img_' + sound_id).hide();
        output_dev.find('.generated_voice').get(0).play();
    });
}


function submit_evaluation_form() {
    $('#loading-div').show();
    var json_data = [];
    var all_forms = $('.voice_row');
    all_forms.each(function () {
        var tmp = {

            data: $(this).attr("id"),
            voice: $("input[name='voice_option']:checked").val(),
            understandability: $(this).find("input[name*='understandability']:checked").val(),
            naturalness: $(this).find("input[name*='naturalness']:checked").val(),
            pleasantness: $(this).find("input[name*='pleasantness']:checked").val(),
            overall: $(this).find("input[name*='overall']:checked").val()

        };
        json_data.push(tmp);
    });
    console.log(json_data);
    var settings = {
        "crossDomain": true,
        "url": "/nlp/tts/evaluate/voice/",
        "method": "POST",
        "data": {
            "form": JSON.stringify(json_data)
        }
    };
    $.ajax(settings).done(function (response) {
        $('#loading-div').hide();
        show_toast(response);
    });

}


function show_toast(msg) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    x.innerHTML = msg;
    x.className = "show";

    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 2000);
}