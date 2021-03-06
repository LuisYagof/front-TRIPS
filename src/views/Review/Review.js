import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import fetchData from "../../hooks/Fetch";
import { Rating } from "@material-ui/lab";
import './Review.css';
import Menu from '../../components/Menu/Menu'
import Arrow from '../../assets/icons/Arrow.svg'
import Burger from '../../assets/icons/Burger.svg'

const Review = () => {
  const history = useHistory();
  const params = useParams();
  const [value, setValue] = useState(3);
  const [review, setReview] = useState("");
  const [menu, setMenu] = useState(false)
  const functionFetch = `newReview/${params.curso}`;

  const handleReview = (event) => {
    setReview(event.target.value);
  };

  const fetching = async () => {
    let fetchOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer: ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        descripcion: review,
        valoracion: value,
      }),
    };
    const content = await fetchData(functionFetch, fetchOptions);
    if (content.error) {
      alert(content.error);
    }
    if (content.ok) {
      history.push("/review-ok");
    } else {
      alert(content.msg);
      history.goBack();
    }
  };

  const toggleMenu = () => {
    setMenu(!menu)
  };

  return (
    <>
      <Menu toggle={toggleMenu} menu={menu} />
      <div className='reviewHeader'>
        <img className="arrowRewiew" src={Arrow} onClick={() => history.goBack()} alt='' />
        <img className="arrowReview" onClick={toggleMenu} src={Burger} alt='' />
      </div>
      <form className='formReview' >
        <h3>Puntuación</h3>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <h3>Comentario</h3>
        <textarea
          className="textarea"
          type="text"
          placeholder="Escribe aquí tu comentario."
          maxLength='255'
          onChange={handleReview}
          required
        />
        <p className='character255'>(Máximo 255 caracteres)</p>
        <Button onClick={fetching} text={"Enviar review"} />
      </form>
    </>
  );
};

export default Review;
