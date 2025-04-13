import crypto from 'crypto';

const users = [
    { email: 'aalibyrm03@gmail.com', password: crypto.createHash('sha256').update('1234').digest('hex') },
    { email: 'abc@gmail.com', password: crypto.createHash('sha256').update('2222').digest('hex') },
    { email: 'xyz@gmail.com', password: crypto.createHash('sha256').update('aaa').digest('hex') }

];

export default users;