@echo off
echo Starting installation... > install_log.txt
npm install >> install_log.txt 2>&1
echo Installation finished with exit code %errorlevel% >> install_log.txt
