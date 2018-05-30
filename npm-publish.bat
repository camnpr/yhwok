@echo off

echo 本文件只可以用文本文件编辑并以ANSI类型保存，否则中文字符将无法正常显示！！！
echo ---------------------------------------------------------------------

echo 发布npm包到 https://www.npmjs.com/package/yhwok

echo 》npm set registry https://registry.npmjs.org/
call npm set registry https://registry.npmjs.org/

echo 》npm login
call npm login

::set Username=***
::set Password=***
::set Email=***@***.com

echo 》当前登录用户是：
call npm whoami

echo 》npm publish  to  'https://www.npmjs.com/package/yhwok'
call npm publish

echo 》Game Over!《

pause