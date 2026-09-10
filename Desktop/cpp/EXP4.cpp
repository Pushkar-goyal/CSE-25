#include <iostream>

using namespace std;

class BankAccount
{
private:
    int accountNumber;
    double balance;

public:
    BankAccount(int accNo, double initialBalance)
    {
        accountNumber = accNo;
        balance = initialBalance;
    }

    void deposit(double amount)
    {
        if (amount > 0)
        {
            balance += amount;
            cout << "Amount deposited successfully." << endl;
        }
        else
        {
            cout << "Invalid deposit amount." << endl;
        }
    }

    void withdraw(double amount)
    {
        if (amount <= 0)
        {
            cout << "Invalid withdrawal amount." << endl;
        }
        else if (amount > balance)
        {
            cout << "Insufficient balance." << endl;
        }
        else
        {
            balance -= amount;
            cout << "Amount withdrawn successfully." << endl;
        }
    }

    void display()
    {
        cout << "\n--- Account Details ---\n";
        cout << "Account Number: " << accountNumber << endl;
        cout << "Balance: " << balance << endl;
    }
};

int main()
{
    int accountNumber;
    double initialBalance;

    cout << "Enter Account Number: ";
    cin >> accountNumber;

    cout << "Enter Initial Balance: ";
    cin >> initialBalance;

    BankAccount account(accountNumber, initialBalance);

    account.display();

    double amount;

    cout << "\nEnter amount to deposit: ";
    cin >> amount;
    account.deposit(amount);

    cout << "\nEnter amount to withdraw: ";
    cin >> amount;
    account.withdraw(amount);

    account.display();

    return 0;
}