#!/bin/bash

# Group-10:
# =================================
# Name                    StudentID
# ---------------------------------
# Emran Talukdar          s8157354
# Md Faysal Hossain       s8193819
# =================================

# Purpose:
# This script displays user information, checks whether entered numbers are 
# even or odd, stores the results in a file, and provides an option to exit.


#----------------
# function start
#----------------

# option-1: display user information
display_user_info () {
    echo -n "Processing"; print_dots
    
    echo "================================================="
    echo "                 User Information                "
    echo "================================================="
    echo "User name: $USER"
    echo "User ID: $(id -u)"
    echo "Home folder: $HOME"
    echo "Files and Folders: $(ls -C)"
    echo "Login shell: $SHELL"
    echo "Date & time: $(date)"
    echo "-------------------------------------------------"

    wait_for_keypress               # function used to wait for user
}

# option-2: checks even/odd and display results
check_even_odd () {
    echo -n "starting"; print_dots
   
    echo "================================================="
    echo "             Even/Odd number checker             "
    echo "================================================="    

    even_numbers=()
    odd_numbers=()
    all_numbers=()
    while true; do
        #"-p" -> used to output the string without newline before reading input
        read -p "Enter a number between 1 and 100 (0 to exit): " num

        # "=~" -> pattern checking operator
        if ! [[ $num =~ ^-?[0-9]+$ ]]; then
            echo "Invalid input! Please enter a number between 1 and 100."
        elif ((num == 0)); then
            echo -n "exiting"; print_dots
            break
        elif ((num < 1 || num > 100)); then
            echo "Number out of range! Please enter a number between 1 and 100."
        elif ((num % 2 == 0)); then
            even_numbers+=("$num")
            all_numbers+=("$num")
            echo "$num is even"
        else
            odd_numbers+=("$num")
            all_numbers+=("$num")
            echo "$num is odd"
        fi
    done
    
    echo "-------------------------------------------------" 

    echo "Results:"
    echo "even numbers: ${even_numbers[@]}"
    echo "odd numbers: ${odd_numbers[@]}" 
    echo "-------------------------------------------------"

    wait_for_keypress               # function used to wait for user
}

# option-3: Store results from option 2 and the average,
# highest, and lowest number in a .txt file
store_results () {
    file="result.txt"
    echo -n "Results saving"; print_dots 
 
    # checking if user entered any number or not
    if (( ${#all_numbers[@]} > 0 )); then
        echo "All numbers: ${all_numbers[@]}" > "$file"
        echo "Even numbers: ${even_numbers[@]}" >> "$file"
        echo "Odd numbers: ${odd_numbers[@]}" >> "$file"

        # finding highest and lowest number taking the
        # first input as both max and min
        sum=0
        highest=${all_numbers[0]}
        lowest=${all_numbers[0]}
        
        for num in ${all_numbers[@]}; do
            ((sum += num))
            ((num > highest)) && highest=$num
            ((num < lowest)) && lowest=$num
        done
        avg=$((sum / ${#all_numbers[@]}))

        echo "Highest number is $highest" >> "$file"
        echo "Lowest number is $lowest" >> "$file"
        echo "Average is $avg" >> "$file"
	  echo "Results saved in $file successfully!"
    else
	  > “$file”
        echo "Unsuccessful! No numbers were entered."
    fi
    wait_for_keypress                   # function used to wait for user
}

# option-4: exiting the program
exit_program () {
    echo -n "Exiting the program"    
    print_dots
    clear                                             # clear terminal before exiting
    exit 0
}

# function to print dots (...)
print_dots () {
    for i in {1..3}
    do
        echo -n "."
        sleep 1
    done
    echo
}

# funciton to wait for key press
wait_for_keypress () {
    echo -e -n "\nPress any key to continue..."
    read -s -n 1           # "-s" -> used to not to echo input
                           # "-n 1" -> used to read only 1 character
}

#----------------
# function end
#----------------

# main program loop
while true; do
        # clear terminal screen
        clear

        # Display program Menu
        echo "#################################################"
        echo "                   Main menu                     "
        echo "#################################################"
	echo "1. Display User Information"
        echo "2. Even/Odd Numbers Checker"
        echo "3. Store Results to file"
        echo "4. exit"
        echo -e "-------------------------------------------------\n"

	read -p "Enter your choice [1-4]: " choice
        
	case $choice in
	    1) display_user_info;;
	    2) check_even_odd;;
	    3) store_results;;
            4) exit_program;;
            *) echo -e "Invalid option. Please choose a valid number between 1 and 4.\n"; wait_for_keypress;;
	esac
    done