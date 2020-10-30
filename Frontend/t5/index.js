const token = '2283335d8d12b21001439091e74f5028';

$(document).ready(function () {
    renderBoard();
    setInterval(renderBoard, 60000);
});

function renderBoard() {
    var result = request('POST', 'point-5', {});
    $('#wallet_' + result['id']).text(result['wallet']);
    $('#bank_' + result['id']).text(result['bank']);
    console.log('Updated');
}