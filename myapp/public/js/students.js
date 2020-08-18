$(function () {
    $(".button-group").click(function () {
    })
    var model = "";
    var pageStart = 0;
    loadData(pageStart);
    $(".guan").click(function(){
        $(".xgk1").css("display","none")
    })
    // 上一页
    $(".syiye").click(function () {
        if (pageStart == 0) {
            $(this).attr("disabled", "disabled");
        } else {
            pageStart--;
            loadData(pageStart);
            $(".page").eq(pageStart).addClass("current").siblings(".page").removeClass("current");
        }
    })
    // 下一页
    $(".xyiye").click(function () {
        if (pageStart == 2) {
            $(this).find("button").attr("disabled", "disabled");
        } else {
            pageStart++;
            loadData(pageStart);
            $(".page").eq(pageStart).addClass("current").siblings(".page").removeClass("current");
        }
    })
    // 数字
    $(".page").click(function () {
        pageStart = $(this).index() - 1;
        loadData(pageStart);
        $(".page").eq(pageStart).addClass("current").siblings(".page").removeClass("current");
    })
    //   删除

    $("#list_wrap").on("click", ".del", function () {
        var username = $(this).parent().siblings(".username").text();
        // console.log($(this).parent().siblings(".username").text());
        var sure = confirm("确定要删除吗？")
        if (sure) {
            $.ajax({
                url: "http://localhost:3000/stu_del", //请求地址
                type: "POST", //请求方式  GET POST
                async: true, //是否异步
                data: {
                    name: username
                },
                dataType: "json", //预期的服务器响应的数据类型  
                contentType: "application/x-www-form-urlencoded",
                success: function (response) {
                    if (response.msg == "success") {
                        alert("删除成功");
                        loadData(pageStart);
                    } else {
                        alert("删除失败，请稍后重试");
                    }
                },
                error: function (xhr, status, error) {
                    //失败后的回调
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                },
                complete: function () {
                    //无论失败还是成功都会执行   请求完成
                    console.log("请求已完成");
                }
            })
        }
    })
//     // 编辑
//     // $(".edit").click(function(){

  
//     $("#list_wrap").on("click", ".edit", function () {
//         var name = $(this).parent().siblings(".username").text();
//         var age = $(this).parent().siblings(".age").text();
//         var tel = $(this).parent().siblings(".tel").text();
//         var email = $(this).parent().siblings(".email").text();
//         var address = $(this).parent().siblings(".address").text();
//         var date = $(this).parent().siblings(".date").text();
//         oldData = {
//             name: name,
//             age: age,
//             tel: tel,
//             email: email,
//             address: address,
//             date: date
//         }
//         $("#username").val(name);
//         $("#age").val(age);
//         $("#tel").val(tel);
//         $("#email").val(email);
//         $("#address").val(address);
//         $("#date").val(date);
//         $(".xgk1").css("display","block")
//         console.log(oldData)
//     })
//     $("#change_sure").click(function () {
//         var name = $("#username").val();
//         var age = $("#age").val();
//         var tel = $("#tel").val();
//         var email = $("#email").val();
//         var address = $("#address").val();
//         var date = $("#date").val();
//         newData = {
//             name: name,
//             age:Number(age) ,
//             tel: tel,
//             email: email,
//             address: address,
//             date: date
//         }
       
//        console.log(newData)
//         var sure = confirm("确定要修改吗")
//         if (sure) {
//             $.ajax({
//                 url: "http://localhost:3000/stu_change", //请求地址
//                 type: "POST", //请求方式  GET POST
//                 async: true, //是否异步
//                 data: {
//                     oldData,
//                     newData
//                 },
//                 dataType: "json", //预期的服务器响应的数据类型  
//                 contentType: "application/x-www-form-urlencoded",
//                 success: function (response) {
//                     if (response.msg == "success") {
//                         alert("修改成功");
//                         loadData(pageStart);
//                     } else {
//                         alert("修改失败，请稍后重试");
//                     }
//                 },
//                 error: function (xhr, status, error) {
//                     //失败后的回调
//                     console.log(xhr);
//                     console.log(status);
//                     console.log(error);
//                 },
//                 complete: function () {
//                     //无论失败还是成功都会执行   请求完成
//                     console.log("请求已完成");
//                 }
//             })
//         }
//     })


 // 编辑
 $("#list_wrap").on("click", ".edit", function () {
    
    var age = $(this).parent().siblings(".age").text();
    var name = $(this).parent().siblings(".username").text();
    var tel = $(this).parent().siblings(".tel").text();
    var address = $(this).parent().siblings(".address").text();
    var email = $(this).parent().siblings(".email").text();
    var date = $(this).parent().siblings(".date").text();
    

    $("#age").val(age);
    $("#username").val(name);
    $("#tel").val(tel);
    $("#email").val(email);
    $("#address").val(address);
    $("#date").val(date);
   


    $(".xgk1").css("display","block")
//         console.log(oldData)
    // console.log($("#shadow",parent.document));
    // parent.$("#shadow").show()

  })
  $("#change_sure").click(function () {
    var age = $("#age").val();
    var name = $("#username").val();
    var tel = $("#tel").val();
    var address = $("#address").val();
    var email = $("#email").val();
    var date = $("#date").val();
    var sure = confirm("确定要修改吗？")
    if (sure) {
      $.ajax({
        url: "http://localhost:3000/stu_change", //请求地址
        type: "POST", //请求方式  GET POST
        async: true, //是否异步
        data: {
          name,
          age,
          tel,
          email,
          address,
          date,
          
        },
        dataType: "json", //预期的服务器响应的数据类型  
        contentType: "application/x-www-form-urlencoded",
        success: function (response) {
          if (response.msg == "success") {
            alert("修改成功");
           
            loadData(pageStart);
          } else {
            alert("修改失败，请稍后重试");
          }
        },
        error: function (xhr, status, error) {
          //失败后的回调
          console.log(xhr);
          console.log(status);
          console.log(error);
        },
        complete: function () {
          //无论失败还是成功都会执行   请求完成
          console.log("请求已完成");
        }
      })
    }
  })












})
function loadData(page) {
    var dataStart = page * 5;
    var dataEnd = (page + 1) * 5;
    $.ajax({
        url: "http://localhost:3000/stu_info", //请求地址
        type: "GET", //请求方式  GET POST
        async: true, //是否异步
        // dataType: "json", //预期的服务器响应的数据类型  json  jsonp
        // jsonpCallback: "", //在一个jsonp中规定回调函数的名称
        contentType: "application/x-www-form-urlencoded", //发送数据到服务器时所使用的数据类型
        success: function (response) {
            //成功后的回调
            // console.log(response);
            if (response.msg == "success") {
                // console.log(response.data)
                $("#list_wrap .moban").remove();
                for (var i = dataStart; i < dataEnd; i++) {
                    model = $("#model").html().replace("$id$", i + 1).replace("$name$", response.data[i].name).replace("$age$", response.data[i].age).replace("$tel$", response.data[i].tel).replace("$date$", response.data[i].date).replace("$email$", response.data[i].email).replace("$address$", response.data[i].address);
                    $("#list_wrap").append(model);
                }
            } else {
            }
            $(".input-val").val('');
        },
        error: function (xhr, status, error) {
            //失败后的回调
            console.log(xhr);
            console.log(status);
            console.log(error);
        },
        complete: function () {
            //无论失败还是成功都会执行   请求完成
            console.log("请求已完成");
        }
    })
}
function del(id) {
    if (confirm("您确定要删除吗?")) {}
}
$("#checkall").click(function () {
    $("input[name='id[]']").each(function () {
        if (this.checked) {
            this.checked = false;
        } else {
            this.checked = true;
        }
    });
})
function DelSelect() {
    var Checkbox = false;
    $("input[name='id[]']").each(function () {
        if (this.checked == true) {
            Checkbox = true;
        }
    });
    if (Checkbox) {
        var t = confirm("您确认要删除选中的内容吗？");
        if (t == false) return false;
    } else {
        alert("请选择您要删除的内容!");
        return false;
    }
}