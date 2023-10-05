import { useState, useEffect, useCallback, useRef } from "react";


function PwdGen(){
    
    const [pwdLen, setPwdLen] = useState(8);

    const [numAllow, setNumAllowed] = useState(false);

    const [spcharAllowed,setSpcharAllowed] = useState(false);

    const [password, setPassword] = useState('');

    const pwdRef = useRef(null)

    const copyBtnRef = useRef(null)

    const handelCopy = useCallback(() => {
        pwdRef.current?.select();
        pwdRef.current?.setSelectionRange(0,pwdLen);
        window.navigator.clipboard.writeText(password);
        copyBtnRef.current.innerText = "Copied!";
    }, [password, pwdLen]) 
    
    const generatePassword = useCallback( () => {

        copyBtnRef.current.innerText = "Copy";

        let genPwd = "";

        let poolStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if (numAllow) poolStr += '0123456789';
    
        if (spcharAllowed) poolStr += '!@#$%^&*()-_=+{}[]><./';
    
        for (let i=0; i<pwdLen; i++){
            genPwd += poolStr[Math.floor(Math.random() * poolStr.length)];
        }

        setPassword(genPwd);
    }, [password, numAllow, spcharAllowed, pwdLen])

    
    useEffect(generatePassword, [numAllow, spcharAllowed, setPassword, pwdLen])

    return (
    <>
        <h1 className=" text-green-400 mb-10 md:text-5xl sm:text-5xl lg:text-6xl text-2xl">Password Generator</h1>

        <form className=" w-full max-w-[50rem] p-6 rounded-xl h-64  border-slate-600 border-2 bg-transparent flex flex-col justify-around items-center ">
        
           <span className="w-full flex flex-row justify-center items-center">
        
                <input className=" px-3 h-10 w-full bg-green-100 rounded-l-md focus:-outline-offset-1 focus:outline-2 focus:outline-green-500 -outline-offset-0"
                    type="text"
                    readOnly
                    value={password}
                    ref={pwdRef}
                    
                />

                <button className=" bg-slate-700 w-28 border-green-400 rounded-r-md px-3 h-10 text-green-300 font-medium text-lg flex justify-center items-center hover:bg-slate-600 active:bg-slate-500 "
                    type="button" 
                    onClick={handelCopy}
                    ref={copyBtnRef}
                >
                    Copy
                </button>

            </span>    
            
            {/* Controls: */}

            <span className=" text-green-400 flex items-center justify-around px-1 w-full flex-wrap">

                <span className="flex flex-nowrap items-center justify-center whitespace-nowrap">
                    
                    <label htmlFor="" className=" mr-3 ">Length: </label>
                
                    <input className="overflow-visible h-1 rounded-xl"
                    type="range" 
                    min={6} 
                    max={100} 
                    value={pwdLen} 
                    onChange={e => setPwdLen(e.target.value)}     
                    />

                    <input className="ml-1 bg-transparent w-10 pr-2 text-center focus:outline-green-500 appearance-none"
                    type="text" 
                    value={pwdLen} 
                    onChange={e => setPwdLen(e.target.value!="" && e.target.value <=100 && e.target.value>=6 ?parseInt(e.target.value):pwdLen)} 
                    onKeyDown={e => e.key=="ArrowUp" && pwdLen < 100? setPwdLen(parseInt(pwdLen)+1): e.key=="ArrowDown" && pwdLen > 6? setPwdLen(parseInt(pwdLen)-1): 0} 
                    />
   
                </span>
                
                <span className="flex flex-nowrap whitespace-nowrap hover:bg-slate-700 ml-5 py-1 px-4 rounded-2xl cursor-pointer select-none active:bg-slate-600" onClick={ _ => setNumAllowed(!numAllow) }>

                    <label htmlFor="" className="mx-2 cursor-pointer">Include Numbers: </label>
                    
                    <input className="cursor-pointer" type="checkbox" checked={numAllow} onChange={ _ => setNumAllowed(!numAllow)} />
                </span>
                
                <span className="flex flex-nowrap whitespace-nowrap hover:bg-slate-700 ml-5 py-1 px-4 rounded-2xl cursor-pointer select-none active:bg-slate-600" onClick={ _ => setSpcharAllowed(!spcharAllowed)}>
                    
                    <label htmlFor="" className="mr-2 cursor-pointer">Include Characters: </label>
                    
                    <input type="checkbox" className="cursor-pointer" checked={spcharAllowed} onChange={ _ => setSpcharAllowed(!spcharAllowed)} />
                
                </span>
            
            </span>
            
        </form>
    </>
    )
}

export { PwdGen }
