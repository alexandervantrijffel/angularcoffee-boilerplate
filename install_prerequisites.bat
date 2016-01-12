@echo off
echo Download and install Nodejs for windows from https://nodejs.org/en/#download
start https://nodejs.org/en/#download
echo Press a key when the installation of Nodejs has completed.
cd /d "%~dp0\src"
echo Installing Gulp globally
start "" "C:\Program Files\nodejs\npm" install -g gulp
echo Installing Bower globally
"C:\Program Files\nodejs\npm" install -g bower
cd /d "%~dp0"
echo Run start_server.cmd to continue...