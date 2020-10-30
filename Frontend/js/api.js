var base_url = '../../Backend/api.php';

function request(httpMethod, cmd, dataObj = {}) {
    var responses = null;
    dataObj.cmd = cmd;
    dataObj.token = token;
    $.ajax({
        url: base_url,
        data: JSON.stringify(dataObj),
        type: httpMethod,
        contentType: 'application/json; charset=UTF-8',
        async: false,
        complete: function (xhr) {
            responses = xhr;
        }
    });
    if (Math.floor(responses.status / 100) == 5) {
        alert('系統發生錯誤!!請聯繫管理員');
    }
    if (responses.status == 403) {
        alert('權限不足!!');
    }
    console.log(responses);
    /*var result = {'code': responses.status, 'data': responses.responseJSON};
    console.log(result);
    return result;*/
    return responses.responseJSON;
}