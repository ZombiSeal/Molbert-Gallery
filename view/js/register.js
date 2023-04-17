
checkInput();
function checkInput() {
    $(".edit").on("input", function (event){
        event.preventDefault();
        $.ajax({
            url: "../handler/regHandler.php?action=''",
            type: "post",
            async: true,
            data: {values: $(this).val(), name: $(this).attr("name")},
            dataType: "json",
            success: function(data) {
                $(event.target).next(".error").html(data.error);
                console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR,textStatus, errorThrown);
            }
        });
    });
}




$(".email").on("focusout", function( event ) {
    event.preventDefault();
    let values = $(this).serialize();
    $.ajax({
        url: "../handler/regHandler.php?action=emailExists",
        type: "post",
        async: true,
        data: {values: $(this).val(), name: $(this).attr("name")},
        dataType: 'json',
        success: function(data) {
            $(event.target).next(".error").html(data.error);
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR,textStatus, errorThrown);
        }
    });
});

checkRepeatPass();
function checkRepeatPass() {
    $(".repeat-password").on("input", function( event ) {
        event.preventDefault();
        $.ajax({
            url: "../handler/regHandler.php",
            type: "post",
            async: true,
            data: {passwordRepeat: $(".repeat-password").val(),
                password: $(".password").val(),
                name: $(this).attr("name")
            },
            dataType: 'json',
            success: function(data) {
                $(event.target).next(".error").html(data.error);
                console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR,textStatus, errorThrown);
            }
        });
    });
}


$(".register-form").on("submit", function( event ) {
    event.preventDefault();
    $.ajax({
        url: "../handler/regHandler.php",
        type: "post",
        async: true,
        data: {firstName: $(".firstname").val(),
            lastName: $(".lastName").val(),
            email: $(".email").val(),
            password: $(".password").val(),
            passwordRepeat: $(".repeat-password").val(),
            name: $(this).attr("name")},
        dataType: "json",
        success: function(data) {
            if(data.res == 1) {
                alert("Вы зареганы");
                window.location.href = "login.php";
            } else {
                console.log(data.res);
                alert("Что-то не так");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR,textStatus, errorThrown);
        }
    });
});

