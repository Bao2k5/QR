const fs = require('fs');
const https = require('https');
const path = require('path');

const file = fs.createWriteStream(path.join(__dirname, 'public', 'qrcode.png'));
const request = https.get("https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=https://qr-ahmt.onrender.com/&color=ff4757&bgcolor=ffffff", function (response) {
    response.pipe(file);
    file.on('finish', function () {
        file.close(() => {
            console.log("QR Code downloaded successfully to public/qrcode.png");
        });
    });
});
