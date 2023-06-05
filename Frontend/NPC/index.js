const token = '2bda99597da06a11feafd8760b68aec6';

$(document).ready(function () {
    clean();
    buttonOnClick();
    renderBoard();
    setInterval(renderBoard, 10000);
});

function renderBoard() {
    request('POST', 'point', {}).forEach((item, index) => {
        $('#wallet_' + item['id']).text(item['wallet']);
        $('#bank_' + item['id']).text(item['bank']);
    });
    console.log('Updated');
}

function buttonOnClick() {
    $('#inButtonWallet').click(function () {
        var id = $('#idSelectWallet').val();
        var point = $('#pointInputWallet').val();
        if (id == null || point == '') {
            alert('隊伍或點數錯誤');
            return false;
        }
        var result = request('POST', 'wallet', {id: id, point: point}, true);
        if (result['code'] == 400 && result['data']['error'] == 'number-error') {
            alert('輸入點數錯誤');
            return false;
        }
        renderBoard();
        clean();
        alert('Success');
    });
    $('#outButtonWallet').click(function () {
        var id = $('#idSelectWallet').val();
        var point = $('#pointInputWallet').val();
        if (id == null || point == '') {
            alert('隊伍或點數錯誤');
            return false;
        }
        var result = request('DELETE', 'wallet', {id: id, point: point}, true);
        if (result['code'] == 400 && result['data']['error'] == 'number-error') {
            alert('輸入點數錯誤');
            return false;
        }
        renderBoard();
        clean();
        alert('Success');
    });
}

function clean() {
    $('#idSelectWallet').val(-1);
    $('#pointInputWallet').val('');
}
