#include <iostream>
using namespace std;
class Arraystack {
public:
    int* stack;
    int size;
    int top;
    Arraystack(int n) {
        size = n;
        stack = new int[size];
        top = -1;
    }
    void push(int x) {
        if (top == size - 1) {
            cout << "Stack Overflow" << endl;
            return;
        }
        stack[++top] = x;
    }
    int pop() {
        if (top == -1) {
            cout << "Stack Underflow" << endl;
            return -1;
        }
        // return stack[top--];
    
    int temp=stack[top];
        top--;
        return temp;
    }
    int peek() {
        if (top==-1){
            cout<<"Stack is empty"<<endl;
            return-1;

        }
        return stack[top];  
    }
    void display() {
        if (top==-1){
            cout<<"Stack is empty"<<endl;
        }
        else{
            for (int i = top; i >= 0; i--) {
                cout << stack[i] << " ";
            }
            cout<< endl;
        }
    }
};
    int main() {
        Arraystack s(5);
        s.push(10);
        s.push(20);
        s.push(30);
        s.display();
        cout << "Top element is: " << s.peek() << endl;
        cout << "Popped element is: " << s.pop() << endl;
        return 0;
    }
