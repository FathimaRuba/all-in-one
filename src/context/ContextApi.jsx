import React, { useState } from 'react'
import { createContext } from 'react'

export const addCategoryResponseContext = createContext()

function ContextApi({ children }) {

    const [addCategory, setAddCategory] = useState("")

    return (
        <>
            <addCategoryResponseContext.Provider value={{ addCategory, setAddCategory }}>
                {children}
            </addCategoryResponseContext.Provider>
        </>
    )
}

export default ContextApi