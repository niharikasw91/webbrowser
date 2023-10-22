// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';
// import { Worker } from 'worker_threads';
// import * as path from 'path';
// import { Wasm } from '@vscode/wasm-wasi';
// import { commands, ExtensionContext, Uri, window, workspace } from 'vscode';

// import { ServiceConnection } from '@vscode/sync-api-common/node';
// import { ApiService, Requests } from '@vscode/sync-api-service';

import { Wasm } from '@vscode/wasm-wasi';
import * as vscode from 'vscode';
import { commands, ExtensionContext, Uri, window, workspace } from 'vscode';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	// Load the WASM API

	// Load the WASM API
	const wasm: Wasm = await Wasm.load();

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "niharika-world" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('hello-world.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Niharika Calling- Congratulations, your extension "niharika-world" is now activ');
	});

	// Register a command that runs the C example
	let disposable1 = commands.registerCommand('wasm-wasi-go-example.run', async () => {
		// Create a pseudoterminal to provide stdio to the WASM process.
		const pty = wasm.createPseudoterminal();
		const terminal = window.createTerminal({ name: 'Run GO Example', pty, isTransient: true });
		terminal.show(true);

		// Load the WASM module. It is stored alongside the extension JS code.
		// So we can use VS Code's file system API to load it. Makes it
		// independent of whether the code runs in the desktop or the web.
		try {
			console.log("context.extensionUri", context.extensionUri);
			const bits = await workspace.fs.readFile(Uri.joinPath(context.extensionUri, 'hello.wasm'));
			const module = await WebAssembly.compile(bits);
			// Create a WASM process.
			const process = await wasm.createProcess('hello', module, { stdio: pty.stdio });
			// Run the process and wait for its result.
			const result = await process.run();
		} catch (error) {
			// Show an error message if something goes wrong.
			void window.showErrorMessage("error");
		}
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable1);
}

// This method is called when your extension is deactivated
export function deactivate() { }

// import { Wasm } from '@vscode/wasm-wasi';
// import { commands, ExtensionContext, Uri, window, workspace } from 'vscode';

// export async function activate(context: ExtensionContext) {
//   // Load the WASM API
//   const wasm: Wasm = await Wasm.load();

//   // Register a command that runs the C example
//   let disposable = commands.registerCommand('wasm-wasi-c-example.run', async () => {
//     // Create a pseudoterminal to provide stdio to the WASM process.
//     const pty = wasm.createPseudoterminal();
//     const terminal = window.createTerminal({
//       name: 'Run C Example',
//       pty,
//       isTransient: true
//     });
//     terminal.show(true);

//     try {
//       // Load the WASM module. It is stored alongside the extension's JS code.
//       // So we can use VS Code's file system API to load it. Makes it
//       // independent of whether the code runs in the desktop or the web.
//       const bits = await workspace.fs.readFile(
//         Uri.joinPath(context.extensionUri, 'src/add.wasm')
//       );
//       const module = await WebAssembly.compile(bits);
//       // Create a WASM process.
//       const process = await wasm.createProcess('hello', module, { stdio: pty.stdio });
//       // Run the process and wait for its result.
//       const result = await process.run();
//       if (result !== 0) {
//         await window.showErrorMessage(`Process hello ended with error: ${result}`);
//       }
//     } catch (error) {
//       // Show an error message if something goes wrong.
//       await window.showErrorMessage("error");
//     }
//   });
//   context.subscriptions.push(disposable);
// }
// export function deactivate() { }