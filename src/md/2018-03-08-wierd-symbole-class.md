```
/*
* this is wierd extra this keyword
* when using symbol inside of class
*/
///////Class 1
class MyClass {
      constructor() {
          this.m=Symbol('a')
      }
        [this.m](){
        return 2
      }
  
    pub2(){
       return  this[this[this.m]]()
    }
  }
//////////Class 2

var m=Symbol('a') 
class MyClass2 {
      constructor() {
      }
        [m](){
        return 2
      }
  
    pub2(){
       return  this[m]()
    }
}

  var a=new MyClass(); 
  var b=new MyClass2()
 

  var a=new MyClass(); 
  console.log(//2,2
      a.pub2(),
      b.pub2()
  )
```
[@Arshiamidos](https://github.com/@arshiamidos)

