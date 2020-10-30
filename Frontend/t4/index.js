const token = '3dfe563103ab11bec75bb5081e7a1dbe';

$(document).ready(function () {
    renderBoard();
    setInterval(renderBoard, 60000);
});

function renderBoard() {
    var result = request('POST', 'point-4', {});
    $('#wallet_' + result['id']).text(result['wallet']);
    $('#bank_' + result['id']).text(result['bank']);
    console.log('Updated');
}