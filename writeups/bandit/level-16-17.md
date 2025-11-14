# Bandit - level 16 -> 17  
**Challenge name:** submit current password over TLS to localhost port 31000-32000  
**Date:** 11 Nov 2025  
**Time spent:** ~10 mins  
**Difficulty:** Beginner / Intermediate   

---

## Goal
The credentials for the next level can be retrieved by submitting the password of the current level to **a port on localhost in the range 31000 to 32000**. First find out which of these ports have a server listening on them. Then find out which of those speak SSL/TLS and which don’t. There is only 1 server that will give the next credentials, the others will simply send back to you whatever you send to it.

**Helpful note: Getting “DONE”, “RENEGOTIATING” or “KEYUPDATE”? Read the “CONNECTED COMMANDS” section in the manpage.**

---

## Tools / commands you may use
- `ssh`, `telnet`, `nc` (netcat), `ncat` (nmap's netcat with `--ssl`), `socat`, `openssl`, `s_client`, `nmap`, `netstat`, `ss`
- *(`ncat --ssl` is the simplest TLS clients for this level.)*

---

## Approach (step-by-step)
1.  **Connect to the server** using the credentials from previous level:
    ```bash
    ssh bandit15@bandit.labs.overthewire.org -p 2220
    ```

2.  **Read the current password**:
    ```bash
    cat /etc/bandit_pass/bandit16
    # kSkvUpMQ7lBYyCM4GBPvCvT1BfWRy0Dx
    ```

3.  **Scan for open ports** using nmap:
    ```bash
    nmap localhost -p 31000-32000
    ```
    This will print the open ports.

4.  **Use `ncat --ssl`** to try connect and send the password:
    ```bash
    ncat --ssl localhost <open_ports>
    # paste the current password "kSkvUpMQ7lBYyCM4GBPvCvT1BfWRy0Dx"
    ```
    `ncat --ssl` negotiates TLS. If service listening and speak TLS/SSL then will send a response. Response might give the credentials for next level.
    > note: as mention in description "There is only 1 server that will give the next credentials, the others will simply send back to you whatever you send to it." Even if the server speaks SSL/TLS it might just send back whatever you send.
    
4.  **Copy the SSH PRIVATE KEY** use it to SSH to next level `bandit17`.
    > note: change the private key file permissions to `600` before using it to SSH login.

---

## Commands & outputs
```bash
$ ssh bandit16@bandit.labs.overthewire.org -p 2220 
... (banner) ...
bandit16@bandit:~$ nmap localhost -p 31000-32000
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-11-11 01:32 UTC
Nmap scan report for localhost (127.0.0.1)
Host is up (0.00012s latency).
Not shown: 996 closed tcp ports (conn-refused)
PORT      STATE SERVICE
31046/tcp open  unknown
31518/tcp open  unknown
31691/tcp open  unknown
31790/tcp open  unknown
31960/tcp open  unknown

Nmap done: 1 IP address (1 host up) scanned in 0.08 seconds

bandit16@bandit:~$ ncat --ssl localhost 31046
Ncat: Input/output error.
bandit16@bandit:~$ ncat --ssl localhost 31518
kSkvUpMQ7lBYyCM4GBPvCvT1BfWRy0Dx
kSkvUpMQ7lBYyCM4GBPvCvT1BfWRy0Dx
^C
bandit16@bandit:~$ ncat --ssl localhost 31691
Ncat: Input/output error.
bandit16@bandit:~$ ncat --ssl localhost 31790
kSkvUpMQ7lBYyCM4GBPvCvT1BfWRy0Dx
Correct!
-----BEGIN RSA PRIVATE KEY-----
<KEY>
-----END RSA PRIVATE KEY-----

^C
bandit16@bandit:~$ exit
```

---

## Flags / result
- SSH PRIVATE KEY:
```bash
-----BEGIN RSA PRIVATE KEY-----
<KEY>
-----END RSA PRIVATE KEY-----
```
## Password Notice
For security and in accordance with OverTheWire rules, the actual password for the next level is **not included** in this write‑up.  
Use the steps shown above to retrieve it in your own environment.
  
Use it to login:
```bash
ssh -i <private_key> bandit17@bandit.labs.overthewire.org -p 2220
# note: change the <private_key> with the filename containing private key for bandit17
```
> Read [level-13-14.md](level-13-14.md) writeup to learn how to use private key for login

---

## Lesson learned
- `nmap` is the tool for scanning services running on different ports.
- `ncat --ssl` is often more convenient: it behaves like `nc` but negotiates TLS automatically.

---

## References
- [OverTheWire — Bandit level descriptions and hints](https://overthewire.org/wargames/bandit/bandit17.html)

---

## Reading materials
- `man nmap`
- [Port scanner on Wikipedia](https://en.wikipedia.org/wiki/Port_scanner)
- `man s_client` - [Manual page of openssl s_client](https://linux.die.net/man/1/s_client)
- [Secure Socket Layer/Transport Layer Security on Wikipedia](https://en.wikipedia.org/wiki/Transport_Layer_Security)