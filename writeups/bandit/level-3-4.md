# Bandit - level 3 -> 4
**Challenge name:** hidden file in `inhere` (`...Hiding-From-You`)
**Date:** 23 Oct 2025
**Time spent:** ~5 mins
**Difficulty:** Beginner

---

## Goal
The password for the next level is stored in a hidden file inside the `inhere` directory.

---

## Tools / commands you may use
- `ls` , `cd` , `cat` , `file` , `du` , `find`

---

## Approach (step-by-step)
1. **Connect to the server** using the credentials from previous level:
    ```bash
    ssh bandit3@bandit.labs.overthewire.org -p 2220

2. **List files** and change into the `inhere` directory:
    ```bash
    ls
    cd inhere
    ```

3.  **Show hidden files** — regular `ls` ignores files that start with a dot. Use `-a` or `-la` to reveal dotfiles:
    ```bash
    ls -la
    ```
    You should see a hidden file named `...Hiding-From-You`.

4. **Read the hidden file**:
    ```bash
    cat "./...Hiding-From-You"
    ```

5. **Copy the password** from the file output and use it to SSH into the next level (`bandit4`).

---

## Commands & outputs
```bash
$ ssh bandit3@bandit.labs.overthewire.org -p 2220
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
... (banner) ...
bandit3@bandit:~$ ls
inhere
bandit3@bandit:~$ cd inhere
bandit3@bandit:~/inhere$ ls -la
total 12
drwxr-xr-x  2 bandit4 bandit4 4096 Oct 23 00:00 .
drwxr-xr-x 11 bandit3 bandit3 4096 Oct 23 00:00 ..
-rw-r--r--  1 bandit4 bandit4   33 Oct 23 00:00 ...Hiding-From-You
bandit3@bandit:~/inhere$ cat "./...Hiding-From-You"
2WmrDFRmJIq3IPxneAaMGhap0pFhF3NJ
```

---

## Flags / result
- password: `2WmrDFRmJIq3IPxneAaMGhap0pFhF3NJ`  
    Use it to login:
```bash
ssh bandit4@bandit.labs.overthewire.org -p 2220
```

---

## Lesson learned
- Files beginning with a dot are hidden (dotfiles); use `ls -a` or `ls -la` to list them.
- When filenames contain leading dots (or other unusual characters), quote the filename or use a relative/absolute path to ensure the shell treats it literally (`"./...Hiding-From-You"`).
- `tab` completion and quoting are simple ways to avoid typing mistakes.

---

## References
- OverTheWire — Bandit level pages (for challenge descriptions and hints)

---

## Reading materials
- [Google search for “hidden files dotfiles linux”](https://www.google.com/search?q=hidden+files+dotfiles+linux&rlz=1C1CHWL_enBD1082BD1082&oq=hidden+files+dotfiles+linux&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigAdIBCDU2MzNqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8)