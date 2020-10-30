const token = 'edbab45572c72a5d9440b40bcc0500c0';

$(document).ready(function () {
    renderBoard();
    setInterval(renderBoard, 60000);
});

function renderBoard() {
    var result = request('POST', 'point-1', {});
    $('#wallet_' + result['id']).text(result['wallet']);
    $('#bank_' + result['id']).text(result['bank']);
    console.log('Updated');
}