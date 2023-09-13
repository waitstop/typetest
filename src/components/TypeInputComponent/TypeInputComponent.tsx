import {InputHTMLAttributes, useEffect, useRef, useState} from "react";
import {useAppSelector} from "@/store/hooks.ts";
import {charState, fetchRandomQuote, quoteType, setCursor, setQuote} from "@/store/reducers/quoteSlice.tsx";
import {useDispatch} from "react-redux";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";


const TypeInputComponent = (props: InputHTMLAttributes<HTMLInputElement>) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState<boolean>(true)
    const [value, setValue] = useState<string>("")
    const quote = useAppSelector(state => state.quote.value)
    const dispatch = useDispatch<ThunkDispatch<unknown,unknown,Action>>()

    useEffect(()=>{
        const values = value.split("")

        const result: quoteType = [...quote]
        values.forEach((char, i) => {
            if(char === quote[i].char){
                result[i] = {char: quote[i].char, state: charState.typedCorrect}
            }
            if(char !== quote[i].char){
                result[i] = {char: quote[i].char, state: charState.typedIncorrect}
            }
        })
        dispatch({type: setQuote, payload: result})
        dispatch({type: setCursor, payload: values.length})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    function focusToInput(){
        inputRef.current?.focus()
        inputRef.current?.setSelectionRange(value.length, value.length)
    }

    function restart(){
        dispatch(fetchRandomQuote())
        setValue("")
        focusToInput()
    }

    return (
        <>
            <input
                onBlur={()=>setIsFocused(false)}
                onFocus={()=>setIsFocused(true)}
                autoFocus
                ref={inputRef}
                className={"opacity-0 absolute z-[-999]"}
                value={value}
                onChange={(e) => {
                    if(quote.length < e.target.value.length) return
                    setValue(e.target.value)
                }}
                type="text"
                {...props}
            />
            <div className={"flex flex-row justify-between items-center w-full gap-x-6 mt-6"}>
                <button onClick={restart}>Restart</button>
                <button className={`underline ${!isFocused ? 'block' : 'hidden'}`}
                        onClick={focusToInput}>Click to focus
                </button>
            </div>
        </>
    );
};

export default TypeInputComponent;