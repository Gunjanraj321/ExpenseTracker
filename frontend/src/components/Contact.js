
import React from 'react'

export const Contact = () => {
  return (
    <div> 
        <h1 className="font-bold m-4 text-3xl p-4 "> Contact Us</h1>
            <form className="md:flex md:items-center mb-6">
                <input type="text" className="border border-lime-600 m-2 py-2 px-3" placeholder="name"/>
                <input type="text" className="border border-lime-600 m-2 py-2 px-3" placeholder="message"/>
                <button className="font-bold border resize-none border-blue-400 text-green-600 rounded-md m-2 py-2 px-3 bg-slate-200">Submit</button>
            </form>
    </div>
  )
}
