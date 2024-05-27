import { useState, useCallback, useEffect,useRef } from "react";

function App() {
  const [length, setlength] = useState(6);
  const [numberallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordref=useRef(null)

  const passwordgenerater = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberallowed) str += "0123456789"
    if (charallowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setpassword(pass);
  }, [length, numberallowed, charallowed, setpassword]);

  const copypassword=useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordgenerater();
  }, [length, numberallowed, charallowed, setpassword]);

  return (
    <>
      <div>
        <div className="bg-gray-700 min-h-[150px] rounded-[10px] w-[60vw] mt-[50px] mx-auto">
          <h1 className="font-bold pt-1 my-1 text-white text-2xl text-center">Password Generator</h1>
          <div className="mt-[20px] mx-4">
            <span>
              <input
                className="rounded w-[50vw] px-3 border-none outline-none text-orange-500 font-bold mt-4 h-10 "
                type="text"
                value={password}
                placeholder="Password"
                readOnly
                ref={passwordref}
              />
            </span>
            <span>
              <button onClick={copypassword} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white rounded">
                Copy
              </button>
            </span>
          </div>
          <div className="sm:flex text-orange-500 gap-6 sm:ml-0 mt-8 sm:p-11 ml:2">
            <div>
              <input
                type="range"
                min={6}
                max={100}
                className="cursor-pointer"
                value={length}
                onChange={(e) => {
                  setlength(e.target.value);
                }}
              />
            </div>
            <div>Length  ({length})</div>
            <div>
              <input
                type="checkbox"
                id="numberinput"
                name="number"
                defaultChecked={setnumberallowed}
                onChange={() => {
                  setnumberallowed((prev) => !prev )
              }}
              />
              <label className="ml-2" for="scales" htmlFor="numberinput">
                Number
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="characterinput"
                name="character"
                defaultChecked={setcharallowed}
                onChange={() => {
                  setcharallowed((prev) => !prev )
              }}
              />
              <label className="ml-2" for="scales" htmlFor="characterinput">
                Character
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
