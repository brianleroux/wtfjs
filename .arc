@app
wtfjs

@domain
wtfjs.com

@static
staging wtfjs-staging
production wtfjs-production
prune true

@aws
profile personal
region us-west-1

@html
get /
get /about
get /license
get /wtfs
get /wtfs/:wtfID

@plugins
enhance/arc-plugin-enhance
