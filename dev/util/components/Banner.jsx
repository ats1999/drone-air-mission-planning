import Link from "next/link";
import style from "./style/banner.module.css";

export function CookieBanner({handleClick,accepted}){
    return accepted?null:<div className={`${style.banner} card__shadow`}>
        We uses cookie, you must agree the following<br/>
        <ul>
            <li>
                <Link href="/pages/privacy-policy">
                    <a>Privacy policy</a>
                </Link>
            </li>

            <li>
                <Link href="/pages/cookie">
                    <a>Cookie policy</a>
                </Link>
            </li>

            <li>
                <Link href="/pages/terms-and-conditions">
                    <a>Terms-and-conditions</a>
                </Link>
            </li>
        </ul>
        
        <div className={style.buttonContainer}>
            <button onClick={handleClick} className={`${style.button} card__shadow`}>Accept</button>
        </div>
    </div>
}