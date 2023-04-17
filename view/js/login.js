$(".login-form").on("submit", function( event ) {
    event.preventDefault();
    let values = $(this).serialize();
    $.ajax({
        url: "../handler/loginHandler.php",
        type: "post",
        async: true,
        data: values,
        dataType: "json",
        success: function(data) {
            if(data.res == 1) {
                alert("Вы авторизированы");
                window.location.href = "catalog.php";
            } else if (data.res == "admin"){
                window.location.href = "admin.php?route=users";
            } else if(data.res == 0) {
                $(".login-err").html("Неверный логин или пароль");

            }

            console.log(data);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR,textStatus, errorThrown);
        }
    });
});