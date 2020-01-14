<pre lang="javascript">
  var arr = [1, 2, 3, 4, 5, 6, 7, 8];
  arr[-1] = "yo wazzzup";
  console.log(arr.length); // > 8
  console.log(arr[arr.indexOf(99)]); // log's > "yo wazzzup"
</pre>
