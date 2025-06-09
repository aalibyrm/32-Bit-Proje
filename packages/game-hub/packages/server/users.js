import crypto from 'crypto';

const hash = (str) => crypto.createHash('sha256').update(str).digest('hex');

const users = [
    { userId: 'kullanici1', email: 'aalibyrm03@gmail.com', password: hash('1234') },
    { userId: 'kullanici2', email: 'abc@gmail.com', password: hash('2222') },
    { userId: 'kullanici3', email: 'xyz@gmail.com', password: hash('aaa') }
];

export default users;

