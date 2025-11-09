# Bandit - level 8 -> 9  
**Challenge name:** find unique line of text  
**Date:** 09 Nov 2025  
**Time spent:** ~10 mins  
**Difficulty:** Beginner  

---

## Goal
The password for the next level is stored in the file `data.txt` and is the only line of text that occurs only once

---

## Tools / commands you may use
- `grep`, `sort`, `uniq`, `strings`, `base64`, `tr`, `tar`, `gzip`, `bzip2`, `xxd`
- `man` - Displays the manual page for a command (helps understand usage and options)

---

## Approach (step-by-step)
1.  **Connect to the server** using the credentials from previous level:
    ```bash
    ssh bandit8@bandit.labs.overthewire.org -p 2220

2.  **List the files** in the home directory:
    ```bash
    ls
    ```
    You’ll see a single file named `data.txt`.

3.  At first, I tried using `uniq` directly:
    ```bash
    uniq data.txt -c
    ```
    However, this didn’t isolate the unique line correctly.

4.  After checking the man page:
    ```bash
    man uniq
    ```
    I learned that `uniq` works properly only when identical lines are next to each other. Therefore, I decided to sort the file before passing it to `uniq`.

5.  Sort the file and count occurrences:
    ```bash
    sort data.txt | uniq -c
    ```
    This command shows how many times each line appears. To find the line that appears only once:
    ```bash
    sort data.txt | uniq -c | grep '1 '
    ```

6.  Alternatively, you can use:
    ```bash
    sort data.txt | uniq -u
    ```
    which directly outputs lines that occur only once.

7. **Copy the password** and use it to SSH into the next level (`bandit9`).

---

## Commands & outputs
```bash
$ ssh bandit8@bandit.labs.overthewire.org -p 2220 
... (banner) ... 
bandit8@bandit:~$ ls 
data.txt 
bandit8@bandit:~$ uniq data.txt
    1 UD0JGdEzC9MvLEFryrg13oTd5Hb07iWd 
    1 7GmAoWty7FVrx69vVdHsWI3K7bhXB7ck 
    1 XFZ2qtQ5m9FCzyje1e5fCvm2F1TeU5pJ 
    1 SigSsDLtaSCPLVAD19uwb7HMhgacgZIQ
    ...
bandit8@bandit:~$ man sort 
bandit8@bandit:~$ man uniq 
bandit8@bandit:~$ sort data.txt | uniq -c 
    10 037tttR5YpQVPyHblRMYKlykrsuwdK01 
    10 0kUWzRKPfW3yanU9l7ShZYQQHiwh6kPR 
    10 2E01uUQMBOGXxVooSFO0uezEWAfActMH 
    10 2UbrvLqP3s5Hpz8a44FAW3tYHr4mO9ic 
    10 3yaj6VGAygiJGYZo04LXXDVTkJyDLMlE 
    1 4CKMh1JI91bUIZZPXDqGanal4xvAg0JM 
    10 7GmAoWty7FVrx69vVdHsWI3K7bhXB7ck
    ...
bandit8@bandit:~$ sort data.txt | uniq -c | grep '1 ' 
    1 4CKMh1JI91bUIZZPXDqGanal4xvAg0JM 
bandit8@bandit:~$ sort data.txt | uniq -u 
    4CKMh1JI91bUIZZPXDqGanal4xvAg0JM 
bandit8@bandit:~$
```

---

## Flags / result
- password: `4CKMh1JI91bUIZZPXDqGanal4xvAg0JM`  
    Use it to login:
```bash
ssh bandit9@bandit.labs.overthewire.org -p 2220
```

---

## Lesson learned
- This level emphasizes piping and redirection - combining simple commands to achieve powerful results.
Each command does one thing well, and together they can solve complex problems efficiently.
- `-c` flag used with `uniq` to display the count of occurance of a line. And `-u` to get unique line only.
- single/double quotation used in `grep '1 '` to filter lines with exactly space after 1, which is our intention. (Try it out with and without quotation to see the difference yourself)

---

## Reading materials
- man - `grep`, `uniq`
- [Piping and Redirection](https://ryanstutorials.net/linuxtutorial/piping.php)