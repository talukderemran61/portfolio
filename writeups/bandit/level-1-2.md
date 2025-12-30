# Bandit - level 1 -> 2  
**Challenge name:** read file starts with special character  
**Date:** 22 Oct 2025  
**Time spent:** ~5 mins  
**Difficulty:** Easy  

---

## Goal
The password for the next level is stored in a file called - located in the home directory

---

## Tools / commands may be used
- `ls` , `cd` , `cat` , `file` , `du` , `find`

---

## Approach (step-by-step)
1. **Connect to the server** using the credentials from previous level:
    ```bash
    ssh bandit1@bandit.labs.overthewire.org -p 2220

2. **Locate the file in home directory**
    ```bash
    ls
    ```
    look for file named **-**

3. **Read the file to retrieve the next level password**
    Usually one would try `cat <filename>` to read a file. But in this case it won't work because the file name is hyphen(-) which is in unix-like system a convention for "standard input" for commands that read from a file or other resources. So, instead of reading the file it starts reading from user input.  
    
    To circumbent this problem one must use the relative or absolute file name to access the file.   
    Use:
    ```bash
    cat ./- 
    or 
    cat ~/-
    ```
    Copy the output and use it to SSH to `bandit2`

---

## Commands & outputs
```bash
$ ssh bandit0@bandit.labs.overthewire.org -p 2220
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
... (banner) ...
bandit0@bandit.labs.overthewire.org's password:
Welcome to OverTheWire!
bandit1@bandit:~$ ls
-
bandit1@bandit:~$ cat ./-
<password>
```

---

## Flags / result
- password: `<password>`  
Use it to login:
```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```
## Password Notice
For security and in accordance with OverTheWire rules, the actual password for the next level is **not included** in this write‑up.  
Use the steps shown above to retrieve it in your own environment.

---

## Lesson learned
- Use full path to access a file starts with special character

---

## References
- [OverTheWire — Bandit level descriptions and hints](https://overthewire.org/wargames/bandit/bandit2.html)

---

## Reading materials
- [Google Search for “dashed filename”](https://www.google.com/search?q=dashed+filename)
- [Advanced Bash-scripting Guide - Chapter 3 - Special Characters](https://linux.die.net/abs-guide/special-chars.html)