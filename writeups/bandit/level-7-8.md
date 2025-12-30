# Bandit - level 7 -> 8  
**Challenge name:** find password next to a keyword  
**Date:** 28 Oct 2025  
**Time spent:** ~3 mins  
**Difficulty:** Easy  

---

## Goal
The password for the next level is stored in the file data.txt next to the word millionth

---

## Tools / commands you may use
- `man` - Displays the manual page for a command (helps understand usage and options)
- `grep` - print lines that match patterns
- `sort` - sort lines of text files
- `uniq` - report or omit repeated lines
- `strings` - print the sequences of printable characters in files
- `base64` - base64 encode/decode data and print to standard output
- `tr` - Translates or deletes characters (useful for text manipulation)
- `tar` - Archives or extracts multiple files
- `gzip` - Compresses or decompresses .gz files
- `bzip2` - Compresses or decompresses .bz2 files
- `xxd` - Creates a hex dump or converts hex to binary

---

## Approach (step-by-step)
1. **Connect to the server** using the credentials from previous level:
    ```bash
    ssh bandit7@bandit.labs.overthewire.org -p 2220

2. **List the files** in the home directory:
    ```bash
    ls
    ```
    You’ll see a single file named `data.txt`.

3. **Check file type** (optional):
    ```bash
    file data.txt
    ```
    Output shows it’s a regular UTF-8 text file.

4. **Search for the word “millionth”** using `grep`:
    ```bash
    grep "millionth" data.txt
    ```
    `grep` filters and prints only the line containing the keyword, revealing the password beside it.

5. **Copy the password** and use it to SSH into the next level (`bandit8`).

---

## Commands & outputs
```bash
$ ssh bandit7@bandit.labs.overthewire.org -p 2220 
... (banner) ... 
bandit7@bandit:~$ ls 
data.txt 
bandit7@bandit:~$ cat data.txt | grep "millionth" 
millionth       <password> 
bandit7@bandit:~$ file data.txt 
data.txt: Unicode text, UTF-8 text
```

---

## Flags / result
- password: `<password>`  
    Use it to login:
```bash
ssh bandit8@bandit.labs.overthewire.org -p 2220
```
## Password Notice
For security and in accordance with OverTheWire rules, the actual password for the next level is **not included** in this write‑up.  
Use the steps shown above to retrieve it in your own environment.

---

## Lesson learned
- `grep` is the most efficient way to find specific words or patterns in text files.
- Always check the file type with `file` if you’re unsure whether it’s text or binary.
- For simple search tasks, `grep` + a clear keyword = fastest path to success.

---

## References
- [OverTheWire — Bandit level descriptions and hints](https://overthewire.org/wargames/bandit/bandit8.html)

---

## Reading materials
- `man grep`