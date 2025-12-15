const QRCode = require('qrcode');
const path = require('path');

const url = 'https://qr-ahmt.onrender.com/';
const outputPath = path.join(__dirname, 'public', 'qrcode.png');

QRCode.toFile(outputPath, url, {
    color: {
        dark: '#ff4757',  // Prank App Theme text color (Red/Pink)
        light: '#ffffff' // White background
    },
    width: 500,
    margin: 2
}, function (err) {
    if (err) throw err;
    console.log('QR Code generated successfully at public/qrcode.png');
});
