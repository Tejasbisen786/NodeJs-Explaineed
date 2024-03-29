client ----req--> /users server() =>app.get(/users)
client < -----res <--------------

    client --> req --> middleWare ----->server()|

             client < -----res <--------------|

// middle ware : is a req and res function

client --> req --> middleWare |
client < -----res-|
 
 *** What it Does ****
// Execute Any Code
// Make Changes to the request and response objects
// End the req and res cycle
// Call The Next Middleware Function in the stack
