# Bandit — Level 0 → 1
**Challenge name:** navigate and read file  
**Date:** 2025-10-09 
**Time spent:** ~5 minutes
**Difficulty:** Beginner

---

## Goal
The password for the next level is stored in a file called **readme** located in the home directory. Use this password to log into **bandit1** using SSH. Whenever you find a password for a level, use SSH (on port **2220**) to log into that level and continue the game.

---

## Tool / commands used
- `ls` -> list directory contents
- `cd` -> change the working directory
- `cat` -> concatenate files and print on the standard output
- `file` -> determine file type
- `du` -> estimate file space usage
- `find` -> search for files in a directory hierarchy

> Tip: use `man COMMAND` to open manual page of any command.

---

## Approach (Step-by-step)
1. **Connect to the server** using the provided credentials and port:
   ```bash
   ssh bandit0@bandit.labs.overthewire.org -p 2220

2. **Locate the file in the home directory:**   
   ```bash
   cd ~
   ls -la
   ```
   Look for a file named readme.

3. **Read the file to retrieve the next-level password:**
    ```bash
    cat readme
    ```
    Copy the output and use it to SSH into `bandit1`.
    
**Note:** Passwords also occasionally change. It is recommended to take notes on how to solve each challenge. As levels get more challenging, detailed notes are useful to return to where you left off, reference for later problems, or help others after you’ve completed the challenge.

## Commands & outputs
```bash
$ ssh bandit0@bandit.labs.overthewire.org -p 2220
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
... (banner) ...
bandit0@bandit.labs.overthewire.org's password:
Welcome to OverTheWire!
bandit0@bandit:~$ whoami
bandit0
bandit0@bandit:~$ ls
readme
bandit0@bandit:~$ cat readme
ZjLjTmM6FvvyRnrb2rfNWOZOTa6ip5If
```

---

## Flags / result
- password: `ZjLjTmM6FvvyRnrb2rfNWOZOTa6ip5If`  
Use it to login:
```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

---

## Lesson learned
- Basic navigation: `cd`, `ls` and `cat` are often sufficient for simple file-retrieval tasks.