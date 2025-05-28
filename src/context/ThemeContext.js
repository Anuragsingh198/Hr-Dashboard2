"use client"
import  React ,{ createContext, useContext, useEffect, useState } from 'react'

export  const ThemeContext  = createContext();

export const ThemeProvider = ({ children }) =>{
    const [theme, setTheme] = useState('light');

    useEffect(()=>{
        const  stored =  localStorage.getItem('theme');
        if(stored){
            setTheme(stored);
            document.documentElement.classList.add(stored)
        }else{
            localStorage.setItem('theme' , 'light')
        }
    },[])

  const toggleTheme = ()=>{
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.remove(theme)
    document.documentElement.classList.add(newTheme)
     setTheme(newTheme)
     localStorage.setItem('theme' ,  newTheme)
  }
    return (
        <ThemeContext.Provider value={{theme , toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useTheme = () => useContext(ThemeContext);