set terminal png
set output "results/graphs/static.png"
set title "static 2000 -c 50 -k"
set size 1,0.7
set grid y
set key left top
set xlabel "request"
set ylabel "response time (ms)"
plot "results/benchmarks/static/node.js.dat" using 9 smooth sbezier with lines title "node", \
     "results/benchmarks/static/connect.js.dat" using 9 smooth sbezier with lines title "connect", \
     "results/benchmarks/static/rack.thin.ru.dat" using 9 smooth sbezier with lines title "rack thin", \
     "results/benchmarks/static/sinatra.thin.ru.dat" using 9 smooth sbezier with lines title "sinatra thin"
