# Bandit - level 4 -> 5
**Challenge name:** human-readable file
**Date:** 24 Oct 2025
**Time spent:** ~5 mins
**Difficulty:** Beginner

---

## Goal
The password for the next level is stored in the only human-readable file in the `inhere` directory. Tip: if your terminal is messed up, try the “`reset`” command.

---

## Tools / commands you may use
- `ls` , `cd` , `cat` , `file` , `du` , `find`

---

## Approach (step-by-step)
1. **Connect to the server** using the credentials from previous level:
    ```bash
    ssh bandit4@bandit.labs.overthewire.org -p 2220

2. **List files** and change into the `inhere` directory:
    ```bash
    ls
    cd inhere
    ```
    The directory contains many files whose names start with a dash (e.g. `-file00`, `-file01`, ...).

3.  **Identify human-readable file(s)** — use the file command to determine file types. Because the filenames start with `-`, prefix them with `./` so file treats them as paths rather than options:
    ```bash
    file ./*
    ```
    Look for output that indicates a readable text file (e.g., `ASCII` text).

4. **Read the human-readable file** — once identified (here `-file07`), use cat with `./` to avoid confusion with option parsing:
    ```bash
    cat ./-file07
    ```

5. **Copy the password** from the file output and use it to SSH into the next level (`bandit5`).

---

## Commands & outputs
```bash
$ ssh bandit4@bandit.labs.overthewire.org -p 2220
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
... (banner) ...
bandit4@bandit:~$ ls
inhere
bandit4@bandit:~$ cd inhere/
bandit4@bandit:~/inhere$ ls
-file00  -file01  -file02  -file03  -file04  -file05  -file06  -file07  -file08  -file09
bandit4@bandit:~/inhere$ file ./*
./-file00: data
./-file01: OpenPGP Public Key
./-file02: OpenPGP Public Key
./-file03: data
./-file04: data
./-file05: data
./-file06: data
./-file07: ASCII text
./-file08: data
./-file09: data
bandit4@bandit:~/inhere$ cat ./-file07
4oQYVPkxZOOEOO5pTW81FB8j8lxXGUQw
```

---

## Flags / result
- password: `4oQYVPkxZOOEOO5pTW81FB8j8lxXGUQw`  
    Use it to login:
```bash
ssh bandit5@bandit.labs.overthewire.org -p 2220
```

---

## Lesson learned
- Use file to quickly identify which files are plain text vs binary.
- Filenames that start with `-` can be treated as options by commands — prefix with `./` (or use `--` in some commands) to ensure they are treated as filenames: `cat ./-file07` or `cat -- -file07`.
- If your terminal gets garbled during an operation, run `reset` to return to a sane state (hint from the level description).

---

## References
- OverTheWire — Bandit level pages (for challenge descriptions and hints)

---

## Reading materials
- Google search for “filenames starting with dash linux `--` end of options”