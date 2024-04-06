import { useCallback, useEffect, useState } from 'react'
import "./App.css"

function App() {
  const [length, setLength] = useState(20)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState('')

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let strg = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (number) strg += '1234567890'
    if (character) strg += '*@$&?'

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * strg.length)
      pass += strg.charAt(char)
    }

    setPassword(pass)
  }, [length, number, character])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, character, passwordGenerator, setPassword])

  const handleCopy = () => {
    const copyText = document.querySelector('input[type="text"]')

    if (copyText) {
      const textToCopy = copyText.value

      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            console.log('Text copied to clipboard')
          })
          .catch((err) => {
            console.error('Unable to copy text to clipboard', err)
          })
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = textToCopy
        document.body.appendChild(textArea)
        textArea.select()

        try {
          document.execCommand('copy')
          console.log('Text copied to clipboard')
        } catch (err) {
          console.error('Unable to copy text to clipboard', err)
        } finally {
          document.body.removeChild(textArea)
        }
      }
    }
  }

  return (
    <>
<div className='bg-slate-700 flex w-[1000px] h-[400px] m-auto mt-[4%] flex-col justify-evenly  p-[100px] rounded-full animate-fadeIn'>
  <h1 className=" py-4 mx-28 text-center tracking-widest font-serif rounded-3xl text-3xl bg-orange-500 mb-10 animate-bounce">
          Password Generator
        </h1>
        <div className="w-full max-w-[100%] flex justify-center gap-10 m-auto mb-10">
          <input
            type="text"
            value={password}
            className="w-[55%] py-4 px-[4%] outline-none rounded-3xl tracking-widest font-bold text-2xl text-black
            "
            placeholder="Password...!"
            readOnly
          />
          <button
            className=" bg-blue-600 font-serif text-2xl tracking-widest py-3 px-12 hover:scale-110 hover:ease-in-out hover:bg-gray-900 rounded-3xl font-bold text-white hover:scale-11`0"
            onClick={handleCopy}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm font-mono gap-10 justify-center w-[100%] ">
          <div className="flex item-center gap-x-1 p-5">
            <input
              type="range"
              min={4}
              max={20}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label className="tracking-widest font-bold text-xl">Length:-( {length})</label>
          </div>

          <div className="flex item-center gap-x-1 p-5">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              className="cursor-pointer"
              onChange={() => {
                setNumber((prev) => !prev)
              }}
            />
            <label className=" tracking-widest font-bold text-xl">Numbers</label>
          </div>

          <div className="flex item-center gap-x-1 p-5">
            <input
              type="checkbox"
              defaultChecked={character}
              id="charactersInput"
              className="cursor-pointer"
              onChange={() => {
                setCharacter((prev) => !prev)
              }}
            />
            <label className=" tracking-widest font-bold text-xl">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App