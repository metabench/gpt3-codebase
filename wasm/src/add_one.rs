
#![feature(lang_items)]

fn add_one(x: u32) -> u32 {
  x + 1
}

fn main() {
  let result = add_one(1);
  println!("{}", result);
}
