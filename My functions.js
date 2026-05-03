$(document).ready(function(){
    // إظهار/إخفاء التفاصيل
    $(".details").click(function(){
        $(this).closest("tr").next(".extra").toggle();
    });

    // إظهار النموذج عند الضغط على متابعة
    $("#continueBtn").click(function(){
        $("#orderForm").show();
    });

    // التحقق من صحة المدخلات
    $("#foodForm").submit(function(e){
        e.preventDefault();
        let fullname = $("#fullname").val();
        let account = $("#account").val();
        let date = $("#date").val();
        let mobile = $("#mobile").val();

        // تحقق من الاسم (إنكليزي فقط)
        let nameRegex = /^[A-Za-z]+\s[A-Za-z]+$/;
        if(fullname && !nameRegex.test(fullname)){
            alert("الاسم يجب أن يكون إنكليزي مع فراغ واحد بين الاسم والكنية");
            return;
        }

        // تحقق من الحساب (6 خانات)
        let accountRegex = /^\d{6}$/;
        if(!accountRegex.test(account)){
            alert("رقم الحساب يجب أن يكون 6 خانات");
            return;
        }

        // تحقق من التاريخ
        let dateRegex = /^\d{2}-\d{2}-\d{4}$/;
        if(date && !dateRegex.test(date)){
            alert("التاريخ يجب أن يكون بالشكل dd-mm-yyyy");
            return;
        }

        // تحقق من الموبايل (Syriatel أو MTN)
        let mobileRegex = /^(09[3-6]\d{6}|09[8-9]\d{6})$/;
        if(mobile && !mobileRegex.test(mobile)){
            alert("رقم الموبايل غير صحيح");
            return;
        }

        // حساب المجموع + الضريبة
        let total = 0;
        $(".select:checked").each(function(){
            let price = parseInt($(this).closest("tr").find("td:eq(2)").text());
            total += price;
        });
        let tax = total * 0.1;
        let net = total - tax;

        alert("الوجبات المختارة: " + $(".select:checked").length +
              "\nالمجموع: " + total +
              "\nالضريبة (10%): " + tax +
              "\nالمبلغ الصافي: " + net);
    });
});
