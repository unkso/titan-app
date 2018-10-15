use regex::Regex;
use bcrypt::verify;

const BCRYPT_COST: &'static str = "08";

pub fn check_password(password: &str, hash: &str) -> bool {
    return is_blowfish(password) &&
        is_blowfish(hash) &&
        !is_different_blowfish_alg(password) &&
        !is_different_blowfish_alg(hash) &&
        verify(password, hash).unwrap();
}

fn is_blowfish(hash: &str) -> bool {
    let re = Regex::new(r"^\$2[afxy]\$").unwrap();

    return re.is_match(hash);
}

fn is_different_blowfish_alg(hash: &str) -> bool {
    return &hash[4..6] != BCRYPT_COST;
}

#[test]
fn verifies_correct_password() {
    let password = "$2a$08$yFm6QMkT2K23thmIAH21Cu1OLQ5TpP0KLf18WyWwCcMmKnWv3EZeG";
    let hash = "$2a$08$yFm6QMkT2K23thmIAH21Cu18NJpFGc6rN4OgBMqfhWQ89MebbqWgS";

    assert!(check_password(password, hash))
}

#[test]
fn rejects_incorrect_password() {
    let password = "$2a$08$yFm6QMkT2K23thmIAH21Cu0jYfUz0lvCY3HfLondzvo4bzGwR9NgP";
    let hash = "$2a$08$yFm6QMkT2K23thmIAH21Cu18NJpFGc6rN4OgBMqfhWQ89MebbqWgS";

    assert!(!check_password(password, hash))
}