exports.isStrongPassword =(password) =>{
  const strongPasswordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*\(\)_\+\-=\[\]\{\}\|;:'",<>\.\?\/])[A-Za-z\d!@#\$%\^&\*\(\)_\+\-=\[\]\{\}\|;:'",<>\.\?\/]{8,}$/)
  return strongPasswordRegex.test(password);
}
exports.isPhoneNumberValid = (phone) => {
  if(isNaN(phone)) return false;
  if(phone.length !== 11 && phone.length !== 15) return false;
  if(phone.charAt(0) !== "0" && phone.charAt(0) !== "+") return false;
  if(phone.charAt(1) !== "8" && phone.charAt(1) !== "7" && phone.charAt(1) !== "9") return false;
  return true;
}