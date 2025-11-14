# Bandit - level 10 -> 11  
**Challenge name:** base64 encoded data in data.txt  
**Date:** 09 Nov 2025  
**Time spent:** ~5 mins  
**Difficulty:** Beginner  

---

## Goal
The password for the next level is stored in the file **data.txt**, which contains base64 encoded data

---

## Tools / commands you may use
- `grep`, `sort`, `uniq`, `strings`, `base64`, `tr`, `tar`, `gzip`, `bzip2`, `xxd`
- `man` - Displays the manual page for a command (helps understand usage and options)

---

## Approach (step-by-step)
1.  **Connect to the server** using the credentials from previous level:
    ```bash
    ssh bandit10@bandit.labs.overthewire.org -p 2220

2.  **List and inspect the file** to see its type:
    ```bash
    ls
    file data.txt
    ```
    `file` reports **ASCII text**, but the contents look like a block of random characters — a sign it might be Base64.

3.  **Decode the Base64** using the base64 utility:
    ```bash
    base64 data.txt -d
    ```
    That prints the decoded plaintext, which contains the password.

4. **Copy the password** and use it to SSH into the next level (`bandit11`).

---

## Commands & outputs
```bash
$ ssh bandit10@bandit.labs.overthewire.org -p 2220 
... (banner) ... 
bandit10@bandit:~$ ls
data.txt
bandit10@bandit:~$ file data.txt
data.txt: ASCII text
bandit10@bandit:~$ cat data.txt
VGhlIHBhc3N3b3JkIGlzIGR0UjE3M2ZaS2IwUlJzREZTR3NnMlJXbnBOVmozcVJyCg==
bandit10@bandit:~$ base64 data.txt -d
The password is <password>
```

---

## Flags / result
- password: `<password>`  
    Use it to login:
```bash
ssh bandit11@bandit.labs.overthewire.org -p 2220
```
## Password Notice
For security and in accordance with OverTheWire rules, the actual password for the next level is **not included** in this write‑up.  
Use the steps shown above to retrieve it in your own environment.

---

## Lesson learned
- When `file` reports **data** or you see unreadable ASCII that looks patterned, try `strings` or `xxd` to inspect - and consider common encodings like Base64.
- `base64 -d` quickly decodes Base64-encoded text; use `man base64` if unsure about flags.

---

## References
- [OverTheWire — Bandit level descriptions and hints](https://overthewire.org/wargames/bandit/bandit11.html)

---

## Reading materials
- man - `base64`
- [Base64 on Wikipedia](https://en.wikipedia.org/wiki/Base64)