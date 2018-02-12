pub fn hello() {
    println!("Hello from Project Titan!");
}

#[cfg(test)]
mod test {
    #[test]
    fn it_works() {
        assert_eq!(4, 2+2);
    }
}
