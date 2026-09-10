#include<iostream>
using namespace std;

void function() {
    unique_ptr<int> p1(new int(10)); 
  //  unique_ptr<int> p2;
    p1.reset (new int(20));
    cout << *p1 << endl;
}
int main () {
    function();
    return 0;
}

#include <iostream>
#include <memory>
using namespace std;

void function() {
    unique_ptr<int> p1(new int(10));

    p1.reset(new int(20));

    cout << *p1 << endl;
}

int main() {
    function();
    return 0;
}