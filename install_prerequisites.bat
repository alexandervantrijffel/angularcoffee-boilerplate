@echo off
echo Download and install Nodejs for windows from https://nodejs.org/en/#download
start https://nodejs.org/en/#download
echo Press a key when the installation of Nodejs has completed.

if exist "C:\Program Files\nodejs\npm" (
    SET npmexe = "C:\Program Files\nodejs\npm"
) else if exist "C:\Program Files (x86)\nodejs\npm" (
    SET npmexe = "C:\Program Files\nodejs\npm"
) else (
    echo Nodejs NPM not found! Please install Nodejs NPM first..
    goto STOP
)

cd /d "%~dp0\src"
echo Installing Gulp globally
start "" "C:\Program Files\nodejs\npm" install -g gulp
echo Installing Bower globally
start "" "C:\Program Files\nodejs\npm" install -g bower
echo Install Python 2.7.x from https://www.python.org/getit/windows to be able to use browsersync for live reloading
echo IMPORTANT install version 2.7.x, NOT 3.x.x because the latter is not supported by node-gyp
start https://www.python.org/getit/windows
echo Press a key when python 2.7.x has been installed
pause 
start "" "C:\Program Files\nodejs\npm" install -g node-gyp
cd /d "%~dp0"
echo Run start_server.cmd to continue...

:STOP