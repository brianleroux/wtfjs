document.getelementById can be omitted in all major browsers, inclunding IE6+.
This is non-standard, but all of them save the elements ids as globals. 

    <div id="myId"></div>
    <script>
      alert(myId.id);         // --> myId
      alert(window.myId.id);  // --> myId
    </script>


Or do they? Let's search myId in the window object.

    // Way 1
    alert('myId' in window);  // --> true (right...)
    // Way 2
    var present = false;
    for(var i in window){
      if(i == 'myId'){
        present = true;
      }
    }
    alert(present);           // --> false (wat!)

Looks like all browsers create Shroedinger's globals, that are here and not here at the same time...

What happens to globals when an element with the same id is created?

    <script>
      global0 = 1;
    </script>

    <div id=global0></div>

    <script>
      global0.innerHTML = "global0";     // --> nothing happens
      alert(global0);                    // --> 1
    </script>

So implicit getElementById's can't overload global vars, be they native or custom.
What about the other way? Well, it depends on how the global var is set.

Let's try with "window."

    <div id=global1></div>

    <script>
      global1.innerHTML = "global1";        // --> the div is updated
      console.log(global1);                 // --> the div
      window.global1 = 1;                   // Try to set the global var "global1"
      console.log(global1);                 // --> 1
    </script>

OK.

Let's try without any prefix.

    <div id=global2></div>

    <script>
      global2.innerHTML = "global2";    // --> the div is updated
      try{global2 = 1}                  // Try to set the global var "global2"
      catch(e){alert(e)}                // --> TypeError on IE < 9, ok on other browsers
      global2.innerHTML = "hum";        // --> div contains "hum" on IE < 9, nothing happens on other browsers
      console.log(global2);             // --> "[object]" on IE < 9, 1 on other browsers
    </script>

Weird.

And what happens if the global var is declared with "var" ?

    <div id=global3></div>

    <script>
      global3.innerHTML = "global3";    // --> Uncaught TypeError: Cannot set property 'innerHTML' of undefined (wtf...)
      console.log(global3);             // --> undefined (wtf?)
      var global3 = 1;                  // --> this breaks the two lines above (wtf!)
      console.log(global3);             // --> 1
    </script>

WAT.

- @MaximeEuziere
