@setlocal enableextensions enabledelayedexpansion
ECHO "Talent Plugin"
rem remove : from time
SET TimeFormat=!TIME::=!
REM replace systax   : %variable:StrToFind=NewStr%
REM substring systax : %variable:~num_chars_to_skip,num_chars_to_keep%
REN plugin.def plugin_!date:/=!_!TimeFormat:~0,4!.def
SET file=plugin.def

rem Delete file contents
BREAK>%file%

rem create Menu
ECHO [Plugin]>>%file%
ECHO Id=com.powertalent.sakura.plugin>>%file%
ECHO Name=Talent Plugin>>%file%
ECHO Description=Sakura Plugin by PowerTalent>>%file%
ECHO Type=wsh>>%file%
ECHO Author=PowerTalent>>%file%
ECHO Version=>>%file%
ECHO Url=>>%file%
ECHO [Wsh]>>%file%
ECHO UseCache=0>>%file%
ECHO [Command]>>%file%


rem %%~nxf (fileName) , %%f (path)
SET i=1
FOR /r %%f IN (js\*.js) DO (
    ECHO ;>>%file%
    ECHO C[!i!]=js\%%~nxf>>%file%
    
    rem split file name by "_" (get 2nd part)
    SET Label=""
    FOR /F "tokens=2 delims=_" %%A IN ("%%~nxf") DO (
        SET Label=%%A
    )

    ECHO C[!i!].Label=!Label!>> %file%
    SET /A i=i+1
)
