#include <iostream>
#include <string>

using namespace std;

class Student
{
private:
    int rollNo;
    string name;

public:
    Student()
    {
        rollNo = 0;
        name = "Unknown";
        cout << "Default constructor called." << endl;
    }

    Student(int r, string n)
    {
        rollNo = r;
        name = n;
        cout << "Parameterized constructor called." << endl;
    }

    Student(const Student &s)
    {
        rollNo = s.rollNo;
        name = s.name;
        cout << "Copy constructor called." << endl;
    }

    void display()
    {
        cout << "Roll Number: " << rollNo << endl;
        cout << "Name: " << name << endl;
    }

    ~Student()
    {
        cout << "Destructor called for " << name << endl;
    }
};

int main()
{
    cout << "Creating object using default constructor:\n";

    Student s1;
    s1.display();

    cout << "\nCreating object using parameterized constructor:\n";

    Student s2(101, "Pushkar");
    s2.display();

    cout << "\nCreating object using copy constructor:\n";

    Student s3(s2);
    s3.display();

    cout << "\nEnd of main function.\n";

    return 0;
}