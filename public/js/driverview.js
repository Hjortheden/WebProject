
    $(document).ready(function(){
        $(".add-row").click(function(){
            var way = $("#way").val();
            var time = $("#time").val();
            var recess = $("#recess").val();
            var cost = $("#cost").val();
            var ob = $("#ob").val();
            var markup = "<tr><td><input type='checkbox' name='record'></td><td>" + way + "</td><td>"
                + time +"</td><td>" + recess + "</td><td>" + cost + "</td><td>" + ob +"</td></tr>";
            $("table tbody").append(markup);
        });



        // Find and remove selected table rows
        $(".delete-row").click(function(){
            $("table tbody").find('input[name="record"]').each(function(){
                if($(this).is(":checked")){
                    $(this).parents("tr").remove();
                }
            });
        });

        $(".change-row").click(function () {
            var currentTD = $(this).parents('tr').find('td');
            if ($(this).html() == 'Edit') {
                $.each(currentTD, function () {
                    $(this).prop('contenteditable', true)
                });
            } else {
                $.each(currentTD, function () {
                    $(this).prop('contenteditable', false)
                });
            }

            $(this).html($(this).html() == 'Edit' ? 'Save' : 'Edit')


    });
    });

//do something similar to check input for drivers?!?! -->
/*
    //register
    router.post('/register', function (req, res) {
        var name = req.body.name;
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var password2 = req.body.password2;

        //validation
        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password2', 'Passwords does not match').equals(req.body.password);

        var errors = req.validationErrors();
    }*/