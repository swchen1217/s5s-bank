const token = 'bd5af1f610a12434c9128e4a399cef8a';

$(document).ready(function () {
    clean();
    buttonOnClick();
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
    $('#inButtonBank').click(function () {
        var id = $('#idSelectBank').val();
        var point = $('#pointInputBank').val();
        if (id == null || point == '') {
            alert('隊伍或點數錯誤');
            return false;
        }
        var result = request('POST', 'bank', {id: id, point: point}, true);
        if (result['code'] == 400 && result['data']['error'] == 'number-error') {
            alert('輸入點數錯誤');
            return false;
        }
        renderBoard();
        clean();
        alert('Success');
    });
    $('#outButtonBank').click(function () {
        var id = $('#idSelectBank').val();
        var point = $('#pointInputBank').val();
        if (id == null || point == '') {
            alert('隊伍或點數錯誤');
            return false;
        }
        var result = request('DELETE', 'bank', {id: id, point: point}, true);
        if (result['code'] == 400 && result['data']['error'] == 'number-error') {
            alert('輸入點數錯誤');
            return false;
        }
        renderBoard();
        clean();
        alert('Success');
    });
    $('#inButtonInterest').click(function () {
        request('POST', 'interest', {});
        renderBoard();
        alert('Success');
    });
    $('#outButtonInterest').click(function () {
        request('DELETE', 'interest', {});
        renderBoard();
        alert('Success');
    });
}

function clean() {
    $('#idSelectWallet').val(-1);
    $('#pointInputWallet').val('');
    $('#idSelectBank').val(-1);
    $('#pointInputBank').val('');
}