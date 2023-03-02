// function test() {
//     var i = 0;
//     var num = [];

//     for (i; i < 10; i++) {
//         num[i] = function() {
//             console.log(i);
//         }
//     }
//     console.log(i);
//     return num[9];
// }

// test()(); // 10

// var test = (function() {
//     var num = 0;
//     return () => {
//         return num++;
//     };
// }());
// for (var i = 0; i < 10; i++) {
//     test();
// }
// console.log(test()); // 10

function foo(a, b) {
    console.log(b);

    return {
        foo: function (c) {
            return foo(c, a);
        },
    };
}

let func = foo(0);
func.foo(1);
func.foo(2);
func.foo(3);

let func2 = foo(0).foo(1).foo(2).foo(3);
let func3 = foo(0).foo(1);
func3.foo(2);
func3.foo(3);

class Dog {
    constructor(name) {
        this.name = name;
    }

    showName() {
        console.log(this.name);
    }
}

let animals = new Dog('baby');
animals.showName();

