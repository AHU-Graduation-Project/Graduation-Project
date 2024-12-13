@echo off
setlocal enabledelayedexpansion

:branch_loop
rem Step 1: Get input for branch name
set "branch_name="  REM Clear the variable before input
set /p branch_name="Enter the branch name: "

rem Debugging output
echo You entered: '%branch_name%'

rem Check for empty input
if "%branch_name%"=="" (
    echo Error: Branch name cannot be empty.
    goto branch_loop
)

rem Validate the branch name
if not "%branch_name:~0,3%"=="GP-" (
    echo Error: Branch name must start with 'GP-'.
    goto branch_loop
)

set "number_part=%branch_name:~3%"  REM Get part after 'GP-'
if "%number_part%"=="" (
    echo Error: Branch name must have a number after 'GP-'.
    goto branch_loop
)

for /f "delims=0123456789" %%a in ("%number_part%") do (
    echo Error: Branch name must have a number after 'GP-'.
    goto branch_loop
)
echo Valid branch name entered: '%branch_name%'

rem Step 0 : Ask to create branch or already exist
set "user_choice="
set /p user_choice="Do you want to create a new branch? (Y/N) : "

if "%user_choice%"=="Y" (
rem Step 2: Create a new branch
git checkout -b "%branch_name%"
if errorlevel 1 (
    echo Failed to create the branch. Make sure you are in a Git repository.
    pause
    exit /b
)
)

rem Step 3: Stage all changes

git add .

git add *


if errorlevel 1 (
    echo Failed to stage changes.
    pause
    exit /b
)

rem Step 4: Get input for commit message
set "commit_message="  REM Clear the variable before input
set /p commit_message="Enter the commit message: "

rem Step 5: Create a commit with the provided message
git commit -m "%commit_message%"
if errorlevel 1 (
    echo Failed to create the commit.
    pause
    exit /b
)

rem Step 6: Push the commit to the new branch
git push origin "%branch_name%"
if errorlevel 1 (
    echo Failed to push the commit.
    pause
    exit /b
)

echo Done!
pause
