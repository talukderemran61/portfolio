# Bandit - Level 17 → Level 18  
**Challenge name:** find the difference in files content  
**Date:** 30 Dec 2025  
**Time spent:** ~5 mins  
**Difficulty:** Easy

---

## Level Goal
There are 2 files in the homedirectory: **passwords.old and passwords.new**. The password for the next level is in **passwords.new** and is the only line that has been changed between **passwords.old and passwords.new**

**NOTE: if you have solved this level and see ‘Byebye!’ when trying to log into bandit18, this is related to the next level, bandit19**

---

## Commands you may need to solve this level
cat, grep, ls, diff
> Tips: Not familiar with a command? Use `man <command>` to learn about it.

---

## Approach (step-by-step)
1.  **Connect to the server** using the credentials from previous level:
    ```bash
    ssh -i bandit17_sshkey.private bandit17@bandit.labs.overthewire.org -p 2220
    ```
    **Note:** If you didn't use the same SSH key filename, use the name you used to create and store the SSH key instead of "bandit17_sshkey.private".

2.  **Check the files content**:
    ```bash
    ls
    cat passwords.old
    cat passwords.new
    ```

3.  **Use diff**:
    ```bash
    diff passwords.old passwords.new
    # output: display the password for next level
    ```
    This level is pretty straigtforward. Just know the right tool to use and will give you the password right away.
    Using `diff` with two filename as arguments shows the difference in both the files. As the description says that the only different line in the new file (passwords.new) is the password.
    
4.  **Copy the password** and use it to SSH into the next level (`bandit18`).

---

## Commands & outputs
```bash
$ ssh -i bandit17_sshkey.private bandit17@bandit.labs.overthewire.org -p 2220
... banner ...
bandit17@bandit:~$
bandit17@bandit:~$ man diff
bandit17@bandit:~$ ls
passwords.new  passwords.old
bandit17@bandit:~$ diff passwords.old passwords.new
42c42
< BMIOFKM7CRSLI97voLp3TD80NAq5exxk
---
> x2gLTTjF************************      # password is censored to respect OverTheWire rules
          
bandit17@bandit:~$ echo "Password for bandit18 is x2gLTTjF************************"
Password for bandit18 is x2gLTTjF************************
bandit17@bandit:~$
```

---

## Flags / result
- password: `x2gLTTjF************************`  
    Use it to login:
```bash
ssh bandit18@bandit.labs.overthewire.org -p 2220
```

## Password Notice
For security and in accordance with OverTheWire rules, the actual password for the next level is **censored** in this write‑up.  
Use the steps shown above to retrieve it in your own environment.

---

## References
- [OverTheWire — Bandit level descriptions and hints](https://overthewire.org/wargames/bandit/bandit18.html)

---

## Reading materials
- `man diff`