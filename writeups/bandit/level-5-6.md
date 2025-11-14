# Bandit - level 5 -> 6  
**Challenge name:** find human-readable file of exact size  
**Date:** 25 Oct 2025  
**Time spent:** ~5-10 mins  
**Difficulty:** Beginner  

---

## Goal
The password for the next level is stored in a file somewhere under the inhere directory and has all of the following properties:

- human-readable
- 1033 bytes in size
- not executable

---

## Tools / commands you may use
- `ls` , `cd` , `cat` , `file` , `du` , `find`
- `man <command>` - to open manual page of the command.

---

## Approach (step-by-step)
1. **Connect to the server** using the credentials from previous level:
    ```bash
    ssh bandit5@bandit.labs.overthewire.org -p 2220

2. **List files** and change into the `inhere` directory and inspect its subdirectories:
    ```bash
    ls
    cd inhere
    ls
    ```

3.  **Use `find` to locate files with the exact byte size** required (1033 bytes). `find` supports size matching by bytes using `c` as the unit:
    ```bash
    find . -type f -size 1033c
    ```
    This searches recursively for regular files exactly 1033 bytes long.

4. **Verify the found file** is human-readable (use `file` if needed) and then print it with `cat`:
    ```bash
    cat ./maybehere07/.file2
    ```

5. **Copy the password** from the file output and use it to SSH into the next level (`bandit6`).

---

## Commands & outputs
```bash
$ ssh bandit5@bandit.labs.overthewire.org -p 2220
... (banner) ...
bandit5@bandit:~$ ls
inhere
bandit5@bandit:~$ cd inhere/
bandit5@bandit:~/inhere$ ls
maybehere00  maybehere02  maybehere04  maybehere06  maybehere08  maybehere10  maybehere12  maybehere14  maybehere16  maybehere18
maybehere01  maybehere03  maybehere05  maybehere07  maybehere09  maybehere11  maybehere13  maybehere15  maybehere17  maybehere19
bandit5@bandit:~/inhere$ find . -type f -size 1033c
./maybehere07/.file2
bandit5@bandit:~/inhere$ cat ./maybehere07/.file2
<password>
```

---

## Flags / result
- password: `<password>`  
    Use it to login:
```bash
ssh bandit6@bandit.labs.overthewire.org -p 2220
```
## Password Notice
For security and in accordance with OverTheWire rules, the actual password for the next level is **not included** in this write‑up.  
Use the steps shown above to retrieve it in your own environment.

---

## Lesson learned
- `find` is very powerful for locating files by properties (type, size, permissions, etc.).
- Use `-type f` to look into regular files only (the `f` suffix means regular file). Read `man` page for other available suffix.
- Use `-size <N>c` to match bytes exactly (the `c` suffix means bytes). 
- After locating a file, confirm it's human-readable with `file` or by attempting to cat it.
- Quoting or prefixing with `./` is helpful when filenames start with odd characters.

**Pro tip:** The man page is your best friend — it always has the answers.

---

## References
- [OverTheWire — Bandit level descriptions and hints](https://overthewire.org/wargames/bandit/bandit6.html)

---

## Reading materials
- `find` manual / `man find` (look for `-size` option)
- Google search for “find size in bytes -size c”