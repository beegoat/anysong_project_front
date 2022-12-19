import axios from "axios";
import { useEffect, useState } from "react";

function StarRating() {

    let [isChecked, setIsChecked] = useState("isChecked")
    const rateNum = 3;

    const getPrevScore = () => {
        try{
            console.log(rateNum)
            if(rateNum!==undefined) {
                setIsChecked("isChecked" + String((rateNum/0.5)))
            } else { 
                setIsChecked("isChecked11");
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getPrevScore();
    },[])


    const getStarRate = (e) => {
        const starScore =  e.target.value;
        setIsChecked(starScore)
        if(rateNum !== undefined) {
            setIsChecked("isChecked");
        } 

        if(starScore !== undefined){
                setIsChecked("isChecked" + String((starScore/0.5)));
        }
        console.log("isChecked => " + isChecked);
    }
    

    return(
        <>
        <div className="rating rating-lg rating-half">
            <input type="radio" name="rating-10" className="rating-hidden" {...(isChecked==="isChecked11"? {checked: true} : {} ) }/>
            <input type="radio" name="rating-10" value="0.5" className="bg-amber-300 mask mask-star-2 mask-half-1" onClick={getStarRate} {...(isChecked==="isChecked1"? {checked: true} : {}) }/>
            <input type="radio" name="rating-10" value="1" className="bg-amber-300 mask mask-star-2 mask-half-2" onClick={getStarRate} {...(isChecked==="isChecked2"? {checked: true} : {}) }/>
            <input type="radio" name="rating-10" value="1.5" className="bg-amber-300 mask mask-star-2 mask-half-1" onClick={getStarRate} {...(isChecked==="isChecked3"? {checked: true} : {}) }/>
            <input type="radio" name="rating-10" value="2" className="bg-amber-300 mask mask-star-2 mask-half-2" onClick={getStarRate} {...(isChecked==="isChecked4"? {checked: true} : {}) }/>
            <input type="radio" name="rating-10" value="2.5" className="bg-amber-300 mask mask-star-2 mask-half-1" onClick={getStarRate} {...(isChecked==="isChecked5"? {checked: true} : {}) }/>
            <input type="radio" name="rating-10" value="3" className="bg-amber-300 mask mask-star-2 mask-half-2" onClick={getStarRate} {...(isChecked==="isChecked6"? {checked: true} : {}) }/>
            <input type="radio" name="rating-10" value="3.5" className="bg-amber-300 mask mask-star-2 mask-half-1" onClick={getStarRate} {...(isChecked==="isChecked7"? {checked: true} : {}) }/>
            <input type="radio" name="rating-10" value="4" className="bg-amber-300 mask mask-star-2 mask-half-2" onClick={getStarRate} {...(isChecked==="isChecked8"? {checked: true} : {}) }/>
            <input type="radio" name="rating-10" value="4.5" className="bg-amber-300 mask mask-star-2 mask-half-1" onClick={getStarRate} {...(isChecked==="isChecked9"? {checked: true} : {}) }/>
            <input type="radio" name="rating-10" value="5" className="bg-amber-300 mask mask-star-2 mask-half-2" onClick={getStarRate}{...(isChecked==="isChecked10"? {checked: true} : {}) }/>
        </div>
        </>
    )
}


export default StarRating ;