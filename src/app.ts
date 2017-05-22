import 'mocha';
import { should } from 'chai';
should();

describe('Basic Types', () => {
  it('should create basic types', () => {
    let b: boolean = true;
    let decimal: number = 6;
    let hex: number = 0xf00d;
    let binary: number = 0b1010;
    let octal: number = 0o744;

    let color: string = "blue";
    color = 'red';
  });

  it('should handle string interpolation', () => {
    let fullName: string = `Bob Bobbington`;
    let age: number = 37;
    let sentence: string = `Hello, my name is ${ fullName }.

                            Over multiple lines`;
  }); 

  it('should handle array types', () => {
    let list1: number[] = [1, 2, 3];
    let list2: Array<number> = [1, 2, 3];
  });

  it('should handle tuple types', () => {
    let t1: [number, string] = [1, 'hello'];
    t1[1].substr(1).should.equal('ello');
  });

  it('should handle enum types', () => {
    enum Color {Red, Green, Blue}
    let c: Color = Color.Green;
    let colorName: string = Color[2];

    colorName.should.equal('Blue');
  });

  it('should implement dynamic typing with any', () => {
    let notSure: any = 4;
    notSure = "maybe a string instead";
    notSure = false;
  });

  it('should distinguish any and Object', () => {
    let prettySure: Object = 4; // allows assignment but not to call any method
    prettySure.toString()
  });

  it('should define a void type to denote abscence of type', () => {
    let untype: void = undefined;
    untype = null;

    function x(): void {}
  });

  it('should have undefined and null type', () => {
    let u: undefined = undefined;
    let n: null = null;

    //Thee are subtypes of all other types
    let x: number = null;
    let y: string = undefined;
  });

  it('should treat nullable types in a strict way', () => {
    let s: string = null; //will fail with --strictNullChecks
    let s2: string | null = null; //is ok
  });

  
  it('should have a never type to denote unreachability', () => {
    //let x: never = infiniteLoop(); this works 
    
    function infiniteLoop(): never {
      while (true) {
      }
    }
  });

  
  it('should have type assertion, not the same as type casting since there is no runtime conversion', () => {
    let someValue: any = "I know this is a string";
    let strLength: number = (<string>someValue).length;
    strLength = (someValue as string).length;
  });
});


describe('Variable Declaration', () => {
  
  it('let is block scoped', () => {
    let x = 10;
    let y = 11;
    if (true){
      let y = 12;
    }

    y.should.equal(11);
  });

  it('const is not immutable', () => {
    let x = 10;
    let y = 11;
    if (true){
      let y = 12;
    }

    y.should.equal(11);
  });


});

describe('Interfaces', () => {
  
  it('excess property checking', () => {
    interface X {
      readonly a: string
      b?: string
      [prop: string]: any //This is to allow excess properties for the interface
    }

    let y: X;
    y = {
      a: '1',
      c: '3'
    }
  });
    

  it('function types', () => {
    interface searchFunc {
      (source: string, substring: string): boolean;
    }

    let mySearch: searchFunc;
    mySearch = (src, sub) => {
      return src.search(sub) > -1;
    };
  });

  
  it('indexable Types', () => {
    interface SA {
      [idx: number]: string;
    }
    let x: SA = ['a', 'b'];

    interface Complex {
      [intKey: number]: 'lol'; //This return type must be a subtype of the string indexer
      [stringKey: string]: string;
    }

    let y: Complex = { 'a': 'bbb', 2: 'lol'};

    interface ReadOnly {
      readonly [i: number] : string;
    }
    let z: ReadOnly = ['a'];
    // z[0] = 'b'; error
  });

  
  it('indexable types enforce properties to conform to signature', () => {
    interface X {
      [index: string] : number;
      length: number;
      //name: string; // Does not work 
    }
  });
  

  it('class interfaces', () => {
    interface CC {
      new (a: string): CI;
    };
  
    // class X implements CC {} // This doesn't work since interface only applies to instances
  
    interface CI {
      tick();
    };
  
    function createClock(ctor: CC, a: string): CI { 
      return new ctor(a);
    }
  
    class AnalogClock implements CI {
      constructor(a: string){ console.log('analog'); }
      tick(){ console.log('analog tick'); }
    }
    class DigitalClock implements CI {
      constructor(a: string){ console.log('digital'); }
      tick(){ console.log('digital tick'); }
    }
  });
  


  it('extending interfaces', () => {
    interface A { a: string; }
    interface B extends A { b: number }

    let x: B = {
      a: '',
      b: 1
    };
  });
    
})

describe('Classes', () => {
  
});
  
  