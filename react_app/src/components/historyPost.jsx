import PropTypes from 'prop-types'
import React, { memo } from 'react'

const history = memo((props) => {


    //ログイン認証を取得
    
    async function originTest() {
      try {
          const res = await axios.get(url);
          setData(res.data);
          console.log(data);
          console.log("成功");
          return;
      } catch (e) {
          console.log("エラーが起きました！");
          return;
      }
    
    return (
    
  )

    //入力情報を検索窓から入手する


    //それをaxios.postで渡してあげる



}


})

history.propTypes = {}

export default history