# Bandit - level 13 -> 14  
**Challenge name:** SSH key to next level  
**Date:** 10 Nov 2025  
**Time spent:** ~5 mins  
**Difficulty:** Beginner  

---

## Goal
The password for the next level is stored in **/etc/bandit_pass/bandit14 and can only be read by user bandit14**. For this level, you don’t get the next password, but you get a private SSH key that can be used to log into the next level. **Note: localhost** is a hostname that refers to the machine you are working on

---

## Tools / commands you may use
- `ssh`, `chmod`, `telnet`, `nc`, `openssl`, `s_client`, `nmap`

---

## Approach (step-by-step)
1.  **Connect to the server** using the credentials from previous level:
    ```bash
    ssh bandit13@bandit.labs.overthewire.org -p 2220
    ```

2.  **Confirm the key file exists** in your home directory:
    ```bash
    ls
    ```

3.  **Use the ssh private key** supplied to login to `bandit14`:
    ```bash
    man ssh
    ssh -i sshkey.private bandit14@localhost -p 2220    # localhost refers to the current host
    ```
    Trying to connect directly from the bandit server doesn't work. We can see in the warning after the bandit banner clearly says that we cannot connect from **localhost** directly, and suggests to log out and log in.
    ```bash
    output:
    The authenticity of host '[localhost]:2220 ([127.0.0.1]:2220)' can't be established.
    ...
                            _                     _ _ _
                            | |__   __ _ _ __   __| (_) |_
                            | '_ \ / _` | '_ \ / _` | | __|
                            | |_) | (_| | | | | (_| | | |_
                            |_.__/ \__,_|_| |_|\__,_|_|\__|
    ...
    !!! You are trying to log into this SSH server with a password on port 2220 from localhost.
    !!! Connecting from localhost is blocked to conserve resources.
    !!! Please log out and log in again.
    ...
    Disconnected from 127.0.0.1 port 2220
    ```

4.  **Copy sshkey.private** to local machine:
    ```bash
    ls -l sshkey.private
    # shows: -rw-r----- 1 bandit14 bandit13 1679 Oct 14 09:26 sshkey.private
    cat sshkey.private
    ```
    We have **read** permission. So, we can read the file and copy and paste it to the new file created in our machine for the private key. 
    ```bash
    exit
    vim bandit14_sshkey.private
    ```
    Use `exit` to exit from the bandit server. Create a file and store the private key.

5.  **Change the file permission**:
    ```bash
    ls -l bandit14_sshkey.private
    # -rw-r--r-- 1 talukdaremran talukdaremran 1679 Nov 10 23:02 bandit14_sshkey.private
    chmod 600 bandit14_sshkey.private       # change file permissions
    ```
    Private keys need to be always protected. File permission for that cannot be too open. Why not try to connect to `bandit14` keeping the default permissions.
    `
    > For file permission: `r` = 4, `w` = 2, `x` = 1. `r` = read, `w` = write, `x` = execute. So, `600` means `rw-------`, where owner has `rw-` and user and others has `---` (no permission).
    Let's try to connect using this key to `bandit14`. 
    
6.  **Connect to `bandit14`** using ssh private key:
    ```bash
    ssh -i bandit14_sshkey.private bandit14@bandit.labs.overthewire.org -p 2220
    ```
    `-i` is flag to supply identity file (private key).

---

## Commands & outputs
```bash
$ ssh bandit13@bandit.labs.overthewire.org -p 2220 
... (banner) ...
bandit13@bandit:~$ ls
sshkey.private
bandit13@bandit:~$ ls -l
total 4
-rw-r----- 1 bandit14 bandit13 1679 Oct 14 09:26 sshkey.private
bandit13@bandit:~$ cat sshkey.private
-----BEGIN RSA PRIVATE KEY-----
<Key content>
-----END RSA PRIVATE KEY-----

bandit13@bandit:~$ man ssh
bandit13@bandit:~$ ssh -i sshkey.private bandit14@localhost -p 2220         # trying to connect form the bandit server
The authenticity of host '[localhost]:2220 ([127.0.0.1]:2220)' can't be established.
ED25519 key fingerprint is SHA256:C2ihUBV7ihnV1wUXRb4RrEcLfXC5CXlhmAAM/urerLY.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Could not create directory '/home/bandit13/.ssh' (Permission denied).
Failed to add the host to the list of known hosts (/home/bandit13/.ssh/known_hosts).
                         _                     _ _ _
                        | |__   __ _ _ __   __| (_) |_
                        | '_ \ / _` | '_ \ / _` | | __|
                        | |_) | (_| | | | | (_| | | |_
                        |_.__/ \__,_|_| |_|\__,_|_|\__|


                      This is an OverTheWire game server.
            More information on http://www.overthewire.org/wargames

!!! You are trying to log into this SSH server with a password on port 2220 from localhost.
!!! Connecting from localhost is blocked to conserve resources.     
!!! Please log out and log in again.

backend: gibson-0
Received disconnect from 127.0.0.1 port 2220:2: no authentication methods enabled
Disconnected from 127.0.0.1 port 2220
bandit13@bandit:~$ exit
logout
Connection to bandit.labs.overthewire.org closed.

$ vim bandit14_sshkey.private
$ ls -l bandit14_sshkey.private
-rw-r--r-- 1 talukdaremran talukdaremran 1679 Nov 10 23:02 bandit14_sshkey.private

# attempting to connect leaving default file permissions
$ ssh -i bandit14_sshkey.private bandit14@bandit.labs.overthewire.org -p 2220       
                         _                     _ _ _
                        | |__   __ _ _ __   __| (_) |_
                        | '_ \ / _` | '_ \ / _` | | __|
                        | |_) | (_| | | | | (_| | | |_
                        |_.__/ \__,_|_| |_|\__,_|_|\__|


                      This is an OverTheWire game server.
            More information on http://www.overthewire.org/wargames

backend: gibson-0
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0644 for 'bandit14_sshkey.private' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
Load key "bandit14_sshkey.private": bad permissions
bandit14@bandit.labs.overthewire.org's password:            # ignored the private key and asking for password instead

[1]+  Stopped                 ssh -i bandit14_sshkey.private bandit14@bandit.labs.overthewire.org -p 2220

$ chmod 600 bandit14_sshkey.private
$ ssh -i bandit14_sshkey.private bandit14@bandit.labs.overthewire.org -p 2220
... (banner) ...
Enjoy your stay!
```

---

## Flags / result
- ssh private key:  
```bash
-----BEGIN RSA PRIVATE KEY-----  
<Key content>
-----END RSA PRIVATE KEY-----
```
  
Use it to login:
```bash
# ssh -i <private_key_filename> bandit14@bandit.labs.overthewire.org -p 2220
ssh -i bandit14_sshkey.private bandit14@bandit.labs.overthewire.org -p 2220
```
## Password Notice
For security and in accordance with OverTheWire rules, the actual password for the next level is **not included** in this write‑up.  
Use the steps shown above to retrieve it in your own environment.

---

## Lesson learned
- **SSH private keys must be readable only by the owner** (mode `600`), otherwise SSH will refuse to use them.
- Use `ssh -i <keyfile>` to specify a private key when authenticating.

---

## References
- [OverTheWire — Bandit level descriptions and hints](https://overthewire.org/wargames/bandit/bandit14.html)

---

## Reading materials
- `man ssh` - [SSH manual page](https://linux.die.net/man/1/ssh)
- [SSH/OpenSSH/Keys](https://help.ubuntu.com/community/SSH/OpenSSH/Keys)