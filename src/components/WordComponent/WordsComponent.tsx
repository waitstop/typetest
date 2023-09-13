import {useAppSelector} from "@/store/hooks.ts";
import {charState, fetchRandomQuote} from "@/store/reducers/quoteSlice.tsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import "./WordComponent.css";

const WordsComponent = () => {
    const quote = useAppSelector(state => state.quote.value)
    const cursor = useAppSelector(state => state.quote.cursor)
    const dispatch = useDispatch<ThunkDispatch<unknown,unknown,Action>>()

    useEffect(()=>{
        dispatch(fetchRandomQuote())
    },[dispatch])

    return(
        <div className={"flex flex-wrap"}>
            {quote?.map(({char, state}, i) => (
                <span key={char+"_"+i} className={`${i === cursor ? 'cursor' : ''} font-firaCode ${state === charState.notTyped ? 'text-gray-500': state === charState.typedCorrect ? '' : 'text-red-500'}`}
                >
                    {char !== " " ? char : '\u00A0'}
                </span>
            ))}
        </div>
    );
};

export default WordsComponent;