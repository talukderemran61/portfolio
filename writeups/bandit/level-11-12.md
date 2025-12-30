# Bandit - level 11 -> 12  
**Challenge name:** rotate letters by 13 positions  
**Date:** 10 Nov 2025  
**Time spent:** ~5 mins  
**Difficulty:** Medium  

---

## Goal
The password for the next level is stored in the file `data.txt`, where all lowercase (a-z) and uppercase (A-Z) letters have been rotated by 13 positions

---

## Tools / commands you may use
- `grep`, `sort`, `uniq`, `strings`, `base64`, `tr`, `tar`, `gzip`, `bzip2`, `xxd`
- `man` - Displays the manual page for a command (helps understand usage and options)

---

## Approach (step-by-step)
1.  **Connect to the server** using the credentials from previous level:
    ```bash
    ssh bandit11@bandit.labs.overthewire.org -p 2220

2.  **List and inspect the file** to see its type:
    ```bash
    ls
    file data.txt
    cat data.txt
    ```
    `file` reports **ASCII text**. `cat` prints the file content, but the letters are rotated by 13 letters as the level descriptions mentioned. This challenge is pretty straight forward and can be solved manually, but we are here to learn command line tools.

3.  **Check the wiki page in reading materials** at the bottom:
    The Wikipedia page for ROT13. Check the `Implementation` section where the use of `tr` using the unix terminal for **rot13** is clearly shown with example.
    ```bash
    # Map upper case A-Z to N-ZA-M and lower case a-z to n-za-m
    tr 'A-Za-z' 'N-ZA-Mn-za-m' <<< "Pack My Box With Five Dozen Liquor Jugs"
    # output: Cnpx Zl Obk Jvgu Svir Qbmra Yvdhbe Whtf
    ```
    Here, with `tr <set1> <set2>` each letter in set1 is replaced by the corresponding letter in set2. `<<<` -> redirects the string to stdin of the command.

4.  **Use the content of `data.txt`** file in ROT13 using `tr`:
    ```bash
    cat data.txt | tr 'A-Za-z' 'N-ZA-Mn-za-m'
    ```
    This will print the line rotating each letter by 13 positions with the password.

5. **Copy the password** and use it to SSH into the next level (`bandit12`).

---

## Commands & outputs
```bash
$ ssh bandit11@bandit.labs.overthewire.org -p 2220 
... (banner) ... 
bandit11@bandit:~$ ls
data.txt
bandit11@bandit:~$ file data.txt
data.txt: ASCII text
bandit11@bandit:~$ cat data.txt
Gur cnffjbeq vf 7k16JArUVv5LxVuJfsSVdbbtaHGlw9D4
bandit11@bandit:~$ cat data.txt | tr 'A-Za-z' 'N-ZA-Mn-za-m'           
The password is <password>                  # piping the output to 'tr'
bandit11@bandit:~$ tr 'A-Za-z' 'N-ZA-Mn-za-m' <<< "Gur cnffjbeq vf 7k16JArUVv5LxVuJfsSVdbbtaHGlw9D4"
The password is <password>                  # redirecting the output to 'tr'
bandit11@bandit:~$                          # note: there could be multiple solution of a single problem
```

---

## Flags / result
- password: `<password>`  
    Use it to login:
```bash
ssh bandit12@bandit.labs.overthewire.org -p 2220
```
## Password Notice
For security and in accordance with OverTheWire rules, the actual password for the next level is **not included** in this write‑up.  
Use the steps shown above to retrieve it in your own environment.

---

## Lesson learned
- `tr <set1> <set2>` each letter in set1 is replaced by the corresponding letter in set2. 
- `<<<` -> redirects the string to stdin of the command.
- `|` -> redirects output of a command to another.

---

## References
- [OverTheWire — Bandit level descriptions and hints](https://overthewire.org/wargames/bandit/bandit12.html)

---

## Reading materials
- man - `tr`
- [Rot13 on Wikipedia](https://en.wikipedia.org/wiki/ROT13)