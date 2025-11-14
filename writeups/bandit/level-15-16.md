# Bandit - level 15 -> 16  
**Challenge name:** submit current password over TLS to localhost:30001  
**Date:** 11 Nov 2025  
**Time spent:** ~10 mins  
**Difficulty:** Beginner / Intermediate   

---

## Goal
The password for the next level can be retrieved by submitting the password of the current level to **port 30001 on localhost** using SSL/TLS encryption.

**Helpful note: Getting “DONE”, “RENEGOTIATING” or “KEYUPDATE”? Read the “CONNECTED COMMANDS” section in the manpage.**

---

## Tools / commands you may use
- `ssh`, `telnet`, `nc` (netcat), `ncat` (nmap's netcat with `--ssl`), `socat`, `openssl`, `s_client`, `nmap`, `netstat`, `ss`
- *(`openssl s_client` and `ncat --ssl` are the simplest TLS clients for this level.)*

---

## Approach (step-by-step)
1.  **Connect to the server** using the credentials from previous level:
    ```bash
    ssh bandit15@bandit.labs.overthewire.org -p 2220
    ```

2.  **Read the current password**:
    ```bash
    cat /etc/bandit_pass/bandit15
    # 8xCjnmgoKbGLhHFAZlGE5Tmu4M2tKJQo
    ```

3.  **Try TLS client** `openssl s_client` to inspect the service and send the password:
    ```bash
    openssl s_client -connect localhost:30001
    # then type/paste the password
    ```
    openssl s_client prints TLS handshake details (certificate, cipher, session info). Then giving the password of the current level, the service confirms and returns the next-level password.  
    If it shows **RENEGOTIATING/DONE/KEYUPDATE**, **consult `man s_client` → "CONNECTED COMMANDS"** (only necessary if the session requires interactive commands).
    > note: piping the password didn't work for me. It's because the session requires interactive connection. To make the piping work use `-ign_eof` flag with `s_client` which is mentioned in the **connected commands** section of `s_client` man page. `cat /etc/bandit_pass/bandit15 | openssl s_client -ign_eof -connect localhost:30001`

4.  **Use `ncat --ssl`** (recommended for simplicity):
    ```bash
    cat /etc/bandit_pass/bandit15 | ncat --ssl localhost 30001
    ```
    `ncat --ssl` negotiates TLS and forwards stdin, printing the service response.
    The service confirms and returns the next-level password.
    
4.  **Copy the password** and use it to SSH into the next level (`bandit16`).

---

## Commands & outputs
```bash
$ ssh bandit15@bandit.labs.overthewire.org -p 2220 
... (banner) ...
bandit15@bandit:~$ cat /etc/bandit_pass/bandit15
8xCjnmgoKbGLhHFAZlGE5Tmu4M2tKJQo

bandit15@bandit:~$ openssl s_client -connect localhost:30001
CONNECTED(00000003)
... (certificate / handshake info shown) ...
8xCjnmgoKbGLhHFAZlGE5Tmu4M2tKJQo
Correct!
<Password>

closed
bandit15@bandit:~$ man ncat
bandit15@bandit:~$ ncat localhost 30001
8xCjnmgoKbGLhHFAZlGE5Tmu4M2tKJQo
Ncat: Connection reset by peer.

bandit15@bandit:~$ ncat --ssl localhost 30001
8xCjnmgoKbGLhHFAZlGE5Tmu4M2tKJQo
Correct!
<Password>
```

---

## Flags / result
- Password: `<Password>`
  
Use it to login:
```bash
ssh bandit16@bandit.labs.overthewire.org -p 2220
```
## Password Notice
For security and in accordance with OverTheWire rules, the actual password for the next level is **not included** in this write‑up.  
Use the steps shown above to retrieve it in your own environment.

---

## Lesson learned
- `openssl s_client` is a versatile tool for debugging TLS servers - it shows certificates, negotiated ciphers, and handshake events. Use man `s_client` → "CONNECTED COMMANDS" if the session prints "RENEGOTIATING", "KEYUPDATE", or "DONE" and requires special handling.
- For quick TLS client usage in scripts or pipes, `ncat --ssl` is often more convenient: it behaves like `nc` but negotiates TLS automatically.

---

## References
- [OverTheWire — Bandit level descriptions and hints](https://overthewire.org/wargames/bandit/bandit16.html)

---

## Reading materials
- `man s_client` - [Manual page of openssl s_client](https://linux.die.net/man/1/s_client)
- [Secure Socket Layer/Transport Layer Security on Wikipedia](https://en.wikipedia.org/wiki/Transport_Layer_Security)
- [OpenSSL Cookbook - Testing with OpenSSL](https://www.feistyduck.com/library/openssl-cookbook/online/testing-with-openssl/index.html)