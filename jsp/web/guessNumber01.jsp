<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020/7/2
  Time: 16:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>小游戏</title>
<style>
    body{
        background-color: #cccccc;
    }
    h2{
        padding-left: 550px;
        text-align:left;
        color: lightseagreen;
    }

    p{
        display: block;
        text-align: center;

    }
    div{
        color: lightseagreen ;
    }
</style>
</head>
<body>

<h2 >Let's guess number !</h2><br>
<p>系统会随机生成一个1-100之间的整数 你有五次机会去猜出它</p><br>

<form action="guessNumber02.jsp" method="post">
    <div>
        <p ><input type="submit" value="开始游戏吧！"></p>
    </div>

</form>

<%
    int a=(int)(Math.random()*100+1);
    session.setAttribute("number",a);
    session.setAttribute("count", new Integer(0));
%>
</body>
</html>
