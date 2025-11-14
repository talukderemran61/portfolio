# Bandit - level 14 -> 15  
**Challenge name:** SSH key to next level  
**Date:** 11 Nov 2025  
**Time spent:** ~5 mins  
**Difficulty:** Beginner  

---

## Goal
The password for the next level can be retrieved by submitting the password of the current level to **port 30000 on localhost**.

---

## Tools / commands you may use
- `ssh`, `chmod`, `telnet`, `nc`(netcat), `openssl`, `s_client`, `nmap`
- *(`nc` / `netcat` is the simplest tool for this level.)*

---

## Approach (step-by-step)
1.  **Connect to the server** using the credentials from previous level:
    ```bash
    ssh bandit14@bandit.labs.overthewire.org -p 2220
    ```

2.  **Get the current level password** (stored in /etc/bandit_pass):
    ```bash
    cat /etc/bandit_pass/bandit14
    # MU4VWeTyJk8ROof1qqmcBPaLh7lDCPvS
    ```

3.  **Submit the password** to the service on **localhost:30000**:  
    The service expects the password on standard input and prints the next-level password in response. Use nc (netcat) to connect to localhost on port 30000 and pipe the password to it:
    ```bash
    cat /etc/bandit_pass/bandit14 | nc localhost 30000
    ```
    Read the response printed by the service - it should confirm and return the next-level password.
    
4.  **Copy the password** and use it to SSH into the next level (`bandit15`).

---

## Commands & outputs
```bash
# ssh -i <private_key_filename> bandit14@bandit.labs.overthewire.org -p 2220
$ ssh -i bandit14_sshkey.private bandit14@bandit.labs.overthewire.org -p 2220 
... (banner) ...
bandit14@bandit:~$ ls
bandit14@bandit:~$ cat /etc/bandit_pass/bandit14
MU4VWeTyJk8ROof1qqmcBPaLh7lDCPvS

bandit14@bandit:~$ cat /etc/bandit_pass/bandit14 | nc localhost 30000
Correct!
<Password>

bandit14@bandit:~$
```

---

## Flags / result
- Password: `<Password>`
  
Use it to login:
```bash
ssh bandit15@bandit.labs.overthewire.org -p 2220
```
## Password Notice
For security and in accordance with OverTheWire rules, the actual password for the next level is **not included** in this write‑up.  
Use the steps shown above to retrieve it in your own environment.

---

## Lesson learned
- `nc` (netcat) is a general-purpose tool for interacting with arbitrary TCP/UDP services; it’s ideal for quickly sending data to a port and reading the response.
- Piping (`|`) lets you send file contents or command output directly into a network connection.
- If `nc` is not available, `telnet` or `openssl` `s_client` can be used for other protocols, but `nc` is simplest for plain TCP services.

---

## References
- [OverTheWire — Bandit level descriptions and hints](https://overthewire.org/wargames/bandit/bandit15.html)

---

## Reading materials
- `man nc` (netcat)
- [How the Internet works in 5 minutes (YouTube)](https://www.youtube.com/watch?v=7_LPdttKXPc) (Not completely accurate, but good enough for beginners)
- [IP Addresses](https://computer.howstuffworks.com/web-server5.htm)
- [IP Address on Wikipedia](https://en.wikipedia.org/wiki/IP_address)
- [Localhost on Wikipedia](https://en.wikipedia.org/wiki/Localhost)
- [Ports](https://computer.howstuffworks.com/web-server8.htm)
- [Port (computer networking) on Wikipedia](https://en.wikipedia.org/wiki/Port_(computer_networking))