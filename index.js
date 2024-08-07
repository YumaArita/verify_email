<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>メールアドレス認証</title>
    <script>
        function verifyEmail() {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            if (token) {
                fetch('https://your-api-endpoint.com/verify', {  // デプロイしたバックエンドAPIのURL
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                })
                .then(response => response.json())
                .then(data => {
                    const resultElement = document.getElementById('result');
                    if (data.success) {
                        resultElement.innerText = 'メールアドレスが確認されました。アプリに戻ってログインしてください。';
                        const link = document.createElement('a');
                        link.href = 'exp+expensetracker://verify?token=' + token;
                        link.innerText = 'アプリを開く';
                        resultElement.appendChild(link);
                    } else {
                        resultElement.innerText = '認証に失敗しました。';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('result').innerText = 'エラーが発生しました。';
                });
            } else {
                document.getElementById('result').innerText = 'トークンが見つかりません。';
            }
        }
    </script>
</head>
<body onload="verifyEmail()">
    <h1>メールアドレス認証</h1>
    <p id="result">認証中...</p>
</body>
</html>
