# Bandit - level 12 -> 13  
**Challenge name:** Insane Wrist-Straining Decompression  
**Date:** 10 Nov 2025  
**Time spent:** ~20 mins  
**Difficulty:** Medium / Hard  

---

## Goal
The password for the next level is stored in the file `data.txt`, which is a hexdump of a file that has been repeatedly compressed. For this level it may be useful to create a directory under /tmp in which you can work. Use `mkdir` with a hard to guess directory name. Or better, use the command “mktemp -d”. Then copy the datafile using cp, and rename it using mv (read the manpages!)

---

## Tools / commands you may use
- `grep`, `sort`, `uniq`, `strings`, `base64`, `tr`, `tar`, `gzip`, `bzip2`, `xxd`, `mkdir`, `cp`, `mv`, `file`
- `man` - Displays the manual page for a command (helps understand usage and options)
- `mkdir` - make a new directory
- `cp` - copy file
- `mv` - move file
- `file` - inspect file type 
> note: I didn't introduce `file` command properly in previous levels because it wasn't really necessary. But, in this level we will heavily rely on this tool (totally impossible to solve the challenge without `file`).

---

## Approach (step-by-step)
1.  **Connect to the server** using the credentials from previous level:
    ```bash
    ssh bandit12@bandit.labs.overthewire.org -p 2220

2.  **List and inspect the file** to see its type:
    ```bash
    ls
    file data.txt
    cat data.txt
    ```
    `file` reports **ASCII text**. `cat` prints the file content, but the contents shows that it is a hexdump of a file.

3.  **Check the `man` page of `xxd`** to revert the hexdump:
    ```bash
    xxd -r data.txt
    xxd -r data.txt | strings
    ```
    It will print the reversed file content which is in non-human-readable format. Even piping to `strings` didn't help. `xxd -r` doesn't change the hexdump file to the original file. So, we have to save redirect the `xxd -r <filename>` to a new file.

4.  **Revert the hexdump and save the output** to a new file:
    ```bash
    xxd -r data > r_data.txt
    -bash: r_data.txt: Permission denied
    ```
    Oops! Permission denied. We don't have permission to create file in the current directory.  
    The level description suggested to make a directory under `/tmp`, because `/tmp` directory has 777 (drwxrwxrwx) permissions for all users. 

5.  **Create directory under `/tmp` directory** and copy file to that directory:
    ```bash
    mkdir /tmp/tmp_bandit_emran12 
    or 
    mktemp -d # output: /tmp/tmp.9JazNDI75A
    cp data.txt /tmp/tmp.9JazNDI75A
    ```
    Use `mkdir /tmp/<tmp_directory_name>` to name it to your own choice.  
    Or better, as suggested to use `mktemp -d` to create a directory with random name.  
    `cp <file_to_copy:data.txt> <destination:tmp_directory_name>` to copy the data.txt file.

6.  **Revert the hexdump and save the output** to a new file and inspect file:
    ```bash
    xxd -r data > r_data.txt
    strings r_data.txt
    file r_data.txt
    # output: revert_data.txt: gzip compressed data, was "da...
    ```
    Save reversed hexdump to a file. Inspecting the file with `file` showed that it is **gzip compressed file**. That's why `strings` didn't help.

7.  **Decompress the file** using `gunzip` and `bunzip2`:
    Use `man gzip` for man page to find the tool to unzip / decompress `gzip` compressed file.
    ```bash
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ man gzip       
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ gunzip r_data.txt
    gzip: r_data.txt: unknown suffix -- ignored
    ```
    Looks like decompression failed. As the warning says it couldn't identify the suffix and ignored the command. Probably looking for .gz file extension as suffix. Search google ("file extension for gzip file") if unsure. Let's rename using `mv` and try again:
    ```bash
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ mv r_data.txt r_data.gz    # mv used to rename the file
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ gunzip r_data.gz

    bandit12@bandit:/tmp/tmp.9JazNDI75A$ ls
    data.txt  r_data
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ file r_data
    r_data: bzip2 compressed data, block size = 900k   
    ```
    Now, the file is bzip2 compressed (different type of compression). As always, read man page for the option to decompress bzip2 compressed file.
    ```bash
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ man bzip2      
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ mv r_data ./r_data.bz2     # renamed file with .bz2 file extension to avoid error
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ bunzip2 r_data.bz2         # bunzip2 -> tool to unzip bzip2 compressed files
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ ls
    data.txt  r_data

    bandit12@bandit:/tmp/tmp.9JazNDI75A$ file r_data
    r_data: gzip compressed data, was "data4.bin", last modified: Tue Oct 14 09:26:06 2025, max compression, from Unix, original size modulo 2^32 20480
    ```
    Another gzip compressed file. Repeat the previous process to unzip the file.
    ```bash
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ mv r_data r_data.gz
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ gunzip r_data.gz
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ ls
    data.txt  r_data
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ file r_data
    r_data: POSIX tar archive (GNU)
    ```
    Phew! After endless decompression from **gzip** to **bzip2**, finally not a zip file. But, it isn't an ascii, then what is it? Search google for info and read manual (`man tar`).

8.  **Extract file** from the tar archive:
    Use `man tar` to open man page. Look for the options / flags to extract file from archive. 
    FYI: **tar archive** is an archiving format that bundles multiple files into a single file. `tar` only bundle files like `zip or gzip`, but without compression.

    Let's extract the file from the archive:
    ```bash
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ tar -tvf r_data        # -t flag used to list the files in the archive
    -rw-r--r-- root/root     10240 2025-10-14 09:26 data5.bin
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ tar -xvf r_data        # -x to extract files, -v to show verbose output, -f for filename
    -rw-r--r-- root/root     10240 2025-10-14 09:26 data5.bin

    bandit12@bandit:/tmp/tmp.9JazNDI75A$ ls
    data5.bin  data.txt  r_data
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ file data5.bin         
    data5.bin: POSIX tar archive (GNU)                          
    ```
    Aha! Another tar archive file. Repeat the process to extract the file inside the archive
    ```bash
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ tar -xf data5.bin
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ ls
    data5.bin  data6.bin  data.txt  r_data
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ file data6.bin
    data6.bin: bzip2 compressed data, block size = 900k         
    ```
    Great! Looks like we ended up with another compressed file. Not surprising, as the level description said the file is repeatedly compressed.

9.  **Unzip / extract repeatedly** until the file with password appears:
    ```bash
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ bunzip2 data6.bin
    bunzip2: Can't guess original name for data6.bin -- using data6.bin.out     # don't freak out! It's just a warning.  
                                                                                # data6.bin.out is the new unzipped file
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ ls
    data5.bin  data6.bin.out  data.txt  r_data
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ file data6.bin.out
    data6.bin.out: POSIX tar archive (GNU)
    ```
    Let's repeat the process of extracting file from archive:
    ```bash
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ tar -xf data6.bin.out
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ ls
    data5.bin  data6.bin.out  data8.bin  data.txt  r_data
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ file data8.bin
    data8.bin: gzip compressed data, was "data9.bin", last modified: Tue Oct 14 09:26:06 2025, max compression, from Unix, original size modulo 2^32 49
    ```
    Yet again, we ended up with another gzip compressed file. Unzip the file:
    ```bash
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ gunzip data8.bin
    gzip: data8.bin: unknown suffix -- ignored          # Oops! the same error again
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ mv data8.bin data8.bin.gz
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ gunzip data8.bin.gz
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ ls
    data5.bin  data6.bin.out  data8.bin  data.txt  r_data
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ file data8.bin
    data8.bin: ASCII text
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ cat data8.bin
    The password is <password>
    ```
    Hooray! Finally the never-ending decompression and extraction ended.

10. **Copy the password** and use it to SSH into the next level (`bandit13`).

---

## Commands & outputs
```bash
$ ssh bandit12@bandit.labs.overthewire.org -p 2220 
... (banner) ... 
bandit12@bandit:~$ ls
data.txt
bandit12@bandit:~$ file data.txt
data.txt: ASCII text
bandit12@bandit:~$ cat data.txt
00000000: 1f8b 0808 2e17 ee68 0203 6461 7461 322e  .......h..data2.
00000010: 6269 6e00 0134 02cb fd42 5a68 3931 4159  bin..4...BZh91AY
00000020: 2653 59b6 7680 8b00 001a ffff fadd cfd6  &SY.v...........
...
bandit12@bandit:~$ man xxd              # read man page of xxd to learn to revert hexdump
bandit12@bandit:~$ xxd -r data.txt      # -r flag used to revert
�����4z�i�F�hh␦@hh91AY&SY�v��␦�����������W���׋���������=������:��
a�E~^��U␦�drc|Y����8���5!�a&�E����y�m")�����@���L�H@�M4212aF��␦�
         �
          ���>w7:�+2W�
{�3�ק|ڰ��G�[ڷ�%s      ␦���b���2bj���2+o�D�,I�����]N�D��Ł���)����5d`c��luy��T�&!ֈ�$i�.B)oz�XJ.�#�%/+�V�_�C-O%�)N���a
                ���!�PS�$���a"��+�=h�G��!�Xz2gƗ^�%|(*������$izt�g>�#^m��        :��nDM���g��d���_�K���)A0!A�\(��_s��7���/��Ak���T��
          -q`!]��̰�G�<Ҧ������)���XV[�4

bandit12@bandit:~$ xxd -r data.txt | strings 
data2.bin
BZh91AY&SY
M4212a
5d`c
.B)oz
Xz2g
%|(*
$izt
)A0!A
-q`!]

bandit12@bandit:~$ xxd -r data.txt > r_data.txt
-bash: r_data.txt: Permission denied

bandit12@bandit:~$ mktemp -d            # make temporary directory under /tmp
/tmp/tmp.9JazNDI75A
bandit12@bandit:~$ cp data.txt /tmp/tmp.9JazNDI75A/
bandit12@bandit:~$ cd /tmp/tmp.9JazNDI75A
bandit12@bandit:/tmp/tmp.9JazNDI75A$ ls
data.txt

bandit12@bandit:/tmp/tmp.9JazNDI75A$ xxd -r data.txt > r_data.txt      # save the reversed hexdump to a file
bandit12@bandit:/tmp/tmp.9JazNDI75A$ file r_data.txt
revert_data.txt: gzip compressed data, was "data2.bin", last modified: Tue Oct 14 09:26:06 2025, max compression, from Unix, original size modulo 2^32 564

bandit12@bandit:/tmp/tmp.9JazNDI75A$ man gzip           # check man page to learn to decompress
bandit12@bandit:/tmp/tmp.9JazNDI75A$ gunzip reversed_data.txt
gzip: reversed_data.txt: unknown suffix -- ignored      # decompression didn't work (looking for .gz file extention as suffix)

bandit12@bandit:/tmp/tmp.9JazNDI75A$ mv r_data.txt r_data.gz    # mv used to rename the file
bandit12@bandit:/tmp/tmp.9JazNDI75A$ gunzip r_data.gz

bandit12@bandit:/tmp/tmp.9JazNDI75A$ ls
data.txt  r_data
bandit12@bandit:/tmp/tmp.9JazNDI75A$ file r_data
r_data: bzip2 compressed data, block size = 900k        # file is bzip2 compressed (different type of compression)
bandit12@bandit:/tmp/tmp.9JazNDI75A$ man bzip2      # read man page for the option to decompress bzip2 compressed file.
bandit12@bandit:/tmp/tmp.9JazNDI75A$ mv r_data ./r_data.bz2     # renamed file with .bz2 file extension to avoid error
bandit12@bandit:/tmp/tmp.9JazNDI75A$ bunzip2 r_data.bz2         # bunzip2 -> tool to unzip bzip2 compressed files
bandit12@bandit:/tmp/tmp.9JazNDI75A$ ls
data.txt  r_data

bandit12@bandit:/tmp/tmp.9JazNDI75A$ file r_data
r_data: gzip compressed data, was "data4.bin", last modified: Tue Oct 14 09:26:06 2025, max compression, from Unix, original size modulo 2^32 20480

bandit12@bandit:/tmp/tmp.9JazNDI75A$ mv r_data r_data.gz    # repeat the previous process to decompress
bandit12@bandit:/tmp/tmp.9JazNDI75A$ gunzip r_data.gz
bandit12@bandit:/tmp/tmp.9JazNDI75A$ ls
data.txt  r_data
bandit12@bandit:/tmp/tmp.9JazNDI75A$ file r_data
r_data: POSIX tar archive (GNU)                             # finally, not a zip file. Google search "is tar archive a zip file"

bandit12@bandit:/tmp/tmp.9JazNDI75A$ man tar                # read man page
bandit12@bandit:/tmp/tmp.9JazNDI75A$ tar -tvf r_data        # -t flag used to list the files in the archive
-rw-r--r-- root/root     10240 2025-10-14 09:26 data5.bin
bandit12@bandit:/tmp/tmp.9JazNDI75A$ tar -xvf r_data        # -x to extract files, -v to show verbose output, -f for filename
-rw-r--r-- root/root     10240 2025-10-14 09:26 data5.bin

bandit12@bandit:/tmp/tmp.9JazNDI75A$ ls
data5.bin  data.txt  r_data
bandit12@bandit:/tmp/tmp.9JazNDI75A$ file data5.bin         
data5.bin: POSIX tar archive (GNU)                          # Repeat the process to extract file

bandit12@bandit:/tmp/tmp.9JazNDI75A$ tar -xf data5.bin
bandit12@bandit:/tmp/tmp.9JazNDI75A$ ls
data5.bin  data6.bin  data.txt  r_data
bandit12@bandit:/tmp/tmp.9JazNDI75A$ file data6.bin
data6.bin: bzip2 compressed data, block size = 900k         # decompress the file

    bandit12@bandit:/tmp/tmp.9JazNDI75A$ bunzip2 data6.bin
    bunzip2: Can't guess original name for data6.bin -- using data6.bin.out     # don't freak out! It's just a warning.  
                                                                                # data6.bin.out is the new unzipped file
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ ls
    data5.bin  data6.bin.out  data.txt  r_data
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ file data6.bin.out
    data6.bin.out: POSIX tar archive (GNU)

    # repeat the process of extracting file from archive
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ tar -xf data6.bin.out
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ ls
    data5.bin  data6.bin.out  data8.bin  data.txt  r_data
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ file data8.bin
    data8.bin: gzip compressed data, was "data9.bin", last modified: Tue Oct 14 09:26:06 2025, max compression, from Unix, original size modulo 2^32 49

    # repeat the process of decompressing file
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ gunzip data8.bin
    gzip: data8.bin: unknown suffix -- ignored              # Oops! the same error again
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ mv data8.bin data8.bin.gz
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ gunzip data8.bin.gz
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ ls
    data5.bin  data6.bin.out  data8.bin  data.txt  r_data
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ file data8.bin
    data8.bin: ASCII text
    bandit12@bandit:/tmp/tmp.9JazNDI75A$ cat data8.bin
    The password is <password>        # The Password!
```

---

## Flags / result
- password: `<password>`  
    Use it to login:
```bash
ssh bandit13@bandit.labs.overthewire.org -p 2220
```

## Password Notice
For security and in accordance with OverTheWire rules, the actual password for the next level is **not included** in this write‑up.  
Use the steps shown above to retrieve it in your own environment.

---

## Lesson learned
- **Importance of the `file` command**: Learned to use the `file` utility to identify unknown file types - a crucial step before deciding how to handle or extract data.
- **Dealing with multiple compression formats:** Encountered several compression methods (`gzip`, `bzip2`, and `tar`) and learned how to decompress each one properly.
- **Reading man pages is essential:** Instead of memorizing every command, you practiced using `man <command>` to understand tools, flags, and behavior - this habit is what real Linux users rely on.
- **Practical understanding of `/tmp` permissions:** Discovered that `/tmp` has global write permissions (`drwxrwxrwt`) and learned to use it safely for temporary workspace creation.
- **Pattern recognition and persistence:** Challenges can "nest" multiple compression layers, and systematic repetition and inspection (`file → decompress → inspect again`) is often the key to solving complex CTF problems.

---

## References
- [OverTheWire — Bandit level descriptions and hints](https://overthewire.org/wargames/bandit/bandit13.html)

---

## Reading materials
1.  Manual pages:
    - `man file` — learn how file detection works using **magic numbers**
    - `man gzip`, `man bzip2`, `man tar`, `man xxd`
    - [Hex dump on Wikipedia](https://en.wikipedia.org/wiki/Hex_dump)

2.  Linux learning resources:
    [The Linux Command Line by William Shotts](https://linuxcommand.org/tlcl.php) — great for developing fluency in terminal operations

3.  Extra exploration:
    - Read about [Unix file permissions and /tmp security](https://community.unix.com/t/unix-file-permissions/153658)
    - Learn about [compression formats and their internals](https://en.wikipedia.org/wiki/List_of_archive_formats)
    - Try small experiments: create and compress files using `gzip`, `bzip2`, and `tar` yourself to reinforce concepts