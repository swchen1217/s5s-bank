const token = '1145f263256c923716d2b8eade2f6689';

$(document).ready(function () {
    renderBoard();
    setInterval(renderBoard, 60000);
});

function renderBoard() {
    request('POST', 'point', {}).forEach((item, index) => {
        $('#wallet_' + item['id']).text(item['wallet']);
        $('#bank_' + item['id']).text(item['bank']);
    });
    console.log('Updated');
}