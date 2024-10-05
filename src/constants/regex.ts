const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nicknameRegex = /^[가-힣a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
// const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const phoneNumberRegex = /^(01[016789])(\d{3,4})(\d{4})$/;

export { emailRegex, nicknameRegex, passwordRegex, phoneNumberRegex };
