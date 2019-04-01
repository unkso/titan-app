use std::ops::Deref;
use rocket::request::FromFormValue;
use rocket::http::RawStr;
use chrono::NaiveDateTime;

pub struct NaiveDateTimeForm(chrono::NaiveDateTime);

impl<'v> FromFormValue<'v> for NaiveDateTimeForm {
    type Error = &'v RawStr;

    fn from_form_value(form_value: &'v RawStr) -> Result<NaiveDateTimeForm, &'v RawStr> {
        match chrono::NaiveDateTime::parse_from_str(form_value, "%Y-%m-%dT%H:%M:%S") {
            Ok(date_time) => Ok(NaiveDateTimeForm(date_time)),
            _ => Err(form_value),
        }
    }
}

impl Deref for NaiveDateTimeForm {
    type Target = NaiveDateTime;

    fn deref(self: &Self) -> &NaiveDateTime {
        &self.0
    }
}
