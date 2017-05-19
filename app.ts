interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person;
}

var user = { firstName: "Calamity", lastName: "Jane" };

console.log(greeter(user));