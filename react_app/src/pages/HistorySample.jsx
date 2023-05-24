import React, { useState } from 'react';
import axios from "axios";

function HistorySample() {
  const [data, setData] = useState([]);

  const url = "http://localhost:8000/api/history";

  // ① Historyのデータを全て取得するリクエストを投げる関数を作る
  async function originTest() {
      try {
        const res = await axios.get(url);
        setData(res.data);
        console.log(data)
        console.log('成功')
        return;
      } catch (e) {
        console.log("エラーが起きました！")
        return;
      }
      
  }


  // ③ 一部のHistoryのデータを削除するリクエストを投げる関数を作る

  // ④ 全てのHistoryのデータを削除するリクエストを投げる関数を作る



  return (
    <>
        <button  onClick={originTest}>APIテストですよ!!!</button>
         <form action="行き先" method='/post'>
            <label htmlFor="">
                行き先: <input type="text" />
            </label>
            <input type="submit" value="submit" />
         </form>

         <form action="行き先" method='/post'>
            <label htmlFor="">
                到着: <input type="text" />
            </label>
            <input type="submit" value="submit"/>
         </form>

    </>
  )
}

export default HistorySample