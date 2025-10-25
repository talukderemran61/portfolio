# Bandit — Level 0
**Challenge name:** SSH login basics  
**Date:** 2025-10-04  
**Time spent:** ~5 minutes  
**Difficulty:** Intro

---

## Goal
The goal of this level is to log into the game using SSH.  
- **Host:** bandit.labs.overthewire.org  
- **Port:** 2220  
- **Username:** bandit0  
- **Password:** bandit0  

Once logged in, you’ll receive instructions for the next level.

---

## Tools / Commands Used
- `ssh` → used to securely log into a remote machine

---

## Approach (step-by-step)

1. **Understand the task**  
   The challenge gives us credentials (username/password) and tells us to use SSH on a custom port (2220 instead of the default 22).  
   SSH (Secure Shell) allows encrypted login to remote servers.

2. **Connect to the host**  
   Run the `ssh` command with the username, host, and port:  
   ```bash
   ssh bandit0@bandit.labs.overthewire.org -p 2220

-   **bandit0@...** → means log in as the user bandit0.
-   **-p 2220** → specifies port 2220 since it’s not the default. [ssh default port is 22]

3. **Authenticate**
   When prompted, enter the given password 'bandit0'.
   If successful, you’ll land in a Linux shell as the 'bandit0' user.

---

## Commands & Outputs
   ```bash
   ssh bandit0@bandit.labs.overthewire.org -p 2220
   Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
                         _                     _ _ _
                        | |__   __ _ _ __   __| (_) |_
                        | '_ \ / _` | '_ \ / _` | | __|
                        | |_) | (_| | | | | (_| | | |_
                        |_.__/ \__,_|_| |_|\__,_|_|\__|


                      This is an OverTheWire game server.
            More information on http://www.overthewire.org/wargames

   backend: gibson-0
   bandit0@bandit.labs.overthewire.org's password:
   Welcome to OverTheWire!
   ...
   bandit0@bandit:~$ whoami
   bandit0
   ```

---

## Flag / Result
   Successfully logged in as bandit0.
   Now we are ready to attempt Level 1.

---

## Screenshots
   ![ssh command used to login](/assets/images/bandit-level-0_a.png "ssh login to a remote machine")
   ![Successfully logged in as user bandit0](/assets/images/bandit-level-0_b.png "logged in as bandit0")

---

## Lesson Learned
- Establish a secure connection to a remote machine through `ssh`.
- certain flags can be combined with a command to trigger specific option (e.g., flag `-p` used to overwrite the default port number for ssh).

---

## References
- [ssh - Linux manual page](https://man7.org/linux/man-pages/man1/ssh.1.html)
- [Secure Shell (SSH) on Wikipedia](https://en.wikipedia.org/wiki/Secure_Shell)
- [How to use SSH with a non-standard port on It’s FOSS](https://itsfoss.com/ssh-to-port/)
- [How to use SSH with ssh-keys on wikiHow](https://www.wikihow.com/Use-SSH)