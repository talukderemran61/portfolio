# simple_unix_program

# SysInfo Utility

## Description

`sysinfo_utility.sh` is a Bash-based menu-driven script designed to:

- Display detailed system and user information  
- Allow users to check whether a number is even or odd (with input validation)  
- Store the checked numbers along with statistics (average, highest, lowest) in a text file  
- Exit the program cleanly and clear the terminal  

This tool is intended to help users become familiar with basic shell scripting concepts and system commands in a Unix environment.

## Features

### 1. User Information Display
Displays:
- Username  
- User ID  
- Home directory  
- Files and folders in the current directory  
- Login shell  
- Current date and time  

### 2. Even/Odd Number Checker
- Accepts user input between 1–100  
- Classifies numbers as even or odd  
- Handles invalid (non-numeric or out-of-range) input  
- Allows the user to exit input mode by typing `0`  

### 3. Store Results to File
- Saves even and odd numbers from the checker to `result.txt`  
- Calculates and writes:
  - All entered numbers  
  - Even numbers  
  - Odd numbers  
  - Highest number  
  - Lowest number  
  - Average value  
- In case no number was entered, displays an error message in the file  

### 4. Program Exit
- Clears the terminal and exits the script  

## Requirements

- Bash shell (`/bin/bash`)  
- Unix-like OS (Linux or macOS)  
- Terminal access  

## How to Use

1. Open a terminal.  
2. Make the script executable:
   ```bash
   chmod +x sysinfo_utility.sh
   ```
3. Run the script using:
   ```bash
   ./sysinfo_utility.sh
   ```
   Or:
   ```bash
   bash sysinfo_utility.sh
   ```

4. Use the menu:
   - `1`: Display user information  
   - `2`: Run even/odd checker  
   - `3`: Store results to file  
   - `4`: Exit the program  

## Example Output

### User Information
```
=================================================
               User Information                  
=================================================
User name: emran
User ID: 1000
Home folder: /home/emran
Files and Folders: result.txt  sysinfo_utility.sh
Login shell: /bin/bash
Date & time: Sat Mar 17 14:10:48 AEDT 2025
-------------------------------------------------
Press any key to continue...
```

### Even/Odd Checker
```
=================================================
             Even/Odd number checker             
=================================================
Enter a number between 1 and 100 (0 to exit): 42
42 is even
Enter a number between 1 and 100 (0 to exit): 77
77 is odd
Enter a number between 1 and 100 (0 to exit): 0
exiting...
-------------------------------------------------
Results:
even numbers: 42
odd numbers: 77
-------------------------------------------------
```

### Result File (`result.txt`)
```
All numbers: 42 77
Even numbers: 42
Odd numbers: 77
Highest number is 77
Lowest number is 42
Average is 59
```

## Authors

- **Emran Talukdar** (s8157354)  
- **Md Faysal Hossain** (s8193819)  

Group 10 – NIT1202: Operating Systems  

## References

The script was developed using concepts and examples from:
- [LinuxCommand.org – read command](https://linuxcommand.org/lc3_man_pages/readh.html)  
- [die.net – echo manual](https://linux.die.net/man/1/echo)  
- [phoenixNAP – Bash scripting](https://phoenixnap.com/kb/bash)  
- [Cyberciti – Bash while loops](https://www.cyberciti.biz/faq/bash-while-loop/)  
- [Stack Overflow – Bash syntax discussions](https://stackoverflow.com/)  
- [Linuxize – Bash arrays](https://linuxize.com/post/bash-arrays/)

