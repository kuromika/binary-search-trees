
class Node{

    data;
    left = null;
    left = null;

    constructor(data) {
        this.data = data;
    }

    get left() {
        return this._left;
    }

    get right() {
        return this._right;
    }

    set left(data) {
        this._left = data;
    }

    set right(data) {
        this._right = data;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }
}


export default Node;