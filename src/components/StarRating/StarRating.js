import { useEffect, useState } from "react";

function StarRating({ star, getStarFromComp, isLogin}) {

    const [isChecked, setIsChecked] = useState("isChecked")

    const getPrevScore = () => {
        try{
            if(star!==undefined) {
               setIsChecked("isChecked" + String((star/0.5)));
            } else { 
                setIsChecked("isChecked0");
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getPrevScore();
    },[star])


    const catchStarRate = (e) => {
        const starScore =  e.target.value;
        getStarFromComp(starScore);
    }
    

    return(
        <>
        {isLogin.isAuth ? (
            <div className="rating rating-lg rating-half">
            <input type="radio" name="rating-10" value="0" className="rating-hidden" onClick={catchStarRate} {...(isChecked==="isChecked0"? {checked: true} : {} ) }/>
            <input type="radio" name="rating-10" value="0.5" className="bg-amber-300 mask mask-star-2 mask-half-1" onClick={catchStarRate} {...(isChecked==="isChecked1"? {checked: true} : {}) }/>
            <input type="radio" name="rating-10" value="1" className="bg-amber-300 mask mask-star-2 mask-half-2" onClick={catchStarRate} {...(isChecked==="isChecked2"? {checked: true} : {}) }/>
            <input type="radio" name="rating-10" value="1.5" className="bg-amber-300 mask mask-star-2 mask-half-1" onClick={catchStarRate} {...(isChecked==="isChecked3"? {checked: true} : {}) }/>
            <input type="radio" name="rating-10" value="2" className="bg-amber-300 mask mask-star-2 mask-half-2" onClick={catchStarRate} {...(isChecked==="isChecked4"? {checked: true} : {}) }/>
            <input type="radio" name="rating-10" value="2.5" className="bg-amber-300 mask mask-star-2 mask-half-1" onClick={catchStarRate} {...(isChecked==="isChecked5"? {checked: true} : {}) }/>
            <input type="radio" name="rating-10" value="3" className="bg-amber-300 mask mask-star-2 mask-half-2" onClick={catchStarRate} {...(isChecked==="isChecked6"? {checked: true} : {}) }/>
            <input type="radio" name="rating-10" value="3.5" className="bg-amber-300 mask mask-star-2 mask-half-1" onClick={catchStarRate} {...(isChecked==="isChecked7"? {checked: true} : {}) }/>
            <input type="radio" name="rating-10" value="4" className="bg-amber-300 mask mask-star-2 mask-half-2" onClick={catchStarRate} {...(isChecked==="isChecked8"? {checked: true} : {}) }/>
            <input type="radio" name="rating-10" value="4.5" className="bg-amber-300 mask mask-star-2 mask-half-1" onClick={catchStarRate} {...(isChecked==="isChecked9"? {checked: true} : {}) }/>
            <input type="radio" name="rating-10" value="5" className="bg-amber-300 mask mask-star-2 mask-half-2" onClick={catchStarRate}{...(isChecked==="isChecked10"? {checked: true} : {}) }/>
        </div>
        ) : (
            <div> 로그인을 해주세요 </div>
        ) }
        
        </>
    )
}


export default StarRating ;