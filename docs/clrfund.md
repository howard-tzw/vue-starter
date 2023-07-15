# 取得 clrfund round 9 的資訊

- [x] 使用哪個 token 作為捐款
- [x] round 跟 factory round 的地址
- [ ] 這場 round 資金池內的金額，以該場的 token 數量為單位
- [ ] 這場 round 捐款所收到的金額
- [ ] 這場 round 資金池加捐款金額的總額
- [x] user registry 的地址，以及他是使用哪種驗證合約
- [x] recipient registry 的地址，以及他是使用哪種驗證合約
- [ ] 捐款事件列表
- [x] 這場 round 的結束日期
- [ ] 有無改變過 coordinator


## Notes
- 根本不需要用 subgraph，使用 arbitrum rpc 讀取資料就夠快且方便了

### 取得 contract creator
使用 arbiscan 的 api 抓 current round 

```ts
const url = `https://api.arbiscan.io/api?module=contract&action=getcontractcreation&contractaddresses=${CURRENT_ROUND_ADDRESS}&apikey=${arbiscanApikep}`
	const response = await fetch(url)
	const data = await response.json()
```

結過會如下

```js
{
    "status": "1",
    "message": "OK",
    "result": [
        {
            "contractAddress": "0x806f08b7dd31fe0267e8c70c4bf8c4bfbbdde760",
            "contractCreator": "0x94aaf5ceb457057ac4d1588257988d487272984f",
            "txHash": "0x5125e1b542a844a574f1997ac2c0797f77e12ad523f0624a4322dc5f8a1d8bc1"
        }
    ]
}
```

contractCreator 並不是我要的 FundingRoundFactory: 0xc06349D95C30551Ea510bD5F35CfA2151499D60a，而是執行一系列合約的源頭帳戶，但在 arbiscan 上顯示的卻是我要的合約地址。

解決方法：需要從 txHash 解析出是哪個合約地址部署 FundingRound 合約的。