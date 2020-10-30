const token = 'fbfba2e45c2045dc5cab22a5afe83d9d';

$(document).ready(function () {
    renderBoard();
    setInterval(renderBoard, 60000);
});

function renderBoard() {
    var result = request('POST', 'point-2', {});
    $('#wallet_' + result['id']).text(result['wallet']);
    $('#bank_' + result['id']).text(result['bank']);
    console.log('Updated');
}