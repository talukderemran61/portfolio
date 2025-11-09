# Bandit - level 9 -> 10  
**Challenge name:** human-readable string preceded by =  
**Date:** 09 Nov 2025  
**Time spent:** ~5 mins  
**Difficulty:** Beginner  

---

## Goal
The password for the next level is stored in the file data.txt in one of the few human-readable strings, preceded by several '=' characters.

---

## Tools / commands you may use
- `grep`, `sort`, `uniq`, `strings`, `base64`, `tr`, `tar`, `gzip`, `bzip2`, `xxd`
- `man` - Displays the manual page for a command (helps understand usage and options)

---

## Approach (step-by-step)
1.  **Connect to the server** using the credentials from previous level:
    ```bash
    ssh bandit9@bandit.labs.overthewire.org -p 2220

2.  **List and inspect the file** to see its type:
    ```bash
    ls
    file data.txt
    ```
    You’ll see a single file named `data.txt`. `data.txt` is not plain text (it's binary-like), so normal `cat` won't help.

3.  **Use** `strings` to extract human-readable sequences from the binary file. `strings` prints the printable character sequences inside a binary - perfect for this level::
    ```bash
    strings data.txt
    ```

4.  **Filter for lines containing** `=` since the password is said to be preceded by several `=` characters:
    ```bash
    strings data.txt | grep '='
    ```
    look for the long readable string that is preceded by many = characters.

5. **Copy the password** and use it to SSH into the next level (`bandit10`).

---

## Commands & outputs
```bash
$ ssh bandit9@bandit.labs.overthewire.org -p 2220 
... (banner) ... 
bandit9@bandit:~$ ls
data.txt
bandit9@bandit:~$ file data.txt
data.txt: data
bandit9@bandit:~$ man strings
bandit9@bandit:~$ strings data.txt
Dm|H
d:Bj
pgM,
g%q&N
...
b>!T
A6nOT
ICJ9
+w(Y
bandit9@bandit:~$ strings data.txt | grep =
========== the
9=H`
[!#=Z
========== password
xWf=
f\Z'========== is
e=i{\#
/1=s
nS=F
M=Sl
=LGT
y =1
========== FGUW5ilLVJrxX9kMYMmlN4MgbpfMiqey
'+Y=+
bandit9@bandit:~$
```

---

## Flags / result
- password: `FGUW5ilLVJrxX9kMYMmlN4MgbpfMiqey`  
    Use it to login:
```bash
ssh bandit10@bandit.labs.overthewire.org -p 2220
```

---

## Lesson learned
- `file` helps identify whether a file is text or binary; when `file` reports data or non-text, try `strings` to extract readable fragments.
- Use `grep` to narrow down the `strings` output when the password is hinted to be next to a specific pattern (here,`=`).
- This level demonstrates the common pattern in wargames: inspect type → extract readable text from binary → filter for the hint.
> Pro tip: The man page is your best friend — if you don’t know what a tool does, man <tool> will often point you straight to the solution.

---

## Reading materials
- man - `grep`, `strings`, `file`