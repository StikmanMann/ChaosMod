class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
export class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    // Add a new node to the end of the list
    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
        }
        else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
        //Logger.warn(`Appended Node: ${JSON.stringify(data)}`);
    }
    // Delete a node by its value
    deleteNodeByValue(data) {
        if (!this.head) {
            //Logger.warn("List is empty");
            return;
        }
        // If the head node is the one to be deleted
        if (this.head.data === data) {
            //Logger.warn(`Deleting Head Node: ${JSON.stringify(this.head.data)}`);
            this.head = this.head.next;
            this.size--;
            return;
        }
        let current = this.head;
        while (current.next) {
            if (current.next.data === data) {
                //Logger.warn(`Deleting Node: ${JSON.stringify(current.data)}`);
                current.next = current.next.next;
                this.size--;
                return;
            }
            current = current.next;
        }
    }
    // Delete a node by its index
    deleteNodeByIndex(index) {
        if (index < 0 || index >= this.size) {
            return;
        }
        if (index === 0) {
            this.head = this.head.next;
            this.size--;
            return;
        }
        let current = this.head;
        let count = 0;
        while (current && count < index - 1) {
            current = current.next;
            count++;
        }
        if (current && current.next) {
            current.next = current.next.next;
            this.size--;
        }
    }
    // Loop through the linked list
    forEach(callback) {
        let current = this.head;
        let index = 0;
        while (current) {
            callback(current.data, index);
            current = current.next;
            index++;
        }
    }
    // Print the linked list
    print() {
        let current = this.head;
        while (current) {
            console.log(current.data);
            current = current.next;
        }
    }
    getNodebyIndex(index) {
        if (index < 0 || index >= this.size) {
            return null;
        }
        let current = this.head;
        let count = 0;
        while (current && count < index) {
            current = current.next;
            count++;
        }
        return current;
    }
    some(predicate) {
        let current = this.head;
        let index = 0;
        while (current) {
            if (predicate(current.data, index)) {
                return true;
            }
            current = current.next;
            index++;
        }
        return false;
    }
    find(predicate) {
        let current = this.head;
        let index = 0;
        while (current) {
            if (predicate(current.data, index)) {
                return current.data;
            }
            current = current.next;
            index++;
        }
        return null;
    }
    clear() {
        this.head = null;
        this.size = 0;
    }
}
