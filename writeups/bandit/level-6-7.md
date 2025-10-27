# Bandit - level 6 -> 7
**Challenge name:** find file by owner/group and size
**Date:** 27 Oct 2025
**Time spent:** ~5-15 mins
**Difficulty:** Beginner / Intermediate

---

## Goal
The password for the next level is stored somewhere on the server and has all of the following properties:

- owned by user `bandit7`
- owned by group `bandit6`
- 33 bytes in size

---

## Tools / commands you may use
- `ls` , `cd` , `cat` , `file` , `du` , `find`, `grep`
- `grep` - print lines that match patterns
- `man <command>` - to open manual page of the command.

---

## Approach (step-by-step)
1. **Connect to the server** using the credentials from previous level:
    ```bash
    ssh bandit6@bandit.labs.overthewire.org -p 2220

2. **Search for files matching owner, group and size**. `find` is the natural tool for this because it can directly filter by user, group and size:
    ```bash
    # search the whole filesystem (may produce permission errors; redirect stderr)
    find / -user bandit7 -group bandit6 -size 33c 2>/dev/null
    ```
    This tells `find` to look for regular files owned by `bandit7`, in group `bandit6`, and exactly 33 bytes long (`c` = bytes).
    > this solution can also be achieved using `find / -user bandit7 -group bandit6 -size 33c 2>&1 | grep -v "Permission denied"`, where `stderr` is redirected to `stdout`, because `stderr` cannot be piped to `grep` as it goes straight to terminal. Then filtered out everything except the lines contain "Permission denied".

3. **Verify file permissions and read it**. Once you have the path, check it and `cat` it:
    ```bash
    ls -l /var/lib/dpkg/info/bandit7.password
    cat /var/lib/dpkg/info/bandit7.password
    ```

4. **Copy the password** and use it to SSH into the next level (`bandit7`).

---

## Commands & outputs
```bash
$ ssh bandit6@bandit.labs.overthewire.org -p 2220
... (banner) ...
bandit6@bandit:/$ find / -user bandit7 -group bandit6 -size 33c 2>/dev/null
/var/lib/dpkg/info/bandit7.password

bandit6@bandit:/$ ls -l /var/lib/dpkg/info/bandit7.password
-rw-r----- 1 bandit7 bandit6 33 Oct 14 09:26 /var/lib/dpkg/info/bandit7.password

bandit6@bandit:/$ cat /var/lib/dpkg/info/bandit7.password
morbNTDkSW6jIlUc0ymOdMaLnOlFVAaj
```

---

## Flags / result
- password: `morbNTDkSW6jIlUc0ymOdMaLnOlFVAaj`  
    Use it to login:
```bash
ssh bandit7@bandit.labs.overthewire.org -p 2220
```

---

## Lesson learned
- `find` is the right tool for searching by file attributes (owner, group, size) — use `-user`, `-group`, and `-size` to combine criteria.
- `du`+`grep` can sometimes solve the problem faster by eyeballing sizes, but it’s less reliable: it depends on where the username appears in du output and is fragile to format changes. The challenge author likely intended find.
- After locating a candidate file, always inspect permissions (ls -l) before reading.
- Use `2>/dev/null` to hide permission-denied messages when scanning system directories.
- In `2>/dev/null`, `2` - file descriptor for `stderr`, `1` - for `stdout`, `>` - redirect operator, `/dev/null` - a black hole that discards everything.
- `2>&1` - redirect `stderr` to `stdout`
- In `2>&1`, `&` tells the shell: "Don’t treat 1 as a filename — treat it as a file descriptor number."

> **Note:** I solved this level completely from scratch using `find` after reading `man` pages and experimenting. Later, I checked my old notes from about a year ago and realized I had solved it back then using `du -a -b | grep 33 | grep bandit7`. That approach worked by coincidence but wasn’t ideal— it relied on file paths containing "bandit7". Using `find` is the correct and more reliable solution since it filters files directly by owner, group, and size.

---

## References
- OverTheWire — Bandit level descriptions and hints

---

## Reading materials
- man `find` — see `-user`, `-group`, `-size` options
- [Redirections (Bash Reference Manual)](https://www.gnu.org/software/bash/manual/html_node/Redirections.html)
- [Linux file descriptor](https://en.wikipedia.org/wiki/File_descriptor)
- google search for "redirect stderr to stdin"