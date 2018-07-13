use rocket_contrib::databases::{diesel::{self, r2d2}};

// #[database("unkso_main_forums")]
// pub struct UnksoMainForums(diesel::MysqlConnection);

// #[database("titan_primary")]
// pub struct TitanPrimary(diesel::MysqlConnection);

use std::ops::Deref;
use rocket::http::Status;
use rocket::request::{self, FromRequest};
use rocket::{Request, State, Outcome};

// An alias to the type for a pool of Diesel SQLite connections.
type Pool = r2d2::Pool<r2d2::ConnectionManager<diesel::MysqlConnection>>;

pub struct UnksoMainForums(pub r2d2::PooledConnection<r2d2::ConnectionManager<diesel::MysqlConnection>>);
pub struct TitanPrimary(pub r2d2::PooledConnection<r2d2::ConnectionManager<diesel::MysqlConnection>>);

pub struct UnksoMainForumsPool(pub Pool);
pub struct TitanPrimaryPool(pub Pool);


/// Initializes a database pool.
impl UnksoMainForumsPool {
    pub fn init_pool() -> UnksoMainForumsPool {
        let manager = r2d2::ConnectionManager::<diesel::MysqlConnection>::new("mysql://root@localhost/unkso_main_forums");
        UnksoMainForumsPool(r2d2::Pool::new(manager).expect("db pool"))
    }
}

impl TitanPrimaryPool {
    pub fn init_pool() -> TitanPrimaryPool {
        let manager = r2d2::ConnectionManager::<diesel::MysqlConnection>::new("mysql://root@localhost/titan_primary");
        TitanPrimaryPool(r2d2::Pool::new(manager).expect("db pool"))
    }
}

/// Attempts to retrieve a single connection from the managed database pool. If
/// no pool is currently managed, fails with an `InternalServerError` status. If
/// no connections are available, fails with a `ServiceUnavailable` status.
impl<'a, 'r> FromRequest<'a, 'r> for UnksoMainForums {
    type Error = ();

    fn from_request(request: &'a Request<'r>) -> request::Outcome<UnksoMainForums, ()> {
        let pool = request.guard::<State<UnksoMainForumsPool>>()?;
        match pool.0.get() {
            Ok(conn) => Outcome::Success(UnksoMainForums(conn)),
            Err(_) => Outcome::Failure((Status::ServiceUnavailable, ()))
        }
    }
}

impl Deref for UnksoMainForums {
    type Target = diesel::MysqlConnection;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl<'a, 'r> FromRequest<'a, 'r> for TitanPrimary {
    type Error = ();

    fn from_request(request: &'a Request<'r>) -> request::Outcome<TitanPrimary, ()> {
        let pool = request.guard::<State<TitanPrimaryPool>>()?;
        match pool.0.get() {
            Ok(conn) => Outcome::Success(TitanPrimary(conn)),
            Err(_) => Outcome::Failure((Status::ServiceUnavailable, ()))
        }
    }
}

impl Deref for TitanPrimary {
    type Target = diesel::MysqlConnection;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}