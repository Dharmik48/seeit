import React from "react";

const Header =(props)=>{
    return(
        <header
            className='max-w-3xl flex justify-between mx-auto border-b border-darkText pb-3 lg:pb-5 mb-5 lg:mb-10'
        >
        <h1 className='text-2xl dark:text-primary'>👀 SeeIt</h1>
        {!props.user ? (
            <button
                onClick={() => props.signInWithGoogle()}
                className='border border-darkText rounded-full py-1.5 px-4 hover:bg-darkText hover:text-primary transition-colors focus:bg-darkText focus:text-primary focus:outline-none dark:text-primary dark:bg-darkText
    dark:hover:bg-darkText dark:hover:text-primary dark:border-primary'
            >
                Sign In
            </button>
        ) : (
            <div className='flex items-center gap-3.5 lg:gap-5'>
                <p
                    className='w-max cursor-pointer dark:text-primary'
                    onClick={props.signUserOut}
                >
                    Sign&nbsp;out
                </p>
                <img
                    src={props.user.photoURL}
                    className='max-h-8 lg:max-h-10 rounded-full'
                    alt={props.user.displayName}
                    onError={(e) => {
                        e.target.src = `https://avatars.dicebear.com/api/identicon/${props.user.uid}.svg`
                    }}
                />
            </div>
        )}
    </header>
    )
}

export default Header;
