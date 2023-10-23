# README

This is the README for your extension "hello-world" in web-browser version. After writing up a brief description, we recommend including 

## Test your web extension in vscode.dev

how your extension behaves in the actual vscode[https://vscode.dev/] environment.

To see your extension on vscode.dev, you first need to host it from your machine for vscode.dev to download and run.

First, you'll need to install mkcert[https://github.com/FiloSottile/mkcert#installation]

Then, generate the localhost.pem and localhost-key.pem files into a location you won't lose them (for example $HOME/certs):

`
    $ mkdir -p $HOME/certs
    $ cd $HOME/certs
    $ mkcert -install
    $ mkcert localhost
`

Then, from your extension's path, start an HTTP server by running npx serve:
`$ npx serve --cors -l 5000 --ssl-cert $HOME/certs/localhost.pem --ssl-key $HOME/certs/localhost-key.pem`

Should see the output like the following 
npx: installed 78 in 2.196s
    
      Serving!           
                                              
       - Local:            https://localhost:5000       
       - On Your Network:  https://172.19.255.26:5000   
                                                
        Copied local address to clipboard!               


   Finally, open [https://vscode.dev], run Developer: Install Extension From Location... from the Command Palette (⇧⌘P), paste the URL from above, [https://localhost:5000] in the example, and select Install.

   # Run you command in the web-browser version

   cntrl+shift+p -> type your command

   Check logs in the vscode terminal

   # Compile code using wasi-sdk 
   Required to install - Microsoft's WebAssembly runtime extension
   `../wasi-sdk-20.0/bin/clang hello.c -o ./hello.wasm`  