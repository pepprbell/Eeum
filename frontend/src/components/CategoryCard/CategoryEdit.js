import axios from 'axios';
import React, { useState } from 'react';
import styles from './CategoryEdit.module.css'
import { useHistory } from 'react-router-dom';
import Loader from '../Loader/Loader'
const CategoryEdit = (props) => {
  const history = useHistory();
  const [situationImg, setImg] = useState(props['categoryUrl'])
  const [categoryName, setCategoryName] = useState(props['categoryName'])
  const categoryId = useState(props['categoryId'])[0]
  const [imgFile, setImgFile] = useState()
  const [isLoading, setLoading] = useState(false)
  let [lenCategoryName, setlenCategoryName] = useState(props['categoryName'].length)
  const onImageChange = function (e) {
    setImg(URL.createObjectURL(e.target.files[0]))
    setImgFile(e.target.files[0])
  }
  const onInputChange = (e) => {
    if (e.target.value.length > 10){
      alert('상황이름은 10자까지 가능합니다.')
    } else{
      setCategoryName(e.target.value)
      setlenCategoryName(e.target.value.length)
    }
  }


  const editCategory = () => {
    setLoading(!isLoading)
    const token = sessionStorage.getItem('jwt')
    const editButton = document.getElementById('editButton')
    editButton.disabled = true;
    const data = {
      'word': categoryName
    }
    
    axios.put(process.env.REACT_APP_API_URL + '/category/'+ categoryId, data, {
      headers: {
        'Authorization': token
        }
    })
    .then(()=> {
      setLoading(!isLoading)
      history.go(0)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return(
    <>
      { isLoading === false
      ?
      (
      <>
      <div className={styles.add_box}>
        <div className={styles.image_box}>
          <img  src={situationImg} alt="이미지를 등록해주세요" />

          {/* <label  
            className={styles.image_button}
            >
            <img  src='/images/photo-camera.svg' alt="대체이미지" />
            <input type="file" className={styles.image_input} onChange={onImageChange}/>
              
          </label> */}
        </div>
        
        <input 
          type='text' 
          className={styles.situation_input}
          defaultValue={categoryName}
          onChange={onInputChange}
          placeholder='상황 이름'
          maxLength='10'/>
        <p>{lenCategoryName}/10</p>
      </div>
      <div className={styles.bottom_button}>
        <div className={styles.button_box}>
            <button className={styles.close_button} onClick={props.categoryEditStateChange}>취소</button>
            <button id='editButton' className={styles.edit_button} onClick={editCategory} >수정</button>
        </div>
      </div>
      </>
      )
      :
      (
        <Loader></Loader>
      )
      }
    </>
  )
}

export default CategoryEdit;