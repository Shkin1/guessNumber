
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>游戏界面</title>
    <style>
p{
    text-align: center;
    font-family: "Courier New";
}

    </style>
</head>
<body>

<h2 align="center">请输入1-100之间的数</h2>
<form  method="post">
    <p><input type="text" name="guess" id="g"/></p><br>
    <p><input type="submit" value="提交" onclick="ale()"/></p>
</form>

<%
    int num1,num2=0,n;
    Integer str1=(Integer)session.getAttribute("number");
    Integer n1=(Integer)session.getAttribute("count");
    String str2=request.getParameter("guess");
    if(str2!=null){
        num2=Integer.parseInt(str2);
    }
    num1=Integer.valueOf(str1);
    n=Integer.valueOf(n1);
%>
<script type="text/javascript" >
    var num1='<%=session.getAttribute("number")%>' ;
    var n='<%=n+1%>';
    function ale(){
        var num2=document.getElementById("g").value;
        if(num1==num2){
            alert("猜对了！您一共猜了"+ n +"次");
            window.location.href='index.jsp';
            window.event.returnValue=false;
        }
        else if(num1>num2){
            alert("猜小了");
        }
        else if(num1<num2){
            alert("猜大了");
        }
        if(n==10){
            alert("游戏结束！")
            window.location.href='guessNumber01.jsp';
            window.event.returnValue=false;
        }
    }
</script>
<%
    n++;
    session.setAttribute("count", n);
%>

</body>
</html>
