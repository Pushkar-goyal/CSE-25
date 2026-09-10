#include <iostream>
using namespace std;    
class Stack (
    private:
    node* top;
    node*Stack::top;
    public:
    Stack() {
        top=NULL;
    }    

void push() {
    int val;
    cout<<"Enter the value to be pushed: ";
    cin>>val;
    node*newnode=new node(val);
    newnode->next=top;
    top=newnode;    
     
    cout<<"Value pushed successfully"<<endl;
    display();
}
void pop() {
    if (top==NULL) {
        cout<<"Stack Underflow"<<endl;
        return;
    }
    node*temp=top;
    cout<<"Popped value is: "<<temp->data<<endl;
    top=top->next;
    delete temp;
    cout<<"Value popped successfully"<<endl;
    display();
}
void display() {
    if (top==NULL) {
        cout<<"Stack is empty"<<endl;
        return;
    }
    node*temp=top;
    cout<<"Stack elements are: ";
    while (temp!=NULL) {
        cout<<temp->data<<" ";
        temp=temp->next;
    }
    cout<<endl;
}
Stack () {
    while (top!=NULL) {
        node*temp=top;
        top=top->next;
        delete temp;
    }
)

int main() {
    Stack s;
    int choice;
    do {
        cout<<"1. Push"<<endl;
        cout<<"2. Pop"<<endl;
        cout<<"3. Display"<<endl;
        cout<<"4. Exit"<<endl;
        cout<<"Enter your choice: ";
        cin>>choice;
        switch (choice) {
            case 1:
                s.push();
                break;
            case 2:
                s.pop();
                break;
            case 3:
                s.display();
                break;
            case 4:
                cout<<"Exiting..."<<endl;
                break;
            default:
                cout<<"Invalid choice"<<endl;
        }
    } while (choice!=4);
    return 0;
}