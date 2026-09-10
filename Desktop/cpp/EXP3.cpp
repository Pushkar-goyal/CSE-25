#include <iostream>

using namespace std;

inline int square(int n)
{
    return n * n;
}

int addition(int a, int b = 10)
{
    return a + b;
}

int multiply(int a, int b)
{
    return a * b;
}

double multiply(double a, double b)
{
    return a * b;
}

int main()
{
    cout << "Square of 5 = " << square(5) << endl;

    cout << "Addition of 20 and 10 = "
         << addition(20, 10) << endl;

    cout << "Addition of 20 using default argument = "
         << addition(20) << endl;

    cout << "Integer multiplication = "
         << multiply(5, 4) << endl;

    cout << "Decimal multiplication = "
         << multiply(2.5, 4.0) << endl;

    return 0;
}