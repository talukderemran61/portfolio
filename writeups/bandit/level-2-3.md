# Bandit - level 2 -> 3  
**Challenge name:** spaces in this filename  
**Date:** 22 Oct 2025  
**Time spent:** ~5 mins  
**Difficulty:** Beginner  

---

## Goal
The password for the next level is stored in a file called `--spaces in this filename--` located in the home directory

---

## Tools / commands you may use
- `ls` , `cd` , `cat` , `file` , `du` , `find`

---

## Approach (step-by-step)
1. **Connect to the server** using the credentials from previous level:
    ```bash
    ssh bandit2@bandit.labs.overthewire.org -p 2220

2. **List files** in the home directory to see the oddly-named file:
    ```bash
    ls
    ```
    You should see a file named `--spaces in this filename--`.

3.  **Read the file** — because the filename contains spaces, treat the name as a single argument. You can either:
    - wrap the file in quotes:
    ```bash
    cat ./"--spaces in this filename--"
    ```
    - or escape the spaces:
    ```bash
    cat ./--spaces\ in\ this\ filename--
    ```
    - or use tab-completion after typing the first word:
    ```bash
    cat ./-<TAB>
    ```

4. **Copy the password** from the output and use it to SSH into the next level (`bandit3`).

---

## Commands & outputs
```bash
$ ssh bandit2@bandit.labs.overthewire.org -p 2220
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
... (banner) ...
bandit2@bandit:~$ ls
spaces in this filename
bandit2@bandit:~$ cat ./--spaces\ in\ this\ filename--
<password>
```

---

## Flags / result
- password: `<password>`  
    Use it to login:
```bash
ssh bandit3@bandit.labs.overthewire.org -p 2220
```
## Password Notice
For security and in accordance with OverTheWire rules, the actual password for the next level is **not included** in this write‑up.  
Use the steps shown above to retrieve it in your own environment.

---

## Lesson learned
- Filenames with spaces must be quoted or have their spaces escaped when passed as a single command-line argument.
- Tab-completion is a quick way to avoid quoting/escaping mistakes.

---

## References
- [OverTheWire — Bandit level descriptions and hints](https://overthewire.org/wargames/bandit/bandit3.html)

---

## Reading materials
- [Advanced Bash-scripting Guide - Special Characters](https://linux.die.net/abs-guide/special-chars.html)
- [Google Search for “spaces in filename”](https://www.google.com/search?q=spaces+in+filename)