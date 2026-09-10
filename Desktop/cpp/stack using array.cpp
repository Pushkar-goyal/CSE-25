#include <iostream>
using namespace std;
class Stack {
    int top;
    int arr[5];
public:  
    Stack() {
        top = -1;
        for (int i = 0; i < 5; i++) {
            arr[i] = 0;
        }
    }

    bool isEmpty() {
        return top == -1;
    }

    bool isFull() {
        return top == 4;
    }

    void push(int val) {
        if (isFull()) {
            cout << "Stack Overflow" << endl;
        } else {
            top++;
            arr[top] = val;
        }
    }

    int pop() {
        if (isEmpty()) {
            cout << "Stack Underflow" << endl;
            return 0;
        } else {
            int popValue = arr[top];
            arr[top] = 0;
            top--;
            return popValue;
        }
    }

    int count() {
        return top + 1;
    }

    int peek(int pos) {
        if (isEmpty()) {
            cout << "Stack is empty" << endl;
            return 0;
        } else if (pos < 1 || pos > top + 1) {
            cout << "Invalid position" << endl;
            return 0;
        } else {
            return arr[pos - 1];
        }
    }

    void change(int pos, int val) {
        if (pos < 1 || pos > top + 1) {
            cout << "Invalid position" << endl;
        } else {
            arr[pos - 1] = val;
            cout << "Value changed at position " << pos << endl;
        }
    }

    void display() {
        cout << "All values in the stack are:" << endl;
        for (int i = 4; i >= 0; i--) {
            cout << arr[i] << endl;
        }
    }
};