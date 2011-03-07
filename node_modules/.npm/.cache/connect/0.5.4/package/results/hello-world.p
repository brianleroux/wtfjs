set terminal png
set output "results/graphs/hello-world.png"
set title "hello-world 2000 -c 50 -k"
set size 1,0.7
set grid y
set key left top
set xlabel "request"
set ylabel "response time (ms)"
plot "results/benchmarks/hello-world/node.js.dat" using 9 smooth sbezier with lines title "node", \
     "results/benchmarks/hello-world/connect.js.dat" using 9 smooth sbezier with lines title "connect", \
     "results/benchmarks/hello-world/rack.thin.ru.dat" using 9 smooth sbezier with lines title "rack thin", \
     "results/benchmarks/hello-world/sinatra.thin.ru.dat" using 9 smooth sbezier with lines title "sinatra thin"
