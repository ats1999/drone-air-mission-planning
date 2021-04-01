import style from "./styles/publish-button.module.css";
import PropTypes from "prop-types";

const PublishButton = ({handleClick,text})=>{
    return <div className={style.buttons}>
    <button onClick={handleClick} className={style.blob_btn}>
      {text}
      <span className={style.blob_btn__inner}>
        <span className={style.blob_btn__blobs}>
          <span className={style.blob_btn__blob} />
          <span className={style.blob_btn__blob} />
          <span className={style.blob_btn__blob} />
          <span className={style.blob_btn__blob} />
        </span>
      </span>
    </button>
    <br />
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={10} />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo" />
          <feBlend in2="goo" in="SourceGraphic" result="mix" />
        </filter>
      </defs>
    </svg>
  </div>  
}
PublishButton.propTypes = {
  handleClick:PropTypes.func.isRequired,
  text:PropTypes.string.isRequired
}

export default PublishButton;