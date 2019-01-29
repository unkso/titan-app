use regex::Regex;
use pwhash::bcrypt::{BcryptSetup, BcryptVariant, hash_with, verify};
use lazy_static::lazy_static;
use rand::{Rng, thread_rng};

lazy_static! {
    static ref BLOWFISH_CHARACTERS: Vec<char> = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789./".chars().collect();
}
const BCRYPT_TYPE: BcryptVariant = BcryptVariant::V2a;
const BCRYPT_COST: &'static str = "08";

pub fn check_password(password: &str, hash: &str) -> bool {
    return is_blowfish(password) &&
        is_blowfish(password) &&
        !is_different_blowfish_alg(hash) &&
        !is_different_blowfish_alg(password) &&
        verify(hash, password);
}

fn is_blowfish(hash: &str) -> bool {
    let re = Regex::new(r"^\$2[afxy]\$").unwrap();

    return re.is_match(hash);
}

fn is_different_blowfish_alg(hash: &str) -> bool {
    return &hash[4..6] != BCRYPT_COST;
}

/// In the case that the user doesn't have an existing password, this generates
/// a random salt for use with a plaintext password.
fn getRandomSalt() -> String {
    let mut rng = rand::thread_rng();
    let mut salt = String::new();

    (0..22).for_each(|_| {
        salt.push(BLOWFISH_CHARACTERS[rng.gen_range(0, BLOWFISH_CHARACTERS.len())]);
    });

    format!("${}${}${}", BCRYPT_TYPE, BCRYPT_COST, salt)
}

#[test]
fn verifies_correct_password() {
    // Password: testpassword
    let password = "$2a$08$zhgCkDiQiZ3QNAMF3IeQ8uWw3AVV/jYKaOwo3W36k.Duh0RbxcJSa";
    let hash = "$2a$08$zhgCkDiQiZ3QNAMF3IeQ8uxiHuQ51zi35fw5F4O4YKDJLAGqxm6tK";

    assert!(check_password(password, hash))
}

#[test]
fn rejects_incorrect_password() {
    // Password: testpassword
    let password = "$2a$08$zhgCkDiQiZ3QNAMF3IeQ8uWw3AVV/jYKaOwo3W36k.Duh0RbxcJSa";
    let hash = "$2a$08$zhgCkDiQiZ3QNAMF3IeQ8uxiHuQ51zi35fq5F4O4YKDJLAGjxm6tK";

    assert!(!check_password(password, hash))
}