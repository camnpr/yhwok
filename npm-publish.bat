@echo off

echo ���ļ�ֻ�������ı��ļ��༭����ANSI���ͱ��棬���������ַ����޷�������ʾ������
echo ---------------------------------------------------------------------

echo ����npm���� https://www.npmjs.com/package/yhwok

echo ��npm set registry https://registry.npmjs.org/
call npm set registry https://registry.npmjs.org/

echo ��npm login
call npm login

::set Username=***
::set Password=***
::set Email=***@***.com

echo ����ǰ��¼�û��ǣ�
call npm whoami

echo ��npm publish  to  'https://www.npmjs.com/package/yhwok'
call npm publish

echo ��Game Over!��

pause