import React from "react";

const Header =(props)=>{
    return(
        <header
            className='max-w-3xl flex items-center justify-between mx-auto border-b border-darkText pb-3 lg:pb-5 mb-5 lg:mb-10'
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
                <span
                    className='cursor-pointer dark:text-primary'
                    onClick={props.signUserOut}
                >
                    Sign out
                </span>
                <img
                    src={props.user.photoURL}
                    className='max-h-8 lg:max-h-10 rounded-full'
                    alt={props.user.displayName}  loading="lazy"
                />
            </div>
        )}
    </header>
    )
}

export default Header;
