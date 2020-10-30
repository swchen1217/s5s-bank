const token = '7a6f150b83091ce20c89368641f9a137';

$(document).ready(function () {
    renderBoard();
    setInterval(renderBoard, 60000);
});

function renderBoard() {
    var result = request('POST', 'point-3', {});
    $('#wallet_' + result['id']).text(result['wallet']);
    $('#bank_' + result['id']).text(result['bank']);
    console.log('Updated');
}