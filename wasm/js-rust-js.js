const wasmPack = require('wasm-pack');
const wasmPackLib = require('@wasm-tool/wasm-pack-lib');

const rustCode = `
#![feature(lang_items)]

fn add_one(x: u32) -> u32 {
  x + 1
}

fn main() {
  let result = add_one(1);
  println!("{}", result);
}
`;

// Check if the script is being run directly from the command line
if (require.main === module) {
  // Compile the Rust code to WASM using the 'wasm-pack' module
  console.log(wasmPack);
  wasmPackLib.build.build({
    crateDirectory: '.',
    packageName: 'add_one',
    crateType: 'cdylib',
    entrypoint: 'add_one',
    rustCode: rustCode,
    target: 'web'
  })
   
};